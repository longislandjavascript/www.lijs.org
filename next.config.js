/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
    script-src maps.googleapis.com;
    img-src data: maps.gstatic.com *.googleapis.com *.ggpht.com;
`;

const gmapHeader = {
  key: "Content-Security-Policy",
  value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
};

module.exports = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  // https://beta.nextjs.org/docs/api-reference/components/image#dangerouslyallowsvg-and-contentsecuritypolicy
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [gmapHeader],
      },
      {
        source: "/about",
        headers: [gmapHeader],
      },
    ];
  },
};
