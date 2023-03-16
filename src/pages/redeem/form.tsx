import { Layout } from "components/Layout";
import { useRouter } from "next/router";
import { AirtableEmbedForm } from "components/AirtableEmbedForm";

const forms = {
  Book: "https://airtable.com/embed/shr0NbP6dELj9W819",
  Pass: "https://airtable.com/embed/shr5ORFfEklcml6o6",
};

export default function ClaimBookPage() {
  const router = useRouter();
  const { code, prize } = router.query;

  return (
    <Layout pageTitle="Congratulations 🎉">
      <AirtableEmbedForm
        src={forms[prize as string]}
        height="1368"
        code={code as string}
      />
    </Layout>
  );
}
