import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/contexts/auth-context";
import { ClipboardList, Bookmark } from "lucide-react";

export const Route = createFileRoute("/staff/workunit")({
  component: WorkUnitPage,
});

// ══════════════════════════════════════════════════════════════
// TYPES
// ══════════════════════════════════════════════════════════════

type WorkLink = {
  label: string;
  href: string;
};

type Department = {
  id: string;
  name: string;
  name_en: string;
  emoji: string;
  nurseLinks: WorkLink[];
  assistantLinks: WorkLink[];
};

// ══════════════════════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════════════════════

const departments: Department[] = [
  {
    id: "intervention",
    name: "รังสีร่วมรักษา",
    name_en: "Intervention",
    emoji: "💉",
    nurseLinks: [],
    assistantLinks: [],
  },
  {
    id: "spect",
    name: "เวชศาสตร์นิวเคลียร์",
    name_en: "SPECT / CT",
    emoji: "⚛️",
    nurseLinks: [],
    assistantLinks: [],
  },
  {
    id: "rt",
    name: "รังสีรักษาและมะเร็งวิทยา",
    name_en: "Radiation Therapy",
    emoji: "🎯",
    nurseLinks: [],
    assistantLinks: [],
  },
  {
    id: "diag",
    name: "รังสีวินิจฉัย",
    name_en: "Diagnostic Radiology",
    emoji: "🩻",
    nurseLinks: [],
    assistantLinks: [],
  },
];

// ══════════════════════════════════════════════════════════════
// INTERNAL CONTENT
// ══════════════════════════════════════════════════════════════

type InternalLink = {
  label: string;
  href?: string;
  navigateTo?: string;
};

type InternalSection = {
  title: string;
  items: InternalLink[];
};

const internalSections: InternalSection[] = [
  {
    title: "ข้อมูลสำหรับบุคลากร",
    items: [
      {
        label: "ตารางขอเวร",
        href: "https://docs.google.com/spreadsheets/d/1cwx0GWF1CuPfbJZd-G6DbivwNWXPpJjJ56e3nDYBd8M/edit",
      },
      { label: "บันทึกการอบรม", navigateTo: "/staff/training-records" },
      { label: "ค่าสัมผัสรังสี", navigateTo: "/staff/workload" },
      { label: "ตัวชี้วัด", navigateTo: "/staff/kpi" },
      {
        label: "การประเมินผลการปฏิบัติงาน",
        href: "https://drive.google.com/drive/folders/1IEZ03Ep0t9uZFCDN0ox9zgBIIRKVZKz7",
      },
      { label: "ตารางจ่ายงาน", href: "/staff/workaccoun" },
      { label: "ภาระงานแต่ละหน่วยงาน", navigateTo: "/staff/workaccount" },
      { label: "Download เอกสาร", navigateTo: "/staff/downloads" },
      {
        label: "รายงานผลการอบรม",
        href: "https://drive.google.com/drive/folders/1yeIkBlA1uYz4r9jwJqjvdwK1nh4bARN2",
      },
    ],
  },
  {
    title: "Google Form พยาบาล",
    items: [
      {  label: "Form เพิ่มเติมภาระงาน IR", href: "https://docs.google.com/forms/d/e/1FAIpQLSdieN4UCLIlyZvtFBLV-S1GgGP7FaL35e5-CrDM73hjCXIdLw/viewform?usp=sf_link" },
      {  label: "RT ลงยอดเวรตรวจการ & ภาระงาน", href: "https://docs.google.com/forms/d/e/1FAIpQLSdQz38K7XlpWm3u8r9hPL4IQkMVwhJBUQv8ysCo2ZiEnfFLSA/viewform?usp=sf_link" },
      {  label: "ยอดเวรตรวจการ Screening", href: "https://docs.google.com/forms/d/e/1FAIpQLSfy6ypB1KZ_ina_d0ERcKvBhRLoqFI9dX4FxtxEDPSGjHFNsg/viewform?usp=sf_link" },
      {  label: "ข้อมูลผู้ป่วยแพ้สารทึบรังสี", href: "https://docs.google.com/forms/d/e/1FAIpQLSfM--Jt6mRlR2ZPU-XAJXqm3AvyUfPAnLIlo0E_mf3Akmz5oQ/viewform?usp=sf_link" },
      {  label: "ข้อมูลผู้ป่วย Contrast leak", href: "https://docs.google.com/forms/d/e/1FAIpQLSeDxR7tK0Px6VLlW5TuOO-R4fh3UeE65nNkPrWxXn6gpooF-A/viewform?usp=sf_link" },
    ],
  },
  {
    title: "Google Form ผู้ช่วยพยาบาล",
    items: [
      {  label: "ลงทะเบียนเพิ่มเติม PN Intervention", href: "https://docs.google.com/forms/d/e/1FAIpQLScaFeRpGbfQpBItWBKodDoLOtx66hi63i2nqoAMBAikW9bq6Q/viewform?usp=sf_link" },
      {  label: "ลงทะเบียนเพิ่มเติม PN RT", href: "https://docs.google.com/forms/d/e/1FAIpQLSfoPMK1gKIo_YW8ojq039fL3bYrXCvhxnTyHrOvEFf4Pkg9Ew/viewform?usp=sf_link" },
    ],
  },
  {
    title: "ข้อมูลผู้ป่วย",
    items: [
      { label: "รายชื่อผู้ป่วยที่ทำหัตถการ", navigateTo: "/staff/patients" },
      { label: "สถิติผู้รับบริการ รายเดือน", navigateTo: "/staff/statistics" },
    ],
  },
];

