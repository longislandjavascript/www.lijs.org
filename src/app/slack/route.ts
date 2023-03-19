import { NextResponse } from "next/server";
import { slackLink } from "constants/links";

export async function GET() {
  return NextResponse.redirect(new URL(slackLink));
}
