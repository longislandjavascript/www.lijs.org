import { format } from "date-fns";
import { MeetupEvent } from "types";
import { Raw } from "components/Raw";
import { MeetupButton } from "components/MeetupButton";
import { Section } from "components/Section";

type Props = {
  event: MeetupEvent;
};

export const UpcomingEvent = (props: Props) => {
  const { event } = props;
  const startTime = event.time;
  const endTime = event.time + event.duration;
  return (
    <Section title="Upcoming Event">
      <div>
        <h2 className="font-display mb-4 text-3xl  gap-2 text-primary">
          {event.name}
        </h2>
      </div>

      <div className="mb-4">
        <p className="inline-block !text-xs  font-medium rounded-full px-2 py-1 bg-blue-500 !text-white">
          {event.yes_rsvp_count} people going
        </p>
      </div>

      <div className="inline-block font-medium  text p-2 rounded-xl">
        <p className="text-lg">{format(new Date(event.time), "PPPP")}</p>
        <p className="text-lg">
          {format(new Date(startTime), "h:mm")} -{" "}
          {format(new Date(endTime), "h:mm a")}
        </p>
        <p className="text-lg">
          {event.is_online_event ? "Online Event" : "LaunchPad Huntington"}
        </p>
      </div>

      <div className=" my-4">
        <Raw>{event.description}</Raw>
      </div>
      <div className=" mt-4">
        <MeetupButton type="rsvp" href={event.link} />
      </div>
    </Section>
  );
};
