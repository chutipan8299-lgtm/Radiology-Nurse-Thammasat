import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/contexts/auth-context";

export const Route = createFileRoute("/staff/workunit")({
  component: WorkUnitPage,
});

// ══════════════════════════════════════════════════════════════
//  DATA — ยึดข้อมูลจากเว็บเก่า hospital.tu.ac.th
// ══════════════════════════════════════════════════════════════

type WorkLink = { label: string; href: string };
type Department = {
  id: string;
  name: string;
  name_en: string;
  emoji: string;
  gradient: string;
  bgLight: string;
  borderColor: string;
  description: string;
  nurseLinks: WorkLink[];
  assistantLinks: WorkLink[];
};

const departments: Department[] = [
  {
    id: "intervention",
    name: "รังสีร่วมรักษา",
    name_en: "Intervention",
    emoji: "💉",
    gradient: "linear-gradient(135deg,#e91e8c 0%,#c2185b 100%)",
    bgLight: "bg-rose-50",
    borderColor: "border-rose-200",
    description: "งานรังสีร่วมรักษาให้บริการตรวจและรักษาโรคด้วยเทคนิคทางรังสีวิทยาหลอดเลือดและอวัยวะต่างๆ",
    nurseLinks: [
      { label: "ภาระงานพยาบาล (ปัจจุบัน)", href: "#" },
      { label: "ภาระงานพยาบาลย้อนหลัง", href: "#" },
    ],
    assistantLinks: [
      { label: "ภาระงานผู้ช่วยพยาบาล (ปัจจุบัน)", href: "#" },
      { label: "ภาระงานผู้ช่วยพยาบาลย้อนหลัง", href: "#" },
    ],
  },
  {
    id: "spect",
    name: "เวชศาสตร์นิวเคลียร์",
    name_en: "SPECT / CT",
    emoji: "⚛️",
    gradient: "linear-gradient(135deg,#7c3aed 0%,#5b21b6 100%)",
    bgLight: "bg-purple-50",
    borderColor: "border-purple-200",
    description: "ให้บริการตรวจวินิจฉัยและรักษาโรคด้วยสารเภสัชรังสี ครอบคลุมการตรวจ SPECT และ CT",
    nurseLinks: [
      { label: "ภาระงานพยาบาล (ปัจจุบัน)", href: "#" },
      { label: "ภาระงานพยาบาลย้อนหลัง", href: "#" },
    ],
    assistantLinks: [
      { label: "ภาระงานผู้ช่วยพยาบาล (ปัจจุบัน)", href: "#" },
      { label: "ภาระงานผู้ช่วยพยาบาลย้อนหลัง", href: "#" },
    ],
  },
  {
    id: "rt",
    name: "รังสีรักษาและมะเร็งวิทยา",
    name_en: "Radiation Therapy",
    emoji: "🎯",
    gradient: "linear-gradient(135deg,#0284c7 0%,#0369a1 100%)",
    bgLight: "bg-sky-50",
    borderColor: "border-sky-200",
    description: "ให้บริการฉายรังสีรักษามะเร็งด้วยเครื่องมือทันสมัย ดูแลผู้ป่วยตลอดกระบวนการรักษา",
    nurseLinks: [
      { label: "ภาระงานพยาบาล (ปัจจุบัน)", href: "#" },
      { label: "ภาระงานพยาบาลย้อนหลัง", href: "#" },
    ],
    assistantLinks: [
      { label: "ภาระงานผู้ช่วยพยาบาล (ปัจจุบัน)", href: "#" },
      { label: "ภาระงานผู้ช่วยพยาบาลย้อนหลัง", href: "#" },
    ],
  },
  {
    id: "diag",
    name: "รังสีวินิจฉัย",
    name_en: "Diagnostic Radiology",
    emoji: "🩻",
    gradient: "linear-gradient(135deg,#059669 0%,#047857 100%)",
    bgLight: "bg-emerald-50",
    borderColor: "border-emerald-200",
    description: "ให้บริการตรวจวินิจฉัยโรคด้วยเครื่องมือรังสีวิทยาครบวงจร X-ray, CT, MRI และอัลตราซาวด์",
    nurseLinks: [
      { label: "ภาระงานพยาบาล (ปัจจุบัน)", href: "#" },
      { label: "ภาระงานพยาบาลย้อนหลัง", href: "#" },
    ],
    assistantLinks: [],
  },
];

