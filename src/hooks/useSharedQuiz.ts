import { useCallback, useEffect, useMemo } from "react";

import {
  useConnectionStatus,
  useSharedReducer,
  useUniqueClientId,
} from "driftdb-react";
import { useRouter } from "next/navigation";

import { QuizQuestion, QuizRecord } from "utils/airtable-api";

import { useLocalStorage } from "./useLocalStorage";
import { SharedTimer } from "./useSharedTimer";

type SharedState = {
  answerKey: QuizQuestion["answer"] | null;
  index: number;
  ready: boolean;
  started: boolean;
  participants: User[];
  removedParticipants: string[];
  bannedParticipants: string[];
  showLeaderBoard: boolean;
  leaderboard: [string, number, number][];
  scores: any;
};

type Action = {
  type: string;
  payload?: any;
};

export type User = {
  name: string;
  clientID: string;
  isAdmin: boolean;
};

export function useSharedQuiz(
  isAdmin: boolean,
  quiz: QuizRecord,
  timer: SharedTimer
) {
  const clientID = useUniqueClientId();
  const router = useRouter();
  const { connected } = useConnectionStatus();

  const [user, setUser] = useLocalStorage<User | null>(
    `lijs-quiz-user-${clientID}`,
    null
  );

  const defaultSharedState = useMemo<SharedState>(() => {
    return {
      answerKey: null,
      index: 0,
      ready: false,
      started: false,
      scores: {},
      participants: [],
      removedParticipants: [],
      bannedParticipants: [],
      showLeaderBoard: false,
      leaderboard: [],
    };
  }, []);

  const [sharedState, dispatch] = useSharedReducer(
    "answer-key",
    (state = defaultSharedState, action: Action) => {
      if (!state) return;
      switch (action.type) {
        case "set-ready":
          return { ...state, ready: true };
        case "reset":
          return {
            ...defaultSharedState,
            participants: state.participants,
          };
        case "toggle-leaderboard":
          return { ...state, showLeaderBoard: !state.showLeaderBoard };
        case "next-question":
          return {
            ...state,
            index: state.index + 1,
            answerKey: null,
            showLeaderBoard: false,
          };
        case "previous-question":
          return {
            ...state,
            index: state.index - 1,
            answerKey: null,
            showLeaderBoard: false,
          };
        case "toggle-answer-key":
          return {
            ...state,
            answerKey:
              state.answerKey === null
                ? quiz.questions[state.index]?.answer
                : null,
          };
        case "set-started":
          return { ...state, started: true };
        case "submit-answer":
          const { questionID, selectedOptionKey, isCorrect, userName } =
            action.payload;

          const existingCount = state.scores?.[userName]?.count || 0;
          const wasAlreadyAnswered =
            !!state.scores?.[userName]?.[questionID]?.key;

          const updatedScores = {
            ...state.scores,
            [userName]: {
              ...state.scores[userName],
              [questionID]: {
                key: selectedOptionKey,
                isCorrect,
              },
              count: wasAlreadyAnswered ? existingCount : existingCount + 1,
            },
          };

          const leaderboard = Object.keys(updatedScores)
            .reduce((acc, _name) => {
              const correctAnswerCount = Object.keys(
                updatedScores[_name]
              ).reduce((acc, key) => {
                if (updatedScores[_name][key].isCorrect) {
                  return acc + 1;
                } else return acc;
              }, 0);

              return [
                ...acc,
                [_name, correctAnswerCount, updatedScores[_name].count],
              ];
            }, [])
            .sort((a, b) => b[1] - a[1]);

          return {
            ...state,
            leaderboard,
            scores: updatedScores,
          };

        case "add-participant":
          return {
            ...state,
            participants: [...state.participants, action.payload] as User[],
          };

        case "remove-participant":
          return {
            ...state,
            scores: Object.keys(state.scores).reduce((acc, value) => {
              if (value === action.payload.name) {
                return acc;
              } else {
                return {
                  ...acc,
                  ...state.scores[value],
                };
              }
            }, {}),
            participants: state.participants.filter(
              (v) => v.clientID !== action.payload.clientID
            ),
            removedParticipants: [...state.removedParticipants, action.payload],
          };
        case "ban-participant":
          return {
            ...state,
            scores: Object.keys(state.scores).reduce((acc, value) => {
              if (value === action.payload.name) {
                return acc;
              } else {
                return {
                  ...acc,
                  ...state.scores[value],
                };
              }
            }, {}),
            participants: state.participants.filter(
              (v) => v.clientID !== action.payload.clientID
            ),
            bannedParticipants: [
              ...state.bannedParticipants,
              action.payload.name,
            ],
          };

        default:
          return state;
      }
    },
    defaultSharedState
  );

  const currentQuestion = quiz.questions[sharedState?.index || 0];

  useEffect(() => {
    if (!isAdmin) return;
    fetch(
      `/api/quiz/update-quiz-status?id=${quiz.id}&admin_client_id=${clientID}`
    ).then(async (res) => {
      const body = await res.json();
      if (body?.success) {
        setUser({ isAdmin: true, clientID, name: "" });
        dispatch({ type: "set-ready" });
      }
    });
  }, [clientID, dispatch, isAdmin, quiz, setUser]);

  // Admin Methods

  const goToPreviousQuestion = useCallback(() => {
    dispatch({ type: "previous-question" });
    timer.actions.reset();
  }, []);

  const goToNextQuestion = useCallback(() => {
    dispatch({ type: "next-question" });
    timer.actions.reset();
  }, []);

  const resetQuiz = useCallback(() => {
    // setIndex(0);
    dispatch({ type: "reset" });
    timer.actions.reset();
  }, []);

  const removeParticipant = useCallback((user: User) => {
    dispatch({ type: "remove-participant", payload: user });
  }, []);

  const banParticipant = useCallback((user: User) => {
    dispatch({ type: "ban-participant", payload: user });
  }, []);

  useEffect(() => {
    if (user?.isAdmin) return;
    if (sharedState?.bannedParticipants.includes(clientID)) {
      setUser(null);
      if (window) {
        // FIX!!!
        window.localStorage.removeItem(clientID);
      }
      router.replace("/quiz");
    } else if (sharedState?.removedParticipants.includes(clientID)) {
      setUser(null);
    }
  }, [
    clientID,
    dispatch,
    isAdmin,
    router,
    setUser,
    sharedState,
    user?.isAdmin,
  ]);

  // Participant Methods

  const submitAnswer = useCallback(
    (value) => {
      const correctAnswer = quiz.questions[sharedState?.index || 0].answer;

      const payload = {
        userName: user?.name,
        questionID: currentQuestion?.id,
        selectedOptionKey: value,
        isCorrect: value === correctAnswer,
      } as const;

      dispatch({ type: "submit-answer", payload });
    },
    [
      currentQuestion?.id,
      dispatch,
      quiz.questions,
      sharedState?.index,
      user?.name,
    ]
  );

  const joinQuiz = useCallback(
    (e) => {
      e.preventDefault();
      const name = e.target.name.value;
      if (sharedState?.participants.includes(name)) {
        alert("Please choose another name.");
        return;
      }

      const updatedUser = { name, clientID, isAdmin: false };
      setUser(updatedUser);
      dispatch({ type: "add-participant", payload: updatedUser });
    },
    [clientID, dispatch, setUser, sharedState?.participants]
  );

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

  const question = useMemo(() => {
    return {
      ...currentQuestion,
      index: sharedState?.index,
    };
  }, [currentQuestion, sharedState?.index]);

  const admin = useMemo(() => {
    return {
      answerKey: sharedState?.answerKey,
      startQuiz: () => dispatch({ type: "set-started" }),
      goToPreviousQuestion,
      goToNextQuestion,
      toggleAnswer: () => dispatch({ type: "toggle-answer-key" }),
      resetQuiz,
      removeParticipant,
      banParticipant,
      resetTimer: timer.actions.reset,
      startTimer: timer.actions.start,
      pauseTimer: timer.actions.pause,
      stopTimer: timer.actions.stop,
      toggleLeaderboard: () => dispatch({ type: "toggle-leaderboard" }),
      showLeaderboard: sharedState?.showLeaderBoard,
    };
  }, [
    banParticipant,
    dispatch,
    goToNextQuestion,
    goToPreviousQuestion,
    removeParticipant,
    resetQuiz,
    sharedState?.answerKey,
    sharedState?.showLeaderBoard,
    timer.actions.pause,
    timer.actions.reset,
    timer.actions.start,
    timer.actions.stop,
  ]);

  const user_actions = useMemo(() => {
    return {
      joinQuiz,
      submitAnswer,
    };
  }, [joinQuiz, submitAnswer]);

  return {
    status,
    question,
    admin,
    user,
    user_actions,
    participants: sharedState?.participants,
  } as const;
}

export type SharedQuiz = ReturnType<typeof useSharedQuiz>;
