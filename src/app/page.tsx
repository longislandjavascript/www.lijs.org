import { GettingHere } from "components/GettingHere";
import { MeetupEventDetails } from "components/MeetupEventDetails";
import { Section } from "components/Section";
import { ShowcaseCard } from "components/ShowcaseCard";
import { showcaseItems } from "constants/showcase";
import { createMetadata } from "utils/createMetadata";
import { fetchNextEvent } from "utils/meetup-api";

export const metadata = createMetadata({ path: "/" });

export default async function IndexPage() {
  const nextEvent = await fetchNextEvent();

  return (
    <div className="w-full overflow-hidden">
      {nextEvent && (
        <Section title="Next Event">
          <MeetupEventDetails event={nextEvent} type="future" />
        </Section>
      )}

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
