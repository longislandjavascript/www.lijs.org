import { Form } from "components/Form";
import { UseFormProps } from "hooks/useForm";

type Props = {
  message: string;
  instructions: React.ReactNode;
  onSubmit: UseFormProps["onSubmit"];
  onCancel: () => void;
  status: UseFormProps["status"];
  children: React.ReactNode;
};

export const BaseForm = (props: Props) => {
  const { message, instructions, onSubmit, onCancel, status, children } = props;

  return (
    <>
      <section className="mb-8 max-w-md">
        <p className="text-2xl text-primary my-4 font-display font-bold">
          {message}
        </p>
        <div className="border-2 border-color border-dashed rounded-lg p-3">
          {instructions}
        </div>
      </section>
      <Form onSubmit={onSubmit} status={status} onReset={onCancel}>
        {children}
      </Form>
    </>
  );
};
