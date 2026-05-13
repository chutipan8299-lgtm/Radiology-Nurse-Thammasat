import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/contexts/auth-context";

export const Route = createFileRoute("/staff/training-records")({
  component: TrainingRecordsPage,
});

// ══════════════════════════════════════════════════════════════
//  TYPES
// ══════════════════════════════════════════════════════════════

type Person = {
  name: string;
  href: string; // Google Doc URL ของคนนั้น — ใส่ "#" ถ้ายังไม่มี
};

type YearLink = {
  label: string;
  href: string;
};

type RoleGroup = {
  id: "nurse" | "assistant" | "admin" | "history";
  role: string;
  emoji: string;
  persons?: Person[];
  years?: YearLink[]; // สำหรับกลุ่ม history เท่านั้น
};

// ══════════════════════════════════════════════════════════════
//  DATA — แก้ href ให้ตรงกับ Google Doc / Sheet ของแต่ละคน
// ══════════════════════════════════════════════════════════════

const groups: RoleGroup[] = [
  {
    id: "nurse",
    role: "พยาบาล",
    emoji: "👩‍⚕️",
    persons: [
      { name: "นพมาศ ชนะดวงใจ",          href: "#" },
      { name: "สรวัชญ์ พันธ์ภูวงษ์",      href: "#" },
      { name: "จิตมณี กันนอก",            href: "#" },
      { name: "ลลิตา กล้าหาญ",            href: "#" },
      { name: "สุจิตตรา กองพิรี",         href: "#" },
      { name: "นฤมล ราชสีหา",             href: "#" },
      { name: "สุรีรัตน์ เขียวขจร",       href: "#" },
      { name: "สหราช จันทะลุน",           href: "#" },
      { name: "กิตติศักดิ์ คู่กระสังข์",  href: "#" },
      { name: "ณัฐธิดา ใจแก้ว",           href: "#" },
      { name: "ธนาวดี ประเดกิจ",          href: "#" },
      { name: "ญาณิน อินทะ",              href: "#" },
      { name: "ญาราภรณ์ ปรังฤทธิ์",       href: "#" },
      { name: "ดารารัศมี มีมูซอ",          href: "#" },
      { name: "โยชิตา ค้าผล",             href: "#" },
      { name: "พรเทพ เทาดี",              href: "#" },
      { name: "อัศรา สิงหล้า",            href: "#" },
      { name: "ลูกนำ สุขสำราญ",           href: "#" },
      { name: "ชญาภา กฤตพงศ์กุล",        href: "#" },
      { name: "สราวุณี ศิริกุล",          href: "#" },
      { name: "อัสมา เรืองกลปวงศ์",       href: "#" },
      { name: "ศิตธร พุทธทอง",            href: "#" },
      { name: "ศศิกานต์ ฐีตะนันท์",       href: "#" },
      { name: "คณิศร แก้วภักดี",          href: "#" },
    ],
  },
  {
    id: "assistant",
    role: "ผู้ช่วยพยาบาล",
    emoji: "🧑‍⚕️",
    persons: [
      { name: "ศักดิ์ดา สุดรอด",           href: "#" },
      { name: "ชลิตา วะเศษสร้อย",          href: "#" },
      { name: "ธนโชติ เอี่ยมละออ",         href: "#" },
      { name: "พรทิพย์ แก่นประชา",         href: "#" },
      { name: "พัชรินทร์ บานเย็น",         href: "#" },
      { name: "กิตติพงษ์ ม่วงรื่น",       href: "#" },
      { name: "สุกลักษณ์ สุกประดิษฐ์",    href: "#" },
      { name: "ฐาปราณี มาช่วย",            href: "#" },
      { name: "ผกาภาญจน์ โกสกุล",         href: "#" },
    ],
  },
  {
    id: "admin",
    role: "เจ้าหน้าที่ธุรการ",
    emoji: "🗂️",
    persons: [
      { name: "ปนัดดา มะหะหมัดอาเก็บ", href: "#" },
    ],
  },
  {
    id: "history",
    role: "ข้อมูลการอบรมย้อนหลัง",
    emoji: "📚",
    years: [
      { label: "ปี 2561", href: "#" },
      { label: "ปี 2562", href: "#" },
      { label: "ปี 2563", href: "#" },
      { label: "ปี 2564", href: "#" },
      { label: "ปี 2565", href: "#" },
      { label: "ปี 2566", href: "#" },
      { label: "ปี 2567", href: "#" },
      { label: "ปี 2568", href: "#" },
    ],
  },
];

const ROLE_LABELS: Record<string, string> = {
  all:       "ทั้งหมด",
  nurse:     "พยาบาล",
  assistant: "ผู้ช่วยพยาบาล",
  admin:     "เจ้าหน้าที่ธุรการ",
  history:   "ข้อมูลการอบรมย้อนหลัง",
};

// ══════════════════════════════════════════════════════════════
//  SUB-COMPONENTS
// ══════════════════════════════════════════════════════════════

