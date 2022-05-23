import * as React from "react";
import { BaseComponent } from "types";

export interface TextProps extends BaseComponent {
  /**
   * The type of element you want to display. Defaults to paragraph.
   */
  as?:
    | "p"
    | "i"
    | "u"
    | "abbr"
    | "cite"
    | "del"
    | "em"
    | "ins"
    | "kbd"
    | "mark"
    | "s"
    | "samp"
    | "sub"
    | "sup";
}

/**
 * Used to render text and paragraphs (paragraph by default). Tailwind classes can be used to style and adjust the size of the text. (e.g text-lg font-thin text-gray-800)
 */
export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ as: Component = "p", className = "", ...rest }, forwardedRef) => {
    return (
      <Component className={className} {...rest} ref={forwardedRef as any} />
    );
  }
);
Text.displayName = "Text";
Text.defaultProps = {
  as: "p",
};
