import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search,
  ArrowRight,
  Stethoscope,
  Activity,
  Atom,
  Radiation,
  FileText,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import { procedures, type Category } from "@/data/procedures";
import { localizeProcedure } from "@/lib/procedure-i18n";
import { useMode } from "@/contexts/mode-context";
import { useLanguage } from "@/contexts/language-context";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Radiology Nursing Unit — Preparation & Guidance" },
      {
        name: "description",
        content:
          "Step-by-step preparation, procedure information, and staff resources for the Radiology Nursing Unit.",
      },
    ],
  }),
  component: HomePage,
});

const services: { name: Category; icon: typeof Stethoscope; nameKey: string; descKey: string }[] = [
  { name: "Diagnostic Radiology", icon: Stethoscope, nameKey: "service.diagnostic.name", descKey: "service.diagnostic.desc" },
  { name: "Interventional Radiology", icon: Activity, nameKey: "service.interventional.name", descKey: "service.interventional.desc" },
  { name: "Nuclear Medicine", icon: Atom, nameKey: "service.nuclear.name", descKey: "service.nuclear.desc" },
  { name: "Radiation Therapy", icon: Radiation, nameKey: "service.radiation.name", descKey: "service.radiation.desc" },
];

function HomePage() {
  const { mode } = useMode();
  const { t, lang } = useLanguage();
  const [q, setQ] = useState("");

  const matches = useMemo(() => {
    if (!q.trim()) return [];
    const s = q.toLowerCase();
    return procedures
      .map((p) => localizeProcedure(p, lang))
      .filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.category.toLowerCase().includes(s) ||
          p.keywords.some((k) => k.includes(s)),
      )
      .slice(0, 5);
  }, [q, lang]);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-(--gradient-soft)" />
        <div className="absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-(--gradient-hero) opacity-20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 -z-10 h-72 w-72 rounded-full bg-accent opacity-40 blur-3xl" />

        <div className="mx-auto max-w-3xl px-4 pb-16 pt-12 text-center md:px-6 md:pb-24 md:pt-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-primary shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            {mode === "patient" ? t("home.badge.patient") : t("home.badge.staff")}
          </div>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {t("home.title.prefix")}{" "}
            <span className="bg-(--gradient-hero) bg-clip-text text-transparent">
              {t("home.title.highlight")}
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("home.subtitle")}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/journey"
              className="group inline-flex items-center gap-2 rounded-full bg-(--gradient-hero) px-6 py-3 text-sm font-semibold text-primary-foreground shadow-(--shadow-soft) transition-transform hover:-translate-y-0.5"
            >
              {t("home.cta.prepare")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/procedures"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary"
            >
              <Search className="h-4 w-4" /> {t("home.cta.search")}
            </Link>
          </div>

          {/* Search */}
          <div className="relative mx-auto mt-8 max-w-xl">
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-background p-2 shadow-[var(--shadow-card)] focus-within:ring-2 focus-within:ring-ring">
              <Search className="ml-2 h-5 w-5 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("home.search.placeholder")}
                className="flex-1 bg-transparent px-1 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <Link
                to="/procedures"
                search={{ q }}
                className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
              >
                {t("home.search.button")}
              </Link>
            </div>
            {matches.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-border bg-popover shadow-xl text-left">
                {matches.map((m) => (
                  <Link
                    key={m.id}
                    to="/procedures/$procedureId"
                    params={{ procedureId: m.id }}
                    className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 last:border-b-0 hover:bg-secondary"
                  >
                    <div>
                      <div className="text-sm font-medium text-foreground">{m.name}</div>
                      <div className="text-xs text-muted-foreground">{m.category}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{t("home.services.title")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t("home.services.subtitle")}</p>
          </div>
          <Link to="/procedures" className="hidden text-sm font-medium text-primary hover:underline md:inline">
            {t("home.services.viewAll")}
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Link
              key={s.name}
              to="/procedures"
              search={{ category: s.name }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-(--shadow-card) transition-all hover:-translate-y-1 hover:shadow-(--shadow-soft)"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-(--gradient-hero) opacity-0 blur-2xl transition-opacity group-hover:opacity-30" />
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">{t(s.nameKey)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t(s.descKey)}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary">
                {t("home.services.explore")} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick access */}
      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-(--shadow-card) md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-foreground md:text-2xl">
                {mode === "staff" ? t("home.quick.staff.title") : t("home.quick.patient.title")}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {mode === "staff" ? t("home.quick.staff.desc") : t("home.quick.patient.desc")}
              </p>
            </div>
            {mode === "staff" && (
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                {t("mode.staffBadge")}
              </span>
            )}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { icon: FileText, tk: "home.quick.protocols.t", dk: "home.quick.protocols.d", to: "/procedures" },
              { icon: AlertCircle, tk: "home.quick.emergency.t", dk: "home.quick.emergency.d", to: "/procedures" },
              { icon: Stethoscope, tk: "home.quick.common.t", dk: "home.quick.common.d", to: "/procedures" },
            ].map((c) => (
              <Link
                key={c.tk}
                to={c.to}
                className="group flex items-start gap-3 rounded-2xl border border-border bg-background p-4 hover:border-primary/40 hover:bg-secondary/40"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t(c.tk)}</div>
                  <div className="text-xs text-muted-foreground">{t(c.dk)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}