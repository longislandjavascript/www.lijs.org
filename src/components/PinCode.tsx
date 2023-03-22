import PinField, { PinFieldProps } from "react-pin-field";
import { forwardRef } from "react";
import Link from "next/link";
import { Button } from "components/Button";
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
      <section className="mt-8 inline-block w-full md:w-auto border-2 border-gray-500 p-4 rounded-xl surface text-center">
        <p className="mb-4 font-medium">Please enter your redemption code</p>
        <PinField
          length={4}
          ref={ref}
          onChange={onChange}
          onComplete={onComplete}
          type="password"
          pattern="[0-9]*"
          inputMode="numeric"
          className="mb-2 appearance-none caret-blue-500 h-16 w-16 bg-gray-200 border-2 border-transparent dark:bg-gray-900 rounded-lg mx-1 focus:border-2 focus:border-blue-500 transition-all duration-100 outline-none text-center text-3xl"
        />
        <div className="text-center h-4">
          {/* {!loading && !errorType && (
            <Button variant="link" onClick={onClear}>
              Clear
            </Button>
          )} */}

          {loading && <Loading />}
        </div>
      </section>

      <section>
        <div className="flex flex-wrap justify-center md:justify-start gap-2 my-4">
          <p>Lost your code?</p>
          <Link className="link" href="/contact">
            Get in touch.
          </Link>
        </div>
        {!loading && errorType && <Error errorType={errorType} />}
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
      className={`${baseClassNames} bg-red-200 text-red-800 rounded-md p-2 text-base`}
    >
      <FaExclamationCircle className="text-4xl md:text-lg mr-2" />
      {createErrorMessage(props.errorType)}
    </p>
  );
};

PinCode.displayName = "PinCode";
