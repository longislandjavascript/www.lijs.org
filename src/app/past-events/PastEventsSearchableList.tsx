"use client";

import { useState } from "react";

import { MeetupEventDetails } from "components/MeetupEventDetails";
import { Section } from "components/Section";
import { MeetupEvent } from "utils/types";

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
        <p className="mb-2 text-sm">
          Showing {filteredEvents.length} event{maybeS}
        </p>
      ) : (
        <p>
          No results matching <b className="text-primary">{query}</b>
        </p>
      )}

      <div className="space-y-8">
        {filteredEvents.map((event: MeetupEvent) => {
          return (
            <Section key={event.id}>
              <MeetupEventDetails event={event} type="past" />
            </Section>
          );
        })}
      </div>
    </>
  );
};
