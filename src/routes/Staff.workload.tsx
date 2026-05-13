import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/contexts/auth-context";

export const Route = createFileRoute("/Staff/workload")({
  component: WorkloadPage,
});

type WorkloadLink = { label: string; href: string };
type UnitGroup = { id: string; name: string; emoji: string; links: WorkloadLink[] };

const units: UnitGroup[] = [
  {
    id: "intervention", name: "Intervention", emoji: "🫁",
    links: [
      { label: "ภาระงานพยาบาล",               href: "#" },
      { label: "ภาระงานพยาบาลย้อนหลัง",        href: "#" },
      { label: "ภาระงานผู้ช่วยพยาบาล",         href: "#" },
      { label: "ภาระงานผู้ช่วยพยาบาลย้อนหลัง", href: "#" },
    ],
  },
  {
    id: "spect", name: "SPECT / CT", emoji: "☢️",
    links: [
      { label: "ภาระงานพยาบาล",               href: "#" },
      { label: "ภาระงานพยาบาลย้อนหลัง",        href: "#" },
      { label: "ภาระงานผู้ช่วยพยาบาล",         href: "#" },
      { label: "ภาระงานผู้ช่วยพยาบาลย้อนหลัง", href: "#" },
    ],
  },
  {
    id: "radiation", name: "Radiation Therapy", emoji: "🎯",
    links: [
      { label: "ภาระงานพยาบาล",               href: "#" },
      { label: "ภาระงานพยาบาลย้อนหลัง",        href: "#" },
      { label: "ภาระงานผู้ช่วยพยาบาล",         href: "#" },
      { label: "ภาระงานผู้ช่วยพยาบาลย้อนหลัง", href: "#" },
    ],
  },
  {
    id: "diagnostic", name: "Diagnostic Radiology", emoji: "🔍",
    links: [
      { label: "ภาระงานพยาบาล",        href: "#" },
      { label: "ภาระงานพยาบาลย้อนหลัง", href: "#" },
    ],
  },
];

function UnitRow({ unit }: { unit: UnitGroup }) {
  return (
    <div className="flex rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="bg-[#1e4d8c] flex flex-col items-center justify-center gap-2 px-5 py-5 min-w-[130px] w-[130px] flex-shrink-0">
        <span className="text-4xl leading-none">{unit.emoji}</span>
        <span className="text-white text-xs font-bold text-center leading-snug px-1">{unit.name}</span>
      </div>
      <div className="flex-1 bg-[#eef3fb] p-5 flex flex-wrap gap-3 items-center">
        {unit.links.map((link) => {
          const hasLink = link.href !== "#";
          return (
            <button
              key={link.label}
              disabled={!hasLink}
              onClick={() => hasLink && window.open(link.href, "_blank")}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150
                ${hasLink
                  ? "bg-[#1e4d8c] text-white hover:bg-[#163d73] shadow-sm hover:shadow-md cursor-pointer"
                  : "bg-[#1e4d8c]/40 text-white/70 cursor-default"}`}
            >
              {link.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function WorkloadPage() {
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
    { id: "intervention", label: "🫁 Intervention" },
    { id: "spect",        label: "☢️ SPECT / CT" },
    { id: "radiation",    label: "🎯 Radiation Therapy" },
    { id: "diagnostic",   label: "🔍 Diagnostic Radiology" },
  ];

  return (
    <div className="min-h-screen bg-background">
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
          <h1 className="text-white text-2xl font-bold">ภาระงานแต่ละหน่วยงาน</h1>
          <p className="text-white/70 text-sm mt-1">ข้อมูลภาระงานพยาบาลและผู้ช่วยพยาบาล แยกตามหน่วยปฏิบัติงาน</p>
        </div>
        <div className="h-5 bg-background rounded-t-[2rem] relative z-10" />
      </div>

      <div className="max-w-5xl mx-auto px-5 -mt-1 pb-12">
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
        <div
          className="text-center rounded-xl py-3 mb-5"
          style={{ background: "linear-gradient(90deg,#c6d8f5 0%,#dce8fb 50%,#c6d8f5 100%)" }}
        >
          <h2 className="text-[#1e3a6e] text-base font-bold tracking-wide">ภาระงานแต่ละหน่วยงาน</h2>
        </div>
        <div className="flex flex-col gap-4">
          {filtered.map((unit) => <UnitRow key={unit.id} unit={unit} />)}
        </div>
      </div>
    </div>
  );
}