"use client";

import { useState } from "react";

import { format } from "date-fns";
import { FaBuilding, FaCalendar, FaGlobe } from "react-icons/fa";

import { Button } from "components/Button";
import { MeetupButton } from "components/MeetupButton";
import { Raw } from "components/Raw";
import { MeetupEvent } from "utils/types";

export const PastEvent = ({ event }: { event: MeetupEvent }) => {
  const [showDescription, setShowDescription] = useState(false);
  return (
    <div
      className="p-4 rounded-lg surface-alt texture max-w-4xl"
      key={event.id}
    >
      <div className="mt-6">
        <p className="flex items-center gap-2 text-xl">
          {event.is_online_event ? <FaGlobe /> : <FaBuilding />}

          {event?.is_online_event ? "Online Event" : "LaunchPad Huntington"}
        </p>
        <p className="flex items-center gap-2 text-xl">
          <FaCalendar />
          {format(new Date(event.local_date), "PP")}
        </p>
      </div>
      <h2 className="text-2xl md:text-3xl font-display font-bold text-primary mt-4 rounded-lg mb-8">
        {event.name}
      </h2>
      {showDescription && <Raw>{event.description}</Raw>}

      <section className="flex flex-col md:flex-row items-center justify-start gap-4 mt-4">
        {!showDescription && (
          <Button onClick={() => setShowDescription(true)} variant="ghost">
            Show Description
          </Button>
        )}

        <MeetupButton type="view" href={event.link} />
      </section>
    </div>
  );
};
