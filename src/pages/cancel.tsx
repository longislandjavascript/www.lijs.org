import { Layout } from "components/Layout";
import { SEO } from "components/SEO";
import { ExternalLink } from "components/ExternalLink";
import { meetupReviewLink } from "constants/links";

export default function CodeOfConductPage() {
  const questionClassNames = "text-lg font-display text-3xl text-primary py-2";
  const answerClassNames = "";
  return (
    <Layout pageTitle="Thanks anyways :) ">
      <SEO title="Thanks anyways!" />
      <p className="text-xl my-6">
        Here are a few other ways you can show your support for our group:
      </p>

      <ul className="list-disc ml-8 space-y-4 text-xl">
        <li>
          <ExternalLink href={meetupReviewLink} className="anchor">
            Leave a review on Meetup.
          </ExternalLink>
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
    </Layout>
  );
}
