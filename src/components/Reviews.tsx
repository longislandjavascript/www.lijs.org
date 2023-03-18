import { reviews } from "constants/reviews";
import { Section } from "./Section";
import Marquee from "react-fast-marquee";

export const Reviews = () => {
  return (
    <Section title="Reviews">
      <Marquee speed={100} gradient={false} pauseOnHover={false}>
        {reviews.map((review) => {
          const [name, title] = review;
          return (
            <figure
              key={name + title}
              className="space-y-4 px-8 p-2 mx-8 border-2 border-color rounded-xl surface-alt"
            >
              <blockquote>
                <p className="text-2xl text-primary font-display font-bold">
                  {name}
                </p>
              </blockquote>
              <figcaption className="text-md italic">- {title}</figcaption>
            </figure>
          );
        })}
      </Marquee>
    </Section>
  );
};
