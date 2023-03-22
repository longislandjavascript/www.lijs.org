import { PageTitle } from "components/PageTitle";
import { faqs } from "constants/faqs";
import { createMetadata } from "utils/createMetadata";

export const metadata = createMetadata({
  title: "Frequently Asked Questions | LIJS",
  description:
    "Here you will find answers to the most common questions we get as a group such as 'Does is cost to attend a Long Island JavaScript event?' (spoiler: no!)",
});

export default function FAQPage() {
  const questionClassNames =
    "text-2xl font-display font-bold text-primary py-2";
  const answerClassNames = "";
  return (
    <div>
      <PageTitle>FAQs</PageTitle>

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
    </div>
  );
}
