import { forwardRef } from "react";

export interface ExternalLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Optionally render children
   */
  children?: React.ReactNode;
  /**
   * Optionally provide additional classNames to be applied to the component
   */
  className?: string;
  /**
   * Optionally provide a style object to be merged with the component styles
   */
  style?: React.CSSProperties;
}

export const ExternalLink = forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  (props, ref) => {
    const { children, className = "", style = {}, href } = props;
    return (
      <a
        ref={ref}
        className={"inline-flex items-center gap-2 " + className}
        style={style}
        target="_blank"
        href={href}
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
);

ExternalLink.displayName = "ExternalLink";
