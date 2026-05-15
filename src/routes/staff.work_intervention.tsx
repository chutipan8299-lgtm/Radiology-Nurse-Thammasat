"use client";

import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ClipboardList, Bookmark } from "lucide-react";

export const Route = createFileRoute("/staff/work_intervention")({
  component: WorkIntervention,
});

// ══════════════════════════════════════════════════════════════
// SIDEBAR CONFIG
// ══════════════════════════════════════════════════════════════

const sidebarDepts = [
  { label: "บริหารภายใน", icon: "🏠", route: "/staff/workunit" },
  { label: "รังสีร่วมรักษา", sublabel: "Intervention", icon: "💉", route: "/staff/work_intervention", active: true },
  { label: "เวชศาสตร์นิวเคลียร์", sublabel: "SPECT / CT", icon: "⚛️", route: "/staff/work_spect" },
  { label: "รังสีรักษาและมะเร็งวิทยา", sublabel: "Radiation Therapy", icon: "🎯", route: "/staff/work_radiation" },
  { label: "รังสีวินิจฉัย", sublabel: "Diagnostic Radiology", icon: "🩻", route: "/staff/work_screening" },
];

// ══════════════════════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════════════════════

const interventionFormSections = [
  {
    title: "การลงข้อมูลผู้รับบริการ",
    items: [
      {
        title: "การลงข้อมูลผู้รับบริการที่ทำหัตถการห้อง DSA",
        links: [
          { label: "แบบการลงข้อมูลผู้รับบริการที่ทำหัตถการห้อง DSA 👍🏻", href: "https://docs.google.com/forms/d/e/1FAIpQLScNUdA8ggI8VD7f_c_ub03U3A2tMmjGYzQsTix2MGrZq2z1-Q/viewform?usp=sf_link", type: "form" },
          { label: "รายงานการลงข้อมูลผู้รับบริการที่ทำหัตถการห้อง DSA 💡", href: "https://docs.google.com/spreadsheets/d/17wOSvXF9AV5YGxDwFm8xFOkH_5J4v9Sw_Xdrok9juqw/edit?usp=sharing", type: "report" },
        ],
      },
      {
        title: "การลงข้อมูลผู้รับบริการที่ทำหัตถการห้อง Ultrasound",
        links: [
          { label: "แบบการลงข้อมูลผู้รับบริการที่ทำหัตถการห้อง Ultrasound 👍🏻", href: "https://docs.google.com/forms/d/e/1FAIpQLSeVcvrpvcTpf_Oyr-dN3X6QODq90VG6-29uAb8wEWoboFvdmw/viewform?usp=sf_link", type: "form" },
          { label: "รายงานการลงข้อมูลผู้รับบริการที่ทำหัตถการห้อง Ultrasound 💡", href: "https://docs.google.com/spreadsheets/d/1AgQOAKTnNfjw--rdWJ1dYbCMiuM2wxCD_w_zq5C86G8/edit?usp=sharing", type: "report" },
        ],
      },
      {
        title: "การลงข้อมูลผู้รับบริการที่ทำหัตถการ Thrombectomy",
        links: [
          { label: "แบบการลงข้อมูลผู้รับบริการที่ทำหัตถการ Thrombectomy 👍🏻", href: "https://docs.google.com/forms/d/e/1FAIpQLSdYuNR1NpS9jZi7Hio0nyOZmMNUGJ60dOGHmZpnfmH2_Q3e5w/viewform?usp=sf_link", type: "form" },
          { label: "รายงานการลงข้อมูลผู้รับบริการที่ทำหัตถการ Thrombectomy 💡", href: "https://docs.google.com/spreadsheets/d/1juj2XnbwPGzNXAOMV829KtXFkggef2lrNLRNRrlHURs/edit?usp=sharing", type: "report" },
        ],
      },
      {
        title: "การลงข้อมูลเยี่ยมตรวจผู้รับบริการ ก่อน / หลังหัตถการ / เฉพาะหัตถการ C-line",
        links: [
          { label: "แบบการลงข้อมูลเยี่ยมตรวจผู้รับบริการ ก่อน / หลังหัตถการ / เฉพาะหัตถการ C-line 👍🏻", href: "https://docs.google.com/forms/d/e/1FAIpQLSeqUXqF7JKthqC3Rwx1ywbbGIgqN_oSDVuQo2ZDXEtRACWuNg/viewform?usp=sf_link", type: "form" },
          { label: "รายงานการลงข้อมูลเยี่ยมตรวจผู้รับบริการ ก่อน / หลังหัตถการ / เฉพาะหัตถการ C-line 💡", href: "https://docs.google.com/spreadsheets/d/1cZup5k0qnVidWpiTTgveX1kGK1BD3HXweBsefZp0a9I/edit?usp=sharing", type: "report" },
        ],
      },
      {
        title: "การลงข้อมูลผู้รับบริการที่ทำหัตถการ Picc line",
        links: [
          { label: "แบบการลงข้อมูลผู้รับบริการที่ทำหัตถการ Picc line 👍🏻", href: "https://docs.google.com/forms/d/e/1FAIpQLSc_WawBdeKXg8sozDdKumdoHFsxfT_WdAz4pal1aaqtuYrbBQ/viewform", type: "form" },
          { label: "แบบการลงข้อมูลผู้รับบริการที่นำสาย Picc line ออก 👍🏻", href: "https://docs.google.com/forms/d/e/1FAIpQLSd_FTjZIPDZsUokO3V6uODnbBlYlc7Q6Xm79wibSplRTt2DQw/viewform", type: "form" },
          { label: "แบบการลงข้อมูลผู้รับบริการที่นำสาย Picc line กลับบ้าน 👍🏻", href: "https://docs.google.com/forms/d/e/1FAIpQLSdJ0h_d0dovUPzaab-DBzL7yT25Jd284RmHEHdeJ4wjGJ10_w/viewform", type: "form" },
          { label: "แฟ้มเอกสารออนไลน์ที่แปลงข้อมูลใน google form เป็นเอกสารการดูแลผู้รับบริการที่ทำหัตถการ Picc line 💡", href: "https://drive.google.com/drive/folders/19lQ-k_30ue8tJc3IUotseXsZ_17S_C-x", type: "report" },
        ],
      },
      {
        title: "การส่งผู้ป่วยกลับหอผู้ป่วย",
        links: [
          { label: "แบบการส่งผู้ป่วยกลับหอผู้ป่วย 👍🏻", href: "https://docs.google.com/forms/d/e/1FAIpQLScjSsKqFfAEqAZVlQ-Ys8NJDqB4Y8AyC2IP7XwjnXTjTtpciQ/viewform?usp=sf_link", type: "form" },
          { label: "รายงานการส่งผู้ป่วยกลับหอผู้ป่วย 💡", href: "https://docs.google.com/spreadsheets/d/1ZkF-Jts7RjAB5GzLpKX18rowjxSeS5dmonwB-docZpc/edit?usp=sharing", type: "report" },
        ],
      },
      {
        title: "Consult For IV Insertion",
        links: [
          { label: "แบบ Consult For IV Insertion 👍🏻", href: "https://docs.google.com/forms/d/e/1FAIpQLSeFwHayyhSdXuH-9N730laHL5n-W7RJ7wkIGwWi0DnXhIU-6w/viewform?usp=sf_link", type: "form" },
          { label: "รายงาน Consult For IV Insertion 💡", href: "https://docs.google.com/spreadsheets/d/1RtyCtTlavVvlDOIWBmTDK_sMwVTwyJJX7SMPE_2NuRg/edit?usp=sharing", type: "report" },
        ],
      },
    ],
  },
];

