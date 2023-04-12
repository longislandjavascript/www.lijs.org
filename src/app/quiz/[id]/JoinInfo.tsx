import { ExternalLink } from "components/ExternalLink";
import { Section } from "components/Section";

type Props = {
  code: number;
};

export function JoinInfo(props: Props) {
  const { code } = props;

  return (
    <Section title="Join Now!">
      <ol className="text-xl md:text-3xl ml-12 list-decimal space-y-6">
        <li>
          <p>
            Visit{" "}
            <ExternalLink href="https://lijs.org/quiz" className="anchor">
              lijs.org/quiz
            </ExternalLink>{" "}
          </p>
        </li>
        <li>
          <p>
            Enter code{" "}
            <span className="font-bold surface p-1 text-alt rounded-lg px-2">
              {code}
            </span>
          </p>
        </li>
      </ol>
    </Section>
  );
}
