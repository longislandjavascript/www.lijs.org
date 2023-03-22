import { FormEventHandler } from "react";
import { Button } from "./Button";
import { Status } from "hooks/useForm";

type FormProps = React.PropsWithChildren<{
  onSubmit: FormEventHandler<HTMLFormElement>;
  status: Status;
}>;

export const Form = (props: FormProps) => {
  const { onSubmit, status } = props;
  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      {props.children}
      <Button loading={status === "pending"} type="submit">
        Submit
      </Button>
      {status === "error" && "Something went wrong"}
    </form>
  );
};
