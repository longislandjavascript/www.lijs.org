"use client";

import { useEffect, useState } from "react";

import Loader from "react-spinners/ClockLoader";

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
  const { status, question, admin, user, user_actions, participants } =
    useSharedQuiz(isAdmin, quiz, timer);

  const is_admin = user?.isAdmin;

  if (!user) {
    return null;
  }

  if (!status.ready) {
    return (
      <div className="h-[70vh] grid place-items-center gap-2">
        <ConnectionStatus connected={status.connected} />
        <Loader
          color={"#166ada"}
          loading={true}
          size={300}
          aria-label="Loading Spinner"
        />
        <p className="text-primary font-display text-4xl">Almost there...</p>
      </div>
    );
  }

  if (!status.started && is_admin) {
    return (
      <div>
        <div className="space-y-6">
          <ConnectionStatus connected={status.connected} />

          <JoinInfo code={quiz.participant_code} />
          <ParticipantList
            participants={participants}
            isAdmin={is_admin}
            onRequestRemoveParticipant={admin.removeParticipant}
            onRequestBanParticipant={admin.banParticipant}
          />
        </div>

        <div className="mt-12 flex justify-center">
          <StartQuizButton onClick={admin.startQuiz} />
        </div>
      </div>
    );
  }

  if (!user?.name && !is_admin) {
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

  if (!status.started) {
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
    <div className="mb-12">
      <div className="flex justify-end">
        <p className="font-display text-3xl surface-alt p-1 px-4 rounded-full">
          {user.name}
        </p>
      </div>

      {is_admin && (
        <div className="sticky top-10 z-[8] mb-12 backdrop-blur-xl bg-black/10 p-4 rounded-xl border-2 border-color">
          <AdminTools
            question={question}
            admin={admin}
            timer={timer}
            quiz={quiz}
            participant={user}
            participants={participants}
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
            onSubmitAnswer={user_actions.submitAnswer}
            isTimerDone={timer.secondsRemaining === 0}
            answer={status.results?.[user?.name]?.[question.id]}
            isAdmin={is_admin}
          />
        </div>
      )}

      {(!admin.showLeaderboard || is_admin) && (
        <Timer
          secondsRemaining={timer.secondsRemaining}
          defaultSeconds={quiz.timer}
        />
      )}
    </div>
  );
}
