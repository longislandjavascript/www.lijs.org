"use client";

import ReactPlayer from "react-player/youtube";

import { Ready } from "components/Ready";

export const Video = () => {
  return (
    <Ready>
      <div className="rounded-xl overflow-hidden aspect-video mb-8">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=9WokoJuzgJk"
          // light={true}
          width="100%"
          height="100%"
          controls={false}
        />
      </div>
    </Ready>
  );
};
