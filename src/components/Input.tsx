import * as React from "react";

import { FormControl, FormControlProps } from "components/FormControl";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: FormControlProps["label"];
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { className = "", label, required = false, ...restOfProps } = props;
    return (
      <FormControl label={label} required={required}>
        <input
          className={`input ${className}`}
          required={required}
          ref={ref}
          {...restOfProps}
        />
      </FormControl>
    );
  }
);

// eslint-disable-next-line functional/immutable-data
Input.displayName = "Input";
