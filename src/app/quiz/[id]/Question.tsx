"use client";

import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import useKeypress from "react-use-keypress";

import { Section } from "components/Section";
import { SharedQuiz } from "utils/types";

import { MDRenderer } from "./MDRenderer";

type Props = {
  question: SharedQuiz["question"];
  showAnswerKey: SharedQuiz["admin_actions"]["showAnswerKey"];
  onSubmitAnswer: (answerKey: string) => void;
  answer: { key: string; isCorrect: boolean };
  isAdmin: boolean;
  isTimerDone: boolean;
  title: string;
};

export function Question(props: Props) {
  const {
    question,
    showAnswerKey,
    onSubmitAnswer,
    answer,
    isAdmin,
    isTimerDone,
    title,
  } = props;

  const shouldBeDisabled = !!isAdmin || showAnswerKey || isTimerDone;

  useKeypress(["a", "b", "c", "d", "Enter"], (event: KeyboardEvent) => {
    if (shouldBeDisabled) return;
    const selectedOption = question!.options!.find(
      (opt) => opt.key.toLowerCase() === event.key
    );
    if (selectedOption) {
      onSubmitAnswer(selectedOption.key);
    }
  });

  if (!question || !question.options?.length) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <h2 className="inline-block bg-color-2 px-2 py-1 font-bold text-sm rounded-full text-color-theme">
          {title}
        </h2>

        <p className="font-bold text-color-theme">{question.language}</p>
      </div>

      <MDRenderer language={question?.language!}>
        {question?.question!}
      </MDRenderer>

      <div className="border-b-2 border-color-1 my-4"></div>

      {question?.options.map((opt) => {
        function getBorderColor() {
          if (showAnswerKey && opt.key === question?.answer) {
            return "border-emerald-500";
          } else if (answer?.key === opt.key) {
            return showAnswerKey ? "border-red-500" : "border-color-theme";
          } else {
            return "border-transparent";
          }
        }

        const baseClassName =
          "disabled:cursor-not-allowed p-2 font-mono bg-color-2 my-2 w-full flex items-center gap-4 text-lg md:text-xl rounded-lg border-4 ease-in-out overflow-x-scroll transition-colors duration-200";
        const borderColorClassName = getBorderColor();

        function getButtonValue() {
          if (!showAnswerKey || opt.key !== answer?.key) {
            return (
              <div
                className="p-1 px-2 bg-color-1 rounded-md font-semibold text-center"
                dangerouslySetInnerHTML={{
                  __html: opt.key.toUpperCase(),
                }}
              />
            );
          } else if (answer.isCorrect && opt.key === answer?.key) {
            return (
              <FaCheckCircle className="text-green-500 mx-auto text-3xl" />
            );
          } else if (!answer.isCorrect && opt.key === answer?.key) {
            return <FaTimesCircle className="text-red-500 mx-auto text-3xl" />;
          }
        }

        return (
          <button
            key={opt.key}
            className={`${baseClassName} ${borderColorClassName}`}
            onClick={() => {
              onSubmitAnswer(opt.key);
            }}
            disabled={shouldBeDisabled}
          >
            <div className="w-12 text-center">{getButtonValue()}</div>

            <MDRenderer size="small" language={question?.language!}>
              {opt.value}
            </MDRenderer>
          </button>
        );
      })}

      {question?.explanation && question?.explanation.length > 1 && (
        <Section
          title="Explanation"
          className={`${showAnswerKey ? "block" : "hidden"} my-4 animate-fade`}
        >
          <MDRenderer language={question?.language}>
            {question.explanation}
          </MDRenderer>
        </Section>
      )}
    </div>
  );
}
