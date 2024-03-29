import { Analytics } from "@vercel/analytics/react";
import { Inter, Overlock } from "next/font/google";

import { Footer } from "./Footer";
import { MobileNavigation } from "./MobileNavigation";
import { Sidebar } from "./Sidebar";
import { ThemeProvider } from "./ThemeProvider";

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

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning={true}>
      <body
        className={`${inter.variable} ${overlock.variable} font-sans bg-color-1 text`}
      >
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <MobileNavigation />

            <Sidebar />

            <main
              className={`flex-1 md:ml-80 py-4 px-4 md:px-12 mt-6 max-w-4xl pb-12`}
            >
              {children}
            </main>
            <div className="md:hidden my-8 md:my-0">
              <Footer />
            </div>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
