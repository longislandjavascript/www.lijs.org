"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink } from "./ExternalLink";
import { navLinks } from "constants/nav-links";
import { FaExternalLinkAlt } from "react-icons/fa";
import { HeaderLogo } from "./HeaderLogo";

const navLinkClassNames =
  "flex items-center gap-4 w-full text-primary font-semibold mx-2  transition-colors duration-200 ease-in-out p-2 rounded-md hover:bg-gray-500/10 focus-visible:bg-gray-500/10";

type NavLinkProps = {
  icon: any;
  label: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
};

const NavLink = (props: NavLinkProps) => {
  const { icon: Icon, label, href, isActive, onClick } = props;
  const isExternalLink = href.startsWith("http");
  const selectedClassNames = isActive ? " bg-gray-500/10" : "";

  if (isExternalLink) {
    return (
      <li className="w-full">
        <ExternalLink
          className={`${navLinkClassNames} ${selectedClassNames}`}
          href={href}
          onClick={onClick}
        >
          <Icon /> {label} <FaExternalLinkAlt className="text-sm" />
        </ExternalLink>
      </li>
    );
  } else {
    return (
      <li className="w-full">
        <Link
          href={href}
          className={`${navLinkClassNames} ${selectedClassNames}`}
          onClick={onClick}
        >
          <Icon /> {label}
        </Link>
      </li>
    );
  }
};

type NavigationMenuProps = {
  onSelection?: () => void;
};

export const NavigationMenu = (props: NavigationMenuProps) => {
  const pathname = usePathname();
  return (
    <div>
      <div className="hidden md:block">
        <HeaderLogo />
      </div>

      <nav className="flex-1 my-12 md:mt-6">
        <ul className="flex-col gap-2 flex items-start px-4 font-display font-bold md:text-lg text-xl">
          {navLinks.map((link) => {
            return (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                icon={link.icon}
                onClick={props.onSelection}
                isActive={pathname === link.href}
              />
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
