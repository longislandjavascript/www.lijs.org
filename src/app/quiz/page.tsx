import { PageTitle } from "components/PageTitle";
import { createMetadata } from "utils/createMetadata";

import { QuizCodeForm } from "./QuizCodeForm";

export const metadata = createMetadata({
  path: "/quiz",
  title: "Quiz",
});

export default function QuizPage() {
  return (
    <>
      <PageTitle>Quiz</PageTitle>
      <QuizCodeForm />
    </>
  );
}
