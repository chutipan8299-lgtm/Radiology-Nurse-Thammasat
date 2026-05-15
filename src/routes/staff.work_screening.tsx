// src/routes/staff.work-screening.tsx
import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/contexts/auth-context";
import { ClipboardList } from "lucide-react";

export const Route = createFileRoute("/staff/work_screening")({
  component: WorkScreeningPage,
});
// ══════════════════════════════════════════════════════════════
// DIAGNOSTIC RADIOLOGY (SCREENING) CONTENT DATA
// ══════════════════════════════════════════════════════════════

const diagPatientLinks = [
  { label: "แบบลงทะเบียนข้อมูลผู้ป่วยรังสีวินิจฉัย (จุดคัดกรอง) 👍🏻", href: "#", type: "form" },
  { label: "รายงานลงทะเบียนข้อมูลผู้ป่วยรังสีวินิจฉัย (จุดคัดกรอง) 💡", href: "#", type: "report" },
];

const diagEquipmentPersonalLink = {
  label: "lnk เพื่อลงข้อมูลการตรวจสอบ (คลิกเพื่อดูรายละเอียด)",
  href: "#",
  type: "form",
};

const diagOtherSections = [
  {
    title: "การตรวจสอบความครบถ้วนของเครื่องมือแพทย์",
    links: [
      { label: "แบบการตรวจสอบความครบถ้วนของเครื่องมือแพทย์ 👍🏻", href: "#", type: "form" },
      { label: "รายงานการตรวจสอบความครบถ้วนของเครื่องมือแพทย์ 💡", href: "#", type: "report" },
    ],
  },
];

// ══════════════════════════════════════════════════════════════
// ACTION LINK COMPONENT
// ══════════════════════════════════════════════════════════════

function ActionLink({ label, href, type }: { label: string; href: string; type: string }) {
  const isReport = type === "report";
  const hasHref = href && href !== "#";

  return (
    <button
      onClick={() => { if (hasHref) window.open(href, "_blank"); }}
      disabled={!hasHref}
      className={`
        flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm font-medium
        transition-all duration-200 text-left w-full
        ${hasHref ? "cursor-pointer hover:shadow-sm" : "opacity-60 cursor-default"}
        ${isReport
          ? "bg-amber-50 border-amber-200 hover:border-amber-300"
          : "bg-blue-50 border-blue-200 hover:border-blue-300"
        }
      `}
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isReport ? "bg-amber-100" : "bg-blue-100"}`}>
        {isReport ? "💡" : "👍🏻"}
      </div>
      <span className="flex-1 leading-snug text-slate-700">{label}</span>
      {hasHref && (
        <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5h5m0 0v5m0-5L10 14" />
        </svg>
      )}
    </button>
  );
}

// ══════════════════════════════════════════════════════════════
// SIDEBAR COMPONENT
// ══════════════════════════════════════════════════════════════

function Sidebar({ active, onNavigate }: { active: string; onNavigate: (to: string) => void }) {
  const menuItems = [
    { id: "internal", label: "บริหารภายใน", labelEn: "Internal Management", emoji: "🏠", route: "/staff/workunit" },
    { id: "intervention", label: "รังสีร่วมรักษา", labelEn: "Intervention", emoji: "💉", route: "/staff/work-intervention" },
    { id: "spect", label: "เวชศาสตร์นิวเคลียร์", labelEn: "SPECT / CT", emoji: "⚛️", route: "/staff/work-spect" },
    { id: "rt", label: "รังสีรักษาและมะเร็งวิทยา", labelEn: "Radiation Therapy", emoji: "🎯", route: "/staff/work_radiation" },
    { id: "diag", label: "รังสีวินิจฉัย", labelEn: "Diagnostic Radiology", emoji: "🔍", route: "/staff/work-screening" },
  ];

  return (
    <aside className="w-56 flex-shrink-0 sticky top-[78px]">
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="px-4 py-4 border-b border-border" style={{ background: "var(--gradient-hero)" }}>
          <p className="text-white text-xs font-bold leading-snug">งานการพยาบาลรังสีวิทยา</p>
          <p className="text-white/60 text-[10px] mt-0.5">ฝ่ายการพยาบาล โรงพยาบาลธรรมศาสตร์ฯ</p>
        </div>

        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.route)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-left transition-all border-l-4
              ${active === item.id
                ? "bg-primary/10 text-primary border-l-primary font-semibold"
                : "text-foreground border-l-transparent hover:bg-muted/60 hover:text-primary"
              }`}
          >
            <span className="text-base">{item.emoji}</span>
            <span className="leading-snug">
              {item.label}
              <br />
              <span className="text-[10px] text-muted-foreground font-normal">{item.labelEn}</span>
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════

function WorkScreeningPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/staff/login" });
    }
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

      {/* HERO */}
      <div className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="relative max-w-5xl mx-auto px-5 py-8">
          <button
            onClick={() => navigate({ to: "/staff/dashboard" })}
            className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs mb-4 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            กลับหน้า Dashboard
          </button>
          <h1 className="text-white text-2xl font-bold">งานคัดกรองผู้ป่วย</h1>
          <p className="text-white/70 text-sm mt-1">Diagnostic Radiology (Screening)</p>
        </div>
        <div className="h-5 bg-background rounded-t-[2rem] relative z-10" />
      </div>

      {/* BODY */}
      <div className="max-w-5xl mx-auto px-5 -mt-1 pb-12">
        <div className="flex gap-5 items-start">

          {/* SIDEBAR */}
          <Sidebar active="diag" onNavigate={(to) => navigate({ to: to as any })} />

          {/* CONTENT */}
          <main className="flex-1 min-w-0 pt-4">
            <div className="space-y-6">

              {/* HERO BANNER */}
              <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-950 to-blue-700 px-6 py-5">
                  <h2 className="text-white text-lg font-bold">งานคัดกรองผู้ป่วย</h2>
                </div>
                <div className="px-6 py-4 bg-blue-50/50">
                  <p className="text-sm text-blue-900 leading-relaxed">
                    งานคัดกรองผู้ป่วย เป็นหน่วยงานการพยาบาลรังสีวิทยาที่ทำหน้าที่ร่วมกับงานรังสีวินิจฉัย
                    โดยจะทำการประเมินความพร้อมของผู้ป่วยก่อนทำหัตถการทางรังสีวินิจฉัย ได้แก่
                    อัลตราชาวด์ (Ultrasound), การตรวจความหนาแน่นของมวลกระดูก (Bone Mineral Density–BMD),
                    การตรวจเต้านมด้วยเครื่องเมมโมแกรม (Memmogram), การถ่ายภาพเอกซเรย์ด้วยเครื่องเอกซเรย์ฟลูโอโรสโคปี้ระบบดิจิตอล (Fluoroscopy),
                    การตัดชิ้นเนื้อด้วยเข็มขนาดเล็ก (Core Needle Biopsy) และ การเจาะดูดเซลล์ด้วยเข็มขนาดเล็ก (Fine needle aspiration)
                    ซึ่งมีการประเมินระดับความรู้สึกตัว สัญญาณชีพ และการคัดกรองโรคติดต่อที่เฝ้าระวังต่างๆ
                    รวมทั้งให้การพยาบาลกับผู้ป่วยหรือญาติที่มีความผิดปกติในบริเวณรังสีวินิจฉัย
                  </p>
                </div>
              </div>

              {/* SECTION 1: ภาระงาน */}
              <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/10 p-2.5 rounded-xl">
                    <ClipboardList className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-foreground">
                      ภาระงานของพยาบาล / ผู้ช่วยพยาบาล ที่ปฏิบัติงานที่จุดคัดกรองผู้ป่วย
                    </h2>
                  </div>
                </div>

                {/* 1. การลงข้อมูลผู้รับบริการ */}
                <div className="border border-border rounded-xl p-4 bg-muted/20 mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1 h-4 rounded-full bg-primary inline-block" />
                    <h3 className="text-xs font-semibold text-foreground">1. การลงข้อมูลผู้รับบริการ</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 ml-3">
                    การลงข้อมูลผู้รับบริการที่ทำหัตถการรังสีวินิจฉัย
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {diagPatientLinks.map((link, i) => (
                      <ActionLink key={i} label={link.label} href={link.href} type={link.type} />
                    ))}
                  </div>
                </div>

                {/* 2. การตรวจสอบเครื่องมือแพทย์แยกตามรายบุคคล */}
                <div className="border border-border rounded-xl p-4 bg-muted/20 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1 h-4 rounded-full bg-primary inline-block" />
                    <h3 className="text-xs font-semibold text-foreground">
                      2. การตรวจสอบเครื่องมือแพทย์แยกตามรายบุคคล
                    </h3>
                  </div>
                  <ActionLink
                    label={diagEquipmentPersonalLink.label}
                    href={diagEquipmentPersonalLink.href}
                    type={diagEquipmentPersonalLink.type}
                  />
                </div>

                {/* 3. การตรวจสอบอื่นๆ */}
                <div className="border border-border rounded-xl p-4 bg-muted/20">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-1 h-4 rounded-full bg-primary inline-block" />
                    <h3 className="text-xs font-semibold text-foreground">3. การตรวจสอบอื่นๆ</h3>
                  </div>
                  <div className="space-y-4">
                    {diagOtherSections.map((sec, i) => (
                      <div key={i}>
                        <p className="text-xs font-semibold text-blue-900 mb-2">{sec.title}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {sec.links.map((link, j) => (
                            <ActionLink key={j} label={link.label} href={link.href} type={link.type} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </main>

        </div>
      </div>
    </div>
  );
}