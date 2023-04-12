import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useSharedState } from "driftdb-react";

export function useSharedTimer(startingSeconds: number) {
  const interval = useRef<any>(0);
  const [secondsLeft, setSecondsLeft] = useState<number>(startingSeconds);
  const [secondsRemaining, setSecondsRemaining] = useSharedState(
    "seconds-remaining",
    startingSeconds
  );
  const [status, setStatus] = useSharedState(
    "timer-status",
    "stopped" as "stopped" | "running" | "paused"
  );

  useEffect(() => {
    setSecondsRemaining(secondsLeft);
  }, [secondsLeft, setSecondsRemaining]);

  useEffect(() => {
    if (secondsRemaining === 0) {
      clearInterval(interval.current);
      setStatus("stopped");
    }
  }, [secondsRemaining, setStatus]);

  const startInterval = useCallback(() => {
    // eslint-disable-next-line functional/immutable-data
    interval.current = setInterval(() => {
      if (secondsLeft > 0) {
        setSecondsLeft((v) => v - 1);
      }
    }, 1000);
  }, [secondsLeft]);

  const start = useCallback(() => {
    startInterval();
    setStatus("running");
  }, [setStatus, startInterval]);

  const pause = useCallback(() => {
    clearInterval(interval.current);
    setStatus("paused");
  }, [setStatus]);

  const stop = useCallback(() => {
    clearInterval(interval.current);
    setStatus("stopped");
    setSecondsLeft(0);
  }, [setStatus]);

  const reset = useCallback(() => {
    clearInterval(interval.current);
    setStatus("stopped");
    setSecondsLeft(startingSeconds);
  }, [setStatus, startingSeconds]);

  const actions = useMemo(
    () => ({ start, pause, reset, stop }),
    [pause, reset, start, stop]
  );

  return { secondsRemaining, actions, status };
}

export type SharedTimer = ReturnType<typeof useSharedTimer>;
