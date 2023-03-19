import Image from "next/image";
import { PayPalDonateButton } from "components/PayPalDonateButton";
import { Section } from "components/Section";
import { wallets } from "constants/wallets";
import { CryptoWallet } from "components/CryptoWallet";
import { ExternalLink } from "components/ExternalLink";
import { PageTitle } from "components/PageTitle";

import { createMetadata } from "utils/createMetadata";

export const metadata = createMetadata({
  title: "Donate to Long Island JavaScript",
  description:
    "Show your support of Long Island JavaScript with a financial donation. PayPal, Bitcoin, Ethereum, Dogecoin, and more!",
});

export default function DonatePage() {
  return (
    <div>
      <PageTitle>Donate</PageTitle>
      <section className="p-2 space-y-6">
        <p className="border-l-4 border-blue-500 text-2xl text-gray-800 dark:text-white font-semibold surface-alt p-4">
          Long Island JavaScript will always be{" "}
          <span className="font-[700] text-primary">free to attend</span> and
          the operating costs will{" "}
          <span className="font-[700] text-primary">always be covered</span>.
        </p>
        <p>
          If you would like to chip in to cover some of the operation costs, or
          just to say thanks, this is the place to do it! Also, here is some
          information that you might find useful:
        </p>
        <ul className="list-disc ml-8">
          <li>
            <p>
              It costs around $350 per year to operate our group. This includes
              Meetup fees, website costs, and a Zoom subscription.
            </p>
          </li>
          <li>
            <p>
              Any extra funds go towards prizes, giveaways, recording equipment,
              and marketing materials.
            </p>
          </li>
        </ul>
      </section>

      <Section title="Fiat">
        <div className="w-full text-center">
          <PayPalDonateButton />
        </div>
      </Section>

      <Section title="Crypto" className="mb-12">
        <div className="w-full  flex items-center gap-4 md:gap-12 overflow-scroll snap-x snap-mandatory md:snap-none md:flex-wrap md:justify-center">
          {wallets.map((wallet) => {
            return <CryptoWallet key={wallet.address} wallet={wallet} />;
          })}
        </div>
        <div className="w-full text-sm text-center">
          <p>
            These QR codes were created on{" "}
            <ExternalLink
              href="https://www.coinster.tools/qr-code-generator"
              className="hover:bg-gray-500/10 focus:bg-gray-500/10 transition-colors ease-in-out p-2 rounded-lg"
            >
              <span className="text-lg font-bold text-primary">Coinster</span>{" "}
              <Image
                src="/coinster.svg"
                height={20}
                width={20}
                alt="coinster.tools"
              />
            </ExternalLink>
          </p>
        </div>
      </Section>
    </div>
  );
}
