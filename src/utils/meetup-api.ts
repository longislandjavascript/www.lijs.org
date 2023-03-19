import { MeetupEvent } from "utils/types";

export async function fetchNextEvent(): Promise<MeetupEvent> {
  const res = await fetch(
    "https://api.meetup.com/long-island-javascript/events?status=upcoming",
    { next: { revalidate: 120 } }
  );

  const events = (await res.json()) as MeetupEvent[];
  return events[0];
}

export async function fetchPastEvents(): Promise<MeetupEvent[]> {
  const res = await fetch(
    "https://api.meetup.com/long-island-javascript/events?status=past"
  );
  const events = (await res.json()) as MeetupEvent[];

  return events
    .filter((event) => event.time && event.duration)
    .sort((a, b) => (a.local_date < b.local_date ? 1 : -1));
}
