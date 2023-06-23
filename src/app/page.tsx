import { meetupLink } from "constants/links";
import { showcaseItems } from "constants/showcase";

import { ExternalLink } from "components/ExternalLink";
import { GettingHere } from "components/GettingHere";
import { MeetupEventDetails } from "components/MeetupEventDetails";
import { Section } from "components/Section";
import { ShowcaseCard } from "components/ShowcaseCard";
import { createMetadata } from "utils/createMetadata";
import { fetchNextEvent } from "utils/meetup-api";

export const metadata = createMetadata({
  title: "Welcome to Long Island JavaScript!",
  path: "/",
});

export default async function IndexPage() {
  const nextEvent = await fetchNextEvent();
  return (
    <div className="w-full overflow-hidden">
      <Section title="Next Event">
        {nextEvent && <MeetupEventDetails event={nextEvent} type="future" />}
        {!nextEvent && (
          <div>
            <p>
              Please check back later or visit{" "}
              <ExternalLink href={meetupLink} className="link">
                our Meetup page
              </ExternalLink>{" "}
              for a list of all upcoming events.
            </p>
          </div>
        )}
      </Section>

      <div className="w-full mb-12 flex items-center gap-4 overflow-scroll snap-x snap-mandatory lg:snap-none lg:flex-wrap md:justify-around">
        {showcaseItems.map((item) => {
          return (
            <ShowcaseCard
              key={item.text}
              icon={item.icon}
              href={item.href}
              className={item.className}
            >
              {item.text}
            </ShowcaseCard>
          );
        })}
      </div>

      <GettingHere />
    </div>
  );
}

export const revalidate = 10;
