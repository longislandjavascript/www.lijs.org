import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

type Props = {
  connected: boolean;
};

export function ConnectionStatus(props: Props) {
  const { connected } = props;
  const Icon = connected ? FaCheckCircle : FaExclamationCircle;
  const text = connected ? "Connected" : "Not Connected";
  const colorClassNames = connected
    ? "border-emerald-500 text-emerald-500"
    : "border-red-500 text-red-500";
  const baseClassNames =
    "flex items-center border justify-center gap-2 rounded-full px-4 transition-all duration-100 w-48 mb-2";
  return (
    <div className={`${baseClassNames} ${colorClassNames}`}>
      <Icon />
      <p>{text}</p>
    </div>
  );
}
