import { forwardRef } from "react";

import { FaSpinner } from "react-icons/fa";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "link";
  loading?: boolean;
}

const STYLE_MAP = {
  primary: "cta",
  ghost: "ghost-button",
  link: "link",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      className,
      variant = "primary",
      disabled,
      loading = false,
      children,
      ...restOfProps
    } = props;
    const variantClassNames = STYLE_MAP[variant];
    const classNames = `${variantClassNames} ${className}`;
    return (
      <button
        ref={ref}
        className={classNames}
        disabled={disabled || loading}
        {...restOfProps}
      >
        {loading ? <FaSpinner className="text-2xl animate-spin" /> : children}
      </button>
    );
  }
);

// eslint-disable-next-line functional/immutable-data
Button.displayName = "Button";
