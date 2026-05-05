import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "th";

type Dict = Record<string, { en: string; th: string }>;

export const translations: Dict = {
  "nav.home": { en: "Home", th: "หน้าแรก" },
  "nav.procedures": { en: "Procedures", th: "หัตถการ" },
  "nav.journey": { en: "Patient Journey", th: "ขั้นตอนผู้ป่วย" },
  "nav.contact": { en: "Contact", th: "ติดต่อ" },
  "mode.patient": { en: "Patient", th: "ผู้ป่วย" },
  "mode.staff": { en: "Staff", th: "เจ้าหน้าที่" },
};

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("rnu-lang") : null;
    if (stored === "en" || stored === "th") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") window.localStorage.setItem("rnu-lang", l);
  };

  const t = (key: string) => translations[key]?.[lang] ?? key;

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);