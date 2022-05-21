import { FaMeetup } from "react-icons/fa";
import { ExternalLink } from "components/ExternalLink";

type Props = {
  type: "rsvp" | "view";
  href: string;
};

export const MeetupButton = (props: Props) => {
  const text = props.type === "rsvp" ? "RSVP" : "View";
  return (
    <ExternalLink href={props.href} className="cta w-full md:w-48">
      <FaMeetup />
      {text} on Meetup
    </ExternalLink>
  );
};
