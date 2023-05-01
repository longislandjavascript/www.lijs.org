import {
  BsClockHistory,
  BsEnvelopeHeart,
  BsFillHouseHeartFill,
  BsGift,
  BsGithub,
  BsImage,
  BsPatchQuestion,
  BsPeople,
  BsPiggyBank,
  BsSlack,
  BsStarFill,
} from "react-icons/bs";
import { FaMeetup } from "react-icons/fa";
import { GiScales } from "react-icons/gi";
import { MdOutlineQuiz } from "react-icons/md";

import { githubLink, meetupLink, meetupReviewLink, slackLink } from "./links";

export const navLinks = [
  { label: "Home", icon: BsFillHouseHeartFill, href: "/" },
  { label: "About Us", icon: BsPeople, href: "/about" },
  { label: "Past Events", icon: BsClockHistory, href: "/past-events" },
  { label: "Code of Conduct", icon: GiScales, href: "/code-of-conduct" },
  { label: "FAQ", icon: BsPatchQuestion, href: "/faq" },
  { label: "Photos", icon: BsImage, href: "/photos" },
  { label: "Quiz", icon: MdOutlineQuiz, href: "/quiz" },
  { label: "Redeem", icon: BsGift, href: "/redeem" },
  { label: "Donate", icon: BsPiggyBank, href: "/donate" },
  { label: "Contact Us", icon: BsEnvelopeHeart, href: "/contact" },
  { label: "Meetup", icon: FaMeetup, href: meetupLink, isExternal: true },
  { label: "Slack", icon: BsSlack, href: slackLink, isExternal: true },
  { label: "Github", icon: BsGithub, href: githubLink, isExternal: true },
  {
    label: "Leave a Review",
    icon: BsStarFill,
    href: meetupReviewLink,
    isExternal: true,
  },
];
