"use client";

// import Loader from "react-spinners/ClockLoader";

import { useSharedQuiz } from "hooks/useSharedQuiz";
import { QuizRecord } from "utils/types";

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
  quiz: QuizRecord | null;
  isAdmin: boolean;
};

export function Quiz(props: Props) {
  const { isAdmin } = props;

  const {
    status,
    question,
    admin_actions,
    user,
    user_actions,
    participants,
    quiz,
    timer,
  } = useSharedQuiz(isAdmin, props.quiz);

  const is_admin = user?.isAdmin;
  const is_in_progress = status.status === "in-progress";

  console.info({
    status,
    question,
    admin_actions,
    user,
    user_actions,
    participants,
    quiz,
    timer,
  });

  if (!user || !quiz?.id) {
    return null;
  }

  if (!is_in_progress && isAdmin) {
    return (
      <div>
        <div className="space-y-6">
          <ConnectionStatus connected={status.connected} />

          <JoinInfo code={quiz.participant_code} />
          <div className="relative">
            <ParticipantList
              participants={participants}
              isAdmin={is_admin}
              onRequestRemoveParticipant={admin_actions.removeParticipant}
              onRequestBanParticipant={admin_actions.banParticipant}
            />
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <StartQuizButton
            onClick={admin_actions.startQuiz}
            inProgress={question?.index ? question?.index > 0 : false}
          />
        </div>
      </div>
    );
  }

  if (!user?.name && !isAdmin) {
    return (
      <div className="space-y-6">
        <ConnectionStatus connected={status.connected} />
        <ParticipantJoinForm
          onSubmit={user_actions.joinQuiz}
          userName={user?.name}
        />
        <ParticipantList participants={participants} />
      </div>
    );
  }

  if (status.status === "ready") {
    return (
      <div>
        <ConnectionStatus connected={status.connected} />
        <p className="text-3xl font-bold my-4 text-primary">{quiz.name}</p>
        <ParticipantList participants={participants} />
        <p>We will get started shortly.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="sticky top-0">
        {(!admin_actions.showLeaderboard || is_admin) && timer && (
          <Timer
            secondsRemaining={timer.secondsRemaining}
            duration={timer.duration}
          />
        )}

        {is_admin && (
          <div className="z-[8] mb-12 backdrop-blur-xl bg-black/10 p-4 rounded-xl border-2 border-color">
            <AdminTools
              question={question}
              admin_actions={admin_actions}
              timer={timer}
              quiz={quiz}
              user={user}
              participants={participants}
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
