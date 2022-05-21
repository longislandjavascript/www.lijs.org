type Props = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export const Section = (props: Props) => {
  const { title, children, className = "" } = props;
  return (
    <section className={className + " mb-18 card"}>
      <div>
        <h2 className="section-title">{title}</h2>
      </div>
      <div>{children}</div>
    </section>
  );
};
