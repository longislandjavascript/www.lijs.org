"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { PageTitle } from "components/PageTitle";
import { AirtableEmbedForm } from "components/AirtableEmbedForm";
import { PinCode } from "components/PinCode";
import { ExternalLink } from "components/ExternalLink";

const basePath =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://www.lijs.org";

const forms = {
  Book: "https://airtable.com/embed/shr0NbP6dELj9W819",
  Pass: "https://airtable.com/embed/shr5ORFfEklcml6o6",
};

// import { createMetadata } from "utils/createMetadata";

// export const metadata = createMetadata({
//   title: "Past Events | LIJS",
//   description:
//     "Things move fast in the world of JavaScript and we've covered a lot of ground since 2015! Take a look back at some of our past events.",
// });

type Result = {
  success: boolean;
  error?: "redeemed" | "invalid";
  code?: string;
  prize?: string;
  code_record_id?: string;
};

export default function ClaimPassPage() {
  const [checkResults, setCheckResults] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | "redeemed" | "invalid" | "failure">(
    null
  );
  const ref = useRef<HTMLInputElement[]>(null);

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
      const response = await fetch(basePath + "/api/redeem/" + value, {
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

  return (
    <div>
      <PageTitle>Redeem a Prize</PageTitle>

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
          <p className="font-display font-bold text-2xl my-6">
            🎉 Congratulations on winning an O&apos;Reilly book!
          </p>

          <p className="font-medium mb-4">How to claim your book:</p>

          <ol className="list-decimal ml-12">
            <li>
              {" "}
              <p>
                Find the book you want and note the title and ISBN number. You
                can search the entire O&apos;Reilly catalog at the following
                url:{" "}
                <ExternalLink
                  className="link"
                  href="https://www.oreilly.com/search/?q=*&type=book"
                >
                  https://www.oreilly.com/search/?q=*&type=book
                </ExternalLink>
              </p>
            </li>
            <li>
              <p className="mt-4">
                Complete and submit the form below. You will receive a
                confirmation email from O&apos;Reilly once your book is mailed.
              </p>
            </li>
          </ol>

          <AirtableEmbedForm
            src={checkResults?.prize && forms[checkResults.prize]}
            height="1180"
            code={checkResults?.code}
            code_record_id={checkResults?.code_record_id}
          />
        </section>
      )}
    </div>
  );
}
