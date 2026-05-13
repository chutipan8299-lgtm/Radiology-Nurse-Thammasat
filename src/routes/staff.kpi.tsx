import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/contexts/auth-context";

export const Route = createFileRoute("/staff/kpi")({
  component: KpiPage,
});

// ══════════════════════════════════════════════════════════════
//  DATA — ใส่ href จริง
// ══════════════════════════════════════════════════════════════

type KpiUnit = {
  id: string;
  name: string;
  emoji: string;
  href: string;
  historyHref: string;
};

type DetailCategory = {
  id: string;
  label: string;
  emoji: string;
  href: string;
};

const units: KpiUnit[] = [
  { id: "central",      name: "ส่วนกลาง",         emoji: "🏥", href: "#", historyHref: "#" },
  { id: "intervention", name: "Intervention",      emoji: "🫁", href: "#", historyHref: "#" },
  { id: "spect",        name: "SPECT / CT",        emoji: "☢️", href: "#", historyHref: "#" },
  { id: "radiation",    name: "Radiation Therapy", emoji: "🎯", href: "#", historyHref: "#" },
  { id: "screening",    name: "คัดกรองผู้ป่วย",   emoji: "🔍", href: "#", historyHref: "#" },
];

// รายละเอียดสถิติตัวชี้วัด แยกตามหัวข้อการลงข้อมูล (จากหน้าเก่า)
const detailCategories: DetailCategory[] = [
  { id: "central",    label: "ภาพกลาง",         emoji: "🦇", href: "#" },
  { id: "interv",     label: "Intervention",     emoji: "🐱", href: "#" },
  { id: "spect",      label: "SPECT/CT",         emoji: "🕷️", href: "#" },
  { id: "radiation",  label: "Radiation Therapy",emoji: "🐦", href: "#" },
  { id: "pn",         label: "PN",               emoji: "🧙", href: "#" },
  { id: "risk",       label: "Risk",             emoji: "🌵", href: "#" },
];

// ── KPI Row ───────────────────────────────────────────────────
function KpiRow({ unit }: { unit: KpiUnit }) {
  const open = (href: string) => href !== "#" && window.open(href, "_blank");
  return (
    <div className="flex rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* ซ้าย */}
      <div className="bg-[#1e4d8c] flex flex-col items-center justify-center gap-2 px-5 py-5 min-w-[130px] w-[130px] flex-shrink-0">
        <span className="text-4xl leading-none">{unit.emoji}</span>
        <span className="text-white text-xs font-bold text-center leading-snug px-1">{unit.name}</span>
      </div>
      {/* ขวา */}
      <div className="flex-1 bg-[#eef3fb] p-5 flex flex-wrap gap-3 items-center">
        <button
          onClick={() => open(unit.href)}
          disabled={unit.href === "#"}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150
            ${unit.href !== "#"
              ? "bg-[#1e4d8c] text-white hover:bg-[#163d73] shadow-sm hover:shadow-md cursor-pointer"
              : "bg-[#1e4d8c]/40 text-white/70 cursor-default"}`}
        >
          📊 ภาพรวมตัวชี้วัด
        </button>
        <button
          onClick={() => open(unit.historyHref)}
          disabled={unit.historyHref === "#"}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150
            ${unit.historyHref !== "#"
              ? "bg-[#1e4d8c] text-white hover:bg-[#163d73] shadow-sm hover:shadow-md cursor-pointer"
              : "bg-[#1e4d8c]/40 text-white/70 cursor-default"}`}
        >
          🗂️ ตัวชี้วัดย้อนหลัง
        </button>
      </div>
    </div>
  );
}

// ── Detail Category Circle ────────────────────────────────────
function DetailCircle({ cat }: { cat: DetailCategory }) {
  const open = () => cat.href !== "#" && window.open(cat.href, "_blank");
  return (
    <button
      onClick={open}
      className="flex flex-col items-center gap-2 group"
    >
      <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/30 flex flex-col items-center justify-center gap-1
        group-hover:bg-primary/20 group-hover:border-primary/60 group-hover:scale-105 transition-all duration-200 shadow-sm">
        <span className="text-2xl leading-none">{cat.emoji}</span>
        <span className="text-[10px] font-bold text-primary text-center leading-tight px-2">{cat.label}</span>
      </div>
    </button>
  );
}

// ── Page ─────────────────────────────────────────────────────
function KpiPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeUnit, setActiveUnit] = React.useState("all");

  React.useEffect(() => {
    if (!loading && !user) navigate({ to: "/staff/login" });
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-7 h-7 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  const filtered = activeUnit === "all" ? units : units.filter((u) => u.id === activeUnit);

  const tabs = [
    { id: "all",          label: "ทั้งหมด" },
    { id: "central",      label: "🏥 ส่วนกลาง" },
    { id: "intervention", label: "🫁 Intervention" },
    { id: "spect",        label: "☢️ SPECT / CT" },
    { id: "radiation",    label: "🎯 Radiation Therapy" },
    { id: "screening",    label: "🔍 คัดกรองผู้ป่วย" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-white" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-white" />
        </div>
        <div className="relative max-w-5xl mx-auto px-5 py-8">
          <button
            onClick={() => navigate({ to: "/staff/internal" })}
            className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs mb-4 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            กลับหน้าบริหารภายใน
          </button>
          <h1 className="text-white text-2xl font-bold">ตัวชี้วัด</h1>
          <p className="text-white/70 text-sm mt-1">ภาพรวมและรายละเอียดสถิติตัวชี้วัดแต่ละหน่วยปฏิบัติงาน</p>
        </div>
        <div className="h-5 bg-background rounded-t-[2rem] relative z-10" />
      </div>

      <div className="max-w-5xl mx-auto px-5 -mt-1 pb-12">
        {/* Tabs */}
        <div className="flex overflow-x-auto gap-1 pb-1 mb-6 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveUnit(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 flex-shrink-0
                ${activeUnit === tab.id
                  ? "bg-primary text-white shadow-sm"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Title bar */}
        <div
          className="text-center rounded-xl py-3 mb-5"
          style={{ background: "linear-gradient(90deg,#c6d8f5 0%,#dce8fb 50%,#c6d8f5 100%)" }}
        >
          <h2 className="text-[#1e3a6e] text-base font-bold tracking-wide">ตัวชี้วัดหน่วยงาน</h2>
        </div>

        {/* KPI Rows */}
        <div className="flex flex-col gap-4">
          {filtered.map((unit) => <KpiRow key={unit.id} unit={unit} />)}
        </div>

        {/* ── Detail section จากหน้าเก่า ── */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <h2 className="text-[#1e3a6e] text-base font-bold mb-1">
            รายละเอียดสถิติตัวชี้วัด
          </h2>
          <p className="text-muted-foreground text-xs mb-6">(แยกตามหัวข้อการลงข้อมูล)</p>
          <div className="flex flex-wrap gap-6 justify-center">
            {detailCategories.map((cat) => (
              <DetailCircle key={cat.id} cat={cat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}