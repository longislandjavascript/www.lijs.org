"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { PinCode } from "components/PinCode";

export function QuizCodeForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  function resetError() {
    if (error) {
      setError(null);
    }
  }

  async function handleSubmit(code) {
    try {
      setLoading(true);
      resetError();
      const res = await fetch(`/api/quiz/validate-code?code=${code}`);
      const response = await res.json();
      const isAdmin = response?.admin;

      if (response.success && isAdmin) {
        router.replace(`/quiz/${response.record_id}?admin=true`);
      } else if (response.success) {
        router.replace(`/quiz/${response.record_id}`);
      } else {
        setError(response.error);
      }
    } catch (error) {
      setError(error.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <PinCode
        title="Please enter your quiz code"
        onChange={resetError}
        onComplete={handleSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
}
