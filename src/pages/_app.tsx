import "styles/globals.css";
import { Inter, Overlock } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const overlock = Overlock({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-overlock",
});

function MyApp({ Component, pageProps }) {
  return (
    <div className={`${inter.variable} ${overlock.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
