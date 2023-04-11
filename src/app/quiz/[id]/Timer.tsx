type Props = {
  secondsRemaining: number;
  defaultSeconds: number;
};

export function Timer(props: Props) {
  const { secondsRemaining, defaultSeconds } = props;
  const timerPercentage = (secondsRemaining * 100) / defaultSeconds;

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
    <div>
      {secondsRemaining > 0 ? (
        <div className="fixed bottom-0 left-0 md:left-80 right-0 h-16 bg-transparent grid place-items-center px-2 md:px-12">
          <div className="w-full surface-alt rounded-full animate-fade">
            <div
              className={`${getTimerColor()} transition-all duration-500 ease-in-out text-2xl text-center text-white h-8 rounded-full`}
              style={{ width: timerPercentage + "%" }}
            >
              {secondsRemaining}s
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <p className="font-display font-black text-center text-3xl text-red-100 animate-fade bg-red-600 rounded-xl p-2">
            Time&apos;s up!
          </p>
        </div>
      )}
    </div>
  );
}
