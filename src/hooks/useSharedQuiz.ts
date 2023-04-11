import { useCallback, useEffect, useMemo } from "react";

import {
  useConnectionStatus,
  useDatabase,
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
  participants: string[];
  removedParticipants: string[];
  showLeaderBoard: boolean;
  leaderboard: [string, number, number][];
  scores: any;
};

type Action = {
  type: string;
  payload?: any;
};

export function useSharedQuiz(
  isAdmin: boolean,
  quiz: QuizRecord,
  timer: SharedTimer
) {
  const clientID = useUniqueClientId();
  const router = useRouter();
  const { connected } = useConnectionStatus();

  const db = useDatabase();

  const [user, setUser] = useLocalStorage(`username-${clientID}`, {
    name: "",
    clientID,
    isAdmin: false,
  });

  const defaultSharedState = useMemo<SharedState>(() => {
    return {
      answerKey: null,
      index: 0,
      ready: false,
      started: false,
      scores: {},
      participants: [],
      removedParticipants: [],
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
          return { ...state, ready: action.payload };
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
            participants: [
              ...state.participants,
              action.payload.userName,
            ] as string[],
          };

        case "remove-participant":
          return {
            ...state,
            scores: Object.keys(state.scores).reduce((acc, value) => {
              if (value === action.payload.userName) {
                return acc;
              } else {
                return {
                  ...acc,
                  ...state.scores[value],
                };
              }
            }, {}),
            participants: state.participants.filter(
              (v) => v !== action.payload.userName
            ),
            removedParticipants: [user?.clientID, action.payload.userName],
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
    setTimeout(() => {
      if (db?.dbUrl) {
        if (quiz.room_id) return;
        const room_id = db.dbUrl?.split("room/")[1].split("/connect")[0];
        fetch(
          `/api/quiz/update-quiz-status-details?id=${quiz.id}&room_id=${room_id}&admin_client_id=${clientID}`
        );
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (quiz.admin_client_id === clientID && !user) {
      setUser({ ...user, isAdmin: true });
    }
  }, [clientID, quiz, setUser, user]);

  // Admin Methods

  const goToPreviousQuestion = useCallback(() => {
    dispatch({ type: "previous-question" });
    timer.actions.reset();
  }, [dispatch, timer.actions]);

  const goToNextQuestion = useCallback(() => {
    dispatch({ type: "next-question" });
    timer.actions.reset();
  }, [dispatch, timer.actions]);

  const resetQuiz = useCallback(() => {
    // setIndex(0);
    dispatch({ type: "reset" });
    timer.actions.reset();
  }, [dispatch, timer.actions]);

  const removeParticipant = useCallback(
    (name) => {
      dispatch({ type: "remove-participant", payload: { userName: name } });
    },
    [dispatch]
  );

  useEffect(() => {
    if (isAdmin) return;
    if (sharedState?.removedParticipants.includes(user?.clientID)) {
      setUser(null);
      router.replace("/quiz");
    }
  }, [isAdmin, router, setUser, sharedState, user?.clientID]);

  useEffect(() => {
    if (sharedState?.ready) return;
    dispatch({ type: "set-ready", payload: sharedState !== null });
  }, [dispatch, sharedState]);

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
        alert("name taken");
        return;
      }
      setUser({ ...user, name });
      dispatch({ type: "add-participant", payload: { userName: name } });
    },
    [dispatch, setUser, sharedState?.participants, user]
  );

  const admin = useMemo(
    () => ({
      answerKey: sharedState?.answerKey,
      startQuiz: () => dispatch({ type: "set-started" }),
      goToPreviousQuestion,
      goToNextQuestion,
      toggleAnswer: () => dispatch({ type: "toggle-answer-key" }),
      resetQuiz,
      removeParticipant,
      resetTimer: timer.actions.reset,
      startTimer: timer.actions.start,
      pauseTimer: timer.actions.pause,
      stopTimer: timer.actions.stop,
      toggleLeaderboard: () => dispatch({ type: "toggle-leaderboard" }),
      showLeaderboard: sharedState?.showLeaderBoard,
    }),
    [
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
    ]
  );

  const participant = useMemo(
    () => ({
      all: sharedState?.participants,
      name: user?.name,
      clientID: user?.clientID,
      isAdmin: user?.isAdmin,
      joinQuiz,
      submitAnswer,
    }),
    [joinQuiz, sharedState?.participants, submitAnswer, user]
  );

  const status = useMemo(
    () => ({
      connected,
      started: sharedState?.started,
      results: sharedState?.scores,
      ready: sharedState?.ready,
      leaderboard: sharedState?.leaderboard,
    }),
    [
      connected,
      sharedState?.leaderboard,
      sharedState?.ready,
      sharedState?.scores,
      sharedState?.started,
    ]
  );

  const question = useMemo(() => {
    return {
      ...currentQuestion,
      index: sharedState?.index,
    };
  }, [currentQuestion, sharedState?.index]);

  return {
    status,
    question,
    admin,
    participant,
  } as const;
}

export type SharedQuiz = ReturnType<typeof useSharedQuiz>;
