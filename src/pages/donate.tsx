import Image from "next/image";
import { Layout } from "components/Layout";
import { SEO } from "components/SEO";
import { PayPalDonateButton } from "components/PayPalDonateButton";
import { Section } from "components/Section";
import { wallets } from "constants/wallets";
import { CryptoWallet } from "components/CryptoWallet";
import { ExternalLink } from "components/ExternalLink";

export default function DonatePage() {
  return (
    <Layout pageTitle="Donate">
      <SEO
        title="Donate to Long Island JavaScript"
        description="Show your support of Long Island JavaScript with a financial donation. PayPal, Bitcoin, Ethereum, Dogecoin, and more!"
      />

      <section className="p-2 space-y-6">
        <p className="border-l-4 border-blue-500 text-primary text-2xl font-semibold surface-alt p-2">
          Long Island JavaScript will always be <b>free to attend</b> and the
          operating costs will <b>always be covered</b>.
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
              className="hover:bg-gray-500/10 focus:bg-gray-500/10 transition-colors ease-in-out p-2  rounded-lg"
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
    </Layout>
  );
}
