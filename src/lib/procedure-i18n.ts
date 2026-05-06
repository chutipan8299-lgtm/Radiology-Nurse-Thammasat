import { useLanguage } from "@/contexts/language-context";
import type { Procedure } from "@/data/procedures";
import { proceduresTh } from "@/data/procedures-th";

export function useLocalizedProcedure(p: Procedure) {
  const { lang } = useLanguage();
  if (lang !== "th") return p;
  const tr = proceduresTh[p.id];
  if (!tr) return p;
  return {
    ...p,
    name: tr.name ?? p.name,
    description: tr.description ?? p.description,
    whoFor: tr.whoFor ?? p.whoFor,
    duration: tr.duration ?? p.duration,
    risks: tr.risks ?? p.risks,
    preparation: tr.preparation ?? p.preparation,
    steps: tr.steps ?? p.steps,
    aftercare: tr.aftercare ?? p.aftercare,
    faq: tr.faq ?? p.faq,
  };
}

export function localizeProcedure(p: Procedure, lang: "en" | "th"): Procedure {
  if (lang !== "th") return p;
  const tr = proceduresTh[p.id];
  if (!tr) return p;
  return {
    ...p,
    name: tr.name ?? p.name,
    description: tr.description ?? p.description,
    whoFor: tr.whoFor ?? p.whoFor,
    duration: tr.duration ?? p.duration,
    risks: tr.risks ?? p.risks,
    preparation: tr.preparation ?? p.preparation,
    steps: tr.steps ?? p.steps,
    aftercare: tr.aftercare ?? p.aftercare,
    faq: tr.faq ?? p.faq,
  };
}