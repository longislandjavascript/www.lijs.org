import PinField, { PinFieldProps } from "react-pin-field";
import { forwardRef } from "react";
import Link from "next/link";
import { FaExclamationTriangle, FaSpinner } from "react-icons/fa";

type ErrorType = "redeemed" | "invalid" | "failure" | null;

type Props = {
  onChange: PinFieldProps["onChange"];
  onComplete: PinFieldProps["onComplete"];
  onClear: () => void;
  loading: boolean;
  errorType?: ErrorType;
};

function createErrorMessage(errorType: ErrorType) {
  switch (errorType) {
    case "redeemed":
      return "This code has already been redeemed.";
    case "invalid":
      return "You entered an invalid code. Please try again.";
    case "failure":
      return "Something went wrong. Please try again.";
    default:
      return "";
  }
}

export const PinCode = forwardRef<HTMLInputElement[], Props>((props, ref) => {
  const { onChange, onComplete, onClear, loading, errorType } = props;
  return (
    <div>
      <section className="mt-8 inline-block border-2 border-color p-4 rounded-xl surface text-center">
        <p className="mb-4 font-medium">Please enter your redemption code.</p>
        <PinField
          length={4}
          ref={ref}
          onChange={onChange}
          onComplete={onComplete}
          type="password"
          pattern="[0-9]*"
          inputMode="numeric"
          className="surface mb-2 appearance-none caret-blue-500 h-16 w-16 border-2 border-gray-500 rounded-lg mx-1 focus:border-4 focus:border-blue-500 transition-all duration-100 outline-none text-center text-3xl"
        />
        <div className="text-center h-4">
          {!loading && !errorType && (
            <button
              className="text-blue-500 hover:underline focus:underline"
              onClick={onClear}
            >
              Clear
            </button>
          )}
        </div>
      </section>

      <section className="h-16">
        {loading && (
          <Feedback type="loading" message="Checking your redemption code" />
        )}
        {!loading && errorType && (
          <Feedback type="error" message={createErrorMessage(errorType)} />
        )}
      </section>

      <section className="mt-4 flex gap-2">
        <p>Lost your redemption code?</p>
        <Link className="link" href="/contact">
          Get in touch.
        </Link>
      </section>
    </div>
  );
});

type FeedbackProps = {
  type: "loading" | "error";
  message: string;
};

const Feedback = (props: FeedbackProps) => {
  const isError = props.type === "error";

  const icon = isError ? (
    <FaExclamationTriangle />
  ) : (
    <FaSpinner className="animate-spin" />
  );

  const baseClassNames = "inline-flex items-center gap-2 p-2 rounded-xl";
  const textColor = isError ? "text-red-500" : "text-yellow-500";
  return (
    <p className={`${baseClassNames} ${textColor}`}>
      {icon} {props.message}
    </p>
  );
};

PinCode.displayName = "PinCode";
