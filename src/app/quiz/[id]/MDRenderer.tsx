"use client";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";
import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import lightTheme from "react-syntax-highlighter/dist/esm/styles/prism/coldark-cold";
import darkTheme from "react-syntax-highlighter/dist/esm/styles/prism/coldark-dark";

SyntaxHighlighter.registerLanguage("jsx", jsx);

SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("typescript", typescript);

type Props = {
  language: string;
  children: string;
  size?: "small";
};

export function MDRenderer(props: Props) {
  const { resolvedTheme } = useTheme();
  const lang = props.language?.toLowerCase().trim();
  const [prismTheme, setPrismTheme] = useState(
    resolvedTheme === "light" ? lightTheme : darkTheme
  );

  useEffect(() => {
    setPrismTheme(resolvedTheme === "light" ? lightTheme : darkTheme);
  }, [resolvedTheme]);

  return (
    <div className="prose-lg md:prose-xl dark:prose-invert prose-pre:p-0 prose-code:m-0 prose-code:p-0 prose-pre:m-0 prose-pre:bg-transparent select-none">
      <ReactMarkdown
        className="select-none"
        components={{
          code: ({ node, inline, ...rest }) => {
            return (
              <SyntaxHighlighter
                showLineNumbers={false}
                language={lang}
                style={prismTheme}
                customStyle={{
                  display: inline ? "inline" : "block",
                  background: "rgba(150,150,150, .1)",
                  fontSize: props.size === "small" ? "16px" : "22px",
                  margin: 0,
                  padding: inline ? "0px 4px 2px 4px" : "6px 12px 12px 12px",
                }}
              >
                {rest.children}
              </SyntaxHighlighter>
            );
          },
        }}
      >
        {props.children}
      </ReactMarkdown>
    </div>
  );
}
