import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  title: string;
  className?: string;
}>;

export const Section = (props: Props) => {
  const { title, children, className = "" } = props;
  return (
    <section className={`mb-18 card ${className}`}>
      <h2 className="section-title">{title}</h2>
      <div>{children}</div>
    </section>
  );
};
