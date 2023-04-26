import { useCallback, useEffect, useMemo } from "react"; //441

import {
  useConnectionStatus,
  useSharedReducer,
  useUniqueClientId,
} from "driftdb-react";
import { useSharedTimer } from "hooks/useSharedTimer";
import isEmpty from "lodash/isEmpty";
import { useRouter } from "next/navigation";

import {
  Action,
  QuizQuestion,
  QuizRecord,
  SharedState,
  User,
} from "utils/types";

import { useLocalStorage } from "./useLocalStorage";

export function useSharedQuiz(isAdmin: boolean, quiz: QuizRecord | null) {
  const timer = useSharedTimer();
  const clientID = useUniqueClientId();
  const router = useRouter();
  const { connected } = useConnectionStatus();

  const [user, setUser] = useLocalStorage<User | null>(
    `lijs-quiz-user-${clientID}`,
    {
      clientID,
    }
  );

  const [sharedState, dispatch] = useSharedReducer<
    Partial<SharedState>,
    Action
  >(
    "shared-state",
    (state, action) => {
      switch (action.type) {
        case "set-quiz": {
          return {
            ...state,
            quiz: action.payload,
          };
        }
        case "reset-quiz": {
          return setDefaultState({ state, action });
        }
        case "set-status": {
          return { ...state, status: action.payload };
        }

        case "toggle-leaderboard": {
          return {
            ...state,
            showLeaderBoard: !state?.showLeaderBoard,
          };
        }

        case "next-question": {
          const nextIndex = state?.question?.index! + 1;
          return {
            ...state,
            question: {
              ...state.quiz?.questions[nextIndex]!,
              index: nextIndex,
            },
            showAnswerKey: false,
            showLeaderBoard: false,
          };
        }

        case "previous-question": {
          const previousIndex = state?.question?.index! - 1;

          return {
            ...state,
            question: {
              ...state.quiz?.questions[previousIndex]!,
              index: previousIndex,
            },
            showAnswerKey: false,
            showLeaderBoard: false,
          };
        }

        case "toggle-answer-key": {
          return {
            ...state,
            showAnswerKey: !state.showAnswerKey || false,
          };
        }

        case "submit-answer": {
          const { questionID, selectedOptionKey, isCorrect, clientID } =
            action.payload;
          const existingCount = state?.scores?.[clientID]?.count || 0;
          const wasAlreadyAnswered =
            !!state?.scores?.[clientID]?.[questionID]?.key;

          const updatedScores = {
            ...state?.scores,
            [clientID]: {
              ...state?.scores?.[clientID],
              [questionID]: {
                key: selectedOptionKey,
                isCorrect,
              },
              count: wasAlreadyAnswered ? existingCount : existingCount + 1,
            },
          };

          const leaderboard = Object.keys(updatedScores)
            .reduce((acc, client_id) => {
              const userAnswers = updatedScores[client_id];
              const answerCount = userAnswers.count || 0;
              const correctAnswers = Object.keys(userAnswers).reduce(
                (acc, key) => {
                  if (userAnswers[key].isCorrect) {
                    return acc + 1;
                  } else return acc;
                },
                0
              );

              const getName = state?.participants?.find(
                (v) => v.clientID === client_id
              )?.name;

              return [
                ...acc,
                {
                  name: getName!,
                  clientID,
                  correctAnswers,
                  totalAnswers: answerCount,
                  score: parseInt((correctAnswers / answerCount).toFixed(2)),
                },
              ];
            }, [])
            .sort((a, b) => b.correctAnswers - a.correctAnswers);

          return {
            ...state,
            leaderboard,
            scores: updatedScores,
          };
        }

        case "add-participant": {
          return {
            ...state,
            participants: [
              ...(state?.participants || []),
              action.payload,
            ] as User[],
          };
        }

        case "remove-participant": {
          return {
            ...state,
            scores: removeUserScores({
              scores: state?.scores,
              clientID: action.payload.clientID,
            }),
            participants: state?.participants?.filter(
              (v) => v.clientID !== action.payload.clientID
            ),
            removedParticipants: [
              ...(state?.removedParticipants || []),
              action.payload,
            ],
          };
        }

        default: {
          return state;
        }
      }
    },
    isAdmin ? setInitialState(quiz!) : setDefaultState()
  );

  useEffect(() => {
    if (!isAdmin || !quiz?.id) {
      // dispatch({ type: "set-status", payload: "ready" });
      return;
    }

    fetch(
      `/api/quiz/update-quiz-status?id=${quiz.id}&admin_client_id=${clientID}`
    ).then(async (res) => {
      const body = await res.json();
      if (body?.success) {
        setUser({ isAdmin: true, clientID, name: "" });
        dispatch({ type: "set-quiz", payload: quiz });
        dispatch({ type: "set-status", payload: "ready" });
      }
    });
  }, [isAdmin, quiz, sharedState?.quiz]);

  useEffect(() => {
    if (sharedState?.question) {
      timer.setDuration(sharedState?.question?.timer_duration);
    }
  }, [sharedState?.question]);

  const goToPreviousQuestion = useCallback(() => {
    dispatch({ type: "previous-question" });
  }, []);

  const goToNextQuestion = useCallback(() => {
    dispatch({ type: "next-question" });
  }, []);

  const resetQuiz = useCallback(() => {
    dispatch({ type: "reset-quiz" });
    timer.reset();
  }, []);

  const removeParticipant = useCallback((user: User) => {
    dispatch({
      type: "remove-participant",
      payload: { ...user, banned: false },
    });
  }, []);

  const banParticipant = useCallback((user: User) => {
    dispatch({
      type: "remove-participant",
      payload: { ...user, banned: true },
    });
  }, []);

  useEffect(() => {
    const isUserRemoved = sharedState?.removedParticipants?.find(
      (user) => user.clientID === clientID
    );
    if (isUserRemoved) {
      router.replace("/quiz");
    }
  }, [sharedState?.removedParticipants]);

  // Participant Methods

  const submitAnswer = useCallback(
    (value) => {
      const correctAnswer = sharedState?.question?.answer;

      const payload = {
        userName: user?.name,
        clientID: user?.clientID,
        questionID: sharedState?.question?.id!,
        selectedOptionKey: value,
        isCorrect: value === correctAnswer,
      } as const;

      dispatch({ type: "submit-answer", payload });
    },
    [sharedState?.question?.id!, user?.name]
  );

  const joinQuiz = useCallback(
    (e) => {
      e.preventDefault();
      const name = e.target.name.value;
      if (sharedState?.participants?.includes(name)) {
        alert("Please choose another name.");
        return;
      }

      const updatedUser = { ...user, name };
      setUser(updatedUser);
      dispatch({ type: "add-participant", payload: updatedUser });
    },
    [user]
  );

  const status = useMemo(() => {
    return {
      status: sharedState?.status,
      connected,
      results: sharedState?.scores,
      leaderboard: sharedState?.leaderboard,
    };
  }, [
    connected,
    sharedState?.status,
    sharedState?.leaderboard,
    sharedState?.scores,
  ]);

  const admin_actions = useMemo(() => {
    return {
      showAnswerKey: sharedState?.showAnswerKey,
      startQuiz: () => dispatch({ type: "set-status", payload: "in-progress" }),
      goToPreviousQuestion,
      goToNextQuestion,
      toggleAnswer: () => dispatch({ type: "toggle-answer-key" }),
      resetQuiz,
      removeParticipant,
      banParticipant,
      toggleLeaderboard: () => dispatch({ type: "toggle-leaderboard" }),
      showLeaderboard: sharedState?.showLeaderBoard,
    };
  }, [
    sharedState?.showAnswerKey,
    sharedState?.showLeaderBoard,
    goToPreviousQuestion,
    goToNextQuestion,
    resetQuiz,
    removeParticipant,
    banParticipant,
  ]);

  const user_actions = useMemo(() => {
    return {
      joinQuiz,
      submitAnswer,
    };
  }, [joinQuiz, submitAnswer]);

  return {
    quiz: sharedState?.quiz,
    status,
    timer,
    question: sharedState?.question,
    admin_actions,
    user,
    user_actions,
    participants: sharedState?.participants,
  } as const;
}

