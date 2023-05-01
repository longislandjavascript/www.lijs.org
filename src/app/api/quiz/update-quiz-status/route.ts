import { NextResponse } from "next/server";

import { updateQuizStatusDetails } from "utils/airtable-api";

function generateUniquePin() {
  const min = 10000;
  const max = 99999;
  const value = Math.floor(Math.random() * (max - min + 1)) + min;
  return value;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const admin_client_id = searchParams.get("admin_client_id");

  try {
    if (id === null || admin_client_id === null) {
      return NextResponse.json({ success: false });
    }
    const participant_code = generateUniquePin();
    await updateQuizStatusDetails({
      id,
      admin_client_id,
      participantCode: participant_code,
    });

    return NextResponse.json({
      success: true,
      admin_client_id,
      participant_code,
    });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
