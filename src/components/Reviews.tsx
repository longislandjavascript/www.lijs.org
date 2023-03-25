"use client";

import { useEffect, useState } from "react";

import { ImQuotesLeft } from "react-icons/im";

import { reviews } from "constants/reviews";

import { Section } from "./Section";

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
      <figure className="border-l-4 border-yellow-500 pl-4">
        <blockquote>
          <p className="text-2xl text-primary font-display font-bold">{name}</p>
        </blockquote>
        <figcaption className="relative text-md italic flex items-center text-xl font-serif">
          <ImQuotesLeft className="flex-shrink-0 text-[80px] text-yellow-500 opacity-20" />
          <p key={currentIndex} className="absolute left-2 animate-fade">
            {title}
          </p>
        </figcaption>
      </figure>
    </Section>
  );
};
