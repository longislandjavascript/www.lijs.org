import { FaSpinner } from "react-icons/fa";

import { Section } from "components/Section";
import { User } from "utils/types";

import { ParticipantBadge } from "./ParticipantBadge";
type Props = {
  participants?: User[];
  isAdmin?: boolean;
  onRequestRemoveParticipant?: (user: User) => void;
  onRequestBanParticipant?: (user: User) => void;
};

export function ParticipantList(props: Props) {
  const {
    participants,
    isAdmin,
    onRequestRemoveParticipant,
    onRequestBanParticipant,
  } = props;

  const len = participants?.length || 0;

  return (
    <Section
      title={`${len} Participant${len !== 1 ? "s" : ""}`}
      noMargin={true}
    >
      {len === 0 && (
        <div className="flex items-center gap-2">
          <FaSpinner className="animate-spin" />
          <p>Waiting for participants to join</p>
        </div>
      )}
      <div className="flex items-center justify-center md:justify-start flex-wrap gap-4">
        {props.participants?.map((participant) => {
          return (
            <ParticipantBadge
              participant={participant}
              isAdmin={isAdmin || false}
              key={participant.name}
              onRemove={() => onRequestRemoveParticipant?.(participant)}
              onBan={() => onRequestBanParticipant?.(participant)}
            />
          );
        })}
      </div>
    </Section>
  );
}
