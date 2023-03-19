import { NextResponse } from "next/server";
import { meetupLink } from "constants/links";

export async function GET() {
  return NextResponse.redirect(meetupLink);
}
