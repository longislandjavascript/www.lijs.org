import { AirtableEmbedForm } from "./AirtableEmbedForm";
import { ExternalLink } from "./ExternalLink";

const forms = {
  Book: {
    url: "https://airtable.com/embed/shr0NbP6dELj9W819",
    height: "1344",
  },
  Pass: {
    url: "https://airtable.com/embed/shr5ORFfEklcml6o6",
    height: "560",
  },
} as const;

type Props = {
  type: "Book" | "Pass";
  code: string;
  code_record_id: string;
};

export function PrizeClaimForm(props: Props) {
  const { type, code, code_record_id } = props;
  const isBook = type === "Book";
  const isPass = type === "Pass";
  const congratsMessage = isBook
    ? "Congratulations on winning an O'Reilly book!"
    : "Congratulations on winning a 30-day pass to O'Reilly Online Learning! (valued at $49)";
  return (
    <section>
      <p className="font-display font-bold text-2xl my-6">
        🎉 {congratsMessage}
      </p>

      {isPass && (
        <p className="mt-4">
          <p className="mt-4">
            Complete and submit the form below. Upon completion, you will
            immediately be provided a URL that you can follow to claim your free
            pass.
          </p>
        </p>
      )}

      {isBook && (
        <div>
          <p className="font-medium mb-4">How to claim your book:</p>

          <ol className="list-decimal ml-12">
            <>
              <li>
                <p>
                  Find the book you want and note the title and ISBN number. You
                  can search the entire O&apos;Reilly catalog at the following
                  url:{" "}
                  <ExternalLink
                    className="link"
                    href="https://www.oreilly.com/search/?q=*&type=book"
                  >
                    https://www.oreilly.com/search/?q=*&type=book
                  </ExternalLink>
                </p>
              </li>
              <li>
                <p className="mt-4">
                  Complete and submit the form below. Once submitted, you will
                  receive a confirmation email from O&apos;Reilly once your book
                  is mailed.
                </p>
              </li>
            </>
          </ol>
        </div>
      )}

      <AirtableEmbedForm
        src={forms[type].url}
        height={forms[type].height}
        code={code}
        code_record_id={code_record_id}
      />
    </section>
  );
}
