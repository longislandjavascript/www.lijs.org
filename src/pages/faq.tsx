import { Layout } from "components/Layout";
import { SEO } from "components/SEO";
import { SectionTitle } from "components/PageTitle";
import { faqs } from "constants/faqs";

export default function FAQPage() {
  const questionClassNames = "text-2xl font-medium text-primary py-2";
  const answerClassNames = "";
  return (
    <Layout pageTitle="Frequently Asked Questions">
      <SEO
        title="Frequently Asked Questions"
        description="Here you will find answers to the most common questions we get as a group such as 'Does is cost to attend a Long Island JavaScript event?' (spoiler: no!)"
      />

      <ul>
        {faqs.map((faq) => {
          return (
            <li key={faq.question} className="border-b border-color py-4">
              <p className={questionClassNames}>{faq.question}</p>
              <p className={answerClassNames}>{faq.answer}</p>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}
