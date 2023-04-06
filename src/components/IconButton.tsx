import React from "react";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  label: string;
  hideTitle?: boolean;
  isToggled?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      label,
      children,
      type,
      hideTitle = false,
      isToggled = false,
      ...rest
    } = props;
    const baseClassNames =
      "transition-colors rounded-md p-2  ring-0 outline-2 outline-blue-500 ease-in-out disabled:cursor-not-allowed";
    const toggledClassNames = isToggled
      ? "bg-gray-500/20"
      : "hover:bg-gray-500/10";
    return (
      <button
        type={type as "button"}
        ref={ref}
        title={hideTitle ? "" : label}
        className={`${baseClassNames} ${toggledClassNames}`}
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
