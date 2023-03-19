import { redirect } from "next/navigation";
import { PageProps } from "utils/types";
import { AirtableEmbedForm } from "components/AirtableEmbedForm";

import { createMetadata } from "utils/createMetadata";

export const metadata = createMetadata({
  title: "Prize Redemption Form | LIJS",
});

const forms = {
  Book: "https://airtable.com/embed/shr0NbP6dELj9W819",
  Pass: "https://airtable.com/embed/shr5ORFfEklcml6o6",
};

export default function PrizeRedemptionFormPage(props: PageProps) {
  const code = props.searchParams["code"];
  const prize = props.searchParams["prize"];

  if (!code || !prize) {
    redirect("/redeem");
  }

  return (
    <div>
      <AirtableEmbedForm src={forms[prize]} height="1368" code={code} />
    </div>
  );
}
