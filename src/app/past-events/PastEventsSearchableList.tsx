"use client";

import { PastEvent } from "components/PastEvent";
import { useState } from "react";
import { MeetupEvent } from "types";

type Props = {
  events: MeetupEvent[];
};

export const PastEventsSearchableList = ({ events }: Props) => {
  const [query, setQuery] = useState("");

  const filteredEvents = events.filter((event) => {
    return (
      event.name.toLowerCase().includes(query.toLowerCase()) ||
      event.description.toLowerCase().includes(query.toLowerCase())
    );
  });

  const maybeS = filteredEvents.length === 1 ? "" : "s";

  return (
    <>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="Search"
        placeholder="🔍 Search"
        aria-label="Search for a past event"
        className="py-3 px-8 surface-alt text-alt block w-full rounded-full my-6 border-2 border-color"
      />

      {filteredEvents.length > 0 ? (
        <p className="mb-2">
          Showing {filteredEvents.length} event{maybeS}
        </p>
      ) : (
        <p>
          No results matching <b className="text-primary">{query}</b>
        </p>
      )}

      <div className="space-y-8">
        {filteredEvents.map((event: MeetupEvent) => {
          return <PastEvent event={event} key={event.id} />;
        })}
      </div>
    </>
  );
};
