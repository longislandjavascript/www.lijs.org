import copyToClipboard from "copy-to-clipboard";
import { useState } from "react";

export function useCopy(
  duration: number = 500
): [copied: boolean, copy: (str: string) => void] {
  const [copied, setCopied] = useState(false);

  function copy(str: string) {
    copyToClipboard(str);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, duration);
  }

  return [copied, copy];
}
