import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  title?: string;
  className?: string;
  id?: string;
}>;

export const Section = (props: Props) => {
  const { title, children, id, className = "" } = props;
  return (
    <section className={`mb-18 card ${className}`} id={id}>
      {title && <h2 className="section-title">{title}</h2>}
      <div>{children}</div>
    </section>
  );
};
