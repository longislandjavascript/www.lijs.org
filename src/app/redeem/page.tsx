"use client";

import { useRouter } from "next/navigation";
import PinField from "react-pin-field";
import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { FaExclamationTriangle, FaSpinner } from "react-icons/fa";
import { PageTitle } from "components/PageTitle";

// import { createMetadata } from "utils/createMetadata";

// export const metadata = createMetadata({
//   title: "Past Events | LIJS",
//   description:
//     "Things move fast in the world of JavaScript and we've covered a lot of ground since 2015! Take a look back at some of our past events.",
// });

export default function ClaimPassPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const ref = useRef(null);
  const router = useRouter();

  const handleFocusPin = useCallback(() => {
    ref.current[0].focus();
  }, []);

  const handleClearPin = useCallback(() => {
    ref.current.forEach((input) => (input.value = ""));
  }, []);

  const handlePinReset = useCallback(() => {
    handleClearPin();
    handleFocusPin();
  }, [handleClearPin, handleFocusPin]);

  function resetError() {
    if (error) {
      setError(false);
    }
  }

  useEffect(() => {
    handleFocusPin();
  }, [handleFocusPin]);

  useEffect(() => {
    if (error) {
      handlePinReset();
    }
  }, [error, handlePinReset]);

  async function handleCheckRedemptionCode(value) {
    setLoading(true);
    try {
      const response = await fetch("/redeem/check/" + value, {
        method: "GET",
      });
      const values = await response.json();
      const parsed = JSON.parse(values);

      if (parsed.success) {
        router.replace(
          `/redeem/form?code=${parsed.code}&prize=${parsed.prize}`
        );
      } else {
        setTimeout(() => {
          setError(true);
        }, 500);
      }
    } catch (error) {
      console.error("ERRRRR", error);
      setTimeout(() => {
        setError(true);
      }, 500);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }

  return (
    <div>
      <PageTitle>Redeem a Prize</PageTitle>
      <div>
        <section className="mt-8 inline-block border-2 border-color p-4 rounded-xl surface text-center">
          <p className="mb-4 font-medium">Please enter your redemption code.</p>
          <PinField
            length={4}
            ref={ref}
            onChange={resetError}
            onComplete={handleCheckRedemptionCode}
            type="password"
            pattern="[0-9]*"
            inputMode="numeric"
            className="surface mb-2 appearance-none caret-blue-500 h-16 w-16 border-2 border-gray-500 rounded-lg mx-1 focus:border-4 focus:border-blue-500 transition-all duration-100 outline-none text-center text-3xl"
          />
          <div className="text-center h-10 pt-2">
            {!loading && !error && (
              <button
                className="text-blue-500 hover:underline focus:underline"
                onClick={handlePinReset}
              >
                Clear
              </button>
            )}
            {loading && <Feedback type="loading" />}
            {!loading && error && <Feedback type="error" />}
          </div>
        </section>
      </div>

      <section className="mt-4 flex gap-2">
        <p>Lost your redemption code?</p>
        <Link className="link" href="/contact">
          Get in touch.
        </Link>
      </section>
    </div>
  );
}

const Feedback = (props: { type: "error" | "loading" }) => {
  const isError = props.type === "error";
  const icon = isError ? (
    <FaExclamationTriangle />
  ) : (
    <FaSpinner className="animate-spin" />
  );
  const message = isError
    ? "Please enter a valid code."
    : "Checking your redemption code.";

  const baseClassNames = "flex items-center gap-2";
  const textColor = isError ? "text-red-500" : "text-yellow-500";
  return (
    <p className={`${baseClassNames} ${textColor}`}>
      {icon} {message}
    </p>
  );
};
