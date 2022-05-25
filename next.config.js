module.exports = {
  reactStrictMode: true,
  async redirects() { 
    return  [
      { 
        "source": "/slack",
        "destination": "https://join.slack.com/t/longislandjavascript/shared_invite/zt-dy33kew4-bdy01_BOG8E7hh6NQTNaUA", 
        "permanent": true
      },
      { 
        "source": "/donate-link",
        "destination": "https://www.paypal.com/donate/?hosted_button_id=2XUNZPV794NGW", 
        "permanent": true
      },
      { 
        "source": "/review",
        "destination": "https://www.meetup.com/long-island-javascript/about/comments/?op=all", 
        "permanent": true
      }
    ]
  }
}

