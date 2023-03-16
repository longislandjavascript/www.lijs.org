import { Layout } from "components/Layout";
import { useRouter } from "next/router";
import PinInput from "react-pin-input";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { FaExclamationTriangle, FaSpinner } from "react-icons/fa";

export default function ClaimPassPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const ref = useRef(null);
  const router = useRouter();
  useEffect(() => {
    ref.current.focus();
  }, []);

  function handleClear() {
    ref.current.clear();
  }
  async function handleCheckRedemptionCode(value) {
    setLoading(true);
    try {
      const response = await fetch("/api/redeem/" + value, {
        method: "POST",
      });
      const values = await response.json();
      console.log(values, values.success);
      const parsed = JSON.parse(values);
      if (parsed.success) {
        router.replace(
          `/redeem/form?code=${parsed.code}&prize=${parsed.prize}`
        );
      } else {
        setError(true);
      }
    } catch (error) {
      setTimeout(() => {
        setError(true);
      }, 500);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }
  useEffect(() => {
    if (error) {
      ref.current.clear();
      ref.current.focus();
    }
  }, [error]);

  return (
    <Layout pageTitle="Redeem a Prize" className="texture">
      <div>
        <section className="mt-8 inline-block border-2 border-color p-4 rounded-xl surface">
          <p className="mb-4 font-[600]">Please enter your redemption code.</p>
          <PinInput
            length={4}
            initialValue=""
            secret
            secretDelay={100}
            ref={ref}
            onChange={(value, index) => {
              if (error) {
                setError(false);
              }
            }}
            type="numeric"
            inputMode="number"
            style={{ marginBottom: "4px" }}
            inputStyle={{
              border: "2px solid lightgray",
              borderRadius: "10px",
              height: "70px",
              width: "70px",
              fontSize: "30px",
            }}
            inputFocusStyle={{
              border: "2px solid gray",
            }}
            onComplete={handleCheckRedemptionCode}
            autoSelect={true}
            regexCriteria={/^[ 0-9]*$/}
          />
          <div className="text-center h-10 pt-2">
            {!loading && !error && (
              <button
                className="text-blue-500 hover:underline focus:underline"
                onClick={handleClear}
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
    </Layout>
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
