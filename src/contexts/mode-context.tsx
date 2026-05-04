import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Mode = "patient" | "staff";

interface ModeContextType {
  mode: Mode;
  setMode: (m: Mode) => void;
}

const ModeContext = createContext<ModeContextType>({
  mode: "patient",
  setMode: () => {},
});

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>("patient");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("rnu-mode") : null;
    if (stored === "patient" || stored === "staff") setModeState(stored);
  }, []);

  const setMode = (m: Mode) => {
    setModeState(m);
    if (typeof window !== "undefined") window.localStorage.setItem("rnu-mode", m);
  };

  return <ModeContext.Provider value={{ mode, setMode }}>{children}</ModeContext.Provider>;
}

export const useMode = () => useContext(ModeContext);