import * as React from "react";
import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useAuth } from "@/contexts/auth-context";

// ══════════════════════════════════════════════════════════════
//  ROUTE — รับ ?tab=schedule | radiation
// ══════════════════════════════════════════════════════════════
export const Route = createFileRoute("/Worktoolspage")({
  validateSearch: (search: Record<string, unknown>) => ({
    tab: (search.tab as "schedule" | "radiation") ?? "schedule",
  }),
  component: WorkToolsPage,
});

// ══════════════════════════════════════════════════════════════
//  TYPES
// ══════════════════════════════════════════════════════════════
type LinkItem = { label: string; href: string };
type NurseEntry = { name: string; links: LinkItem[] };
type StaffGroup = { role: "พยาบาล" | "ผู้ช่วยพยาบาล"; members: NurseEntry[] };

// ══════════════════════════════════════════════════════════════
//  DATA — ตารางจ่ายงาน
// ══════════════════════════════════════════════════════════════
const scheduleNurseLinks: LinkItem[] = [
  { label: "ลงทะเบียนภาระงาน IR", href: "#" },
  { label: "ลงทะเบียนภาระงาน RT", href: "#" },
  { label: "ตารางแก้ไขภาระงาน",   href: "#" },
];

const scheduleAideLinks: LinkItem[] = [
  { label: "ลงทะเบียนภาระงาน",   href: "#" },
  { label: "ตารางแก้ไขภาระงาน",  href: "#" },
];

const summarizeLinks: LinkItem[] = [
  { label: "แบบการสรุปการปฏิบัติงาน", href: "#" },
];