/** แถวชื่อบุคลากร */
function PersonGrid({ persons }: { persons: Person[] }) {
  return (
    <div className="flex-1 bg-[#eef3fb] p-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-1">
        {persons.map((p) => {
          const hasLink = p.href !== "#";
          return (
            <button
              key={p.name}
              disabled={!hasLink}
              onClick={() => hasLink && window.open(p.href, "_blank")}
              title={hasLink ? "คลิกดูไทม์ไลน์การอบรม" : "ยังไม่มีข้อมูล"}
              className={`text-left text-sm font-semibold text-[#1e3a6e] py-1.5 px-2 rounded-lg transition-all duration-150
                ${hasLink
                  ? "hover:bg-[#3b6bc7]/15 hover:text-[#3b6bc7] cursor-pointer"
                  : "opacity-50 cursor-default"
                }`}
            >
              {p.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** แถวปีย้อนหลัง */
function YearGrid({ years }: { years: YearLink[] }) {
  return (
    <div className="flex-1 bg-[#eef3fb] p-5 flex flex-wrap gap-2 items-center">
      {years.map((y) => {
        const hasLink = y.href !== "#";
        return (
          <button
            key={y.label}
            disabled={!hasLink}
            onClick={() => hasLink && window.open(y.href, "_blank")}
            className={`inline-flex items-center gap-1.5 bg-white border rounded-full px-4 py-1.5 text-sm font-semibold text-[#1e3a6e] transition-all duration-150
              ${hasLink
                ? "border-[#c6d8f5] hover:border-[#3b6bc7] hover:text-[#3b6bc7] cursor-pointer"
                : "border-gray-200 opacity-50 cursor-default"
              }`}
          >
            📄 {y.label}
          </button>
        );
      })}
    </div>
  );
}

/** row การ์ดกลุ่ม */
function GroupRow({ group }: { group: RoleGroup }) {
  return (
    <div className="flex rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* ซ้าย */}
      <div className="bg-[#3b6bc7] flex flex-col items-center justify-center gap-3 px-5 py-6 min-w-[130px] w-[130px] flex-shrink-0">
        <span className="text-5xl leading-none">{group.emoji}</span>
        <span className="text-white text-xs font-bold bg-white/20 rounded-lg px-2.5 py-1 text-center leading-snug">
          {group.role}
        </span>
      </div>

      {/* ขวา */}
      {group.years ? (
        <YearGrid years={group.years} />
      ) : (
        <PersonGrid persons={group.persons ?? []} />
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  MAIN PAGE
// ══════════════════════════════════════════════════════════════

function TrainingRecordsPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = React.useState<string>("all");

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

  const filtered = activeRole === "all"
    ? groups
    : groups.filter((g) => g.id === activeRole);

  const tabs = [
    { id: "all",       label: "ทั้งหมด",                    badge: groups.length },
    { id: "nurse",     label: "👩‍⚕️ พยาบาล",                badge: groups.find(g=>g.id==="nurse")?.persons?.length },
    { id: "assistant", label: "🧑‍⚕️ ผู้ช่วยพยาบาล",         badge: groups.find(g=>g.id==="assistant")?.persons?.length },
    { id: "admin",     label: "🗂️ เจ้าหน้าที่ธุรการ",       badge: groups.find(g=>g.id==="admin")?.persons?.length },
    { id: "history",   label: "📚 ข้อมูลการอบรมย้อนหลัง",  badge: undefined },
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-white" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-white" />
        </div>
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
          <h1 className="text-white text-2xl font-bold">บันทึกการอบรม</h1>
          <p className="text-white/70 text-sm mt-1">
            คลิกชื่อบุคลากรเพื่อดูไทม์ไลน์การอบรมรายบุคคล
          </p>
        </div>
        <div className="h-5 bg-background rounded-t-[2rem] relative z-10" />
      </div>

      <div className="max-w-5xl mx-auto px-5 -mt-1 pb-12">

        {/* ── Role Filter Tabs ── */}
        <div className="flex overflow-x-auto gap-1 pb-1 mb-6 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveRole(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 flex-shrink-0
                ${activeRole === tab.id
                  ? "bg-primary text-white shadow-sm"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }`}
            >
              {tab.label}
              {tab.badge !== undefined && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full
                  ${activeRole === tab.id ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Section Title Bar ── */}
        <div
          className="text-center rounded-xl py-3 mb-5"
          style={{ background: "linear-gradient(90deg,#c6d8f5 0%,#dce8fb 50%,#c6d8f5 100%)" }}
        >
          <h2 className="text-[#1e3a6e] text-base font-bold tracking-wide">
            {activeRole === "all" ? "บันทึกการอบรม" : ROLE_LABELS[activeRole]}
          </h2>
        </div>

        {/* ── Group Rows ── */}
        {filtered.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filtered.map((group) => (
              <GroupRow key={group.id} group={group} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <div className="text-5xl mb-3">🔍</div>
            <p className="font-semibold text-foreground">ไม่พบข้อมูลในกลุ่มนี้</p>
          </div>
        )}

      </div>
    </div>
  );
}