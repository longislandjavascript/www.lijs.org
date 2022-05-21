import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { ExternalLink } from "components/ExternalLink";

type Props = {
  icon: any;
  children: React.ReactNode;
  className: string;
  href: string;
};

export const ShowcaseCard = (props: Props) => {
  const { icon: Icon, children, className, href } = props;
  const classNames = `${className} group highlight-card`;
  const isExternal = href.startsWith("http");
  if (isExternal) {
    return (
      <a
        className={classNames}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <section className="mx-auto my-8">
          <Icon className="text-7xl text-current" />
        </section>

        <p className="text-xl text-center font-medium group-hover:underline group-focus-within:underline underline-offset-2">
          {children}
        </p>
      </a>
    );
  } else {
    return (
      <Link href={href}>
        <a className={classNames}>
          <section className="mx-auto my-8">
            <Icon className="text-7xl text-current" />
          </section>

          <p className="text-xl text-center font-medium group-hover:underline group-focus-within:underline underline-offset-2">
            {children}
          </p>
        </a>
      </Link>
    );
  }
};
