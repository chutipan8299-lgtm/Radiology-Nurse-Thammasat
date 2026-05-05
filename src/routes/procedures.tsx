import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { Search, Filter, ArrowRight, Stethoscope, Activity, Atom, Radiation } from "lucide-react";
import { procedures, categories, type Category, type Type, type Complexity } from "@/data/procedures";
import { useLanguage } from "@/contexts/language-context";

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

function ProceduresPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { t: tr } = useLanguage();
  const [q, setQ] = useState(search.q ?? "");

  useEffect(() => setQ(search.q ?? ""), [search.q]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return procedures.filter((p) => {
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
  }, [q, search]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{tr("proc.title")}</h1>
        <p className="mt-2 text-muted-foreground">{tr("proc.subtitle")}</p>
      </div>

      {/* Search */}
      <div className="mt-6 flex items-center gap-2 rounded-2xl border border-border bg-background p-2 shadow-[var(--shadow-card)]">
        <Search className="ml-2 h-5 w-5 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            navigate({ search: (prev: Search) => ({ ...prev, q: e.target.value || undefined }) });
          }}
          placeholder={tr("home.search.placeholder")}
          className="flex-1 bg-transparent px-1 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>

      {/* Filters */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
          <Filter className="h-3.5 w-3.5" /> {tr("proc.filter")}
        </span>
        <FilterPill
          label={tr("proc.all")}
          active={(search.category ?? "all") === "all"}
          onClick={() => navigate({ search: (p: Search) => ({ ...p, category: "all" }) })}
        />
        {categories.map((c) => (
          <FilterPill
            key={c}
            label={c}
            active={search.category === c}
            onClick={() => navigate({ search: (p: Search) => ({ ...p, category: c }) })}
          />
        ))}
        <span className="mx-2 hidden h-5 w-px bg-border md:inline" />
        {(["all", "Diagnostic", "Treatment"] as const).map((t) => (
          <FilterPill
            key={t}
            label={t === "all" ? tr("proc.anyType") : tr(`proc.type.${t}`)}
            active={(search.type ?? "all") === t}
            onClick={() => navigate({ search: (p: Search) => ({ ...p, type: t }) })}
          />
        ))}
        {(["all", "Non-invasive", "Invasive"] as const).map((c) => (
          <FilterPill
            key={c}
            label={c === "all" ? tr("proc.anyComplexity") : tr(`proc.complexity.${c}`)}
            active={(search.complexity ?? "all") === c}
            onClick={() => navigate({ search: (p: Search) => ({ ...p, complexity: c }) })}
          />
        ))}
      </div>

      {/* Results */}
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => {
          const Icon = categoryIcon[p.category];
          return (
            <Link
              key={p.id}
              to="/procedures/$procedureId"
              params={{ procedureId: p.id }}
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                  {tr(`proc.complexity.${p.complexity}`)}
                </span>
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">{p.name}</h3>
              <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                <span>{p.category}</span>
                <span className="inline-flex items-center gap-1 font-medium text-primary">
                  {tr("proc.viewDetails")} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
            {tr("proc.noResults")}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors " +
        (active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground")
      }
    >
      {label}
    </button>
  );
}