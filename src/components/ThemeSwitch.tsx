"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { IconButton } from "components/IconButton";
import { FaSun, FaMoon } from "react-icons/fa";

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  const isDarkTheme = theme === "dark";
  const Icon = isDarkTheme ? FaMoon : FaSun;
  const themeColor = isDarkTheme ? "text-yellow-100" : "text-yellow-400";

  return (
    <IconButton onClick={toggleTheme} label="Theme Toggle">
      <Icon className={`${themeColor} text-2xl`} />
    </IconButton>
  );
};

export default ThemeSwitch;
