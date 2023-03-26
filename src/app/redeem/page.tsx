import { createMetadata } from "utils/createMetadata";

import { Redemption } from "./Redemption";

export const metadata = createMetadata({
  title: "Past Events | LIJS",
  description:
    "Things move fast in the world of JavaScript and we've covered a lot of ground since 2015! Take a look back at some of our past events.",
});

export default function ClaimPassPage() {
  return <Redemption />;
}
