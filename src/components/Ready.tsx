"use client";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export const Ready = (props: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  if (!isLoaded) {
    return null;
  } else {
    return <div>{props.children}</div>;
  }
};
