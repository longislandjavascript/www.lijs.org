/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { ExternalLink } from "components/ExternalLink";
import { Section } from "components/Section";

export const GettingHere = () => {
  return (
    <Section title="Getting Here">
      <div className="flex flex-wrap items-start gap-2">
        <div className="prose">
          <p>
            We meet at LaunchPad Huntington located in the heart of the
            beautiful{" "}
            <ExternalLink
              className="anchor"
              href="https://en.wikipedia.org/wiki/Huntington,_New_York"
            >
              Village of Huntington, NY
            </ExternalLink>
            . The address for LaunchPad Huntington is{" "}
            <b>315 Main Street, 2nd Floor, Huntington, NY 11743.</b>{" "}
          </p>
          <p>
            There is usually plenty of parking in the rear lot. There is also
            street parking and other nearby lots.
          </p>
          <p>
            Go through the rear entrance (image below), up the elevator to the
            second floor, and through the door. We will either be in the main
            area or a conference room. There will be a sign directing you to the
            correct location.
          </p>

          <p className="font-bold border-l-4 pl-4 border-yellow-500 bg-gray-500/10 p-2">
            Can&apos;t get in? Call or text 631-403-0362.
          </p>
        </div>
        <div className="w-full space-y-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3017.0288495372492!2d-73.43112664821298!3d40.87124107921347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e8287816d84b91%3A0x9a83753169b72bea!2sLaunchPad%20Huntington!5e0!3m2!1sen!2sus!4v1652451169913!5m2!1sen!2sus"
            className="max-w-full w-full flex-1 rounded-xl "
            height={500}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          <img
            src="/launchpad-entrance.png"
            alt="LaunchPad Huntington rear entrance"
            className="rounded-xl w-full object-cover"
          />
        </div>
      </div>
    </Section>
  );
};
