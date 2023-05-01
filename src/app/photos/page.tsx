import * as React from "react";

import { createMetadata } from "utils/createMetadata";

import { Lightbox } from "./Lightbox";

export const metadata = createMetadata({ title: "Photos", path: "/photos" });

export default function App() {
  return <Lightbox />;
}
