export async function getServerSideProps(context) {
  return {
    redirect: {
      permanent: true,
      destination:
        "https://www.paypal.com/donate/?hosted_button_id=2XUNZPV794NGW",
    },
  };
}

export default function SlackInviteRedirect() {}
