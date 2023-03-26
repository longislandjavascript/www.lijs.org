"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { PageTitle } from "components/PageTitle";
import { PinCode } from "components/PinCode";
import { baseUrl } from "constants/baseUrl";

import { BookForm } from "./BookForm";
import { PassForm } from "./PassForm";

// import { createMetadata } from "utils/createMetadata";

// export const metadata = createMetadata({
//   title: "Past Events | LIJS",
//   description:
//     "Things move fast in the world of JavaScript and we've covered a lot of ground since 2015! Take a look back at some of our past events.",
// });

type ErrorType = "invalid" | "redeemed" | "failure" | "expired";

type FailResult = {
  success: false;
  error: ErrorType;
};

type SuccessResult = {
  success: true;
  code: string;
  prize: "Book" | "Pass";
  code_record_id: string;
  link?: string;
  link_expiration_date?: string;
};

type Result = FailResult | SuccessResult;

export default function ClaimPassPage() {
  const [checkResults, setCheckResults] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);
  const ref = useRef<HTMLInputElement[]>(null);

  function handleReset() {
    setCheckResults(null);
  }

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
  }, [handleClearPin, handleFocusPin]);

  function resetError() {
    if (error) {
      setError(null);
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
      const response = await fetch(baseUrl + "/api/redeem/" + value, {
        method: "GET",
      });
      const values = await response.json();
      const parsed = JSON.parse(values) as Result;

      if (parsed.success) {
        setCheckResults(parsed);
      } else if (!parsed.success) {
        setTimeout(() => {
          setError(parsed.error);
        }, 500);
      }
    } catch (error) {
      setTimeout(() => {
        setError("failure");
      }, 500);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }

  const pageTitle = checkResults?.success ? "You Won 🎉" : "Redeem a Prize";

  return (
    <div>
      <PageTitle>{pageTitle}</PageTitle>

      {!checkResults?.success && (
        <PinCode
          ref={ref}
          onChange={resetError}
          onComplete={handleCheckRedemptionCode}
          loading={loading}
          onClear={handlePinReset}
          errorType={error}
        />
      )}

      {checkResults?.success && (
        <section>
          {checkResults.prize === "Book" && (
            <BookForm
              code={checkResults.code}
              code_record_id={checkResults.code_record_id}
              onReset={handleReset}
            />
          )}

          {checkResults.prize === "Pass" && (
            <PassForm
              code={checkResults.code}
              code_record_id={checkResults.code_record_id}
              onReset={handleReset}
              link={checkResults.link!}
              link_expiration_date={checkResults.link_expiration_date!}
            />
          )}
        </section>
      )}
    </div>
  );
}
