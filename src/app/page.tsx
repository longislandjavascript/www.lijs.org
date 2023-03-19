import { MeetupEvent } from "types";
import { NextEvent } from "components/NextEvent";
import { ShowcaseCard } from "components/ShowcaseCard";
import { GettingHere } from "components/GettingHere";
import { showcaseItems } from "constants/showcase";
import { createMetadata } from "utils/createMetadata";

export const metadata = createMetadata();

async function fetchData(): Promise<MeetupEvent[]> {
  const res = await fetch(
    "https://api.meetup.com/long-island-javascript/events?status=upcoming",
    { next: { revalidate: 120 } }
  );

  return res.json();
}

export default async function IndexPage() {
  const events = await fetchData();

  const nextEvent = events[0];
  return (
    <div className="w-full overflow-hidden">
      <NextEvent event={nextEvent} />
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
