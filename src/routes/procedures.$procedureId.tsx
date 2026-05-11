import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Users,
  AlertTriangle,
  ClipboardCheck,
  ListOrdered,
  HeartPulse,
  HelpCircle,
  FileText,
  Phone,
  MapPin,
  Stethoscope,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { procedures } from "@/data/procedures";
import { useMode } from "@/contexts/mode-context";
import { useLanguage } from "@/contexts/language-context";
import { useLocalizedProcedure } from "@/lib/procedure-i18n";

const categoryKey = (c: string) =>
  c === "Diagnostic Radiology"
    ? "service.diagnostic.name"
    : c === "Interventional Radiology"
      ? "service.interventional.name"
      : c === "Nuclear Medicine"
        ? "service.nuclear.name"
        : "service.radiation.name";

export const Route = createFileRoute("/procedures/$procedureId")({
  loader: ({ params }) => {
    const p = procedures.find((x) => x.id === params.procedureId);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Procedure"} — Radiology Nursing Unit` },
      { name: "description", content: loaderData?.description ?? "Procedure details and preparation." },
    ],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">Procedure not found</h1>
      <Link to="/procedures" className="mt-6 inline-flex items-center gap-2 text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to procedures
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center text-destructive">{error.message}</div>
  ),
  component: ProcedureDetail,
});

function ProcedureDetail() {
  const raw = Route.useLoaderData();
  const { mode } = useMode();
  const { t } = useLanguage();
  const p = useLocalizedProcedure(raw);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <Link to="/procedures" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> {t("detail.back")}
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Main */}
        <article className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">{t(categoryKey(p.category))}</span>
            <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{t(`proc.type.${p.type}`)}</span>
            <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{t(`proc.complexity.${p.complexity}`)}</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" /> {p.duration}
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">{p.name}</h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">{p.description}</p>

          {/* Media placeholder */}
          <div className="mt-8 aspect-video overflow-hidden rounded-2xl border border-border bg-(--gradient-soft)">
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-background shadow-md">
                  <Stethoscope className="h-6 w-6 text-primary" />
                </div>
                <p className="mt-3 text-sm">{t("detail.videoSoon")}</p>
              </div>
            </div>
          </div>

          <Section icon={Users} title={t("detail.who")}>
            <p>{p.whoFor}</p>
          </Section>

          <Section icon={AlertTriangle} title={t("detail.risks")} tone="warn">
            <ul className="space-y-2">
              {p.risks.map((r: string) => (
                <li key={r} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />{r}</li>
              ))}
            </ul>
          </Section>

          <Section icon={ClipboardCheck} title={t("detail.prep")}>
            <ol className="space-y-3">
              {p.preparation.map((s: string, i: number) => (
                <li key={s} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{i + 1}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </Section>

          <Section icon={ListOrdered} title={t("detail.steps")}>
            <ol className="space-y-3">
              {p.steps.map((s: string, i: number) => (
                <li key={s} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-(--gradient-hero) text-xs font-semibold text-primary-foreground">{i + 1}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </Section>

          <Section icon={HeartPulse} title={t("detail.after")}>
            <ul className="space-y-2">
              {p.aftercare.map((s: string) => (
                <li key={s} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{s}</li>
              ))}
            </ul>
          </Section>

          <Section icon={HelpCircle} title={t("detail.faq")}>
            <div className="divide-y divide-border rounded-2xl border border-border bg-background">
              {p.faq.map((f: { q: string; a: string }, i: number) => <FaqItem key={i} q={f.q} a={f.a} />)}
            </div>
          </Section>

          {/* Staff-only sections */}
          {mode === "staff" && (
            <>
              <div className="mt-12 rounded-2xl border border-accent bg-accent/30 p-5">
                <span className="inline-flex items-center gap-1 rounded-full bg-background px-2.5 py-1 text-[10px] font-medium text-primary">
                  {t("mode.staffBadge")}
                </span>
                <h2 className="mt-3 text-lg font-semibold text-foreground">{t("detail.clinicalNotes")}</h2>
                <ul className="mt-3 space-y-2 text-sm text-foreground">
                  {(p.staffNotes ?? [t("detail.noNotes")]).map((n: string) => (
                    <li key={n} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{n}</li>
                  ))}
                </ul>
              </div>

              {p.protocol && p.protocol.length > 0 && (
                <Section icon={FileText} title={t("detail.protocol")}>
                  <ul className="space-y-2">
                    {p.protocol.map((s: string) => <li key={s} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-deep" />{s}</li>)}
                  </ul>
                </Section>
              )}

              {p.checklist && p.checklist.length > 0 && (
                <Section icon={ClipboardCheck} title={t("detail.checklist")}>
                  <ul className="space-y-2">
                    {p.checklist.map((s: string) => (
                      <li key={s} className="flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-2">
                        <input type="checkbox" className="h-4 w-4 accent-[oklch(0.62_0.19_0)]" />
                        <span className="text-sm">{s}</span>
                      </li>
                    ))}
                  </ul>
                </Section>
              )}
            </>
          )}
        </article>

        {/* Sticky sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-(--shadow-card)">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t("detail.needHelp")}</div>
            <div className="mt-4 space-y-3">
              <a href="tel:+6621234567" className="flex items-center justify-between rounded-xl bg-(--gradient-hero) px-4 py-3 text-sm font-semibold text-primary-foreground shadow-(--shadow-soft)">
                <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4" /> {t("detail.contactHospital")}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link to="/contact" className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary">
                <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {t("detail.viewLocation")}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button className="flex w-full items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary">
                <span className="inline-flex items-center gap-2"><FileText className="h-4 w-4 text-primary" /> {t("detail.downloadInfo")}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-5 rounded-xl bg-muted p-4 text-xs text-muted-foreground">
              <strong className="text-foreground">{t("detail.hours")}</strong>
              <div className="mt-1">{t("detail.hours.mf")}</div>
              <div>{t("detail.hours.sat")}</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  children,
  tone,
}: {
  icon: typeof Stethoscope;
  title: string;
  children: React.ReactNode;
  tone?: "warn";
}) {
  return (
    <section className="mt-10">
      <div className="flex items-center gap-2">
        <div className={"flex h-9 w-9 items-center justify-center rounded-xl " + (tone === "warn" ? "bg-destructive/10 text-destructive" : "bg-secondary text-primary")}>
          <Icon className="h-4.5 w-4.5" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      </div>
      <div className="mt-3 text-sm leading-relaxed text-foreground/90">{children}</div>
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left">
        <span className="text-sm font-medium text-foreground">{q}</span>
        <ChevronDown className={"h-4 w-4 shrink-0 text-muted-foreground transition-transform " + (open ? "rotate-180" : "")} />
      </button>
      {open && <div className="px-4 pb-4 text-sm text-muted-foreground">{a}</div>}
    </div>
  );
}