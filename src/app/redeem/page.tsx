"use client";

import { useRef, useEffect, useState, useCallback } from "react";
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

type FailResult = {
  success: false;
  error: "invalid" | "redeemed" | "failure";
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
  const [error, setError] = useState<null | "redeemed" | "invalid" | "failure">(
    null
  );
  const ref = useRef<HTMLInputElement[]>(null);

  function reset() {
    setCheckResults(null);
  }

  const handleFocusPin = useCallback(() => {
    if (ref.current && ref.current.length > 0) {
      ref.current[0]?.focus();
    }
  }, []);

  const handleClearPin = useCallback(() => {
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
      const parsed = JSON.parse(values);

      if (parsed.success) {
        setCheckResults(parsed);
      } else {
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
            />
          )}

          {checkResults.prize === "Pass" && (
            <PassForm
              code={checkResults.code}
              code_record_id={checkResults.code_record_id}
            />
          )}

          <button onClick={reset}>Cancel</button>
        </section>
      )}
    </div>
  );
}
