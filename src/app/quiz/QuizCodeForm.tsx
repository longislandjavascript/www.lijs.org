/* eslint-disable functional/immutable-data */
"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { PinCode } from "components/PinCode";

export function QuizCodeForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string>();
  const [error, setError] = useState<string | null>(null);

  function resetError() {
    if (error) {
      setError(null);
    }
  }

  async function handleSubmit(code) {
    try {
      setLoading(true);
      setLoadingMessage("Checking your code...");
      resetError();
      const res = await fetch(`/api/quiz/validate-code?code=${code}`);
      const response = await res.json();
      const isAdmin = response?.admin;

      if (response.success && isAdmin) {
        setLoadingMessage("Preparing your quiz room...");
        router.push(`/quiz/${response.record_id}?admin=true`);
      } else if (response.success) {
        setLoadingMessage("Getting you into the quiz room...");
        router.push(`/quiz/${response.record_id}`);
      } else {
        setError(response.error);
      }
    } catch (error) {
      setError(error.error);
    }
  }

  return (
    <div>
      <PinCode
        loadingMessage={loadingMessage}
        title="Please enter your quiz code"
        onChange={resetError}
        onComplete={handleSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
}
