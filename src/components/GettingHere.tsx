/* eslint-disable @next/next/no-img-element */
import { FaMapMarked } from "react-icons/fa";

import { ExternalLink } from "components/ExternalLink";
import { Section } from "components/Section";

export const GettingHere = () => {
  return (
    <Section title="Getting Here" id="getting-here">
      <div className="lijs-prose">
        <p>
          We meet at LaunchPad Huntington located in the heart of the beautiful{" "}
          <ExternalLink
            className="anchor"
            href="https://en.wikipedia.org/wiki/Huntington,_New_York"
          >
            Village of Huntington, NY
          </ExternalLink>
          . There is usually plenty of parking in the rear lot, nearby streets,
          or other nearby lots.
        </p>

        <p></p>
        <p>
          Go through the rear entrance, up the elevator to the second floor, and
          through the entrance door. We will either be in the main area or a
          conference room. There will be a sign directing you to the correct
          location.
        </p>

        <address className=" inline-flex font-display text-xl flex-col not-italic font-black">
          <span>Launchpad Huntington</span>
          <span>315 Main Street, 2nd Floor</span>
          <span>Huntington, NY 11743</span>
        </address>

        <div>
          <ExternalLink
            href="https://goo.gl/maps/6jaJfiyQ8yBjYxeV7"
            className="ghost-button mt-4"
          >
            <FaMapMarked /> View Map
          </ExternalLink>
        </div>

        <div className="my-8">
          <p className="font-semibold border-l-4 pl-4 border-yellow-500 bg-gray-500/10 p-2">
            Can&apos;t get in? Call or text 631-403-0362.
          </p>
        </div>
      </div>
      <div className="w-full space-y-6">
        <figure>
          <img
            src="/launchpad-entrance.png"
            alt="LaunchPad Huntington rear entrance"
            className="rounded-xl w-full object-cover"
          />
          <figcaption className="mt-2 text-sm">
            Entrance door on the rear side of the building.
          </figcaption>
        </figure>
      </div>
    </Section>
  );
};