// ══════════════════════════════════════════════════════════════
// INTERVENTION CONTENT DATA
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
  {
    title: "เอกสารออนไลน์อื่นๆ ที่ใช้งาน",
    links: [
      { label: "ตารางการตรวจข้อมูลผู้ป่วยแต่ละวัน", href: "https://docs.google.com/spreadsheets/d/1x8qSBxW8Q4Po-cW0T73hAHZLGjeo7_RrVq4mhUUUKEE/edit?usp=sharing", type: "form" },
      { label: "แบบประเมินค่าใช้จ่าย intervention", href: "https://docs.google.com/spreadsheets/d/1x8qSBxW8Q4Po-cW0T73hAHZLGjeo7_RrVq4mhUUUKEE/edit?usp=sharing", type: "report" },
    ],
  },
];

const interventionTeachingMedia = [
  {
    title: "เครื่อง Ultrasound",
    image: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "ขั้นตอนการทำหัตถการ Vascular",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "การดูแลผู้ป่วยหลังทำหัตถการ",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "การป้องกันอันตรายจากรังสี",
    image: "https://images.unsplash.com/photo-1580281657527-47c6d2f51c8f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "คู่มือการใช้อุปกรณ์ Intervention",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "แนวทางการพยาบาล Intervention",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop",
  },
];

// ══════════════════════════════════════════════════════════════
// INTERVENTION ACTION LINK
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
// INTERVENTION CONTENT (ported from intervention.tsx)
// ══════════════════════════════════════════════════════════════