const interventionEquipmentSections = [
  {
    title: "การตรวจสอบความครบถ้วนของเครื่องมือแพทย์",
    links: [
      { label: "แบบการตรวจสอบความครบถ้วนของเครื่องมือแพทย์ 👍🏻", href: "https://docs.google.com/forms/d/e/1FAIpQLScJH5vEokG8hE3wZDUbXLb6BZvaR3X06rPv8VONqVbsuZ751Q/viewform?usp=sf_link", type: "form" },
      { label: "รายงานการตรวจสอบความครบถ้วนของเครื่องมือแพทย์ 💡", href: "https://docs.google.com/spreadsheets/d/13z4T2ZZkVV0oCWruYEraFGxAJCTlEr6h8_q-DfJ0dZU/edit?usp=sharing", type: "report" },
    ],
  },
  {
    title: "การตรวจสอบความสมบูรณ์และพร้อมใช้งานของปราศจากเชื้อ",
    links: [
      { label: "แบบการตรวจสอบความสมบูรณ์และพร้อมใช้งานของปราศจากเชื้อ 👍🏻", href: "https://docs.google.com/forms/d/e/1FAIpQLSe5puFJX2cSHkMnuJ7C4wXnhkFlTANz5qvVsxGumf_09mmLbg/viewform?usp=sf_link", type: "form" },
      { label: "รายงานการตรวจสอบความสมบูรณ์และพร้อมใช้งานของปราศจากเชื้อ 💡", href: "https://docs.google.com/spreadsheets/d/1EzFiE-sV2Lnj8EGEKJ_b14HQbUmvSoWm-WFx3Z-GfKI/edit?usp=sharing", type: "report" },
    ],
  },
  {
    title: "การตรวจสอบรถฉุกเฉิน",
    links: [
      { label: "แบบการตรวจสอบรถฉุกเฉิน 👍🏻", href: "https://docs.google.com/forms/d/e/1FAIpQLSewKtaaOwaSaqF1E7r8-dmt9gDPIGHHiZWCShchqAVO2lozRw/viewform?usp=sf_link", type: "form" },
      { label: "รายงานการตรวจสอบรถฉุกเฉิน 💡", href: "https://docs.google.com/spreadsheets/d/1jczvLN4cwqRA8O1JUIKsIACBS7wNFED4iNwbU9vvsu4/edit?usp=sharing", type: "report" },
    ],
  },
];

