import { redirect } from "next/navigation";

import { meetupLink } from "constants/links";

export default async function MeetupRedirectPage() {
  redirect(meetupLink);
}
