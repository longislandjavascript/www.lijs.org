import { FormEventHandler } from "react";

import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

import { Status } from "hooks/useForm";

import { Button } from "./Button";

type FormProps = React.PropsWithChildren<{
  onSubmit: FormEventHandler<HTMLFormElement>;
  status: Status;
  successMessage: string;
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

type Props = Pick<FormProps, "status" | "successMessage">;

function Alert(props: Props) {
  const { status, successMessage } = props;

  if (!["success", "error"].includes(status)) {
    return null;
  }

  const isError = status === "error";
  const AlertIcon = isError ? FaExclamationCircle : FaCheckCircle;
  const alertTitle = isError ? "Oops!" : "Got it!";
  const errorMessage = "Something went wrong. Please try again";
  const colorClassNames = isError
    ? "bg-red-100 text-red-900"
    : "bg-green-100 text-green-900";

  return (
    <div className={`mt-4 max-w-md p-3 rounded-lg ${colorClassNames}`}>
      <p className="flex items-center gap-2 text-xl font-medium mb-2">
        <AlertIcon /> {alertTitle}
      </p>
      <p>{isError ? errorMessage : successMessage}</p>
    </div>
  );
}
