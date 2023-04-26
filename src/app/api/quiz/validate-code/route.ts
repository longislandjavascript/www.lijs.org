import { NextResponse } from "next/server";

import { findQuizByCode } from "utils/airtable-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  if (!code) {
    return NextResponse.json({ success: false, error: "No code provided." });
  }

  try {
    const results = await findQuizByCode(code);

    if (!results.length) {
      return NextResponse.json({
        success: false,
        error: "This is not a valid code.",
      });
    }
    const { id, fields } = results[0];
    const isAdmin = fields["Admin Code"] == +code;
    if (fields["Status"] === "Ended") {
      return NextResponse.json({
        success: false,
        error: "The quiz has ended.",
      });
    } else if (isAdmin) {
      return NextResponse.json({
        success: true,
        record_id: id,
        admin: isAdmin,
      });
    }
    // else if (fields["Status"] !== "In Progress") {
    //   return NextResponse.json({
    //     success: false,
    //     error: "This quiz is not active at this time.",
    //   });
    // }
    else {
      return NextResponse.json({
        success: true,
        record_id: id,
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Something went wrong. Please try again.",
    });
  }
}
