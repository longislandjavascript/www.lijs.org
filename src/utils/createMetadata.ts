import { baseUrl } from "constants/baseUrl";

import type { Metadata } from "next";

type Args = {
  title: string;
  description?: string;
  path: `/${string}`;
  image?: string;
};

const defaultDescription =
  "Welcome to Long Island JavaScript! Our monthly Meetup covers all things JavaScript, from frontend to backend, libraries to frameworks, Node to Deno, React to Svelte, and everything in between. We meet on the last Wednesday of each month at LaunchPad Huntington.";
const defaultImage = "/longislandjavascript.png";

export function createMetadata(args: Args): Metadata {
  const { title } = args;
  const description = args?.description || defaultDescription;
  const image = args?.image || defaultImage;

  const url = `${baseUrl}${args.path}`;

  return {
    metadataBase: new URL(url),
    title,
    description,
    // Open Graph
    openGraph: {
      title,
      description,
      url,
      siteName: title,
      images: [
        {
          url: image,
          width: 1200,
          height: 628,
          alt: "Long Island JavaScript",
        },
      ],
      locale: "en-US",
      type: "website",
    },

    // Icons
    icons: {
      icon: "/icon.svg",
      apple: "/apple-touch-icon.png",
    },

    // Manifest
    manifest: "/manifest.webmanifest",

    // Twitter
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },

    // Viewport
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 5,
    },
  };
}
