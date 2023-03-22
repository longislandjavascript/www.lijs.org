import {
  FaBalanceScale,
  FaGithub,
  FaMeetup,
  FaPiggyBank,
  FaSlack,
} from "react-icons/fa";
import { GiStarsStack } from "react-icons/gi";

import {
  githubLink,
  meetupLink,
  meetupReviewLink,
  slackLink,
} from "constants/links";

export const showcaseItems = [
  {
    text: "First timer? Please review the Code of Conduct.",
    className: "bg-blue-800 text-white texture",
    icon: FaBalanceScale,
    href: "/code-of-conduct",
  },
  {
    text: "Enjoy our events? Leave us a review on Meetup!",
    className: "bg-yellow-600 text-white stars",
    icon: GiStarsStack,
    href: meetupReviewLink,
  },
  {
    text: "Show your support with a financial donation!",
    className: "bg-green-600 text-white clouds",
    icon: FaPiggyBank,
    href: "/donate",
  },
  {
    text: "Join us on Slack",
    className: "bg-purple-500 text-white cutout",
    icon: FaSlack,
    href: slackLink,
  },
  {
    text: "Visit us on Meetup",
    className: "bg-red-500 text-white bubbles",
    icon: FaMeetup,
    href: meetupLink,
  },
  {
    text: "Check out our Github",
    className: "bg-gray-600 text-white squares",
    icon: FaGithub,
    href: githubLink,
  },
];
