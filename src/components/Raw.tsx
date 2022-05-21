type Props = {
  children: string;
};

export const Raw = (props: Props) => {
  return (
    <div
      className="prose"
      dangerouslySetInnerHTML={{ __html: props.children }}
    />
  );
};
