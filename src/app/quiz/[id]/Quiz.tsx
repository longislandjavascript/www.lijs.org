"use client";

// import Loader from "react-spinners/ClockLoader";

import { useSharedQuiz } from "hooks/useSharedQuiz";
import { useSharedTimer } from "hooks/useSharedTimer";
import { QuizEventRecord } from "utils/types";

import { AdminTools } from "./AdminTools";
import { ConnectionStatus } from "./ConnectionStatus";
import { JoinInfo } from "./JoinInfo";
import { LeaderBoard } from "./LeaderBoard";
import { ParticipantJoinForm } from "./ParticipantJoinForm";
import { ParticipantList } from "./ParticipantList";
import { Question } from "./Question";
import { StartQuizButton } from "./StartQuizButton";
import { Timer } from "./Timer";

type Props = {
  quiz: QuizEventRecord | null;
  isAdmin: boolean;
};

export function Quiz(props: Props) {
  const { isAdmin } = props;

  const timer = useSharedTimer();

  const {
    status,
    question,
    admin_actions,
    user,
    user_actions,
    participants,
    quiz,
    // @ts-expect-error: TODO: fix this
    answered_count,
  } = useSharedQuiz(isAdmin, props.quiz, timer);

  const is_admin = user?.isAdmin;
  const is_in_progress = status.status === "in-progress";

  if (!user || !quiz?.participant_code) {
    return null;
  }

  if (!is_in_progress && isAdmin) {
    return (
      <Wrapper title={quiz.name} connected={status.connected}>
        <JoinInfo code={quiz.participant_code as number} />
        <div className="relative">
          <ParticipantList
            participants={participants}
            isAdmin={is_admin}
            onRequestRemoveParticipant={admin_actions.removeParticipant}
            onRequestBanParticipant={admin_actions.banParticipant}
          />
        </div>

        <div className="mt-12 flex justify-center">
          <StartQuizButton
            onClick={admin_actions.startQuiz}
            inProgress={question?.index ? question?.index > 0 : false}
          />
        </div>
      </Wrapper>
    );
  }

  if (!user?.name && !isAdmin) {
    return (
      <Wrapper title={quiz.name} connected={status.connected}>
        <ParticipantJoinForm
          onSubmit={user_actions.joinQuiz}
          userName={user?.name}
        />
        <ParticipantList participants={participants} />
      </Wrapper>
    );
  }

  if (status.status === "ready") {
    return (
      <Wrapper title={quiz.name} connected={status.connected}>
        <ParticipantList participants={participants} />
        <p>We will get started shortly.</p>
      </Wrapper>
    );
  }

  if (!quiz.id) {
    return null;
  }

  return (
    <div>
      <div className="sticky top-24 md:top-0">
        {(!admin_actions.showLeaderboard || is_admin) && timer && (
          <Timer
            secondsRemaining={timer.secondsRemaining}
            duration={timer.duration}
          />
        )}

        {is_admin && (
          <div className="z-[8] mb-12 backdrop-blur-xl bg-black/10 p-4 rounded-xl border-2 border-color-1">
            <AdminTools
              question={question}
              admin_actions={admin_actions}
              timer={timer}
              quiz={quiz}
              user={user}
              participants={participants}
              answered_count={answered_count}
            />
          </div>
        )}
      </div>
      {admin_actions.showLeaderboard && (
        <div className="animate-fade">
          <LeaderBoard leaderboard={status.leaderboard!} />
        </div>
      )}
      {!admin_actions.showLeaderboard && (
        <div className="animate-fade mb-12">
          <Question
            title={`Question ${question?.index! + 1} of ${
              quiz.questions.length
            }`}
            question={question}
            showAnswerKey={admin_actions.showAnswerKey}
            onSubmitAnswer={user_actions.submitAnswer}
            isTimerDone={timer?.secondsRemaining === 0}
            answer={status.results?.[user?.clientID]?.[question?.id as string]!}
            isAdmin={is_admin!}
          />
        </div>
      )}
    </div>
  );
}

type WrapperProps = {
  title: string;
  connected: boolean;
  children: React.ReactNode;
};

const Wrapper = (props: WrapperProps) => {
  const { title, connected, children } = props;
  return (
    <div className="space-y-6">
      <div className="flex items-center flex-wrap gap-2">
        <h1 className="text-4xl font-semibold font-display text-color-theme">
          {title}
        </h1>
        <ConnectionStatus connected={connected} />
      </div>

      {children}
    </div>
  );
};
