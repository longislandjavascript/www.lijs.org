import { NextResponse } from "next/server";

import { updateQuizStatusDetails } from "utils/airtable-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const admin_client_id = searchParams.get("admin_client_id");

  try {
    if (id === null || admin_client_id === null) {
      return NextResponse.json({ success: false });
    }
    await updateQuizStatusDetails({
      id,
      admin_client_id,
    });

    return NextResponse.json({
      success: true,
      admin_client_id,
    });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
