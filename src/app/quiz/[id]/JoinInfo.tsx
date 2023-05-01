import { ExternalLink } from "components/ExternalLink";
import { Section } from "components/Section";

type Props = {
  code: number;
};

export function JoinInfo(props: Props) {
  const { code } = props;

  return (
    <Section title="Join Now!">
      <ol className="text-xl md:text-3xl ml-12 list-decimal space-y-2">
        <li>
          <p className="space-y-4">
            Visit:{" "}
            <ExternalLink href="https://lijs.org/quiz" className="anchor">
              lijs.org/quiz
            </ExternalLink>{" "}
          </p>
        </li>
        <li>
          <p className="space-y-2">
            Enter Code:{" "}
            <span className="inline-block font-bold bg-color-1 p-1 text-alt rounded-lg px-2 border-2 border-dashed">
              {code}
            </span>
          </p>
        </li>
      </ol>
    </Section>
  );
}
