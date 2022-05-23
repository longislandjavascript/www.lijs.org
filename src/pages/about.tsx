/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from "next";
import Image from "next/image";
import { Layout } from "components/Layout";
import { SEO } from "components/SEO";
import { Section } from "components/Section";
import { OrganizerCard } from "components/OrganizerCard";
import { GettingHere } from "components/GettingHere";
import { reviews } from "constants/reviews";
import { sponsors } from "constants/sponsors";
import { organizers } from "constants/organizers";
import { MeetupGroup } from "types";

export default function AboutUsPage(props: { group: MeetupGroup }) {
  return (
    <Layout pageTitle="About Our Group">
      <SEO title="About Our Group | LIJS" />
      <p className="my-8 rounded-xl text-xl p-2">
        <span className="text-primary font-medium">Long Island JavaScript</span>{" "}
        is a group of{" "}
        <span className="text-primary font-medium">
          {props.group.members} JavaScript Developers
        </span>{" "}
        in the Long Island, NY area. We meet on the last Wednesday of each month
        , where we discuss a range of topics around the JavaScript ecosystem.
      </p>

      <Section title="Organizers">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-around w-full">
          {organizers.map((organizer) => {
            return <OrganizerCard key={organizer.id} organizer={organizer} />;
          })}
        </div>
      </Section>

      <Section title="Sponsors">
        <div className="flex flex-col justify-center md:flex-row gap-4 rounded-xl p-2">
          {sponsors.map((sponsor) => {
            return (
              <a
                href={sponsor.href}
                key={sponsor.href}
                className="hover:bg-gray-500/10 focus:bg-gray-500/10 rounded-xl p-2 transition-colors ease-in-out text-center mx-auto"
              >
                <img src={sponsor.logo} alt={sponsor.name} className="w-64" />
              </a>
            );
          })}
        </div>
      </Section>

      <Section title="Reviews">
        {reviews.map((item) => {
          const [name, review] = item;
          return (
            <figure
              key={review}
              className="space-y-4 my-8 border-l-4 border-yellow-500 px-4 bg-gray-500/10 p-2"
            >
              <blockquote>
                <p className="text-xl">{review}</p>
              </blockquote>
              <figcaption className="text-sm">- {name}</figcaption>
            </figure>
          );
        })}
      </Section>

      <GettingHere />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const groupRes = await fetch("https://api.meetup.com/long-island-javascript");
  const group = (await groupRes.json()) as MeetupGroup;

  return {
    props: {
      group,
    },
  };
};
