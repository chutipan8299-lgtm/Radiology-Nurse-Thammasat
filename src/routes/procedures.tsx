import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { Search, ArrowRight, Stethoscope, Activity, Atom, Radiation, Sparkles, Clock } from "lucide-react";
import { procedures, categories, type Category, type Type, type Complexity } from "@/data/procedures";
import { useLanguage } from "@/contexts/language-context";
import { localizeProcedure } from "@/lib/procedure-i18n";

type Search = {
  q?: string;
  category?: Category | "all";
  type?: Type | "all";
  complexity?: Complexity | "all";
};

export const Route = createFileRoute("/procedures")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : undefined,
    category: (s.category as Search["category"]) ?? "all",
    type: (s.type as Search["type"]) ?? "all",
    complexity: (s.complexity as Search["complexity"]) ?? "all",
  }),
  head: () => ({
    meta: [
      { title: "Radiology Procedures — Browse & Prepare" },
      { name: "description", content: "Browse all radiology procedures with preparation instructions and patient guidance." },
    ],
  }),
  component: ProceduresPage,
});

const categoryIcon: Record<Category, typeof Stethoscope> = {
  "Diagnostic Radiology": Stethoscope,
  "Interventional Radiology": Activity,
  "Nuclear Medicine": Atom,
  "Radiation Therapy": Radiation,
};

const categoryKeyMap: Record<Category, string> = {
  "Diagnostic Radiology": "service.diagnostic.name",
  "Interventional Radiology": "service.interventional.name",
  "Nuclear Medicine": "service.nuclear.name",
  "Radiation Therapy": "service.radiation.name",
};

// Category gradient backgrounds for card hero blocks (pink-themed scale)
const categoryGradient: Record<Category, string> = {
  "Diagnostic Radiology":
    "bg-[linear-gradient(135deg,oklch(0.94_0.05_355),oklch(0.86_0.12_350))]",
  "Interventional Radiology":
    "bg-[linear-gradient(135deg,oklch(0.74_0.16_355),oklch(0.62_0.19_0))]",
  "Nuclear Medicine":
    "bg-[linear-gradient(135deg,oklch(0.88_0.09_345),oklch(0.72_0.17_350))]",
  "Radiation Therapy":
    "bg-[linear-gradient(135deg,oklch(0.82_0.13_15),oklch(0.6_0.21_15))]",
};

// Featured order: surface the requested procedures first
const featuredOrder = [
  "lung-biopsy",
  "rfa",
  "ptbd",
  "tace",
  "picc-line",
  "vascular-intervention",
];

function ProceduresPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { t: tr, lang } = useLanguage();
  const [q, setQ] = useState(search.q ?? "");

  useEffect(() => setQ(search.q ?? ""), [search.q]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    const list = procedures.map((p) => localizeProcedure(p, lang)).filter((p) => {
      if (search.category && search.category !== "all" && p.category !== search.category) return false;
      if (search.type && search.type !== "all" && p.type !== search.type) return false;
      if (search.complexity && search.complexity !== "all" && p.complexity !== search.complexity) return false;
      if (!s) return true;
      return (
        p.name.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s) ||
        p.keywords.some((k) => k.includes(s))
      );
    });
    // Sort featured procedures to the top
    return list.sort((a, b) => {
      const ai = featuredOrder.indexOf(a.id);
      const bi = featuredOrder.indexOf(b.id);
      const av = ai === -1 ? 999 : ai;
      const bv = bi === -1 ? 999 : bi;
      return av - bv;
    });
  }, [q, search, lang]);

  return (
    <div className="relative">
      {/* Soft pink ambient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,oklch(0.95_0.05_355)_0%,transparent_70%)]"
      />

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        {/* Hero */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Radiology Nursing · TUH
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {tr("proc.title")}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {tr("proc.subtitle")}
          </p>
        </div>

        {/* Search */}
        <div className="mx-auto mt-8 flex max-w-2xl items-center gap-2 rounded-full border border-border bg-card p-1.5 shadow-[0_4px_24px_-8px_oklch(0.62_0.19_0/0.18)] focus-within:border-primary/40 focus-within:shadow-[0_8px_32px_-8px_oklch(0.62_0.19_0/0.25)]">
          <Search className="ml-3 h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              navigate({ search: (prev: Search) => ({ ...prev, q: e.target.value || undefined }) });
            }}
            placeholder={tr("home.search.placeholder")}
            className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button className="hidden rounded-full bg-[var(--gradient-hero)] px-5 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition hover:opacity-95 sm:inline-flex">
            {tr("home.search.button")}
          </button>
        </div>

        {/* Filter chips */}
        <div className="mx-auto mt-5 flex max-w-4xl flex-wrap items-center justify-center gap-2">
          <FilterPill
            label={tr("proc.all")}
            active={(search.category ?? "all") === "all"}
            onClick={() => navigate({ search: (p: Search) => ({ ...p, category: "all" }) })}
          />
          {categories.map((c) => (
            <FilterPill
              key={c}
              label={tr(categoryKeyMap[c])}
              active={search.category === c}
              onClick={() => navigate({ search: (p: Search) => ({ ...p, category: c }) })}
            />
          ))}
        </div>

        {/* Results grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => {
            const Icon = categoryIcon[p.category];
            const isFeatured = featuredOrder.includes(p.id);
            return (
              <Link
                key={p.id}
                to="/procedures/$procedureId"
                params={{ procedureId: p.id }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[0_4px_20px_-8px_oklch(0.62_0.19_0/0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_44px_-16px_oklch(0.62_0.19_0/0.28)]"
              >
                {/* Hero image block */}
                <div className={`relative h-44 overflow-hidden ${categoryGradient[p.category]}`}>
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(1_0_0/0.35),transparent_55%),radial-gradient(circle_at_80%_80%,oklch(1_0_0/0.18),transparent_50%)]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/25 text-white shadow-lg backdrop-blur-md ring-1 ring-white/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="h-10 w-10" />
                    </div>
                  </div>
                  <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary shadow-sm backdrop-blur">
                    {tr(categoryKeyMap[p.category])}
                  </span>
                  {isFeatured && (
                    <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-foreground/85 px-2.5 py-1 text-[10px] font-medium text-background backdrop-blur">
                      <Sparkles className="h-3 w-3" /> Featured
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                    {p.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 font-medium text-secondary-foreground">
                      <Clock className="h-3 w-3" /> {p.duration}
                    </span>
                    <span className="inline-flex items-center rounded-full border border-border px-2.5 py-1 font-medium">
                      {tr(`proc.complexity.${p.complexity}`)}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4">
                    <span className="text-xs text-muted-foreground">{tr(`proc.type.${p.type}`)}</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--gradient-hero)] px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm transition-transform group-hover:translate-x-0.5">
                      ดูรายละเอียด
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
          {filtered.length === 0 && (
            <div className="col-span-full rounded-3xl border border-dashed border-border bg-card/50 p-12 text-center text-muted-foreground">
              {tr("proc.noResults")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-full border px-4 py-1.5 text-xs font-medium transition-all " +
        (active
          ? "border-transparent bg-[var(--gradient-hero)] text-primary-foreground shadow-[0_4px_14px_-4px_oklch(0.62_0.19_0/0.4)]"
          : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary")
      }
    >
      {label}
    </button>
  );
}