// HELPERS

function setDefaultState(args: {
  state: Partial<SharedState> | null;
  action: Action;
}) {
  const isReset = args?.action?.type === "reset-quiz";
  const firstQuestion = { ...args?.state?.quiz?.questions?.[0], index: 0 };
  const quest = isReset
    ? firstQuestion
    : args?.state?.question || firstQuestion;

  return {
    ...args?.state,
    status: "loading" as const,
    quiz: args?.state?.quiz || args?.action?.payload,
    question: quest as QuizQuestion,
    showLeaderBoard: false,
    participants: isReset ? args?.state?.participants : [],
    leaderboard: isReset ? undefined : args?.state?.leaderboard,
    scores: isReset ? undefined : args?.state?.scores,
    showAnswerKey: false,
  };
}

function setInitialState(quiz: QuizRecord) {
  if (!quiz) {
    return null;
  }
  const firstQuestion = { ...quiz?.questions?.[0], index: 0 };
  console.log("SETINITIALSTATE", quiz);
  return {
    quiz,
    question: firstQuestion,
    showLeaderBoard: false,
    participants: undefined,
    leaderboard: undefined,
    scores: undefined,
    showAnswerKey: false,
  };
}

function removeUserScores(args: {
  scores?: SharedState["scores"];
  clientID: string;
}) {
  const { scores, clientID } = args;
  return isEmpty(scores)
    ? {}
    : Object.keys(scores!).reduce((acc, value) => {
        if (value === clientID) {
          return acc;
        } else {
          return {
            ...acc,
            ...scores![value],
          };
        }
      }, {});
}
