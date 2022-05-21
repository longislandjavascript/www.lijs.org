/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: [
    { 
      "source": "/slack",
      "destination": "https://join.slack.com/t/longislandjavascript/shared_invite/zt-dy33kew4-bdy01_BOG8E7hh6NQTNaUA", 
      "permanent": true
    }
  ]
}

module.exports = nextConfig
