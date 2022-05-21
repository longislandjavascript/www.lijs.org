// Inspired by https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs?utm_campaign=tailwind-weekly-73&utm_source=Tailwind+Weekly
import Head from "next/head";

export type SEOProps = {
  title?: string;
  description?: string;
  path?: string;
  icon?: string;
};

export const SEO = (props: SEOProps) => {
  const SITE_URL =
    process.env.NODE_ENV === "production"
      ? "https://www.lijs.org"
      : "http://localhost:3000";
  const {
    title = "Long Island JavaScript",
    description = "Long Island JavaScript is a Meetup group in the Long Island, NY area. We meet on the last Wednesday of each month, where we discuss a range of topics around the JavaScript ecosystem.",
    path = "/",
    icon = "longislandjavascript.png",
  } = props;
  const URL = `${SITE_URL}${path}`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={URL} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={icon} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={URL} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={icon} />
      <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.webmanifest" />
    </Head>
  );
};
