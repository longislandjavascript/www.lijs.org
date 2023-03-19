import { format } from "date-fns";
import { MeetupEvent } from "types";
import { Raw } from "components/Raw";
import { MeetupButton } from "components/MeetupButton";
import { Section } from "components/Section";

type Props = {
  event: MeetupEvent;
};

export const NextEvent = (props: Props) => {
  const { event } = props;
  const startTime = event.time;
  const endTime = event.time + event.duration;
  return (
    <Section title="Next Event">
      <div>
        <h2 className="mb-6 text-4xl font-display font-bold gap-2 text-primary p-2">
          {event.name}
        </h2>
      </div>

      <div className="inline-block font-medium  text p-4 rounded-xl shadow-2xl">
        <p className="inline-block !text-xs font-medium rounded-full px-2 py-1 bg-blue-600 !text-white mb-3">
          {event.yes_rsvp_count} people going
        </p>

        <p className="text-lg">{format(new Date(event.time), "PPPP")}</p>
        <p className="text-lg">
          {format(new Date(startTime), "h:mm")} -{" "}
          {format(new Date(endTime), "h:mm a")}
        </p>
        <p className="text-lg">
          {event.is_online_event ? "Online Event" : "LaunchPad Huntington"}
        </p>
      </div>

      <div className="my-8">
        <Raw>{event.description}</Raw>
      </div>
      <div className=" mt-4">
        <MeetupButton type="rsvp" href={event.link} />
      </div>
    </Section>
  );
};
