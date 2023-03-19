import Script from "next/script";

type Props = {
  src: string;
  height: string;
  code?: string;
};

export function AirtableEmbedForm(props: Props) {
  const src = props.code
    ? `${props.src}?prefill_Code=${props.code}`
    : props.src;
  return (
    <>
      <Script src="https://static.airtable.com/js/embed/embed_snippet_v1.js" />
      <iframe
        title="Airtable Form"
        className="airtable-embed airtable-dynamic-height mt-8"
        src={src}
        width="100%"
        height={props.height}
        style={{
          background: "transparent",
          border: "1px solid lightgray",
          borderRadius: "8px",
        }}
      />
    </>
  );
}
