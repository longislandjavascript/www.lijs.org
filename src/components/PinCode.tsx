"use client";

import { useCallback, useEffect, useRef } from "react";

import Link from "next/link";
import { FaExclamationCircle, FaSpinner } from "react-icons/fa";
import PinField, { PinFieldProps } from "react-pin-field";

type Props = {
  title: string;
  onChange?: PinFieldProps["onChange"];
  onComplete: PinFieldProps["onComplete"];
  onClear?: () => void;
  loading: boolean;
  error?: string;
};

export const PinCode = (props: Props) => {
  const {
    onChange = () => {},
    onComplete,
    loading,
    onClear,
    title,
    error,
  } = props;
  const ref = useRef<HTMLInputElement[]>(null);

  const handleFocusPin = useCallback(() => {
    if (ref.current && ref.current.length > 0) {
      ref.current[0]?.focus();
    }
  }, []);

  const handleClearPin = useCallback(() => {
    // eslint-disable-next-line functional/immutable-data
    ref.current?.forEach((input) => (input.value = ""));
  }, []);

  const handlePinReset = useCallback(() => {
    handleClearPin();
    handleFocusPin();
    onClear?.();
  }, [handleClearPin, handleFocusPin, onClear]);

  useEffect(() => {
    if (error) {
      handlePinReset();
    }
  }, [error, handlePinReset]);

  return (
    <div>
      <section className="mt-8 inline-block w-full md:w-[500px] border-2 border-gray-700 p-2 rounded-xl text-center ">
        <p className="font-medium mb-4">{title}</p>
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
          {!loading && error && <Error error={error} />}
          {!loading && !error && (
            <div className="flex flex-wrap justify-center md:justify-start gap-2 my-4">
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
};

const baseClassNames = "inline-flex items-center gap-2";

const Loading = () => {
  return (
    <p className={`${baseClassNames} text-yellow-500`}>
      <FaSpinner className="animate-spin" /> Checking your code
    </p>
  );
};

type ErrorProps = {
  error: string;
};

const Error = (props: ErrorProps) => {
  return (
    <p
      className={`flex items-center gap-2 bg-red-200 text-red-800 rounded-md p-2 text-left`}
    >
      <FaExclamationCircle className="text-4xl md:text-lg" />
      {props.error}
    </p>
  );
};

// eslint-disable-next-line functional/immutable-data
PinCode.displayName = "PinCode";
