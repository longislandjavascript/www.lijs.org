import { useState } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Layout } from "components/Layout";
import { SEO } from "components/SEO";
import { MeetupGroup, MeetupEvent } from "types";
import { FaMeetup } from "react-icons/fa";
import { PastEvent } from "components/PastEvent";
import { ExternalLink } from "components/ExternalLink";

export default function PastEventsPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { events } = props;

  const [query, setQuery] = useState("");

  const filteredEvents = events.filter((event) => {
    return (
      event.name.toLowerCase().includes(query.toLowerCase()) ||
      event.description.toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <Layout pageTitle="Past Events">
      <SEO
        title="Past Events | LIJS"
        description="Things move fast in the world of JavaScript and we've covered a lot of ground since 2015! Take a look back at some of our past events."
      />

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="Search"
        placeholder="Search"
        aria-label="Search for a past event"
        className="py-3 px-8 surface-alt text-alt block w-full md:w-96 rounded-full my-6 border-2 border-color"
      />

      <div className="space-y-8">
        {filteredEvents.map((event: MeetupEvent) => {
          return <PastEvent event={event} key={event.id} />;
        })}
      </div>

      {!filteredEvents.length && (
        <p>
          No results matching <b>{query}</b>
        </p>
      )}
      <div className="my-8">
        <ExternalLink
          href="https://www.meetup.com/long-island-javascript-group/events/past/"
          className="cta"
        >
          <FaMeetup size={20} style={{ marginRight: "5px" }} />
          View past events on Meetup
        </ExternalLink>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const eventsRes = await fetch(
    "https://api.meetup.com/long-island-javascript/events?status=past"
  );
  const events = (await eventsRes.json()) as MeetupEvent[];
  return {
    props: {
      events: events.sort((a, b) => (a.local_date < b.local_date ? 1 : -1)),
    },
  };
};
