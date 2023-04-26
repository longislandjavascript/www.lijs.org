import { RenderCounter } from "components/RenderCounter";
import { fetchQuiz } from "utils/airtable-api";
import { QuizRecord } from "utils/types";

import { DriftDBProviderWrapper } from "./DriftDBProviderWrapper";

const SHOW_RENDER_COUNT = false;

export default async function QuizPage({ params, searchParams }) {
  const isAdmin = searchParams.admin;
  // eslint-disable-next-line functional/no-let
  let quiz: QuizRecord | null = null;
  if (isAdmin) {
    const quizData = await fetchQuiz(params.id);
    quiz = quizData;
  }

  return (
    <>
      {SHOW_RENDER_COUNT && <RenderCounter message="QuizPage" />}

      <DriftDBProviderWrapper
        quiz={quiz}
        quiz_id={params.id}
        isAdmin={isAdmin}
      />
    </>
  );
}
