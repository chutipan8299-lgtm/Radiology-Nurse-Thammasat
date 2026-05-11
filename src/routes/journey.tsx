import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ClipboardCheck, FileText, Building2, HeartPulse, ArrowRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "Patient Journey — Radiology Nursing Unit" },
      { name: "description", content: "A simple step-by-step guide for your radiology visit, from preparation to recovery." },
    ],
  }),
  component: JourneyPage,
});

const steps = [
  { icon: Search, tk: "journey.s1.t", dk: "journey.s1.d" },
  { icon: ClipboardCheck, tk: "journey.s2.t", dk: "journey.s2.d" },
  { icon: FileText, tk: "journey.s3.t", dk: "journey.s3.d" },
  { icon: Building2, tk: "journey.s4.t", dk: "journey.s4.d" },
  { icon: HeartPulse, tk: "journey.s5.t", dk: "journey.s5.d" },
];

function JourneyPage() {
  const { t } = useLanguage();
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-primary">
          <CheckCircle2 className="h-3.5 w-3.5" /> {t("journey.badge")}
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{t("journey.title")}</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{t("journey.subtitle")}</p>
      </div>

      <div className="relative mt-12">
        <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent md:left-1/2 md:-translate-x-1/2" />
        <ol className="space-y-8">
          {steps.map((s, i) => (
            <li key={s.tk} className={"relative md:grid md:grid-cols-2 md:gap-10 " + (i % 2 ? "md:[&>div:first-child]:order-2" : "")}>
              <div className={"flex items-start gap-5 md:items-center " + (i % 2 ? "md:flex-row-reverse md:text-right" : "")}>
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-(--gradient-hero) text-primary-foreground shadow-(--shadow-soft)">
                  <s.icon className="h-6 w-6" />
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-background text-[10px] font-bold text-primary">{i + 1}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{t(s.tk)}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t(s.dk)}</p>
                </div>
              </div>
              <div className="hidden md:block" />
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-14 rounded-3xl border border-border bg-card p-8 text-center shadow-(--shadow-card)
">
        <h2 className="text-xl font-semibold">{t("journey.cta.title")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("journey.cta.desc")}</p>
        <Link
          to="/procedures"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-(--gradient-hero) px-6 py-3 text-sm font-semibold text-primary-foreground shadow-(--shadow-soft)"
        >
          {t("journey.cta.btn")} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
