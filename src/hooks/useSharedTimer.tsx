/* eslint-disable functional/immutable-data */
import { useCallback, useEffect, useRef } from "react";

import { useSharedReducer } from "driftdb-react";

import { Action, Timer } from "utils/types";

export function useSharedTimer() {
  const interval = useRef<any>(0);

  const [sharedTimerState, dispatch] = useSharedReducer<
    Pick<Timer, "status" | "duration" | "secondsRemaining">,
    Action
  >(
    "shared-timer-state",
    (state, action) => {
      switch (action.type) {
        case "set-duration": {
          return { ...state, duration: action.payload };
        }
        case "set-status": {
          return { ...state, status: action.payload };
        }
        case "set-seconds-remaining": {
          return { ...state, secondsRemaining: action.payload };
        }
        case "countdown": {
          return { ...state, secondsRemaining: state.secondsRemaining - 1 };
        }
        default: {
          return state;
        }
      }
    },
    {
      status: "idle",
      secondsRemaining: 0,
      duration: 0,
    }
  );

  const handleClearInterval = useCallback(() => {
    clearInterval(interval.current);
  }, []);

  const startInterval = useCallback(() => {
    interval.current = setInterval(() => {
      dispatch({
        type: "countdown",
      });
    }, 1000);
  }, [dispatch]);

  useEffect(() => {
    if (sharedTimerState.secondsRemaining < 1) {
      handleClearInterval();
      dispatch({ type: "set-status", payload: "finished" });
    }
  }, [dispatch, handleClearInterval, sharedTimerState.secondsRemaining]);

  const start = useCallback(() => {
    startInterval();
    dispatch({ type: "set-status", payload: "running" });
  }, [dispatch, startInterval]);

  const pause = useCallback(() => {
    handleClearInterval();
    dispatch({ type: "set-status", payload: "paused" });
  }, [dispatch, handleClearInterval]);

  const stop = useCallback(() => {
    handleClearInterval();

    dispatch({ type: "set-status", payload: "stopped" });
    dispatch({ type: "set-seconds-remaining", payload: 0 });
  }, [dispatch, handleClearInterval]);

  const reset = useCallback(() => {
    handleClearInterval();
    dispatch({ type: "set-status", payload: "idle" });
    dispatch({
      type: "set-seconds-remaining",
      payload: sharedTimerState.duration,
    });
  }, [dispatch, handleClearInterval, sharedTimerState.duration]);

  const setDuration = useCallback(
    (value: number) => {
      dispatch({
        type: "set-duration",
        payload: value,
      });
      dispatch({
        type: "set-seconds-remaining",
        payload: value,
      });
      dispatch({ type: "set-status", payload: "idle" });
    },
    [dispatch]
  );

  return {
    ...sharedTimerState,
    start,
    pause,
    stop,
    reset,
    setDuration,
  } as Timer;
}
