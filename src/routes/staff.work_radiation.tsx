// src/routes/staff.work-radiation.tsx
import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/contexts/auth-context";
import { ClipboardList, Bookmark } from "lucide-react";

export const Route = createFileRoute("/staff/work_radiation")({
  component: WorkRadiationPage,
});

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
    { id: "rt", label: "รังสีรักษาและมะเร็งวิทยา", labelEn: "Radiation Therapy", emoji: "🎯", route: "/staff/work-radiation" },
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

function WorkRadiationPage() {
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
          <h1 className="text-white text-2xl font-bold">รังสีรักษาและมะเร็งวิทยา</h1>
          <p className="text-white/70 text-sm mt-1">Radiation Therapy</p>
        </div>
        <div className="h-5 bg-background rounded-t-[2rem] relative z-10" />
      </div>

      {/* BODY */}
      <div className="max-w-5xl mx-auto px-5 -mt-1 pb-12">
        <div className="flex gap-5 items-start">

          {/* SIDEBAR */}
          <Sidebar active="rt" onNavigate={(to) => navigate({ to: to as any })} />

          {/* CONTENT */}
          <main className="flex-1 min-w-0 pt-4">
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
          </main>

        </div>
      </div>
    </div>
  );
}
