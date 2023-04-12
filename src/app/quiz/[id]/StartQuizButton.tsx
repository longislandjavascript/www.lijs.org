import { FaPlay } from "react-icons/fa";

type Props = {
  onClick: () => void;
};

export function StartQuizButton(props: Props) {
  return (
    <button
      className="group text-white font-bold md:w-auto text-3xl px-6 py-4 flex items-center gap-3 rounded-full bg-green-600 hover:bg-opacity-90 justify-center  transition-all duration-200 ease-in-out"
      onClick={props.onClick}
    >
      <FaPlay />
      <p> Start Quiz</p>
    </button>
  );
}
