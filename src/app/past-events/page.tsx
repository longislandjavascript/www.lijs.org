import { FaMeetup } from "react-icons/fa";

import { ExternalLink } from "components/ExternalLink";
import { PageTitle } from "components/PageTitle";
import { createMetadata } from "utils/createMetadata";
import { fetchPastEvents } from "utils/meetup-api";

import { PastEventsSearchableList } from "./PastEventsSearchableList";

export const metadata = createMetadata({
  path: "/past-events",
  title: "Past Events | LIJS",
  description:
    "Things move fast in the world of JavaScript and we've covered a lot of ground since 2015! Take a look back at some of our past events.",
});

export default async function PastEventsPage() {
  const events = await fetchPastEvents();

  return (
    <div>
      <PageTitle>Past Events</PageTitle>

      <PastEventsSearchableList events={events} />

      <div className="my-8 mx-4 md:mx-0">
        <ExternalLink
          href="https://www.meetup.com/long-island-javascript-group/events/past/"
          className="cta w-full md:w-auto"
        >
          <FaMeetup size={20} style={{ marginRight: "5px" }} />
          View past events on Meetup
        </ExternalLink>
      </div>
    </div>
  );
}
