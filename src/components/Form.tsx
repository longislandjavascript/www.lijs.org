import { FormEventHandler } from "react";

import { Status } from "hooks/useForm";

import { Alert } from "./Alert";
import { Button } from "./Button";

export type FormProps = React.PropsWithChildren<{
  onSubmit: FormEventHandler<HTMLFormElement>;
  status?: Status;
  successMessage?: string;
  onReset?: () => void;
}>;

export const Form = (props: FormProps) => {
  const { onSubmit, onReset, status, successMessage } = props;
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
            variant="ghost"
            disabled={status === "pending"}
            type="submit"
            fullWidth={true}
          >
            Cancel
          </Button>
        )}
      </div>

      <Alert status={status} successMessage={successMessage} />
    </form>
  );
};
