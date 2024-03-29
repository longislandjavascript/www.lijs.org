import Image from "next/image";

import { GettingHere } from "components/GettingHere";
import { PageTitle } from "components/PageTitle";
import { Section } from "components/Section";
import { organizers, pastOrganizers } from "constants/organizers";
import { sponsors } from "constants/sponsors";
import { createMetadata } from "utils/createMetadata";
import { fetchMeetupGroup } from "utils/meetup-api";

import { OrganizerCard } from "./OrganizerCard";
import { Reviews } from "./Reviews";
import { Video } from "./Video";

export const metadata = createMetadata({ title: "About Us", path: "/about" });

export default async function AboutUsPage() {
  const group = await fetchMeetupGroup();
  return (
    <div>
      <PageTitle>About LIJS</PageTitle>
      <p className="my-8 rounded-xl text-xl p-2">
        <span className="text-color-theme font-medium">
          Long Island JavaScript
        </span>{" "}
        is a group of{" "}
        <span className="text-color-theme font-medium">
          {group.members} JavaScript Developers
        </span>{" "}
        in the Long Island, NY area. We meet on the last Wednesday of each month
        to discuss and learn about a range of topics and technologies around the
        JavaScript ecosystem.
      </p>
      <Video />
      <Reviews />
      <Section title="Sponsors">
        <div className="flex flex-col justify-center md:flex-row gap-4 rounded-xl p-2">
          {sponsors.map((sponsor) => {
            return (
              <a
                href={sponsor.href}
                target="_blank"
                rel="noopener noreferrer"
                key={sponsor.href}
                className="hover:bg-gray-500/10 focus:bg-gray-500/10 rounded-xl p-2 transition-colors ease-in-out text-center mx-auto"
              >
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={200}
                  height={100}
                />
              </a>
            );
          })}
        </div>
      </Section>
      <Section title="Organizers">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-around w-full">
          {organizers.map((organizer) => {
            return <OrganizerCard key={organizer.id} organizer={organizer} />;
          })}
        </div>
      </Section>
      <Section title="Past Organizers">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-around w-full">
          {pastOrganizers.map((organizer) => {
            return <OrganizerCard key={organizer.id} organizer={organizer} />;
          })}
        </div>
      </Section>
      <GettingHere />
    </div>
  );
}
