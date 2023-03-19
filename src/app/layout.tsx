import { Sidebar } from "components/Sidebar";
import { MobileNavigation } from "components/MobileNavigation";
import { Footer } from "components/Footer";
import { createMetadata } from "utils/createMetadata";
import { Overlock } from "next/font/google";
import "styles/globals.css";

export const metadata = createMetadata();

const overlock = Overlock({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-overlock",
});

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${overlock.variable} font-serif surface text`}>
        <div>
          <MobileNavigation />

          <Sidebar />

          <main
            className={`relative md:ml-80 py-4 px-4 md:px-12 mt-12 max-w-4xl pb-12`}
          >
            {children}
          </main>
          <div className="md:hidden my-8 md:my-0">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
