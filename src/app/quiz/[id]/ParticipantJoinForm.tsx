import { Form, FormProps } from "components/Form";
import { Input } from "components/Input";
import { Section } from "components/Section";

type Props = {
  onSubmit: FormProps["onSubmit"];
  userName: string;
};
export function ParticipantJoinForm(props: Props) {
  const { onSubmit, userName } = props;
  return (
    <Section title="Join Now!">
      <div className="h-48 flex flex-col">
        {userName ? (
          <div className="space-y-4 mt-4">
            <p className="text-3xl md:text-5xl text-primary font-bold font-display">
              Welcome, {userName}!
            </p>
            <p>Please hang tight while we give others a chance to join.</p>
          </div>
        ) : (
          <Form onSubmit={onSubmit}>
            <Input label="What is your name?" name="name" required={true} />
          </Form>
        )}
      </div>
    </Section>
  );
}