// ══════════════════════════════════════════════════════════════
//  DATA — ค่าสัมผัสรังสี
// ══════════════════════════════════════════════════════════════
const radiationStaff: StaffGroup[] = [
  {
    role: "พยาบาล",
    members: [
      { name: "นพมาศ",    links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
      { name: "สุรีรัตน์", links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
      { name: "ญาราภรณ์", links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
      { name: "ชญาภา",    links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
      { name: "สรวัชญ์",  links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
      { name: "สหราช",    links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
      { name: "ดารารัศมี", links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
      { name: "สราวุฎิ",  links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
      { name: "ศศิกานต์", links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
      { name: "กิติศักดิ์", links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
      { name: "โยชิตา",   links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
      { name: "นฤมล",     links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
      { name: "ลลิตา",    links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
      { name: "ณัฏฐ์ธิดา", links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
      { name: "พรเทพ",    links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
      { name: "ศศิธร",    links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
      { name: "สุจิตตรา", links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
      { name: "ธนาวดี",   links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
      { name: "อัศรา",    links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
      { name: "พัชรี",    links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
      { name: "อัสมา",    links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
      { name: "ลูกน้ำ",   links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
      { name: "ญาณิน",    links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
      { name: "คณิศร",    links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
    ],
  },
  {
    role: "ผู้ช่วยพยาบาล",
    members: [
      { name: "ศักดิ์ดา",   links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
      { name: "พรทิพย์",    links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
      { name: "กิตติพงศ์",  links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
      { name: "ฐาปราณี",    links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
      { name: "ชลิตา",      links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
      { name: "พัชรินทร์",  links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
      { name: "สุภลักษณ์",  links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
      { name: "ผกากาญจน์",  links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
      { name: "ธนโชติ",     links: [{ label: "บันทึกการสัมผัสรังสี", href: "#" }, { label: "ตารางข้อมูล", href: "#" }] },
    ],
  },
];

// ══════════════════════════════════════════════════════════════
//  SHARED COMPONENTS
// ══════════════════════════════════════════════════════════════
function LinkButton({ label, href }: LinkItem) {
  const open = () => href !== "#" && window.open(href, "_blank");
  return (
    <button
      onClick={open}
      disabled={href === "#"}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150
        ${href !== "#"
          ? "bg-[#1e4d8c] text-white hover:bg-[#163d73] shadow-sm hover:shadow-md cursor-pointer"
          : "bg-[#1e4d8c]/40 text-white/70 cursor-default"}`}
    >
      {label}
    </button>
  );
}

function PersonCard({ entry }: { entry: NurseEntry }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 p-4 flex flex-col gap-2">
      <p className="text-[#1e3a6e] text-sm font-bold">{entry.name}</p>
      <div className="flex flex-wrap gap-2">
        {entry.links.map((l) => <LinkButton key={l.label} {...l} />)}
      </div>
    </div>
  );
}

function SectionBar({ title }: { title: string }) {
  return (
    <div
      className="text-center rounded-xl py-3 mb-5"
      style={{ background: "linear-gradient(90deg,#c6d8f5 0%,#dce8fb 50%,#c6d8f5 100%)" }}
    >
      <h2 className="text-[#1e3a6e] text-base font-bold tracking-wide">{title}</h2>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  SUB-PAGES
// ══════════════════════════════════════════════════════════════
function SchedulePage() {
  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5 mb-8 text-sm text-gray-600 leading-relaxed">
        มีการปรับปรุงรูปแบบการลงตารางงานรายวันของหน่วยงานการพยาบาลรังสีวิทยา จากแบบเดิมที่มีการลงทะเบียนผ่าน
        Google Sheets และลงข้อมูลผ่านทาง Line ซึ่งการลงข้อมูลทั้งสองส่วนนั้นต้องแยกเนื้อหาและใช้เวลาในการลงข้อมูล
        เป็นเวลานาน ทางหน่วยงานจึงนำมาวิเคราะห์และหาแนวทางแก้ไข เพื่อให้ลดระยะเวลาในการทำงาน
        โดยการนำเอา Google Form มาใช้ในการลงทะเบียนภาระงานรายวัน
      </div>

      <SectionBar title="แบบการลงทะเบียนภาระงาน และ ตารางแก้ไขภาระงาน (Google Form & Google Sheets)" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="flex rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="bg-[#1e4d8c] flex flex-col items-center justify-center gap-2 px-4 py-5 min-w-[110px] w-[110px] flex-shrink-0">
            <span className="text-4xl leading-none">👩‍⚕️</span>
            <span className="text-white text-xs font-bold text-center">พยาบาล</span>
          </div>
          <div className="flex-1 bg-[#eef3fb] p-4 flex flex-col gap-2 justify-center">
            {scheduleNurseLinks.map((l) => <LinkButton key={l.label} {...l} />)}
          </div>
        </div>

        <div className="flex rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="bg-[#1e4d8c] flex flex-col items-center justify-center gap-2 px-4 py-5 min-w-[110px] w-[110px] flex-shrink-0">
            <span className="text-4xl leading-none">🧑‍⚕️</span>
            <span className="text-white text-xs font-bold text-center">ผู้ช่วยพยาบาล</span>
          </div>
          <div className="flex-1 bg-[#eef3fb] p-4 flex flex-col gap-2 justify-center">
            {scheduleAideLinks.map((l) => <LinkButton key={l.label} {...l} />)}
          </div>
        </div>
      </div>

      <SectionBar title="แบบการสรุปการปฏิบัติงานประจำวัน" />

      <div className="flex rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="bg-[#1e4d8c] flex flex-col items-center justify-center gap-2 px-5 py-5 min-w-[130px] w-[130px] flex-shrink-0">
          <span className="text-4xl leading-none">📋</span>
          <span className="text-white text-xs font-bold text-center leading-snug">สรุปปฏิบัติงาน</span>
        </div>
        <div className="flex-1 bg-[#eef3fb] p-5 flex flex-wrap gap-3 items-center">
          {summarizeLinks.map((l) => <LinkButton key={l.label} {...l} />)}
        </div>
      </div>
    </>
  );
}

function RadiationPage() {
  return (
    <>
      {radiationStaff.map((group) => (
        <div key={group.role} className="mb-10">
          <SectionBar title={group.role} />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {group.members.map((m) => <PersonCard key={m.name} entry={m} />)}
          </div>
        </div>
      ))}
    </>
  );
}

// ══════════════════════════════════════════════════════════════
//  ROOT PAGE
// ══════════════════════════════════════════════════════════════
type TabId = "schedule" | "radiation";

function WorkToolsPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { tab: initialTab } = useSearch({ from: "/staff/work-tools" });
  const [activeTab, setActiveTab] = React.useState<TabId>(initialTab ?? "schedule");

  React.useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

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

  const tabs: { id: TabId; label: string; emoji: string }[] = [
    { id: "schedule",  label: "ตารางจ่ายงาน",  emoji: "📅" },
    { id: "radiation", label: "ค่าสัมผัสรังสี", emoji: "☢️" },
  ];

  const handleTabChange = (id: TabId) => {
    setActiveTab(id);
    navigate({ to: "/staff/work-tools", search: { tab: id }, replace: true });
  };

  const heroTitle = activeTab === "schedule"
    ? "ตารางจ่ายงานและสรุปการปฏิบัติงานรายวัน"
    : "บันทึกข้อมูลการปฏิบัติงานสัมผัสรังสี";

  const heroSub = activeTab === "schedule"
    ? "งานการพยาบาลรังสีวิทยา"
    : "ข้อมูลรายบุคคลของบุคลากรทุกคน";

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
          <h1 className="text-white text-2xl font-bold">{heroTitle}</h1>
          <p className="text-white/70 text-sm mt-1">{heroSub}</p>
        </div>
        <div className="h-5 bg-background rounded-t-[2rem] relative z-10" />
      </div>

      <div className="max-w-5xl mx-auto px-5 -mt-1 pb-12">
        {/* Tab switcher */}
        <div className="flex gap-2 pb-1 mb-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => handleTabChange(t.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150
                ${activeTab === t.id
                  ? "bg-primary text-white shadow-sm"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"}`}
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </div>

        {activeTab === "schedule" ? <SchedulePage /> : <RadiationPage />}
      </div>
    </div>
  );
}