"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { PageTitle } from "components/PageTitle";
import { PinCode } from "components/PinCode";
import { baseUrl } from "constants/baseUrl";

import { BookForm } from "./BookForm";
import { PassForm } from "./PassForm";

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

export function Redemption() {
  const router = useRouter();
  const [checkResults, setCheckResults] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);

  function handleReset() {
    setCheckResults(null);
    router.refresh();
  }

  function resetError() {
    if (error) {
      setError(null);
    }
  }

  async function handleCheckRedemptionCode(value) {
    setLoading(true);
    try {
      const response = await fetch(baseUrl + "/api/redeem/" + value, {
        method: "GET",
      });
      const values = await response.json();
      const responseValues = JSON.parse(values) as Result;

      if (responseValues.success) {
        setCheckResults(responseValues);
      } else if (!responseValues.success) {
        setTimeout(() => {
          setError(responseValues.error);
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
          title="Please enter your redemption code"
          onChange={resetError}
          onComplete={handleCheckRedemptionCode}
          loading={loading}
          error={error ? createErrorMessage(error) : undefined}
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