const interventionTeachingMedia = [
  { title: "เครื่อง Ultrasound", image: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?q=80&w=1200&auto=format&fit=crop" },
  { title: "ขั้นตอนการทำหัตถการ Vascular", image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop" },
  { title: "การดูแลผู้ป่วยหลังทำหัตถการ", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop" },
  { title: "การป้องกันอันตรายจากรังสี", image: "https://images.unsplash.com/photo-1580281657527-47c6d2f51c8f?q=80&w=1200&auto=format&fit=crop" },
  { title: "คู่มือการใช้อุปกรณ์ Intervention", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop" },
  { title: "แนวทางการพยาบาล Intervention", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop" },
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

function WorkIntervention() {
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
          <h1 className="text-white text-2xl font-bold">รังสีร่วมรักษา</h1>
          <p className="text-white/70 text-sm mt-1">Intervention · ภาระงานการพยาบาล</p>
        </div>
        <div className="h-5 bg-background rounded-t-[2rem] relative z-10" />
      </div>

      <div className="max-w-5xl mx-auto px-5 -mt-1 pb-12">
        <div className="flex gap-5 items-start">
          <Sidebar />
          <main className="flex-1 min-w-0 pt-4 space-y-6">

            {/* SECTION 1: ภาระงาน */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-2.5 rounded-xl">
                  <ClipboardList className="text-primary w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-foreground">ภาระงานของพยาบาล / ผู้ช่วยพยาบาล</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">ระบบเอกสารและการลงข้อมูลสำหรับ Intervention</p>
                </div>
              </div>
              <div className="space-y-4">
                {interventionFormSections.map((section, index) => (
                  <div key={index} className="space-y-4">
                    {section.items.map((item, idx) => (
                      <div key={idx} className="border border-border rounded-xl p-4 bg-muted/20">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-1 h-4 rounded-full bg-primary inline-block" />
                          <h3 className="text-xs font-semibold text-foreground">{item.title}</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {item.links.map((link, i) => (
                            <ActionLink key={i} label={link.label} href={link.href} type={link.type} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 2: การตรวจสอบอื่นๆ */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-2.5 rounded-xl">
                  <ClipboardList className="text-primary w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-foreground">การตรวจสอบอื่นๆ</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">ระบบตรวจสอบเครื่องมือและอุปกรณ์ภายในหน่วยงาน</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {interventionEquipmentSections.map((item, index) => (
                  <div key={index} className="border border-border rounded-xl p-4 bg-muted/20">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-1 h-4 rounded-full bg-primary inline-block" />
                      <h3 className="text-xs font-semibold text-foreground">{item.title}</h3>
                    </div>
                    <div className="grid gap-2">
                      {item.links.map((link, i) => (
                        <ActionLink key={i} label={link.label} href={link.href} type={link.type} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 3: เอกสารออนไลน์อื่นๆ */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1 h-4 rounded-full bg-primary inline-block" />
                <h2 className="text-xs font-semibold text-foreground">เอกสารออนไลน์อื่นๆ ที่ใช้งาน</h2>
              </div>
              <div className="space-y-3">
                {["ตารางการตรวจสอบข้อมูลผู้ป่วยแต่ละวัน click!!!", "แบบประเมินค่าใช้จ่าย Intervention"].map((label) => (
                  <button key={label} className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-all text-left w-full bg-white border border-border hover:border-primary/40 hover:shadow-sm text-foreground cursor-pointer">
                    <Bookmark className="w-3.5 h-3.5 text-primary fill-primary shrink-0" />
                    <span className="flex-1">{label}</span>
                    <svg className="w-3.5 h-3.5 text-muted-foreground shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* SECTION 4: สื่อการสอน */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1 h-4 rounded-full bg-primary inline-block" />
                <h2 className="text-xs font-semibold text-foreground">สื่อการสอนสำหรับบุคลากร</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {interventionTeachingMedia.map((media, index) => (
                  <div key={index} className="group overflow-hidden rounded-xl bg-white border border-border hover:shadow-md transition duration-300">
                    <div className="h-36 overflow-hidden">
                      <img src={media.image} alt={media.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-semibold text-foreground leading-snug">{media.title}</h3>
                      <button className="mt-3 w-full bg-primary hover:bg-primary/90 text-white rounded-lg py-2 text-xs font-semibold transition">เปิดสื่อการสอน</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}