"use client";

import { ThemeProvider as BaseThemeProvider } from "next-themes";

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: Props) {
  return <BaseThemeProvider attribute="class">{children}</BaseThemeProvider>;
}
