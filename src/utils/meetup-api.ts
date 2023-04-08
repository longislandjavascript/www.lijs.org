import { MeetupEvent, MeetupGroup } from "utils/types";

import { retrieveEvents } from "./airtable-api";

export async function fetchMeetupGroup(): Promise<MeetupGroup> {
  const res = await fetch("https://api.meetup.com/long-island-javascript", {
    next: { revalidate: 30 },
  });
  return res.json();
}

export async function fetchNextEvent(): Promise<MeetupEvent | null> {
  try {
    const res = await fetch(
      "https://api.meetup.com/long-island-javascript/events?status=upcoming"
      // { cache: "no-store" }
    );

    const events = (await res.json()) as MeetupEvent[];
    return events[0];
  } catch (error) {
    return null;
  }
}

export async function fetchPastEvents(): Promise<MeetupEvent[]> {
  const res = await fetch(
    "https://api.meetup.com/long-island-javascript/events?status=past",
    { next: { revalidate: 30 } }
  );
  const airtableEventsList = await retrieveEvents();
  const events = (await res.json())
    .map((event) => {
      const match = airtableEventsList.find((v) => v.id === event.id);
      return {
        ...event,
        github_url: match?.github_url,
      };
    })
    .filter((event) => event.time && event.duration)
    .sort((a, b) => (a.local_date < b.local_date ? 1 : -1)) as MeetupEvent[];

  return events;
}
