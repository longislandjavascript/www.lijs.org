import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { ExternalLink } from "./ExternalLink";
import { navLinks } from "constants/nav-links";
import { FaExternalLinkAlt } from "react-icons/fa";
import { HeaderLogo } from "./HeaderLogo";

const navLinkClassNames =
  "flex items-center gap-4 w-full text-primary font-semibold mx-2  transition-colors duration-200 ease-in-out p-2 rounded-md hover:bg-gray-500/10 focus-visible:bg-gray-500/10";

const NavLink = (props: {
  icon: any;
  label: string;
  href: string;
  isActive?: boolean;
}) => {
  const { icon: Icon, label, href, isActive } = props;
  const isExternalLink = href.startsWith("http");
  const selectedClassNames = isActive ? " bg-gray-500/10" : "";

  if (isExternalLink) {
    return (
      <li className="w-full">
        <ExternalLink
          className={`${navLinkClassNames} ${selectedClassNames}`}
          href={href}
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
        >
          <Icon /> {label}
        </Link>
      </li>
    );
  }
};

export const NavigationMenu = () => {
  const router = useRouter();
  return (
    <div>
      <div className="hidden md:block">
        <HeaderLogo />
      </div>

      <nav className="flex-1 mt-12">
        <ul className="flex-col gap-2 flex items-start px-4">
          {navLinks.map((link) => {
            return (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                icon={link.icon}
                isActive={router.pathname === link.href}
              />
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
