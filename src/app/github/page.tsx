import { redirect } from "next/navigation";
import { githubLink } from "constants/links";

export default async function GithubRedirectPage() {
  redirect(githubLink);
}
