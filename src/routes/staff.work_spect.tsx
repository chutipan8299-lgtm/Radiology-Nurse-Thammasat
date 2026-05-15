"use client";

import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ClipboardList } from "lucide-react";

export const Route = createFileRoute("/staff/work_spect")({
  component: WorkSpect,
});

// ══════════════════════════════════════════════════════════════
// SIDEBAR CONFIG
// ══════════════════════════════════════════════════════════════

const sidebarDepts = [
  { label: "บริหารภายใน", icon: "🏠", route: "/staff/workunit" },
  { label: "รังสีร่วมรักษา", sublabel: "Intervention", icon: "💉", route: "/staff/work_intervention" },
  { label: "เวชศาสตร์นิวเคลียร์", sublabel: "SPECT / CT", icon: "⚛️", route: "/staff/work_spect", active: true },
  { label: "รังสีรักษาและมะเร็งวิทยา", sublabel: "Radiation Therapy", icon: "🎯", route: "/staff/work_radiation" },
  { label: "รังสีวินิจฉัย", sublabel: "Diagnostic Radiology", icon: "🩻", route: "/staff/work_screening" },
];

// ══════════════════════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════════════════════

const spectPatientLinks = [
  { label: "แบบการลงข้อมูลผู้รับบริการ 👍🏻", href: "#", type: "form" },
  { label: "รายงานการลงข้อมูลผู้รับบริการ 💡", href: "#", type: "report" },
];

const spectEquipmentPersonalLink = { label: "lnk เพื่อลงข้อมูลการตรวจสอบ (คลิกเพื่อดูรายละเอียด)", href: "#", type: "form" };

const spectOtherSections = [
  {
    title: "การตรวจสอบความครบถ้วนของเครื่องมือแพทย์",
    links: [
      { label: "แบบตรวจสอบความครบถ้วนของเครื่องมือแพทย์ 👍🏻", href: "#", type: "form" },
      { label: "รายงานตรวจสอบความครบถ้วนของเครื่องมือแพทย์ 💡", href: "#", type: "report" },
    ],
  },
  {
    title: "การตรวจสอบยาและเวชภัณฑ์ประจำรถ Emergency",
    links: [
      { label: "แบบตรวจสอบยาและเวชภัณฑ์ประจำรถ Emergency 👍🏻", href: "#", type: "form" },
      { label: "รายงานตรวจสอบยาและเวชภัณฑ์ประจำรถ Emergency 💡", href: "#", type: "report" },
    ],
  },
];

// ══════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ══════════════════════════════════════════════════════════════

