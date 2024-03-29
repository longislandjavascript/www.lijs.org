"use client";

import { useEffect } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaExternalLinkAlt } from "react-icons/fa";

import { ExternalLink } from "components/ExternalLink";
import { navLinks } from "constants/nav-links";
import { ReactIcon } from "utils/types";

import { HeaderLogo } from "./HeaderLogo";
import ThemeSwitch from "./ThemeSwitch";

const navLinkClassNames =
  "flex items-center gap-4 w-full text-color-theme font-semibold mx-2  transition-colors duration-200 ease-in-out p-2 rounded-md hover:bg-gray-500/10 focus-visible:bg-gray-500/10";

type NavLinkProps = {
  icon: ReactIcon;
  label: string;
  href: string;
  isActive?: boolean;
  isExternal?: boolean;
};

const NavLink = (props: NavLinkProps) => {
  const { icon: Icon, label, href, isActive, isExternal } = props;
  const selectedClassNames = isActive ? " bg-gray-500/10" : "";

  const navIcon = <Icon className="text-2xl" />;

  if (isExternal) {
    return (
      <li className="w-full">
        <ExternalLink
          className={`${navLinkClassNames} ${selectedClassNames}`}
          href={href}
        >
          {navIcon} {label} <FaExternalLinkAlt className="text-sm" />
        </ExternalLink>
      </li>
    );
  } else {
    return (
      <li className="w-full">
        <Link
          href={href}
          className={`${navLinkClassNames} ${selectedClassNames}`}
        >
          {navIcon} {label}
        </Link>
      </li>
    );
  }
};

export const NavigationMenu = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (window) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <div>
      <div className="hidden  md:flex items-center justify-between">
        <HeaderLogo />
        <ThemeSwitch />
      </div>

      <nav className="flex-1 mt-12">
        <ul className="flex-col gap-2 flex items-start px-4 font-display font-black text-xl">
          {navLinks.map((link) => {
            return (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                icon={link.icon}
                isExternal={link.isExternal}
                isActive={pathname === link.href}
              />
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
