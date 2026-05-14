import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/contexts/auth-context";

export const Route = createFileRoute("/staff/downloads")({
  component: DownloadsPage,
});

type DocLink = { label: string; href: string };
type DocSection = { title: string; emoji: string; docs: DocLink[] };

const docSections: DocSection[] = [
  {
    title: "สวัสดิการ",
    emoji: "🎁",
    docs: [
      { label: "แบบฟอร์มขอรับสวัสดิการ งานการพยาบาลรังสีวิทยา", href: "https://drive.google.com/file/d/1BMk8mrrHcMx9Yzmjf7wLMOOkIaiCviXw/view?usp=share_link" },
      { label: "เอกสารแนบเบิกสวัสดิการ ฝ่ายการพยาบาล", href: "https://www.hospital.tu.ac.th/ndtuh/upload/addsome/files/202203161301560.pdf" },
      { label: "แบบฟอร์มขอรับสวัสดิการ ฝ่ายการพยาบาล", href: "https://drive.google.com/file/d/1JOw_cUmE3PMVtLlRThxZOkNyPg_agYb9/view?usp=share_link" },
      { label: "แบบฟอร์มเบิกสวัสดิการด้านสุขภาพแบบยืดหยุ่น", href: "https://intranet.hospital.tu.ac.th/hr/upload/addsome/files/2025013016204865.pdf" },
      { label: "เอกสารแนบเบิกสวัสดิการสุขภาพแบบยืดหยุ่น", href: "https://intranet.hospital.tu.ac.th/hr/upload/addsome/files/2022072614455485.pdf" },
      { label: "แบบฟอร์มการขอเรียกร้องค่ารักษาพยาบาล การประกันสุขภาพ (กลุ่ม)", href: "https://intranet.hospital.tu.ac.th/hr/upload/addsome/files/2024102409383968.pdf" },
      { label: "แบบฟอร์มขอเบิกชุดเยี่ยมไข้บุคลากรโรงพยาบาล กรณีเข้ารับการรักษาในโรงพยาบาล", href: "https://www.hospital.tu.ac.th/hr/upload/addsome/files/2022072611323451.pdf" },
    ],
  },
  {
    title: "การลาต่าง ๆ",
    emoji: "✈️",
    docs: [
      { label: "แบบฟอร์มขออนุญาตไปต่างประเทศ ข้าราชการ พนักงานมหาวิทยาลัย", href: "https://intranet.hospital.tu.ac.th/hr/upload/addsome/files/202403130848591.pdf" },
      { label: "แบบฟอร์มขออนุญาตไปต่างประเทศ พนักงานโรงพยาบาล", href: "https://intranet.hospital.tu.ac.th/hr/upload/addsome/files/2024031308491255.pdf" },
      { label: "แบบใบรายงานตัวกลับ (ลาคลอดบุตร/ลาอุปสมบท/ลาศึกษา/ลาฝึกอบรม ฯลฯ)", href: "https://intranet.hospital.tu.ac.th/hr/upload/addsome/files/2022080214070934.pdf" },
      { label: "แบบใบขอยกเลิกวันลา", href: "https://drive.google.com/file/d/1b362vQjLnTkdZ-Ly-GjnVg7EiA2k2IjC/view?usp=share_link" },
      { label: "แบบหนังสือขอลาออกจากงาน พนักงานมหาวิทยาลัย", href: "https://intranet.hospital.tu.ac.th/hr/upload/addsome/files/2024080108540758.pdf" },
      { label: "แบบหนังสือขอลาออกจากงาน พนักงานโรงพยาบาล", href: "https://intranet.hospital.tu.ac.th/hr/upload/addsome/files/2024080108542320.pdf" },
    ],
  },
  {
    title: "เอกสารภายในหน่วยงาน",
    emoji: "📂",
    docs: [
      { label: "แบบบันทึกการปฏิบัติงานสัมผัสรังสี", href: "https://drive.google.com/file/d/150ZVRbGkAoWT15oxq37bq6tueHqjBCcS/view?usp=sharing" },
      { label: "ใบบันทึกสัญญาณชีพ เวชศาสตร์นิวเคลียร์", href: "https://drive.google.com/file/d/11NHFQ-XEzR9q_6M26X_wA50HE_JmJv1D/view?usp=share_link" },
    ],
  },
];

function DocSectionRow({ section }: { section: DocSection }) {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
      <div
        className="px-5 py-3 flex items-center gap-2"
        style={{ background: "linear-gradient(90deg,#c6d8f5 0%,#dce8fb 50%,#c6d8f5 100%)" }}
      >
        <span className="text-lg">{section.emoji}</span>
        <h3 className="text-[#1e3a6e] font-bold text-sm tracking-wide">{section.title}</h3>
      </div>
      <div className="divide-y divide-border">
        {section.docs.map((doc) => {
          const hasLink = doc.href !== "#";
          return (
            <button
              key={doc.label}
              disabled={!hasLink}
              onClick={() => hasLink && window.open(doc.href, "_blank")}
              className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-all duration-150
                ${hasLink ? "hover:bg-[#eef3fb] cursor-pointer" : "opacity-50 cursor-default"}`}
            >
              <span className="text-[#1e4d8c] flex-shrink-0">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z" />
                </svg>
              </span>
              <span className={`text-sm font-medium flex-1 leading-snug ${hasLink ? "text-[#1e4d8c]" : "text-muted-foreground"}`}>
                {doc.label}
              </span>
              {hasLink && (
                <span className="text-[#1e4d8c]/40 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DownloadsPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = React.useState("");

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

  const filtered = search.trim()
    ? docSections
        .map((sec) => ({
          ...sec,
          docs: sec.docs.filter((d) =>
            d.label.toLowerCase().includes(search.toLowerCase())
          ),
        }))
        .filter((sec) => sec.docs.length > 0)
    : docSections;

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
          <h1 className="text-white text-2xl font-bold">Download เอกสาร</h1>
          <p className="text-white/70 text-sm mt-1">แบบฟอร์มและเอกสารสำหรับบุคลากรงานการพยาบาลรังสีวิทยา</p>

          <div className="mt-5 flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 max-w-md">
            <svg className="w-4 h-4 text-white/50 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ค้นหาเอกสาร..."
              className="flex-1 bg-transparent text-white text-sm placeholder-white/40 outline-none"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-white/50 hover:text-white transition-colors">
                ✕
              </button>
            )}
          </div>
        </div>
        <div className="h-5 bg-background rounded-t-[2rem] relative z-10" />
      </div>

      <div className="max-w-5xl mx-auto px-5 -mt-1 pb-12 space-y-5">
        {filtered.length > 0 ? (
          filtered.map((section) => (
            <DocSectionRow key={section.title} section={section} />
          ))
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <div className="text-5xl mb-3">📭</div>
            <p className="font-semibold text-foreground">ไม่พบเอกสารที่ค้นหา</p>
            <p className="text-sm mt-1">ลองค้นหาด้วยคำอื่น</p>
          </div>
        )}
      </div>
    </div>
  );
}