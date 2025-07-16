import { useState } from "react";
import type { ReactNode } from "react";
import { UIContext } from "./UIContext";

interface UIProviderProps {
  children: ReactNode;
}

export const UIProvider = ({ children }: UIProviderProps) => {
  const [collapsedNav, setCollapsedNav] = useState(false);
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  return (
    <UIContext.Provider
      value={{ collapsedNav, setCollapsedNav, themeMode, setThemeMode }}
    >
      {children}
    </UIContext.Provider>
  );
};
