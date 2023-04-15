type Props = {
  secondsRemaining: number;
  duration: number;
};

export function Timer(props: Props) {
  const { secondsRemaining, duration } = props;
  const timerPercentage = (secondsRemaining * 100) / duration;

  function getTimerColor() {
    if (timerPercentage > 75) {
      return "bg-green-500";
    } else if (timerPercentage > 50) {
      return "bg-yellow-500";
    } else if (timerPercentage > 25) {
      return "bg-orange-500";
    } else {
      return "bg-red-500";
    }
  }

  return (
    <div className="h-16 bg-transparent grid place-items-center px-2">
      <div className="w-full surface-alt rounded-full animate-fade">
        {secondsRemaining > 0 ? (
          <div
            className={`${getTimerColor()} transition-all duration-500 ease-in-out text-2xl text-center text-white h-8 rounded-full`}
            style={{ width: timerPercentage + "%" }}
          >
            {secondsRemaining}s
          </div>
        ) : (
          <div className="flex justify-center animate-pulse">
            <p className="font-display font-black text-center text-2xl text-red-500 animate-fade">
              Time&apos;s up!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
