"use client";

import { reviews } from "constants/reviews";
import { Section } from "./Section";
import { useState, useEffect } from "react";
import { ImQuotesLeft } from "react-icons/im";

export const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((idx) => (idx + 1 >= reviews.length ? 0 : idx + 1));
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const [name, title] = reviews[currentIndex];

  return (
    <Section title="Reviews">
      <figure className="px-8 border-l-4 py-2  border-yellow-500 surface-alt my-8">
        <blockquote>
          <p className="text-2xl text-primary font-display font-bold">{name}</p>
        </blockquote>
        <figcaption className="text-md italic flex items-center text-xl font-serif">
          <ImQuotesLeft className="text-[100px] text-primary opacity-10 -mr-20" />
          {title}
        </figcaption>
      </figure>
    </Section>
  );
};
