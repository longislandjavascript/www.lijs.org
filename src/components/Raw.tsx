type Props = {
  children: string;
};

export const Raw = (props: Props) => {
  return (
    <div
      className="lijs-prose"
      dangerouslySetInnerHTML={{ __html: props.children }}
    />
  );
};
