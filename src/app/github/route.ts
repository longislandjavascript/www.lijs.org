import { NextResponse } from "next/server";
import { githubLink } from "constants/links";

export async function GET() {
  return NextResponse.redirect(new URL(githubLink));
}
