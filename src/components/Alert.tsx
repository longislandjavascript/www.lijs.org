import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

import { FormProps } from "components/Form";

type Props = Pick<FormProps, "status" | "successMessage">;

export function Alert(props: Props) {
  const { status, successMessage } = props;

  if (!status || !["success", "error"].includes(status)) {
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
