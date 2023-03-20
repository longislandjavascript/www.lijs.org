import PinField, { PinFieldProps } from "react-pin-field";
import { forwardRef } from "react";
import Link from "next/link";
import { FaExclamationCircle, FaSpinner } from "react-icons/fa";

type ErrorType = "redeemed" | "invalid" | "failure" | null;

type Props = {
  onChange: PinFieldProps["onChange"];
  onComplete: PinFieldProps["onComplete"];
  onClear: () => void;
  loading: boolean;
  errorType?: ErrorType;
};

export const PinCode = forwardRef<HTMLInputElement[], Props>((props, ref) => {
  const { onChange, onComplete, onClear, loading, errorType } = props;
  return (
    <div>
      <section className="mt-8 inline-block w-full md:w-auto border-2 border-color p-4 rounded-xl surface text-center">
        <p className="mb-4 font-medium">Please enter your redemption code</p>
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

          {loading && <Loading />}
        </div>
      </section>

      <section className="h-24">
        {!loading && errorType && <Error errorType={errorType} />}
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

const baseClassNames = "inline-flex items-center gap-2";

const Loading = () => {
  return (
    <p className={`${baseClassNames} text-yellow-500`}>
      <FaSpinner className="animate-spin" /> Checking your code
    </p>
  );
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

type ErrorProps = {
  errorType: ErrorType;
};

const Error = (props: ErrorProps) => {
  return (
    <p
      className={`${baseClassNames} bg-red-200 text-red-800 rounded-md p-2 mt-4`}
    >
      <FaExclamationCircle className="text-4xl md:text-lg" />
      {createErrorMessage(props.errorType)}
    </p>
  );
};

PinCode.displayName = "PinCode";
