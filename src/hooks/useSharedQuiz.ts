import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  useConnectionStatus,
  useSharedReducer,
  useUniqueClientId,
} from "driftdb-react";
import isEmpty from "lodash/isEmpty";
import { useRouter } from "next/navigation";

import { Action, QuizRecord, SharedState, User } from "utils/types";

import { useLocalStorage } from "./useLocalStorage";

export function useSharedQuiz(
  isAdmin: boolean,
  quiz: QuizRecord | null
  // timer: SharedTimer
) {
  const clientID = useUniqueClientId();
  const router = useRouter();
  const { connected } = useConnectionStatus();
  const interval = useRef<any>(0);
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  const [user, setUser] = useLocalStorage<User | null>(
    `lijs-quiz-user-${clientID}`,
    {
      clientID,
    }
  );

  const [sharedState, dispatch] = useSharedReducer<
    Partial<SharedState> | null,
    Action
  >(
    "answer-key",
    (state, action) => {
      // if (!state) return;
      switch (action.type) {
        case "set-quiz":
          return {
            ...state,
            quiz: action.payload.quiz,
            index: 0,
            timer: {
              duration: action.payload.quiz.timer,
              seconds_remaining: action.payload.quiz.timer,
              status: "stopped",
            },
          };
        case "set-ready":
          return { ...state, ready: true };
        case "set-seconds-left":
          return {
            ...state,
            timer: {
              ...state?.timer,
              seconds_remaining: action.payload,
            },
          };
        case "set-timer-status":
          return {
            ...state,
            timer: {
              ...state?.timer,
              status: action.payload,
            },
          };
        case "reset":
          return {
            quiz: state?.quiz,
            index: 0,
            participants: state?.participants,
            ready: true,
            started: false,
            timer: {
              duration: state?.timer?.duration,
              seconds_remaining: state?.timer?.duration,
              status: "stopped",
            },
          };
        case "toggle-leaderboard":
          return { ...state, showLeaderBoard: state?.showLeaderBoard };
        case "next-question":
          return {
            ...state,
            index: (state?.index || 0) + 1,
            answerKey: null,
            showLeaderBoard: false,
          };
        case "previous-question":
          return {
            ...state,
            index: (state?.index || 0) - 1,
            answerKey: null,
            showLeaderBoard: false,
          };
        case "toggle-answer-key":
          return {
            ...state,
            answerKey:
              state?.answerKey === null
                ? state?.quiz?.questions[state?.index || 0]?.answer
                : null,
          };
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
              const correctAnswerCount = Object.keys(
                updatedScores[client_id]
              ).reduce((acc, key) => {
                if (updatedScores[client_id][key].isCorrect) {
                  return acc + 1;
                } else return acc;
              }, 0);
              const getName = state?.participants?.find(
                (v) => v.clientID === client_id
              )?.name;

              return [
                ...acc,
                [getName, correctAnswerCount, updatedScores[client_id].count],
              ] as [string, number, number][];
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
              ...(state?.participants || []),
              action.payload,
            ] as User[],
          };

        case "remove-participant":
          return {
            ...state,
            scores: isEmpty(state?.scores)
              ? {}
              : Object.keys(state?.scores!).reduce((acc, value) => {
                  if (value === action.payload.name) {
                    return acc;
                  } else {
                    return {
                      ...acc,
                      ...state?.scores![value],
                    };
                  }
                }, {}),
            participants: state?.participants?.filter(
              (v) => v.clientID !== action.payload.clientID
            ),
            removedParticipants: [
              ...(state?.removedParticipants || []),
              action.payload,
            ],
          };
        case "ban-participant":
          return {
            ...state,
            scores: isEmpty(state?.scores)
              ? {}
              : Object.keys(state?.scores!).reduce((acc, value) => {
                  if (value === action.payload.name) {
                    return acc;
                  } else {
                    return {
                      ...acc,
                      ...state?.scores![value],
                    };
                  }
                }, {}),
            participants: state?.participants?.filter(
              (v) => v.clientID !== action.payload.clientID
            ),
            bannedParticipants: [
              ...(state?.bannedParticipants || []),
              action.payload.name,
            ],
          };

        default:
          return state;
      }
    },
    null
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
    // eslint-disable-next-line functional/immutable-data
    interval.current = setInterval(() => {
      if (secondsLeft > 0) {
        setSecondsLeft((v) => v - 1);
      }
    }, 1000);
  }, [secondsLeft]);

  const start = useCallback(() => {
    // setSecondsLeft(sharedState?.quiz?.timer?.duration);
    startInterval();
    dispatch({ type: "set-timer-status", payload: "running" });
  }, [startInterval]);

  const pause = useCallback(() => {
    clearInterval(interval.current);
    dispatch({ type: "set-timer-status", payload: "paused" });
  }, []);

  const stop = useCallback(() => {
    clearInterval(interval.current);
    dispatch({ type: "set-timer-status", payload: "stopped" });
    setSecondsLeft(0);
  }, []);

  const reset = useCallback(() => {
    clearInterval(interval.current);
    dispatch({ type: "set-timer-status", payload: "stopped" });
    setSecondsLeft(sharedState?.timer?.duration!);
  }, [sharedState?.timer?.duration]);

  const timer_actions = useMemo(
    () => ({ start, pause, reset, stop }),
    [pause, reset, start, stop]
  );

  // END TIMER******************************************************
  const currentQuestion =
    sharedState?.quiz?.questions?.[sharedState?.index || 0];

  useEffect(() => {
    if (isAdmin && quiz?.id) {
      setSecondsLeft(quiz?.timer);
    }
  }, [isAdmin, quiz?.id, quiz?.timer]);

  useEffect(() => {
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
  }, [isAdmin, quiz]);

  // Admin Methods

  const goToPreviousQuestion = useCallback(() => {
    dispatch({ type: "previous-question" });
    timer_actions.reset();
  }, []);

  const goToNextQuestion = useCallback(() => {
    dispatch({ type: "next-question" });
    timer_actions.reset();
  }, []);

  const resetQuiz = useCallback(() => {
    timer_actions.reset();
    dispatch({ type: "reset" });
  }, []);

  const removeParticipant = useCallback((user: User) => {
    dispatch({ type: "remove-participant", payload: user });
  }, []);

  const banParticipant = useCallback((user: User) => {
    dispatch({ type: "ban-participant", payload: user });
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
      const correctAnswer =
        sharedState?.quiz?.questions[sharedState?.index || 0].answer;

      const payload = {
        userName: user?.name,
        clientID: user?.clientID,
        questionID: currentQuestion?.id,
        selectedOptionKey: value,
        isCorrect: value === correctAnswer,
      } as const;

      dispatch({ type: "submit-answer", payload });
    },
    [currentQuestion?.id, user?.name]
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

  const question = useMemo(() => {
    return {
      ...currentQuestion,
      index: sharedState?.index,
    };
  }, [currentQuestion, sharedState?.index]);

  const admin_actions = useMemo(() => {
    return {
      answerKey: sharedState?.answerKey,
      startQuiz: () => dispatch({ type: "set-started" }),
      goToPreviousQuestion,
      goToNextQuestion,
      toggleAnswer: () => dispatch({ type: "toggle-answer-key" }),
      resetQuiz,
      removeParticipant,
      banParticipant,
      resetTimer: timer_actions.reset,
      startTimer: timer_actions.start,
      pauseTimer: timer_actions.pause,
      stopTimer: timer_actions.stop,
      toggleLeaderboard: () => dispatch({ type: "toggle-leaderboard" }),
      showLeaderboard: sharedState?.showLeaderBoard,
    };
  }, [
    sharedState?.answerKey,
    sharedState?.showLeaderBoard,
    goToPreviousQuestion,
    goToNextQuestion,
    resetQuiz,
    removeParticipant,
    banParticipant,
    timer_actions.reset,
    timer_actions.start,
    timer_actions.pause,
    timer_actions.stop,
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
    question,
    admin_actions,
    user,
    user_actions,
    participants: sharedState?.participants,
  } as const;
}
