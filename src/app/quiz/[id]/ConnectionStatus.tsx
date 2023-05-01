import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

type Props = {
  connected: boolean;
};

export function ConnectionStatus(props: Props) {
  const { connected } = props;
  const Icon = connected ? FaCheckCircle : FaExclamationCircle;
  const text = connected ? "Connected" : "Disconnected";
  const colorClassNames = connected
    ? "border-emerald-500/20 text-emerald-500 bg-emerald-500/10"
    : "border-red-500/20 text-red-500 bg-red-500/10";
  const baseClassNames =
    "flex items-center border justify-center gap-2 rounded-full px-4 transition-all duration-100 w-36 text-sm";
  return (
    <div className={`${baseClassNames} ${colorClassNames}`}>
      <Icon className="flex-shrink-0" />
      <p>{text}</p>
    </div>
  );
}
