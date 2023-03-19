import { Sidebar } from "components/Sidebar";
import { MobileNavigation } from "components/MobileNavigation";
import { Footer } from "components/Footer";
import { createMetadata } from "utils/createMetadata";
import { Inter, Overlock } from "next/font/google";
import "styles/globals.css";

export const metadata = createMetadata();
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

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
    <html lang="en">
      <body
        className={`${inter.variable} ${overlock.variable} font-sans surface text`}
      >
        <div className={`flex flex-col min-h-screen`}>
          <div className="hidden md:block">
            <Sidebar />
          </div>

          <MobileNavigation />

          <main
            className={`md:ml-80 py-4 px-4 md:px-12 mt-12 w-full container mx-auto max-w-4xl flex-1 pb-12`}
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