import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { ExternalLink } from "./ExternalLink";
import { navLinks } from "constants/nav-links";
import { FaExternalLinkAlt } from "react-icons/fa";

const navLinkClassNames =
  "flex items-center gap-4 w-full text-primary  font-medium mx-1  transition-colors duration-200 ease-in-out p-2 rounded-md hover:bg-gray-500/10 focus-visible:bg-gray-500/10";

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
      <ExternalLink
        className={`${navLinkClassNames} ${selectedClassNames}`}
        href={href}
      >
        <Icon /> {label} <FaExternalLinkAlt className="text-sm" />
      </ExternalLink>
    );
  } else {
    return (
      <li className="w-full">
        <Link href={href}>
          <a className={`${navLinkClassNames} ${selectedClassNames}`}>
            <Icon /> {label}
          </a>
        </Link>
      </li>
    );
  }
};

export const NavigationMenu = () => {
  const router = useRouter();
  return (
    <nav className="flex-1">
      <ul className="flex-col gap-6 flex items-start">
        <li>
          <Link href="/">
            <a className={navLinkClassNames}>
              <Image
                src="/icon.svg"
                alt="Long Island JavaScript"
                height={60}
                width={60}
                aria-hidden={true}
              />
              <div>
                <p className="text-[26px] font-black text-primary">
                  Long Island
                </p>
                <p className="text-3xl font-extrabold text-blue-500">
                  JavaScript
                </p>
              </div>
            </a>
          </Link>
        </li>
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
  );
};
