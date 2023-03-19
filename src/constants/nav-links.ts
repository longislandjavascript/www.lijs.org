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
  FaHome,
} from "react-icons/fa";

export const navLinks = [
  { label: "Home", icon: FaHome, href: "/" },
  { label: "Past Events", icon: FaHistory, href: "/past-events" },
  { label: "About Us", icon: FaUsers, href: "/about" },
  { label: "Contact Us", icon: FaRegEnvelope, href: "/contact" },
  { label: "FAQ", icon: FaRegQuestionCircle, href: "/faq" },
  { label: "Code of Conduct", icon: FaBalanceScale, href: "/code-of-conduct" },
  { label: "Redeem", icon: FaGift, href: "/redeem" },
  { label: "Donate", icon: FaPiggyBank, href: "/donate" },
  { label: "Meetup", icon: FaMeetup, href: "/meetup" },
  { label: "Slack", icon: FaSlack, href: "/slack" },
  { label: "Github", icon: FaGithub, href: "/github" },
];
