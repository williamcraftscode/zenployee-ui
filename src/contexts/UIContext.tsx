import { createContext } from "react";

export interface UIContextType {
  collapsedNav: boolean;
  themeMode: "light" | "dark";
  setCollapsedNav: React.Dispatch<React.SetStateAction<boolean>>;
  setThemeMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}

export const UIContext = createContext<UIContextType | undefined>(undefined);
