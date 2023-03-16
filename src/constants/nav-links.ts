import {
  FaMeetup,
  FaSlack,
  FaGithub,
  FaExternalLinkAlt,
  FaHistory,
  FaUsers,
  FaRegEnvelope,
  FaRegQuestionCircle,
  FaBalanceScale,
  FaPiggyBank,
  FaGift,
} from "react-icons/fa";
import { githubLink, meetupLink, slackLink } from "constants/links";

export const navLinks = [
  { label: "Past Events", icon: FaHistory, href: "/past-events" },
  { label: "About Us", icon: FaUsers, href: "/about" },
  { label: "Contact Us", icon: FaRegEnvelope, href: "/contact" },
  { label: "FAQ", icon: FaRegQuestionCircle, href: "/faq" },
  { label: "Code of Conduct", icon: FaBalanceScale, href: "/code-of-conduct" },
  { label: "Redeem", icon: FaGift, href: "/redeem" },
  { label: "Donate", icon: FaPiggyBank, href: "/donate" },
  { label: "Meetup", icon: FaMeetup, href: meetupLink },
  { label: "Slack", icon: FaSlack, href: slackLink },
  { label: "Github", icon: FaGithub, href: githubLink },
];
