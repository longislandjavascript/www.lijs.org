"use client";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";

import { IconButton } from "components/IconButton";

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  const isDarkTheme = resolvedTheme === "dark";
  const Icon = isDarkTheme ? BsMoonStarsFill : BsSunFill;

  return (
    <IconButton onClick={toggleTheme} label="Theme Toggle">
      <Icon className={`text-yellow-500 text-2xl`} />
    </IconButton>
  );
};

export default ThemeSwitch;
