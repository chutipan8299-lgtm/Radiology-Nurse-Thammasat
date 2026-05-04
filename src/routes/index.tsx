import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search,
  ArrowRight,
  Stethoscope,
  Activity,
  Atom,
  Radiation,
  ShieldCheck,
  FileText,
  AlertCircle,
  Sparkles,
  Clock,
  HeartHandshake,
} from "lucide-react";
import { useMemo, useState } from "react";
import { procedures, type Category } from "@/data/procedures";
import { useMode } from "@/contexts/mode-context";

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

const services: { name: Category; icon: typeof Stethoscope; desc: string }[] = [
  { name: "Diagnostic Radiology", icon: Stethoscope, desc: "X-ray, CT, MRI, ultrasound — see what's inside, safely." },
  { name: "Interventional Radiology", icon: Activity, desc: "Minimally invasive image-guided treatments." },
  { name: "Nuclear Medicine", icon: Atom, desc: "PET, SPECT and tracer-based diagnostics." },
  { name: "Radiation Therapy", icon: Radiation, desc: "Targeted radiation treatment for cancer care." },
];

function HomePage() {
  const { mode } = useMode();
  const [q, setQ] = useState("");

  const matches = useMemo(() => {
    if (!q.trim()) return [];
    const s = q.toLowerCase();
    return procedures
      .filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.category.toLowerCase().includes(s) ||
          p.keywords.some((k) => k.includes(s)),
      )
      .slice(0, 5);
  }, [q]);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[var(--gradient-soft)]" />
        <div className="absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-[var(--gradient-hero)] opacity-20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 -z-10 h-72 w-72 rounded-full bg-accent opacity-40 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 pb-16 pt-12 md:px-6 md:pb-24 md:pt-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                {mode === "patient" ? "Patient-friendly guides" : "Staff resources & protocols"}
              </div>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Radiology Nursing <span className="bg-[var(--gradient-hero)] bg-clip-text text-transparent">Unit</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Preparation & guidance for radiology procedures — clear, calm, and trustworthy. Know what to expect before, during, and after your visit.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/journey"
                  className="group inline-flex items-center gap-2 rounded-full bg-[var(--gradient-hero)] px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
                >
                  Prepare Before Your Visit
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/procedures"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary"
                >
                  <Search className="h-4 w-4" /> Search Procedures
                </Link>
              </div>

              {/* Search */}
              <div className="relative mt-8 max-w-xl">
                <div className="flex items-center gap-2 rounded-2xl border border-border bg-background p-2 shadow-[var(--shadow-card)] focus-within:ring-2 focus-within:ring-ring">
                  <Search className="ml-2 h-5 w-5 text-muted-foreground" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search e.g. CT scan, Lung biopsy"
                    className="flex-1 bg-transparent px-1 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                  />
                  <Link
                    to="/procedures"
                    search={{ q }}
                    className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    Search
                  </Link>
                </div>
                {matches.length > 0 && (
                  <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-border bg-popover shadow-xl">
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

            {/* Hero illustration card */}
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-[2rem] bg-[var(--gradient-hero)] opacity-30 blur-2xl" />
              <div className="rounded-[2rem] border border-border bg-background p-6 shadow-[var(--shadow-soft)] md:p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                    <span className="text-xs font-medium text-muted-foreground">Your visit at a glance</span>
                  </div>
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-medium text-secondary-foreground">Today</span>
                </div>
                <div className="mt-6 space-y-4">
                  {[
                    { icon: ShieldCheck, t: "Safe & evidence-based", d: "Care follows the latest hospital protocols." },
                    { icon: HeartHandshake, t: "Compassionate team", d: "Nurses guide you through every step." },
                    { icon: Clock, t: "On-time & efficient", d: "Most visits take 15–60 minutes." },
                  ].map((f) => (
                    <div key={f.t} className="flex items-start gap-3 rounded-2xl bg-muted/60 p-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background text-primary shadow-sm">
                        <f.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{f.t}</div>
                        <div className="text-xs text-muted-foreground">{f.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Our Services</h2>
            <p className="mt-2 text-sm text-muted-foreground">Choose a category to explore procedures and prepare ahead.</p>
          </div>
          <Link to="/procedures" className="hidden text-sm font-medium text-primary hover:underline md:inline">
            View all procedures →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Link
              key={s.name}
              to="/procedures"
              search={{ category: s.name }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[var(--gradient-hero)] opacity-0 blur-2xl transition-opacity group-hover:opacity-30" />
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">{s.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary">
                Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick access — staff focused but useful for all */}
      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-foreground md:text-2xl">
                {mode === "staff" ? "Staff Quick Access" : "Helpful Resources"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {mode === "staff"
                  ? "Fast links to protocols, guidelines, and common procedures."
                  : "Information sheets and emergency guidance — at your fingertips."}
              </p>
            </div>
            {mode === "staff" && (
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                Staff Mode
              </span>
            )}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { icon: FileText, t: "Download Protocols", d: "Standardized clinical procedures (PDF).", to: "/procedures" },
              { icon: AlertCircle, t: "Emergency Guidelines", d: "Contrast reactions, codes, and escalation.", to: "/procedures" },
              { icon: Stethoscope, t: "Common Procedures", d: "Quick reference for daily workflows.", to: "/procedures" },
            ].map((c) => (
              <Link
                key={c.t}
                to={c.to}
                className="group flex items-start gap-3 rounded-2xl border border-border bg-background p-4 hover:border-primary/40 hover:bg-secondary/40"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{c.t}</div>
                  <div className="text-xs text-muted-foreground">{c.d}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}