type CreateMetaTagsArgs = {
  title?: string;
  description: string;
  baseUrl: string;
  path: string;
  image?: string;
};

// https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs?utm_campaign=tailwind-weekly-73&utm_source=Tailwind+Weekly
export const createMetaTags = (props: CreateMetaTagsArgs) => {
  const {
    title = "",
    description = "",
    baseUrl = "",
    path = "",
    image = "",
  } = props;
  return {
    title,
    description,
    "twitter:url": baseUrl + "/" + path,
    "twitter:image": baseUrl + "/" + image,
    "twitter:card": "summary_large_image",
    "twitter:title": title,
    "twitter:description": description,
    "og:type": "website",
    "og:title": title,
    "og:description": description,
    "og:url": baseUrl + "/" + path,
    "og:image": baseUrl + "/" + image,
  };
};
