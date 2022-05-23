import React from "react";
import { IconButton } from "./IconButton";
import { BiCopy } from "react-icons/bi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { formClassNames } from "constants/classNames";
import { useCopy } from "hooks/useCopy";
import { mergeRefs } from "utils/mergeRefs";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  canCopy?: boolean;
  canClear?: boolean;
  onClear?: () => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      canCopy = false,
      canClear = false,
      onClear,
      ...rest
    }: InputProps,
    ref
  ) => {
    const [copied, copy] = useCopy();
    const inputRef = React.useRef<HTMLInputElement>(null);
    function handleCopy() {
      copy(inputRef?.current?.value || "");
    }

    function handleClear() {
      if (inputRef?.current) {
        // @ts-ignore
        inputRef.current.value = "";
        onClear?.();
      }
    }
    return (
      <div className="w-full flex items-center">
        <input
          ref={mergeRefs([inputRef, ref])}
          className={`${
            canCopy || canClear ? "pr-10" : ""
          } ${formClassNames} ${className}`}
          {...rest}
        />
        {canClear && !!inputRef?.current?.value.length && (
          <span className="w-4 relative -ml-10">
            <IconButton label="Clear" onClick={handleClear} title="Clear">
              <FaTimes className="text-gray-500" />
            </IconButton>
          </span>
        )}
        {canCopy && (
          <span className="w-4 relative -ml-10">
            <IconButton
              label="copy"
              onClick={handleCopy}
              title={copied ? "Copied" : "Copy"}
            >
              {copied ? (
                <FaCheck className="text-green-500 animate-pulse" size={14} />
              ) : (
                <BiCopy />
              )}
            </IconButton>
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

Input.defaultProps = {
  className: "",
  canCopy: false,
};
