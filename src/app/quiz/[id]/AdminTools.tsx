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
import { SharedQuiz } from "hooks/useSharedQuiz";
import { SharedTimer } from "hooks/useSharedTimer";
import { QuizQuestion, QuizRecord } from "utils/airtable-api";

import { ParticipantList } from "./ParticipantList";

type Props = {
  admin: SharedQuiz["admin"];
  question: QuizQuestion;
  quiz: QuizRecord;
  timer: SharedTimer;
  participant?: SharedQuiz["participant"];
};

export function AdminTools(props: Props) {
  const { admin, question, quiz, timer, participant } = props;

  return (
    <div>
      <div className="flex items-center flex-col md:flex-row flex-wrap justify-around gap-2 md:gap-4">
        <ButtonSection title="Timer">
          <IconButton onClick={admin.resetTimer} label="Rest Timer">
            <BiReset className="text-xl" />
          </IconButton>

          <IconButton onClick={admin.stopTimer} label="Stop Timer">
            <FaStop />
          </IconButton>
          <IconButton
            disabled={timer.secondsRemaining === 0}
            onClick={() =>
              timer.status === "running"
                ? admin.pauseTimer()
                : admin.startTimer()
            }
            label={timer.status === "running" ? "Pause timer" : "Stop timer"}
          >
            {timer.status === "running" ? <FaPause /> : <FaPlay />}
          </IconButton>
        </ButtonSection>
        <ButtonSection title="Questions">
          <IconButton
            onClick={admin.goToPreviousQuestion}
            disabled={question.index === 0}
            label="Go to previous question"
          >
            <FaStepBackward />
          </IconButton>
          <IconButton
            onClick={admin.toggleAnswer}
            label="Toggle Answer"
            isToggled={!!admin.answerKey}
          >
            {admin.answerKey ? <FaEyeSlash /> : <FaEye />}
          </IconButton>
          <IconButton
            onClick={admin.goToNextQuestion}
            disabled={question.index === quiz.questions.length - 1}
            label="Go to next question"
          >
            <FaStepForward />
          </IconButton>
        </ButtonSection>

        <ButtonSection title="Quiz">
          <IconButton
            isToggled={!!admin.showLeaderboard}
            onClick={admin.toggleLeaderboard}
            label="Toggle leaderboard"
          >
            <AiOutlineTrophy className="text-xl" />
          </IconButton>
          <IconButton onClick={admin.resetQuiz} label="Reset quiz">
            <MdOutlineRestartAlt className="text-xl" />
          </IconButton>
          <IconButton onClick={admin.resetQuiz} label="Finish quiz">
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
                  {participant?.all?.length}
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
                  participants={participant?.all}
                  isAdmin={participant?.isAdmin || false}
                  onRequestRemoveParticipant={admin.removeParticipant}
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
