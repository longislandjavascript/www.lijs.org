import { forwardRef } from "react";

import Link from "next/link";
import { FaExclamationCircle, FaSpinner } from "react-icons/fa";
import PinField, { PinFieldProps } from "react-pin-field";

type ErrorType = "redeemed" | "invalid" | "failure" | "expired" | null;

type Props = {
  onChange: PinFieldProps["onChange"];
  onComplete: PinFieldProps["onComplete"];
  onClear: () => void;
  loading: boolean;
  errorType?: ErrorType;
};

export const PinCode = forwardRef<HTMLInputElement[], Props>((props, ref) => {
  const { onChange, onComplete, loading, errorType } = props;
  return (
    <div>
      <section className="mt-8 inline-block w-full md:w-[500px] border-2 border-gray-700 p-2 rounded-xl text-center ">
        <p className="font-medium mb-4">Please enter your redemption code</p>
        <PinField
          length={5}
          ref={ref}
          onChange={onChange}
          onComplete={onComplete}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={true}
          type="password"
          pattern="[0-9]*"
          inputMode="numeric"
          className="appearance-none caret-blue-500 h-14 w-14 md:h-16 md:w-16 bg-gray-200 border-2 border-transparent dark:bg-gray-900 rounded-lg mx-1 focus:border-2 focus:border-blue-500 transition-all duration-100 outline-none text-center text-3xl"
        />
        <div className="flex flex-col items-center mt-6 h-20">
          {loading && <Loading />}
          {!loading && errorType && <Error errorType={errorType} />}
          {!loading && !errorType && (
            <div className=" flex flex-wrap justify-center md:justify-start gap-2 my-4">
              <p>Lost your code?</p>
              <Link className="link" href="/contact">
                Get in touch.
              </Link>
            </div>
          )}
        </div>
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
    case "expired":
      return "Sorry, this offer has expired. Next time!";
    default:
      return "";
  }
}

type ErrorProps = {
  errorType: ErrorType;
};

const Error = (props: ErrorProps) => {
  return (
    <p className={`${baseClassNames} bg-red-200 text-red-800 rounded-md p-2 `}>
      <FaExclamationCircle className="text-4xl md:text-lg mr-2" />
      {createErrorMessage(props.errorType)}
    </p>
  );
};

// eslint-disable-next-line functional/immutable-data
PinCode.displayName = "PinCode";
