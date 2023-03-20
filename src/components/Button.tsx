import { forwardRef } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "link";
}

const STYLE_MAP = {
  primary: "cta",
  ghost: "ghost-button",
  link: "link",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { className, variant = "primary", ...restOfProps } = props;
    const variantClassNames = STYLE_MAP[variant];
    const classNames = `${variantClassNames} ${className}`;
    return <button ref={ref} className={classNames} {...restOfProps} />;
  }
);

Button.displayName = "Button";
