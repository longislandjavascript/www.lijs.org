import { reviews } from "constants/reviews";
import { Section } from "./Section";
import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";

export const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((idx) => {
        const nextIndex = idx + 1 >= reviews.length ? 0 : idx + 1;
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const [name, title] = reviews[currentIndex];

  return (
    <Section title="Reviews">
      <Marquee speed={40} gradient={false} pauseOnHover={true}>
        {reviews.map((review) => {
          const [name, title] = review;
          return (
            <figure key={name + title} className="space-y-4  px-4 p-2 mx-12">
              <blockquote>
                <p className="text-2xl text-primary font-display">{name}</p>
              </blockquote>
              <figcaption className="text-md italic">- {title}</figcaption>
            </figure>
          );
        })}
      </Marquee>
    </Section>
  );
};
