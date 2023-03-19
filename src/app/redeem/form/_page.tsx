import { useSearchParams } from "next/navigation";
import { AirtableEmbedForm } from "components/AirtableEmbedForm";

const forms = {
  Book: "https://airtable.com/embed/shr0NbP6dELj9W819",
  Pass: "https://airtable.com/embed/shr5ORFfEklcml6o6",
};

import { createMetadata } from "utils/createMetadata";

export const metadata = createMetadata({
  title: "Prize Redemption Form | LIJS",
});

export default function PrizeRedemptionFormPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const prize = searchParams.get("prize");

  return (
    <div>
      <AirtableEmbedForm
        src={forms[prize as string]}
        height="1368"
        code={code as string}
      />
    </div>
  );
}
