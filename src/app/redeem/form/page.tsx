import { useRouter, useSearchParams } from "next/navigation";
import { AirtableEmbedForm } from "components/AirtableEmbedForm";

const forms = {
  Book: "https://airtable.com/embed/shr0NbP6dELj9W819",
  Pass: "https://airtable.com/embed/shr5ORFfEklcml6o6",
};

// import { createMetadata } from "utils/createMetadata";

// export const metadata = createMetadata({
//   title: "Past Events | LIJS",
//   description:
//     "Things move fast in the world of JavaScript and we've covered a lot of ground since 2015! Take a look back at some of our past events.",
// });

export default function ClaimBookPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log({ searchParams });
  const { code, prize } = searchParams;

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