function InterventionContent() {
  return (
    <div className="space-y-6">

      {/* SECTION 1: ภาระงานของพยาบาล */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary/10 p-2.5 rounded-xl">
            <ClipboardList className="text-primary w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">
              ภาระงานของพยาบาล / ผู้ช่วยพยาบาล
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              ระบบเอกสารและการลงข้อมูลสำหรับ Intervention
            </p>
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
            <p className="text-xs text-muted-foreground mt-0.5">
              ระบบตรวจสอบเครื่องมือและอุปกรณ์ภายในหน่วยงาน
            </p>
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
          {[
            "ตารางการตรวจสอบข้อมูลผู้ป่วยแต่ละวัน click!!!",
            "แบบประเมินค่าใช้จ่าย Intervention",
          ].map((label) => (
            <button
              key={label}
              className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-all text-left w-full bg-white border border-border hover:border-primary/40 hover:shadow-sm text-foreground cursor-pointer"
            >
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
        <p className="text-xs text-muted-foreground mb-4">
          คู่มือ วิดีโอ และสื่อประกอบการเรียนรู้ภายในหน่วยงาน
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {interventionTeachingMedia.map((media, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-xl bg-white border border-border hover:shadow-md transition duration-300"
            >
              <div className="h-36 overflow-hidden">
                <img
                  src={media.image}
                  alt={media.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold text-foreground leading-snug">{media.title}</h3>
                <button className="mt-3 w-full bg-primary hover:bg-primary/90 text-white rounded-lg py-2 text-xs font-semibold transition">
                  เปิดสื่อการสอน
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// INTERNAL CONTENT
// ══════════════════════════════════════════════════════════════

function InternalContent({ onNavigate }: { onNavigate: (to: string) => void }) {
  return (
    <div className="space-y-6">
      {internalSections.map((sec) => (
        <div key={sec.title}>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1 h-4 rounded-full bg-primary inline-block" />
            <h3 className="text-xs font-semibold text-foreground">{sec.title}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sec.items.map((item) => {
              const hasHref = item.href && item.href !== "#";
              const hasNav = !!item.navigateTo;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    if (hasNav) onNavigate(item.navigateTo!);
                    else if (hasHref) window.open(item.href!, "_blank");
                  }}
                  disabled={!hasNav && !hasHref}
                  className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-all text-left
                    ${hasNav || hasHref
                      ? "bg-white border border-border hover:border-primary/40 hover:shadow-sm text-foreground cursor-pointer"
                      : "bg-muted/30 border border-border/50 text-muted-foreground cursor-default opacity-60"
                    }`}
                >
                  <svg className="w-3.5 h-3.5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="flex-1">{item.label}</span>
                  {(hasNav || hasHref) && (
                    <svg className="w-3.5 h-3.5 text-muted-foreground shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// DEPARTMENT CONTENT (for non-intervention departments)
// ══════════════════════════════════════════════════════════════

function DeptContent({ dept }: { dept: Department }) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1 h-4 rounded-full bg-primary inline-block" />
          <h3 className="text-xs font-semibold text-foreground">ภาระงานพยาบาล</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {dept.nurseLinks.map((item) => {
            const hasHref = item.href && item.href !== "#";
            return (
              <button
                key={item.label}
                onClick={() => { if (hasHref) window.open(item.href, "_blank"); }}
                disabled={!hasHref}
                className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-all text-left
                  ${hasHref
                    ? "bg-white border border-border hover:border-primary/40 hover:shadow-sm text-foreground cursor-pointer"
                    : "bg-muted/30 border border-border/50 text-muted-foreground cursor-default opacity-60"
                  }`}
              >
                <svg className="w-3.5 h-3.5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="flex-1">{item.label}</span>
                {hasHref && (
                  <svg className="w-3.5 h-3.5 text-muted-foreground shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {dept.assistantLinks.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1 h-4 rounded-full bg-primary inline-block" />
            <h3 className="text-xs font-semibold text-foreground">ภาระงานผู้ช่วยพยาบาล</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {dept.assistantLinks.map((item) => {
              const hasHref = item.href && item.href !== "#";
              return (
                <button
                  key={item.label}
                  onClick={() => { if (hasHref) window.open(item.href, "_blank"); }}
                  disabled={!hasHref}
                  className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-all text-left
                    ${hasHref
                      ? "bg-white border border-border hover:border-primary/40 hover:shadow-sm text-foreground cursor-pointer"
                      : "bg-muted/30 border border-border/50 text-muted-foreground cursor-default opacity-60"
                    }`}
                >
                  <svg className="w-3.5 h-3.5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="flex-1">{item.label}</span>
                  {hasHref && (
                    <svg className="w-3.5 h-3.5 text-muted-foreground shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SPECT / CT CONTENT DATA
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
// SPECT / CT CONTENT COMPONENT
// ══════════════════════════════════════════════════════════════

function SpectContent() {
  return (
    <div className="space-y-6">

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
            {[
              "1. การตรวจกระดูก (Bone Scan)",
              "2. การตรวจการทำงานของหัวใจห้องล่างซ้าย (MUGA Scan)",
              "3. การตรวจการทำงานของต่อมไทรอยด์ (Thyroid Scan)",
            ].map((item) => (
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
          <div>
            <h2 className="text-base font-bold text-foreground">
              ภาระงานของพยาบาล / ผู้ช่วยพยาบาล ที่ปฏิบัติงานที่ SPECT / CT
            </h2>
          </div>
        </div>

        {/* 1. การลงข้อมูลผู้รับบริการ */}
        <div className="border border-border rounded-xl p-4 bg-muted/20 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1 h-4 rounded-full bg-primary inline-block" />
            <h3 className="text-xs font-semibold text-foreground">
              1. การลงข้อมูลผู้รับบริการที่มาทำหัตถการรายวัน
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {spectPatientLinks.map((link, i) => (
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
            label={spectEquipmentPersonalLink.label}
            href={spectEquipmentPersonalLink.href}
            type={spectEquipmentPersonalLink.type}
          />
        </div>

        {/* 3. การตรวจสอบอื่นๆ */}
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
  );
}

// ══════════════════════════════════════════════════════════════
// RADIATION THERAPY CONTENT DATA
// ══════════════════════════════════════════════════════════════

const rtNurses = [
  {
    name: "น.ส.สุรีรัตน์ เขียวขจร",
    responsibilities: [
      "1. ผู้ป่วยที่ฉายแสงเสร็จครั้งสุดท้าย (D–METHOD)",
      "2. การปฏิเสธการรักษาทางรังสีรักษาและมะเร็งวิทยา",
      "3. ผู้ป่วยใส่แร่ครั้งแรก / ครั้งสุดท้าย",
      "4. ผู้ป่วยที่มี Skin reaction ภายหลังการฉายแสง / ใส่แร่ ในส่วนของศีรษะและลำคอ",
    ],
    formHref: "#",
    reportHref: "#",
  },
  {
    name: "นายสราวุฒิ สิริกุล",
    responsibilities: [
      "1. ผู้ป่วยรายใหม่ : ฉายแสง / ใส่แร่ แบ่งกลุ่มผู้ป่วยเป็น Curative และ Palliative",
      "2. ผู้ป่วยฉายแสง / ใส่แร่ต่อเนื่องข้ามเดือน",
      "3. ผู้ป่วยพักฉายแสง / ใส่แร่ประจำเดือน",
      "4. ผู้ป่วยที่มี Skin reaction ภายหลังการฉายแสง / ใส่แร่ ในส่วนของช่องท้องและเชิงกรานและส่วนอื่นๆที่ไม่ใช่ ศีรษะและลำคอ / เต้านม",
    ],
    formHref: "#",
    reportHref: "#",
  },
  {
    name: "น.ส.นพมาศ ชนะดวงใจ",
    responsibilities: [
      "1. อุบัติการณ์การจำลองภาพผิดคน / ผิดตำแหน่ง",
      "2. ผู้ป่วยที่มาติดตามอาการภายหลังฉายแสง",
      "3. ผู้ป่วยที่มี Skin reaction ภายหลังการฉายแสง / ใส่แร่ ในส่วนของทรวงอกและเต้านม",
      "4. อุบัติการณ์ได้รับปริมาณรังสี เกินแผนการรักษา",
      "5. ผู้ป่วยที่ดูแลเส้นไม่ถูกต้อง",
    ],
    formHref: "#",
    reportHref: "#",
  },
  {
    name: "นายศักดิ์ดา สุตรอด",
    responsibilities: [
      "1. CT Simulation",
      "2. MRI Simulation",
      "3. Gold Fiducial Marker / HDR Brachytherapy",
      "4. ผู้รับบริการที่เลื่อนนัดหมายทำหัตถการ",
      "5. ผู้รับบริการที่ดมยาสลบ",
    ],
    formHref: "#",
    reportHref: "#",
  },
];

const rtEquipmentPersonalLink = { label: "lnk เพื่อลงข้อมูลการตรวจสอบ (คลิกเพื่อดูรายละเอียด)", href: "#", type: "form" };

const rtOtherSections = [
  {
    title: "การตรวจสอบความครบถ้วนของเครื่องมือแพทย์",
    links: [
      { label: "แบบการตรวจสอบความครบถ้วนของเครื่องมือแพทย์ 👍🏻", href: "#", type: "form" },
      { label: "รายงานการตรวจสอบความครบถ้วนของเครื่องมือแพทย์ 💡", href: "#", type: "report" },
    ],
  },
  {
    title: "การตรวจสอบความสมบูรณ์และพร้อมใช้ของปราศจากเชื้อ",
    links: [
      { label: "แบบการตรวจสอบความสมบูรณ์และพร้อมใช้ของปราศจากเชื้อ 👍🏻", href: "#", type: "form" },
      { label: "รายงานการตรวจสอบความสมบูรณ์และพร้อมใช้ของปราศจากเชื้อ 💡", href: "#", type: "report" },
    ],
  },
  {
    title: "การตรวจสอบรถฉุกเฉิน",
    links: [
      { label: "แบบการตรวจสอบรถฉุกเฉิน 👍🏻", href: "#", type: "form" },
      { label: "รายงานการตรวจสอบรถฉุกเฉิน 💡", href: "#", type: "report" },
    ],
  },
];

const rtTeachingMedia = [
  {
    title: "การเตรียมอุปกรณ์เวชรภัณฑ์ในการใส่แร่ 1 ขา",
    date: "23 มิ.ย. 2566",
    href: "#",
  },
  {
    title: "การเตรียมอุปกรณ์เวชรภัณฑ์ใส่แร่ 3 ขา",
    date: "7 มิ.ย. 2566",
    href: "#",
  },
];

// ══════════════════════════════════════════════════════════════
// RADIATION THERAPY CONTENT COMPONENT
// ══════════════════════════════════════════════════════════════

function RtContent() {
  return (
    <div className="space-y-6">

      {/* HERO BANNER */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-950 to-blue-700 px-6 py-5">
          <h2 className="text-white text-lg font-bold">รังสีรักษาและมะเร็งวิทยา ( Radiation Therapy )</h2>
        </div>
        <div className="px-6 py-4 bg-blue-50/50">
          <p className="text-sm text-blue-900 leading-relaxed">
            รังสีรักษาและมะเร็งวิทยา ( Radiation Therapy ) เป็นหน่วยตรวจวินิจฉัยและรักษาโรคมะเร็งในส่วนต่างๆ ของร่างกาย
            ด้วยเครื่องเร่งอนุภาพ หรือ เครื่องฉายรังสี ( Linear accelerators : LINACS ) และเครื่องใส่แร่ ( Brachytherapy Mechine )
            โดยขั้นตอนคราวๆ จะมีการรับการปรึกษาจากทางแผนกอื่นๆ เมื่อมีความจำเป็นต้องได้รับการรักษาด้วยวิธีฉายรังสี
            แพทย์จะนัดมาจำลองการฉายรังสีด้วยเครื่องจำลองการฉายรังสีด้วยเครื่องเอกซเรย์คอมพิวเตอร์ ( CT Simulators )
            หรือ เครื่องจำลองการฉายรังสีด้วยคลื่นแม่เหล็กไฟฟ้า ( MRI Simutors ) หรือทั้งสองชนิด
            หลังจากนั้นจำเป็นต้องคำนวณการฉายรังสีประมาณ 1 – 2 สัปดาห์ จึงสามารถเริ่มฉายรังสีหรือใส่แร่ได้
            (ในกรณีผู้ป่วยไม่รีบด่วน : Elective Case)
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
              ภาระงานของพยาบาล / ผู้ช่วยพยาบาล ที่ปฏิบัติงานที่ Radiation Therapy
            </h2>
          </div>
        </div>

        {/* 1. การลงข้อมูลผู้รับบริการ */}
        <div className="border border-border rounded-xl p-4 bg-muted/20 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1 h-4 rounded-full bg-primary inline-block" />
            <h3 className="text-xs font-semibold text-foreground">1. การลงข้อมูลผู้รับบริการ</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4 ml-3">
            (ภาระงานแยกเป็นรายบุคคลตามหัวข้อที่รับผิดชอบดังนี้)
          </p>

          <div className="space-y-4">
            {rtNurses.map((nurse, i) => (
              <div key={i} className="rounded-xl border border-blue-100 bg-blue-50/40 p-4">
                <p className="text-sm font-bold text-blue-900 mb-1">{nurse.name}</p>
                <p className="text-[11px] font-semibold text-blue-700 underline mb-2">
                  รับผิดชอบการลงข้อมูลผู้รับบริการที่ทำหัตถการดังนี้
                </p>
                <ul className="space-y-0.5 mb-3">
                  {nurse.responsibilities.map((r, j) => (
                    <li key={j} className="text-xs text-slate-700 leading-relaxed">{r}</li>
                  ))}
                </ul>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  <ActionLink label="แบบการลงข้อมูลผู้รับบริการ 👍🏻" href={nurse.formHref} type="form" />
                  <ActionLink label="รายการการลงข้อมูลผู้รับบริการ 💡" href={nurse.reportHref} type="report" />
                </div>
              </div>
            ))}
          </div>

          {/* Link ตรวจสอบข้อมูล APP RT */}
          <div className="mt-4 flex items-center gap-2 px-4 py-3 rounded-xl border border-primary/30 bg-primary/5 cursor-pointer hover:bg-primary/10 transition">
            <Bookmark className="w-4 h-4 text-primary fill-primary shrink-0" />
            <span className="text-sm font-semibold text-primary">Link ตรวจสอบข้อมูล APP RT</span>
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
            label={rtEquipmentPersonalLink.label}
            href={rtEquipmentPersonalLink.href}
            type={rtEquipmentPersonalLink.type}
          />
        </div>

        {/* 3. การตรวจสอบอื่นๆ */}
        <div className="border border-border rounded-xl p-4 bg-muted/20">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1 h-4 rounded-full bg-primary inline-block" />
            <h3 className="text-xs font-semibold text-foreground">3. การตรวจสอบอื่นๆ</h3>
          </div>
          <div className="space-y-4">
            {rtOtherSections.map((sec, i) => (
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

      {/* SECTION 2: สื่อการสอน */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1 h-4 rounded-full bg-primary inline-block" />
          <h2 className="text-xs font-semibold text-foreground">สื่อการสอนสำหรับบุคลากร</h2>
        </div>
        <div className="space-y-3">
          {rtTeachingMedia.map((media, i) => (
            <button
              key={i}
              onClick={() => { if (media.href !== "#") window.open(media.href, "_blank"); }}
              className="flex items-center gap-3 w-full rounded-xl border border-border bg-muted/20 hover:border-primary/40 hover:shadow-sm transition p-3 text-left"
            >
              {/* thumbnail placeholder */}
              <div className="w-16 h-12 rounded-lg bg-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                <svg className="w-6 h-6 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground leading-snug">{media.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">📅 {media.date}</p>
              </div>
              <svg className="w-3.5 h-3.5 text-muted-foreground shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}

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
// DIAGNOSTIC RADIOLOGY (SCREENING) CONTENT COMPONENT
// ══════════════════════════════════════════════════════════════

function DiagContent() {
  return (
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
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════

type ActiveView = "internal" | string;

function WorkUnitPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = React.useState<ActiveView>("internal");

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

  const activeDept = departments.find((d) => d.id === active);

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
          <h1 className="text-white text-2xl font-bold">หน่วยปฏิบัติงาน</h1>
          <p className="text-white/70 text-sm mt-1">เลือกหน่วยงานจากเมนูด้านซ้าย</p>
        </div>
        <div className="h-5 bg-background rounded-t-[2rem] relative z-10" />
      </div>

      {/* BODY */}
      <div className="max-w-5xl mx-auto px-5 -mt-1 pb-12">
        <div className="flex gap-5 items-start">

          {/* SIDEBAR */}
          <aside className="w-56 flex-shrink-0 sticky top-[78px]">
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
              <div className="px-4 py-4 border-b border-border" style={{ background: "var(--gradient-hero)" }}>
                <p className="text-white text-xs font-bold leading-snug">งานการพยาบาลรังสีวิทยา</p>
                <p className="text-white/60 text-[10px] mt-0.5">ฝ่ายการพยาบาล โรงพยาบาลธรรมศาสตร์ฯ</p>
              </div>

              <button
                onClick={() => setActive("internal")}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-left transition-all border-l-4
                  ${active === "internal"
                    ? "bg-primary/10 text-primary border-l-primary"
                    : "text-foreground border-l-transparent hover:bg-muted/60 hover:text-primary"
                  }`}
              >
                <span className="text-base">🏠</span>
                <span>บริหารภายใน</span>
              </button>

              <div className="h-px bg-border mx-3" />

              {departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => setActive(dept.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-left transition-all border-l-4
                    ${active === dept.id
                      ? "bg-primary/10 text-primary border-l-primary font-semibold"
                      : "text-foreground border-l-transparent hover:bg-muted/60 hover:text-primary"
                    }`}
                >
                  <span className="text-base">{dept.emoji}</span>
                  <span className="leading-snug">
                    {dept.name}
                    <br />
                    <span className="text-[10px] text-muted-foreground font-normal">{dept.name_en}</span>
                  </span>
                </button>
              ))}
            </div>
          </aside>

          {/* CONTENT */}
          <main className="flex-1 min-w-0 pt-4">
            {active === "internal" ? (
              <InternalContent onNavigate={(to) => navigate({ to: to as any })} />
            ) : active === "intervention" ? (
              <InterventionContent />
            ) : active === "spect" ? (
              <SpectContent />
            ) : active === "rt" ? (
              <RtContent />
            ) : active === "diag" ? (
              <DiagContent />
            ) : activeDept ? (
              <DeptContent dept={activeDept} />
            ) : null}
          </main>

        </div>
      </div>
    </div>
  );
}