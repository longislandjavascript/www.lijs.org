import { Inter, Overlock } from "next/font/google";

import { Footer } from "components/Footer";
import { MobileNavigation } from "components/MobileNavigation";
import { Sidebar } from "components/Sidebar";
import { ThemeProvider } from "components/ThemeProvider";
import { createMetadata } from "utils/createMetadata";

import "styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const overlock = Overlock({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-overlock",
});

export const metadata = createMetadata();

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning={true}>
      <body
        className={`${inter.variable} ${overlock.variable} font-sans surface text`}
      >
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <MobileNavigation />

            <Sidebar />

            <main
              className={`flex-1 md:ml-80 py-4 px-2 md:px-12 mt-6 max-w-4xl pb-12`}
            >
              {children}
            </main>
            <div className="md:hidden my-8 md:my-0">
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
