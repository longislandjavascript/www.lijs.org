"use client";

import { useState } from "react";

import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { FaMeetup } from "react-icons/fa";
import {
  FaBuilding,
  FaCalendarDay,
  FaClock,
  FaGithub,
  FaGlobe,
  FaUsers,
} from "react-icons/fa";

import { Button } from "components/Button";
import { ExternalLink } from "components/ExternalLink";
import { Raw } from "components/Raw";
import { MeetupEvent } from "utils/types";

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
    <div className="@container">
      <h2 className="text-3xl @md:text-4xl text-center @md:text-left font-display font-black text-color-theme">
        {event.name}
      </h2>

      <section className="font-display font-bold text-lg @md:text-xl flex gap-6 flex-col-reverse @md:flex-row justify-between items-center @md:items-start  @md:bg-color-1  p-4 rounded-xl my-2 @md:my-12">
        <div>
          <p className="flex items-center gap-2">
            {event.is_online_event ? (
              <FaGlobe className="text-color-theme" />
            ) : (
              <FaBuilding className="text-color-theme" />
            )}

            {event?.is_online_event ? "Online Event" : "LaunchPad Huntington"}
          </p>
          <p className="flex items-center gap-2">
            <FaCalendarDay className="text-color-theme" />
            {formattedDate}
          </p>
          <p className="flex items-center gap-2">
            <FaClock className="text-color-theme" />
            {formattedStartTime} - {formattedEndTime}
          </p>
          <p className="flex items-center gap-2">
            <FaUsers className="text-color-theme" />
            {event.yes_rsvp_count} RSVPs
          </p>
        </div>

        <div className="flex-shrink-0">
          {event.graphic_url && (
            <Image
              src={event.graphic_url}
              alt={event.name}
              height={75}
              width={200}
              className="rounded-lg"
            />
          )}
        </div>
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
      <div className="mt-4 flex flex-col @md:flex-row gap-4 ">
        <MeetupButton
          type={isFutureEvent ? "rsvp" : "view"}
          href={event.link}
        />

        {isFutureEvent && (
          <a href="#getting-here" className="ghost-button w-full @md:w-42">
            Getting Here
          </a>
        )}

        {event?.github_url && <ResourcesButton href={event.github_url} />}

        {!isFutureEvent && !showDescription && (
          <Button
            onClick={handleShowDescription}
            variant="ghost"
            className="w-full @md:w-auto"
          >
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

type MeetupButtonProps = {
  type: "rsvp" | "view";
  href: string;
};

export const MeetupButton = (props: MeetupButtonProps) => {
  const text = props.type === "rsvp" ? "RSVP" : "View";
  return (
    <ExternalLink href={props.href} className="cta w-full md:w-auto">
      <FaMeetup />
      {text} on Meetup
    </ExternalLink>
  );
};

type ResourcesButtonProps = {
  href: string;
};

export const ResourcesButton = (props: ResourcesButtonProps) => {
  return (
    <ExternalLink href={props.href} className="ghost-button w-full md:w-auto">
      <FaGithub />
      Resources available!
    </ExternalLink>
  );
};
