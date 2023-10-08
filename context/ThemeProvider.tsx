"use client";

import { ReactNode, createContext, useCallback, useContext, useState } from "react";

type Theme = "light" | "dark";

const themeContext = createContext<{
  mode: Theme;
  toggleMode: () => void;
}>({
  mode: "light",
  toggleMode: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Theme>("light");

  const toggleMode = useCallback(() => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }, []);

  return (
    <themeContext.Provider
      value={{
        mode,
        toggleMode,
      }}
    >
      {children}
    </themeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(themeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}