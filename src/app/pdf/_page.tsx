"use client";

import { useState } from "react";

import { PinCode } from "components/PinCode";
import { RedemptionCode } from "utils/airtable-api";

import { Viewer } from "./Viewer";

export default function IndexPage() {
  const [status, setStatus] = useState<null | "loading" | "success" | "error">(
    null
  );
  const [items, setItems] = useState<RedemptionCode[] | null>(null);

  async function handleConfirmPin(pin: string) {
    try {
      setStatus("loading");
      const response = await fetch(
        `/api/redeem/create-redemption-code-pdf?code=${pin}`
      );
      const res = await response.json();
      if (res.success) {
        setItems(res.items);
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  }

  if (status === "success" && items) {
    return <Viewer items={items} />;
  } else
    return (
      <PinCode
        title="Please enter your pin code"
        onComplete={handleConfirmPin}
        loading={status === "loading"}
        error={status === "error" ? "Invalid PIN. Please try again." : ""}
      />
    );
}