function ActionLink({ label, href, type }: { label: string; href: string; type: string }) {
  const isReport = type === "report";
  const hasHref = href && href !== "#";
  return (
    <button
      onClick={() => { if (hasHref) window.open(href, "_blank"); }}
      disabled={!hasHref}
      className={`flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200 text-left w-full
        ${hasHref ? "cursor-pointer hover:shadow-sm" : "opacity-60 cursor-default"}
        ${isReport ? "bg-amber-50 border-amber-200 hover:border-amber-300" : "bg-blue-50 border-blue-200 hover:border-blue-300"}`}
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

function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside className="w-56 flex-shrink-0 sticky top-[78px]">
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="px-4 py-4 border-b border-border bg-gradient-to-r from-blue-950 to-blue-700">
          <p className="text-white text-xs font-bold leading-snug">งานการพยาบาลรังสีวิทยา</p>
          <p className="text-white/60 text-[10px] mt-0.5">ฝ่ายการพยาบาล โรงพยาบาลธรรมศาสตร์ฯ</p>
        </div>
        {sidebarDepts.map((dept) => (
          <button
            key={dept.label}
            onClick={() => navigate({ to: dept.route as any })}
            className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-left transition-all border-l-4
              ${dept.active ? "bg-primary/10 text-primary border-l-primary font-semibold" : "text-foreground border-l-transparent hover:bg-muted/60 hover:text-primary"}`}
          >
            <span className="text-base">{dept.icon}</span>
            <span className="leading-snug">
              {dept.label}
              {dept.sublabel && <><br /><span className="text-[10px] text-muted-foreground font-normal">{dept.sublabel}</span></>}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════

function WorkSpect() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-950 to-blue-700">
        <div className="relative max-w-5xl mx-auto px-5 py-8">
          <button onClick={() => navigate({ to: "/staff/workunit" })} className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs mb-4 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            กลับหน้าหน่วยปฏิบัติงาน
          </button>
          <h1 className="text-white text-2xl font-bold">เวชศาสตร์นิวเคลียร์</h1>
          <p className="text-white/70 text-sm mt-1">SPECT / CT · ภาระงานการพยาบาล</p>
        </div>
        <div className="h-5 bg-background rounded-t-[2rem] relative z-10" />
      </div>

      <div className="max-w-5xl mx-auto px-5 -mt-1 pb-12">
        <div className="flex gap-5 items-start">
          <Sidebar />
          <main className="flex-1 min-w-0 pt-4 space-y-6">

            {/* HERO BANNER */}
            <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-blue-950 to-blue-700 px-6 py-5">
                <h2 className="text-white text-lg font-bold">เวชศาสตร์นิวเคลียร์ (SPECT / CT)</h2>
                <p className="text-blue-200 text-xs mt-1 leading-relaxed">
                  การตรวจวินิจฉัยทางเวชศาสตร์นิวเคลียร์ด้วยเครื่อง SPECT / CT (Single Photon Emission Computed Tomography / Computed Tomography)
                  ของทางโรงพยาบาลธรรมศาสตร์ สามารถตรวจวินิจฉัยอวัยวะต่างๆในร่างกายด้วยสารเภสัชรังสีตัวอย่างหัตถการ ได้แก่
                </p>
              </div>
              <div className="px-6 py-4 bg-blue-50/50">
                <ul className="space-y-1.5">
                  {["1. การตรวจกระดูก (Bone Scan)", "2. การตรวจการทำงานของหัวใจห้องล่างซ้าย (MUGA Scan)", "3. การตรวจการทำงานของต่อมไทรอยด์ (Thyroid Scan)"].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-blue-900">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* SECTION 1: ภาระงาน */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-2.5 rounded-xl">
                  <ClipboardList className="text-primary w-5 h-5" />
                </div>
                <h2 className="text-base font-bold text-foreground">ภาระงานของพยาบาล / ผู้ช่วยพยาบาล ที่ปฏิบัติงานที่ SPECT / CT</h2>
              </div>

              <div className="border border-border rounded-xl p-4 bg-muted/20 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1 h-4 rounded-full bg-primary inline-block" />
                  <h3 className="text-xs font-semibold text-foreground">1. การลงข้อมูลผู้รับบริการที่มาทำหัตถการรายวัน</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {spectPatientLinks.map((link, i) => <ActionLink key={i} label={link.label} href={link.href} type={link.type} />)}
                </div>
              </div>

              <div className="border border-border rounded-xl p-4 bg-muted/20 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1 h-4 rounded-full bg-primary inline-block" />
                  <h3 className="text-xs font-semibold text-foreground">2. การตรวจสอบเครื่องมือแพทย์แยกตามรายบุคคล</h3>
                </div>
                <ActionLink label={spectEquipmentPersonalLink.label} href={spectEquipmentPersonalLink.href} type={spectEquipmentPersonalLink.type} />
              </div>

              <div className="border border-border rounded-xl p-4 bg-muted/20">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1 h-4 rounded-full bg-primary inline-block" />
                  <h3 className="text-xs font-semibold text-foreground">3. การตรวจสอบอื่นๆ</h3>
                </div>
                <div className="space-y-4">
                  {spectOtherSections.map((sec, i) => (
                    <div key={i}>
                      <p className="text-xs font-semibold text-blue-900 mb-2">{sec.title}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {sec.links.map((link, j) => <ActionLink key={j} label={link.label} href={link.href} type={link.type} />)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}