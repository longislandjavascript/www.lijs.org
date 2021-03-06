import { useState } from "react";
import { format } from "date-fns";

import { FaGlobe, FaCalendar, FaBuilding } from "react-icons/fa";
import { MeetupEvent } from "types";
import { MeetupButton } from "components/MeetupButton";
import { Raw } from "components/Raw";

export const PastEvent = ({ event }: { event: MeetupEvent }) => {
  const [showDescription, setShowDescription] = useState(false);
  return (
    <div
      className="p-4 rounded-lg surface-alt texture max-w-4xl"
      key={event.id}
    >
      <div className="section-title  mt-6  md:text-left">
        <p className="flex items-center gap-2 text-xl">
          {event.is_online_event ? <FaGlobe /> : <FaBuilding />}

          {event?.is_online_event ? "Online Event" : "LaunchPad Huntington"}
        </p>
        <p className="flex items-center gap-2 text-xl">
          <FaCalendar />
          {format(new Date(event.local_date), "PP")}
        </p>
      </div>
      <h2 className="text-2xl md:text-3xl font-display font-thin text-blue-600 mt-4 rounded-lg mb-8">
        {event.name}
      </h2>
      {showDescription && <Raw>{event.description}</Raw>}

      <section className="flex flex-col md:flex-row items-center justify-start gap-2 mt-4">
        {!showDescription && (
          <button
            onClick={() => setShowDescription(true)}
            className="ghost-button"
          >
            Show Description
          </button>
        )}

        <MeetupButton type="view" href={event.link} />
      </section>
    </div>
  );
};
