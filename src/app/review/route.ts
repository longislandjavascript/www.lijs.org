import { NextResponse } from "next/server";
import { meetupReviewLink } from "constants/links";

export async function GET() {
  return NextResponse.redirect(new URL(meetupReviewLink));
}
