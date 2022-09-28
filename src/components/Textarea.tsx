import * as React from "react";
import { mergeRefs } from "utils/mergeRefs";

import { BaseComponent } from "types";

const { forwardRef } = React;

export interface TextareaProps
  extends Omit<BaseComponent, "children">,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Automatically adjusts height to fit content as it changes
   */
  autoSize?: boolean;
  /**
   * The initial number of rows
   */
  rows?: number;
}

/**
 * An HTML Textarea element with added support for auto-resizing
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className = "", autoSize, rows = 2, ...restProps }: TextareaProps,
    ref
  ) => {
    const localRef = React.useRef<HTMLTextAreaElement>(null);
    React.useEffect(() => {
      async function handleAutosize(el: HTMLTextAreaElement) {
        if (!autoSize || !el) {
          return;
        }
        const { default: autosize } = await import("autosize");
        autosize(el);
      }
      handleAutosize(localRef?.current as HTMLTextAreaElement);
    }, [autoSize]);

    return (
      <textarea
        ref={mergeRefs([ref, localRef])}
        rows={rows}
        className={`appearance-none text-base px-3 form ${className}`}
        {...restProps}
      />
    );
  }
);

Textarea.displayName = "Textarea";

Textarea.defaultProps = {
  className: "",
  rows: 2,
};
