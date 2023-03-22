import { FormEventHandler } from "react";

import { Status } from "hooks/useForm";

import { Button } from "./Button";

type FormProps = React.PropsWithChildren<{
  onSubmit: FormEventHandler<HTMLFormElement>;
  status: Status;
  onReset?: () => void;
}>;

export const Form = (props: FormProps) => {
  const { onSubmit, onReset, status } = props;
  return (
    <form className="flex flex-col max-w-md" onSubmit={onSubmit}>
      {props.children}
      <div>
        <Button loading={status === "pending"} type="submit" fullWidth={true}>
          Submit
        </Button>
        {onReset && (
          <Button
            onClick={onReset}
            className="mt-4"
            variant="danger"
            disabled={status === "pending"}
            type="submit"
            fullWidth={true}
          >
            Cancel
          </Button>
        )}
      </div>

      {status === "error" && "Something went wrong"}
    </form>
  );
};
