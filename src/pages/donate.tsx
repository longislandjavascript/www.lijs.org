import { Layout } from "components/Layout";
import { SEO } from "components/SEO";
import { PayPalDonateButton } from "components/PayPalDonateButton";
import { Section } from "components/Section";
import { wallets } from "constants/wallets";
import { CryptoWallet } from "components/CryptoWallet";

export default function CodeOfConductPage() {
  return (
    <Layout pageTitle="Donate">
      <SEO
        title="Donate to Long Island JavaScript"
        description="Show your support of Long Island JavaScript with a financial donation. PayPal, Bitcoin, Ethereum, Dogecoin, and more!"
      />

      <section className="p-2 space-y-6">
        <p className="text-primary text-2xl font-semibold">
          Long Island JavaScript will always be free to attend and the operating
          costs will always be covered.
        </p>
        <p>
          If you would like to chip in for operation costs or just to say
          thanks, this is the place to do it! Also, here is some information
          that you might find relevant:
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
              Any extra funds will go towards prizes, giveaways, recording
              equipment, and marketing materials.
            </p>
          </li>
        </ul>
      </section>

      <Section title="Fiat">
        <div className="w-full text-center">
          <PayPalDonateButton />
        </div>
      </Section>

      <Section title="Crypto">
        <div className="w-full mb-12 flex items-center gap-4 md:gap-12 overflow-scroll snap-x snap-mandatory md:snap-none md:flex-wrap md:justify-center">
          {wallets.map((wallet) => {
            return <CryptoWallet key={wallet.address} wallet={wallet} />;
          })}
        </div>
      </Section>
    </Layout>
  );
}
