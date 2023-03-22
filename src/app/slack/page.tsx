import { redirect } from "next/navigation";

import { slackLink } from "constants/links";

export default async function SlackRedirectPage() {
  redirect(slackLink);
}
