"use client";

import { format } from "date-fns";
import { MeetupEvent } from "utils/types";
import { Raw } from "components/Raw";
import { MeetupButton } from "components/MeetupButton";
import Link from "next/link";
import { FaGlobe, FaCalendarDay, FaBuilding, FaClock } from "react-icons/fa";
import { useState } from "react";
import { Button } from "components/Button";

type Props = {
  event: MeetupEvent;
  type: "future" | "past";
};

export function MeetupEventDetails(props: Props) {
  const [showDescription, setShowDescription] = useState(false);

  function handleShowDescription() {
    setShowDescription(true);
  }
  const { type, event } = props;
  const isFutureEvent = type === "future";
  const eventStartTime = new Date(
    new Date(event.local_date + " " + event.local_time)
  );
  const eventEndTime = new Date(eventStartTime.getTime() + event.duration);

  const formattedDate = format(eventStartTime, "PPP");
  const formattedStartTime = format(eventStartTime, "h:mm");
  const formattedEndTime = format(eventEndTime, "h:mm a");
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-display font-black text-primary">
        {event.name}
      </h2>

      <div className="mb-8 mt-2">
        <p className="inline-block !text-xs font-medium rounded-full px-2 py-1 bg-blue-600  !text-white">
          {event.yes_rsvp_count} RSVPs
        </p>
      </div>

      <section className="font-display font-bold text-lg md:text-xl">
        <p className="flex items-center gap-2">
          {event.is_online_event ? (
            <FaGlobe className="text-primary" />
          ) : (
            <FaBuilding className="text-primary" />
          )}

          {event?.is_online_event ? "Online Event" : "LaunchPad Huntington"}
        </p>
        <p className="flex items-center gap-2">
          <FaCalendarDay className="text-primary" />
          {formattedDate}
        </p>
        <p className="flex items-center gap-2">
          <FaClock className="text-primary" />
          {formattedStartTime} - {formattedEndTime}
        </p>
      </section>

      <div className="my-6">
        {isFutureEvent && <Raw>{event.description}</Raw>}

        <p className={isFutureEvent ? "block" : "hidden"}>
          If this is your first time attending one of our events, please review
          the{" "}
          <Link href="/code-of-conduct" className="link">
            Code of Conduct
          </Link>
          .
        </p>
      </div>
      <div className="mt-4 flex flex-col md:flex-row gap-4">
        <MeetupButton
          type={isFutureEvent ? "rsvp" : "view"}
          href={event.link}
        />

        {isFutureEvent && (
          <a href="#getting-here" className="ghost-button">
            Getting Here
          </a>
        )}

        {!isFutureEvent && !showDescription && (
          <Button onClick={handleShowDescription} variant="ghost">
            Show Description
          </Button>
        )}
      </div>

      <div className="mt-2">
        {showDescription && <Raw>{event.description}</Raw>}
      </div>
    </div>
  );
}
