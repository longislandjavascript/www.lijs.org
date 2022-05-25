import { meetupReviewLink } from "constants/links";

export async function getServerSideProps(context) {
  return {
    redirect: {
      permanent: true,
      destination: meetupReviewLink,
    },
  };
}

export default function SlackInviteRedirect() {}
