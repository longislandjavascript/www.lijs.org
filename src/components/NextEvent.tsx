import { MeetupEvent } from "utils/types";
import { Section } from "components/Section";
import { MeetupEventDetails } from "./MeetupEventDetails";

type Props = {
  event: MeetupEvent;
};

export const NextEvent = ({ event }: Props) => {
  return (
    <Section title="Next Event">
      <MeetupEventDetails event={event} type="future" />
    </Section>
  );
};
