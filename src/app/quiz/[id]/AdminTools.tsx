import { Disclosure, Transition } from "@headlessui/react";
import { AiOutlineTrophy } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import {
  FaCaretDown,
  FaEye,
  FaEyeSlash,
  FaPause,
  FaPlay,
  FaStepBackward,
  FaStepForward,
  FaStop,
} from "react-icons/fa";
import { MdDoneAll, MdOutlineRestartAlt } from "react-icons/md";

import { IconButton } from "components/IconButton";
import { SharedQuiz } from "utils/types";

import { ParticipantList } from "./ParticipantList";

type Props = {
  admin_actions: SharedQuiz["admin_actions"];
  question: SharedQuiz["question"];
  quiz: SharedQuiz["quiz"];
  timer: SharedQuiz["timer"];
  user?: SharedQuiz["user"];
  participants: SharedQuiz["participants"];
};

export function AdminTools(props: Props) {
  const { admin_actions, question, quiz, timer, user, participants } = props;

  return (
    <div>
      <div className="flex items-center flex-col md:flex-row flex-wrap justify-around gap-2 md:gap-4">
        <ButtonSection title="Timer">
          <IconButton onClick={admin_actions.resetTimer} label="Rest Timer">
            <BiReset className="text-xl" />
          </IconButton>

          <IconButton onClick={admin_actions.stopTimer} label="Stop Timer">
            <FaStop />
          </IconButton>
          <IconButton
            disabled={timer?.seconds_remaining === 0}
            onClick={() =>
              timer?.status === "running"
                ? admin_actions.pauseTimer()
                : admin_actions.startTimer()
            }
            label={timer?.status === "running" ? "Pause timer" : "Stop timer"}
          >
            {timer?.status === "running" ? <FaPause /> : <FaPlay />}
          </IconButton>
        </ButtonSection>
        <ButtonSection title="Questions">
          <IconButton
            onClick={admin_actions.goToPreviousQuestion}
            disabled={question?.index! === 0}
            label="Go to previous question"
          >
            <FaStepBackward />
          </IconButton>
          <IconButton
            onClick={admin_actions.toggleAnswer}
            label="Toggle Answer"
            isToggled={admin_actions.showAnswerKey}
          >
            {admin_actions.showAnswerKey ? <FaEyeSlash /> : <FaEye />}
          </IconButton>
          <IconButton
            onClick={admin_actions.goToNextQuestion}
            disabled={question?.index! === quiz?.questions.length! - 1}
            label="Go to next question"
          >
            <FaStepForward />
          </IconButton>
        </ButtonSection>

        <ButtonSection title="Quiz">
          <IconButton
            isToggled={!!admin_actions.showLeaderboard}
            onClick={admin_actions.toggleLeaderboard}
            label="Toggle leaderboard"
          >
            <AiOutlineTrophy className="text-xl" />
          </IconButton>
          <IconButton onClick={admin_actions.resetQuiz} label="Reset quiz">
            <MdOutlineRestartAlt className="text-xl" />
          </IconButton>
          <IconButton onClick={admin_actions.resetQuiz} label="Finish quiz">
            <MdDoneAll className="text-xl" />
          </IconButton>
        </ButtonSection>
      </div>
      <Disclosure as="div" className="mt-6">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium surface ">
              <span className="inline-flex items-center gap-2 uppercase">
                <BsPeople />
                Participants{" "}
                <span className="bg-yellow-500 text-gray-800 px-2 rounded-full text-sm">
                  {participants?.length}
                </span>
              </span>
              <FaCaretDown
                className={`${open ? "rotate-180 transform" : ""} h-5 w-5`}
              />
            </Disclosure.Button>
            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="mt-6" static={true}>
                <ParticipantList
                  participants={participants}
                  isAdmin={user?.isAdmin || false}
                  onRequestRemoveParticipant={admin_actions.removeParticipant}
                  onRequestBanParticipant={admin_actions.banParticipant}
                />
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
}

function ButtonSection(props: { title: string; children: React.ReactNode }) {
  return (
    <div className="surface rounded-xl inline-flex flex-col items-center p-1 w-full md:w-40">
      <p className="text-sm uppercase flex items-center gap-2 font-semibold text-gray-600 dark:text-gray-400 mb-2">
        {props.title}
      </p>
      <div className="flex items-center gap-2">{props.children}</div>
    </div>
  );
}
