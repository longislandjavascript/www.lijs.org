import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  title?: string;
  className?: string;
  id?: string;
  noMargin?: boolean;
}>;

export const Section = (props: Props) => {
  const { title, children, id, className = "", noMargin = false } = props;
  return (
    <section
      className={`card overflow-hidden ${className} ${
        !noMargin ? "mb-12" : "mb-0"
      }`}
      id={id}
    >
      {title && <h2 className="section-title">{title}</h2>}
      <div>{children}</div>
    </section>
  );
};
