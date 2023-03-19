import { PageTitle } from "components/PageTitle";
import { SEO } from "components/SEO";
import Link from "next/link";
import { createMetadata } from "utils/createMetadata";

export const metadata = createMetadata({
  title: "Thanks anyways!",
});

export default function ThanksAnywaysPage() {
  return (
    <div>
      <PageTitle>Thanks anyways!</PageTitle>
      <SEO title="Thanks anyways!" />
      <p className="text-xl my-6">
        Here are a few other ways you can show your support:
      </p>

      <ul className="list-disc ml-8 space-y-4 text-xl">
        <li>
          <Link className="link" href="/review">
            {" "}
            Leave a review on Meetup.
          </Link>
        </li>
        <li>
          <p>Be a presenter at one our our events.</p>
        </li>
        <li>
          <p>
            Spread the word. Let your friends, family, and co-workers know about
            our group.
          </p>
        </li>
      </ul>
    </div>
  );
}
