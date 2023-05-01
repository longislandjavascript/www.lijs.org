"use client";

import { DriftDBProvider } from "driftdb-react";

import { QuizEventRecord } from "utils/types";

import { Quiz } from "./Quiz";

type Props = {
  quiz: QuizEventRecord | null;
  quiz_id: string;
  isAdmin: boolean;
};

const dbUrl = process.env.NEXT_PUBLIC_DRIFTDB_URL;

export function DriftDBProviderWrapper(props: Props) {
  if (!dbUrl) return null;
  return (
    <DriftDBProvider api={dbUrl} room={props.quiz_id}>
      <Quiz quiz={props.quiz} isAdmin={props.isAdmin} />
    </DriftDBProvider>
  );
}
