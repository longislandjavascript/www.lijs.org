import * as React from "react";

import { FormControl, FormControlProps } from "./FormControl";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: FormControlProps["label"];
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const {
      className = "",
      required = false,
      label,
      rows = 8,
      ...restOfProps
    } = props;
    return (
      <FormControl label={label} required={required}>
        <textarea
          className={`input ${className}`}
          required={required}
          rows={rows}
          ref={ref}
          {...restOfProps}
        />
      </FormControl>
    );
  }
);

// eslint-disable-next-line functional/immutable-data
Textarea.displayName = "Textarea";
