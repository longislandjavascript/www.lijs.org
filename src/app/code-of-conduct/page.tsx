import { PageTitle } from "components/PageTitle";
import { Section } from "components/Section";
import Link from "next/link";
import { createMetadata } from "utils/createMetadata";

export const metadata = createMetadata({
  title: "Code of Conduct | LIJS",
  description:
    "Help us to keep Long Island JavaScript a safe and fun space for everyone by reviewing and following our code of conduct.",
});

export default function CodeOfConductPage() {
  return (
    <div>
      <PageTitle>Code of Conduct</PageTitle>
      <div className="prose">
        <p>
          Long Island JavaScript is dedicated to providing a 
          <b className="text-primary">
            harassment-free experience for everyone
          </b>
          .
        </p>

        <p>
          We welcome and support people of all skill levels, backgrounds, and
          identities. This includes, but is not limited to, members of any
          sexual orientation, gender identity and expression, race, ethnicity,
          culture, national origin, social and economic class, educational
          level, color, immigration status, sex, age, size, family status,
          political belief, religion, and mental and physical ability.
        </p>
        <p>
          Discriminatory or harassing language and imagery are not appropriate
          for any part of Long Island JavaScript Meetup events, including talks,
          workshops, Slack and other online forums.
        </p>

        <Section title="LaunchPad 🚀" className="mt-12">
          <p>
            LaunchPad generously allows us to use their Huntington, NY location
            to host our monthly Meetup events. Please remember that LaunchPad is
            a co-working space. People pay to be there and may be working during
            our events.
          </p>
          <p>
            We ask that you respect these{" "}
            <b className="text-primary">
              <i>6 simple rules:</i>
            </b>
          </p>

          <ol className="list-decimal">
            <li>
              <p>
                <b>
                  Follow the ⏱ <i>15 Minute Rule:</i>
                </b>{" "}
                Do not enter the building any earlier than 15 minutes before an
                event starts and do not leave the building any later than 15
                minutes after an event ends. You are welcome to continue your
                conversations outside or at any of the local restaurants or
                bars.
              </p>
            </li>
            <li>
              <p>
                <b>Speak at an appropriate level</b> and be mindful of LaunchPad
                patrons around you.
              </p>
            </li>
            <li>
              <p>
                <b>Stay in the open area</b> of the space. This includes our
                designated meeting area, kitchen area, and front restrooms.
              </p>
            </li>
            <li>
              <p>
                <b>Only sit in the designated seating</b> for our events.
                Conference rooms, desks, and cubicles are for paid patrons only.
              </p>
            </li>
            <li>
              <p>
                <b>Please be mindful of your appearance</b> and cleanliness,
                keep your shoes on, and pick up after yourself.
              </p>
            </li>

            <li>
              <p>
                <b>Alcohol is not permitted</b> without prior approvals from
                both the Long Island JavaScript event organizer and LaunchPad
                management.
              </p>
            </li>
          </ol>
          <p>
            People violating these rules may be asked to leave the Meetup and/or
            any future events, including group forums such as Slack. Thanks for
            helping to keep this a safe and fun space for everyone!{" "}
          </p>
          <p>
            Please report any misconduct to{" "}
            <a
              href="mailto:justin@lijs.org?subject=Reporting misconduct!"
              className="anchor"
            >
              justin@lijs.org
            </a>{" "}
            or{" "}
            <Link href="/contact" className="anchor">
              our contact form
            </Link>
            .{" "}
          </p>
        </Section>
      </div>
    </div>
  );
}
