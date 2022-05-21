export async function getServerSideProps(context) {
  return {
    redirect: {
      permanent: false,
      destination:
        "https://join.slack.com/t/longislandjavascript/shared_invite/zt-dy33kew4-bdy01_BOG8E7hh6NQTNaUA",
    },
  };
}

export default function SlackInviteRedirect() {}

