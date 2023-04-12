"use client";

import { useSharedQuiz } from "hooks/useSharedQuiz";
import { useSharedTimer } from "hooks/useSharedTimer";
import { QuizRecord } from "utils/airtable-api";

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
  quiz: QuizRecord;
  isAdmin: boolean;
};

export function Quiz(props: Props) {
  const { isAdmin, quiz } = props;
  const timer = useSharedTimer(quiz.timer);
  const { status, question, admin, participant } = useSharedQuiz(
    isAdmin,
    quiz,
    timer
  );

  const isConfirmedAdmin = participant.isAdmin;

  if (!status.ready) {
    return null;
  }

  if (!status.started && isConfirmedAdmin) {
    return (
      <div>
        <div className="space-y-6">
          <ConnectionStatus connected={status.connected} />

          <JoinInfo code={quiz.participant_code} />
          <ParticipantList
            participants={participant.all}
            isAdmin={isConfirmedAdmin}
            onRequestRemoveParticipant={admin.removeParticipant}
          />
        </div>

        <div className="mt-12 flex justify-center">
          <StartQuizButton onClick={admin.startQuiz} />
        </div>
      </div>
    );
  }

  if (!participant.name && !isConfirmedAdmin) {
    return (
      <div className="space-y-6">
        <ConnectionStatus connected={status.connected} />
        <ParticipantJoinForm
          onSubmit={participant.joinQuiz}
          userName={participant?.name}
        />
        <ParticipantList participants={participant.all} />
      </div>
    );
  }

  if (!status.started) {
    return (
      <div>
        <ConnectionStatus connected={status.connected} />
        <p className="text-3xl font-bold my-4 text-primary">{quiz.name}</p>
        <ParticipantList participants={participant.all} />
        <p>We will get started shortly.</p>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <div className="flex justify-end">
        <p className="font-display text-3xl surface-alt p-1 px-4 rounded-full">
          {participant.name}
        </p>
      </div>

      {isConfirmedAdmin && (
        <div className="sticky top-10 z-[8] mb-12 backdrop-blur-xl bg-black/10 p-4 rounded-xl border-2 border-color">
          <AdminTools
            question={question}
            admin={admin}
            timer={timer}
            quiz={quiz}
            participant={participant}
          />
        </div>
      )}
      {admin.showLeaderboard && (
        <div className="animate-fade">
          <LeaderBoard leaderboard={status.leaderboard} />
        </div>
      )}
      {!admin.showLeaderboard && (
        <div className="animate-fade mb-12">
          <Question
            title={`Question ${(question.index || 0) + 1} of ${
              quiz.questions.length
            }`}
            question={question}
            answerKey={admin.answerKey as "A"}
            onSubmitAnswer={participant.submitAnswer}
            isTimerDone={timer.secondsRemaining === 0}
            answer={status.results?.[participant?.name]?.[question.id]}
            isAdmin={isConfirmedAdmin}
          />
        </div>
      )}

      {(!admin.showLeaderboard || isConfirmedAdmin) && (
        <Timer
          secondsRemaining={timer.secondsRemaining}
          defaultSeconds={quiz.timer}
        />
      )}
    </div>
  );
}
