import { fetchQuiz } from "utils/airtable-api";

import { DriftDBProviderWrapper } from "./DriftDBProviderWrapper";

export default async function QuizPage({ params, searchParams }) {
  const isAdmin = searchParams.admin;

  const quiz = await fetchQuiz(params.id);
  return <DriftDBProviderWrapper quiz={quiz} isAdmin={isAdmin} />;
}
