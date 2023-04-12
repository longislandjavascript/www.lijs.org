"use client";

import { DriftDBProvider } from "driftdb-react";

import { QuizRecord } from "utils/airtable-api";

import { Quiz } from "./Quiz";

type Props = {
  quiz: QuizRecord;
  isAdmin: boolean;
};

const dbUrl = process.env.NEXT_PUBLIC_DRIFTDB_URL;

export function DriftDBProviderWrapper(props: Props) {
  if (!dbUrl) return null;
  return (
    <DriftDBProvider api={dbUrl} room={props.quiz.id}>
      <Quiz quiz={props.quiz} isAdmin={props.isAdmin} />
    </DriftDBProvider>
  );
}
