import { createMetadata } from "utils/createMetadata";

import { Redemption } from "./Redemption";

export const metadata = createMetadata({
  path: "/redeem",
  title: "Redeem Your Prize",
});

export default function ClaimPassPage() {
  return <Redemption />;
}
