import { redirect } from "next/navigation";
import { meetupReviewLink } from "constants/links";

export default async function MeetupReviewRedirectPage() {
  redirect(meetupReviewLink);
}
