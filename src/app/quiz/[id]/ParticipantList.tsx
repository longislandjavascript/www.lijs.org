import { FaSpinner, FaTimes } from "react-icons/fa";

import { Section } from "components/Section";

type Props = {
  participants?: string[];
  isAdmin?: boolean;
  onRequestRemoveParticipant?: (name: string) => void;
};

export function ParticipantList(props: Props) {
  const { participants, isAdmin, onRequestRemoveParticipant } = props;

  const len = participants?.length;

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
        {props.participants?.map((v) => {
          const adminButtonClassNames =
            "justify-between flex items-center group gap-2";
          const baseClassNames =
            "surface rounded-full p-1 px-4 text-xl text-center";
          return (
            <button
              disabled={!isAdmin}
              onClick={() => onRequestRemoveParticipant?.(v)}
              className={`${baseClassNames} ${adminButtonClassNames}`}
              key={v}
            >
              {v}

              {isAdmin && (
                <div className="group-hover:bg-gray-500/20 transition-colors duration-300 ease-in-out p-1 rounded-full text-sm">
                  <FaTimes />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </Section>
  );
}
