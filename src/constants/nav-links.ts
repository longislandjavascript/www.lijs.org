import {
  BsClockHistory,
  BsEnvelopeHeart,
  BsFillHouseHeartFill,
  BsGift,
  BsGithub,
  BsPatchQuestion,
  BsPeople,
  BsPiggyBank,
  BsSlack,
} from "react-icons/bs";
import { FaMeetup } from "react-icons/fa";
import { GiScales } from "react-icons/gi";

import { githubLink, meetupLink, slackLink } from "./links";

export const navLinks = [
  { label: "Home", icon: BsFillHouseHeartFill, href: "/" },
  { label: "About Us", icon: BsPeople, href: "/about" },
  { label: "Past Events", icon: BsClockHistory, href: "/past-events" },
  { label: "Contact Us", icon: BsEnvelopeHeart, href: "/contact" },
  { label: "FAQ", icon: BsPatchQuestion, href: "/faq" },
  { label: "Code of Conduct", icon: GiScales, href: "/code-of-conduct" },
  { label: "Redeem", icon: BsGift, href: "/redeem" },
  { label: "Donate", icon: BsPiggyBank, href: "/donate" },
  { label: "Meetup", icon: FaMeetup, href: meetupLink, isExternal: true },
  { label: "Slack", icon: BsSlack, href: slackLink, isExternal: true },
  { label: "Github", icon: BsGithub, href: githubLink, isExternal: true },
];
