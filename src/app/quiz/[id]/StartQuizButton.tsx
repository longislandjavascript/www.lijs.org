import { FaPlay } from "react-icons/fa";

type Props = {
  onClick: () => void;
  inProgress: boolean;
};

export function StartQuizButton(props: Props) {
  const text = props.inProgress ? "Resume Quiz" : "Start Quiz";
  return (
    <button
      className="group text-white font-semibold md:w-auto text-xl px-6 py-4 flex items-center gap-3 rounded-full bg-green-600 hover:bg-opacity-90 justify-center  transition-all duration-200 ease-in-out"
      onClick={props.onClick}
    >
      <FaPlay />
      <p>{text}</p>
    </button>
  );
}
