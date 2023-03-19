import { PageTitle } from "components/PageTitle";
import { MeetupEvent } from "types";
import { FaMeetup } from "react-icons/fa";
import { PastEvent } from "components/PastEvent";
import { ExternalLink } from "components/ExternalLink";
import { createMetadata } from "utils/createMetadata";
import { PastEventsSearchableList } from "./PastEventsSearchableList";

export const metadata = createMetadata({
  title: "Past Events | LIJS",
  description:
    "Things move fast in the world of JavaScript and we've covered a lot of ground since 2015! Take a look back at some of our past events.",
});

async function getPastEvents(): Promise<MeetupEvent[]> {
  const res = await fetch(
    "https://api.meetup.com/long-island-javascript/events?status=past"
  );
  const data = await res.json();
  return Promise.resolve(
    data.sort((a, b) => (a.local_date < b.local_date ? 1 : -1))
  );
}

export default async function PastEventsPage() {
  const events = await getPastEvents();

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
