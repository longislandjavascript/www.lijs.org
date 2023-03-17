import { reviews } from "constants/reviews";
import { Section } from "./Section";
import { useState, useEffect } from "react";

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
      <figure className="space-y-4 my-8 border-l-4 border-yellow-500 px-4 bg-gray-500/10 p-2 surface-alt">
        <blockquote>
          <p className="text-2xl text-primary font-display">{name}</p>
        </blockquote>
        <figcaption className="text-md italic">- {title}</figcaption>
      </figure>
    </Section>
  );
};
