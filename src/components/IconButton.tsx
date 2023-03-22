import React from "react";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  label: string;
  hideTitle?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { label, children, type, hideTitle = false, ...rest } = props;
    return (
      <button
        type={type as "button"}
        ref={ref}
        title={hideTitle ? "" : label}
        className="transition-colors rounded-md p-2 hover:bg-gray-500/10 ring-0 outline-2 outline-blue-500 ease-in-out"
        aria-label={label}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

// eslint-disable-next-line functional/immutable-data
IconButton.displayName = "IconButton";
