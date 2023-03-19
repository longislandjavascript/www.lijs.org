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
};
