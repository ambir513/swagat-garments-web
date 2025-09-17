"use client";
import { ThemeSwitcher } from "./theme";
import { useTheme } from "next-themes";

const ThemeBtn = () => {
  const { setTheme, theme } = useTheme();
  return (
    <div className="">
      <ThemeSwitcher onChange={setTheme} />
    </div>
  );
};

export default ThemeBtn;
