import { FaMeetup } from "react-icons/fa";
import {
  BsPeople,
  BsPatchQuestion,
  BsGift,
  BsPiggyBank,
  BsEnvelopeHeart,
  BsClockHistory,
  BsSlack,
  BsGithub,
  BsFillHouseHeartFill,
} from "react-icons/bs";
import { GiScales } from "react-icons/gi";

export const navLinks = [
  { label: "Home", icon: BsFillHouseHeartFill, href: "/" },
  { label: "About Us", icon: BsPeople, href: "/about" },
  { label: "Past Events", icon: BsClockHistory, href: "/past-events" },
  { label: "Contact Us", icon: BsEnvelopeHeart, href: "/contact" },
  { label: "FAQ", icon: BsPatchQuestion, href: "/faq" },
  { label: "Code of Conduct", icon: GiScales, href: "/code-of-conduct" },
  { label: "Redeem", icon: BsGift, href: "/redeem" },
  { label: "Donate", icon: BsPiggyBank, href: "/donate" },
  { label: "Meetup", icon: FaMeetup, href: "/meetup", isExternal: true },
  { label: "Slack", icon: BsSlack, href: "/slack", isExternal: true },
  { label: "Github", icon: BsGithub, href: "/github", isExternal: true },
];
