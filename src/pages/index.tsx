import { GetServerSideProps } from "next";
import { Layout } from "components/Layout";
import { SEO } from "components/SEO";
import { MeetupGroup, MeetupEvent } from "types";
import { UpcomingEvent } from "components/UpcomingEvent";
import { ShowcaseCard } from "components/ShowcaseCard";
import { GettingHere } from "components/GettingHere";
import { showcaseItems } from "constants/showcase";

export default function IndexPage(props: {
  group: MeetupGroup;
  events: MeetupEvent[];
}) {
  const { events } = props;
  const nextEvent = events[0];
  return (
    <Layout>
      <SEO />
      <div className="w-full overflow-hidden">
        <UpcomingEvent event={nextEvent} />
        <div className="w-full mb-12 flex items-center gap-4 overflow-scroll snap-x snap-mandatory md:snap-none md:flex-wrap md:justify-between">
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
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const groupRes = await fetch("https://api.meetup.com/long-island-javascript");
  const eventsRes = await fetch(
    "https://api.meetup.com/long-island-javascript/events?status=upcoming"
  );

  const group = (await groupRes.json()) as MeetupGroup;
  const events = (await eventsRes.json()) as MeetupEvent[];

  return {
    props: {
      group,
      events,
    },
  };
};
