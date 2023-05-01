import { PageTitle } from "components/PageTitle";
import { createMetadata } from "utils/createMetadata";

export const metadata = createMetadata({
  path: "/donate/thanks",
  title: "Thank you for your donation!",
});

export default function ThanksPage() {
  return (
    <div>
      <PageTitle>Thanks for the donation!</PageTitle>

      <p className="text-xl font-medium text-color-theme my-8">
        Thank you for supporting Long Island JavaScript and we hope to see you
        at one of our upcoming events! Make sure and get a free sticker while
        you are there.
      </p>
    </div>
  );
}
