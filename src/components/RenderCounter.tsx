"use client";

import { useRef } from "react";

type Props = {
  message: string;
};
export const RenderCounter = (props: Props) => {
  const renderCounter = useRef(0);
  // eslint-disable-next-line functional/immutable-data
  renderCounter.current = renderCounter.current + 1;
  return (
    <h1>
      Renders: {renderCounter.current}, {props.message}
    </h1>
  );
};