// ══════════════════════════════════════════════════════════════
//  COMPONENTS
// ══════════════════════════════════════════════════════════════

function LinkRow({ link }: { link: WorkLink }) {
  const hasLink = link.href !== "#";
  return (
    <a
      href={hasLink ? link.href : undefined}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => !hasLink && e.preventDefault()}
      className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-medium transition-all
        ${hasLink
          ? "bg-white border border-border hover:border-primary/40 hover:shadow-sm text-foreground cursor-pointer"
          : "bg-muted/30 border border-border/50 text-muted-foreground cursor-default opacity-60"
        }`}
    >
      <svg className="w-3.5 h-3.5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
      {link.label}
      {hasLink && (
        <svg className="w-3 h-3 ml-auto text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      )}
    </a>
  );
}

function DeptCard({ dept }: { dept: Department }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={`bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 ${dept.borderColor}`}>
      {/* Gradient header */}
      <div
        className="px-6 py-5 flex items-center gap-4 cursor-pointer select-none"
        style={{ background: dept.gradient }}
        onClick={() => setOpen((v) => !v)}
      >
        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl shrink-0 backdrop-blur-sm">
          {dept.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-base leading-tight">{dept.name}</p>
          <p className="text-white/70 text-xs mt-0.5">{dept.name_en}</p>
        </div>
        <div className={`w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Description strip */}
      <div className={`px-6 py-3 text-xs text-muted-foreground leading-relaxed ${dept.bgLight} border-b border-border/50`}>
        {dept.description}
      </div>

      {/* Expandable content */}
      {open && (
        <div className="px-6 py-4 space-y-4">
          {/* พยาบาล */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm">👩‍⚕️</span>
              <p className="text-xs font-semibold text-foreground">ภาระงานพยาบาล</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {dept.nurseLinks.map((link) => (
                <LinkRow key={link.label} link={link} />
              ))}
            </div>
          </div>

          {/* ผู้ช่วยพยาบาล */}
          {dept.assistantLinks.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm">🧑‍⚕️</span>
                <p className="text-xs font-semibold text-foreground">ภาระงานผู้ช่วยพยาบาล</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {dept.assistantLinks.map((link) => (
                  <LinkRow key={link.label} link={link} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  MAIN PAGE
// ══════════════════════════════════════════════════════════════

function WorkUnitPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-white" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-white" />
        </div>
        <div className="relative max-w-4xl mx-auto px-5 py-8">
          <button
            onClick={() => navigate({ to: "/staff/select" as any })}
            className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs mb-4 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            กลับหน้าเลือกระบบ
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl backdrop-blur-sm shrink-0">
              🏥
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold">หน่วยปฏิบัติงาน</h1>
              <p className="text-white/70 text-sm mt-0.5">ภาระงานพยาบาลและผู้ช่วยพยาบาล แยกตามหน่วยปฏิบัติงาน 4 หน่วย</p>
            </div>
          </div>

          {/* stat chips */}
          <div className="flex flex-wrap gap-2 mt-5">
            {departments.map((d) => (
              <span key={d.id} className="text-xs font-medium bg-white/15 text-white px-3 py-1 rounded-full backdrop-blur-sm">
                {d.emoji} {d.name}
              </span>
            ))}
          </div>
        </div>
        <div className="h-5 bg-background rounded-t-[2rem] relative z-10" />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-5 -mt-1 pb-12 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1 h-5 rounded-full bg-primary inline-block" />
          <h2 className="text-sm font-semibold text-foreground">คลิกที่หน่วยงานเพื่อดูภาระงาน</h2>
        </div>

        {departments.map((dept) => (
          <DeptCard key={dept.id} dept={dept} />
        ))}

        <div className="mt-2 bg-primary/5 border border-primary/20 rounded-2xl px-5 py-4 flex items-center gap-3">
          <span className="text-xl">💡</span>
          <p className="text-xs text-muted-foreground leading-relaxed">
            คลิกที่การ์ดหน่วยงานเพื่อขยายดูรายการภาระงาน · ข้อมูลย้อนหลังสามารถดูได้ในแต่ละหัวข้อ
          </p>
        </div>
      </div>
    </div>
  );
}