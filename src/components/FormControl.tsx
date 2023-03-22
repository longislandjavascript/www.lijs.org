import { PropsWithChildren } from "react";

export type FormControlProps = PropsWithChildren<{
  label: string;
  required?: boolean;
}>;

export const FormControl = (props: FormControlProps) => {
  const { label, required, children } = props;
  return (
    <label className="flex flex-col max-w-md">
      <span>
        {label} {required && "*"}
      </span>

      {children}
    </label>
  );
};
