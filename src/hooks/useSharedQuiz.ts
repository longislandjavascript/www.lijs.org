import { useCallback, useEffect, useMemo, useRef, useState } from "react"; //441

import {
  useConnectionStatus,
  useSharedReducer,
  useUniqueClientId,
} from "driftdb-react";
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
  const clientID = useUniqueClientId();
  const router = useRouter();
  const { connected } = useConnectionStatus();
  const interval = useRef<any>(0);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

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
        case "set-quiz":
        case "reset-quiz": {
          return setDefaultState({ state, action });
        }

        case "set-ready": {
          return { ...state, ready: true };
        }

        case "set-seconds-left": {
          return {
            ...state,
            timer: {
              ...state.timer,
              seconds_remaining: action.payload,
            },
          };
        }

        case "set-timer-status": {
          return {
            ...state,
            timer: {
              ...state.timer,
              status: action.payload,
            },
          };
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

        case "set-started":
          return { ...state, started: true };
        case "submit-answer":
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

        case "add-participant":
          return {
            ...state,
            participants: [
              ...(state?.participants || []),
              action.payload,
            ] as User[],
          };

        case "remove-participant":
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
        default:
          return state;
      }
    },
    setDefaultState()
  );

  // TIMER******************************************************

  useEffect(() => {
    dispatch({ type: "set-seconds-left", payload: secondsLeft });
    if (secondsLeft === 0) {
      clearInterval(interval.current);
      dispatch({ type: "set-timer-status", payload: "stopped" });
    }
  }, [secondsLeft]);

  const startInterval = useCallback(() => {
    if (secondsLeft === undefined) {
      setSecondsLeft(sharedState?.timer?.duration!);
    }

    // eslint-disable-next-line functional/immutable-data
    interval.current = setInterval(() => {
      setSecondsLeft((v) => v! - 1);
    }, 1000);
  }, [secondsLeft, sharedState?.timer?.duration]);

  const startTimer = useCallback(() => {
    dispatch({ type: "set-timer-status", payload: "running" });
    startInterval();
  }, []);

  const pauseTimer = useCallback(() => {
    clearInterval(interval.current);
    dispatch({ type: "set-timer-status", payload: "paused" });
  }, []);

  const stopTimer = useCallback(() => {
    clearInterval(interval.current);
    dispatch({ type: "set-timer-status", payload: "stopped" });
    setSecondsLeft(0);
  }, []);

  const resetTimer = useCallback(() => {
    if (sharedState?.timer?.duration) {
      clearInterval(interval.current);
      dispatch({ type: "set-timer-status", payload: "stopped" });
      setSecondsLeft(sharedState?.timer?.duration!);
    }
  }, [sharedState?.timer?.duration]);

  // END TIMER******************************************************

  useEffect(() => {
    if (sharedState?.quiz?.id && isAdmin) {
      resetTimer();
      return;
      // dispatch({ type: "set-quiz", payload: { quiz: sharedState?.quiz } });
    }
    if (!isAdmin || !quiz?.id) return;

    dispatch({ type: "set-quiz", payload: { quiz } });

    fetch(
      `/api/quiz/update-quiz-status?id=${quiz.id}&admin_client_id=${clientID}`
    ).then(async (res) => {
      const body = await res.json();
      if (body?.success) {
        setUser({ isAdmin: true, clientID, name: "" });
        dispatch({ type: "set-ready" });
      }
    });
  }, [isAdmin, quiz, sharedState?.quiz]);

  // Admin Methods

  const goToPreviousQuestion = useCallback(() => {
    dispatch({ type: "previous-question" });
    resetTimer();
  }, []);

  const goToNextQuestion = useCallback(() => {
    dispatch({ type: "next-question" });
    resetTimer();
  }, []);

  const resetQuiz = useCallback(() => {
    resetTimer();
    dispatch({ type: "reset-quiz" });
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
    if (user?.isAdmin || !sharedState) return;
    if (sharedState?.bannedParticipants?.includes(clientID)) {
      setUser(null);
      if (window) {
        // FIX!!!
        window.localStorage.removeItem(clientID);
      }
      router.replace("/quiz");
    } else if (sharedState?.removedParticipants?.includes(clientID)) {
      router.replace("/quiz");
      setUser(null);
    }
  }, []);

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

  const joinQuiz = useCallback((e) => {
    e.preventDefault();
    const name = e.target.name.value;
    if (sharedState?.participants?.includes(name)) {
      alert("Please choose another name.");
      return;
    }

    const updatedUser = { name, clientID, isAdmin: false };
    setUser(updatedUser);
    dispatch({ type: "add-participant", payload: updatedUser });
  }, []);

  const status = useMemo(() => {
    return {
      connected,
      started: sharedState?.started,
      results: sharedState?.scores,
      ready: sharedState?.ready,
      leaderboard: sharedState?.leaderboard,
    };
  }, [
    connected,
    sharedState?.leaderboard,
    sharedState?.ready,
    sharedState?.scores,
    sharedState?.started,
  ]);

  const admin_actions = useMemo(() => {
    return {
      showAnswerKey: sharedState?.showAnswerKey,
      startQuiz: () => dispatch({ type: "set-started" }),
      goToPreviousQuestion,
      goToNextQuestion,
      toggleAnswer: () => dispatch({ type: "toggle-answer-key" }),
      resetQuiz,
      removeParticipant,
      banParticipant,
      resetTimer: resetTimer,
      startTimer: startTimer,
      pauseTimer: pauseTimer,
      stopTimer: stopTimer,
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
    resetTimer,
    startTimer,
    pauseTimer,
    stopTimer,
    dispatch,
  ]);

  const user_actions = useMemo(() => {
    return {
      joinQuiz,
      submitAnswer,
    };
  }, [joinQuiz, submitAnswer]);

  return {
    quiz: sharedState?.quiz,
    timer: sharedState?.timer,
    status,
    question: sharedState?.question,
    admin_actions,
    user,
    user_actions,
    participants: sharedState?.participants,
  } as const;
}

// HELPERS

function setDefaultState(args?: {
  state?: Partial<SharedState> | null;
  action?: Action;
}) {
  const isReset = args?.action?.type === "reset-quiz";
  const quest = isReset
    ? { ...args?.state?.quiz?.questions?.[0], index: 0 }
    : args?.state?.question;
  return {
    ...args?.state,
    quiz: args?.action?.payload?.quiz || args?.state?.quiz,
    question: quest as QuizQuestion,
    showLeaderBoard: false,
    participants: isReset ? args?.state?.participants : [],
    leaderboard: isReset ? undefined : args?.state?.leaderboard,
    scores: isReset ? undefined : args?.state?.scores,
    showAnswerKey: false,
    ready: true,
    started: isReset ? false : args?.state?.started,
    timer: {
      duration: isReset ? args?.state?.timer?.duration! : undefined,
      seconds_remaining: isReset
        ? args?.state?.timer?.seconds_remaining!
        : undefined,
      status: "stopped" as const,
    },
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
