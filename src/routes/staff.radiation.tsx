import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/contexts/auth-context";

// ✅ เปลี่ยน route ให้ตรงกับชื่อไฟล์ staff.radiation.tsx
export const Route = createFileRoute("/staff/radiation")({
  component: StaffRadiationPage,
});

// ══════════════════════════════════════════════════════════════
// DATA — ใส่ href Google Sheet/Doc ของแต่ละคน
// ══════════════════════════════════════════════════════════════

type Person = {
  name: string;
  href: string;
};

const nurses: Person[] = [
  { name: "นพมาศ", href: "#" },
  { name: "สุรีรัตน์", href: "#" },
  { name: "ณฐรากรณ์", href: "#" },
  { name: "ชญาภา", href: "#" },
  { name: "สรวัชญ์", href: "#" },
  { name: "ดารารัศมี", href: "#" },
  { name: "สราวุณี", href: "#" },
  { name: "ศศิกานต์", href: "#" },
  { name: "คณิศร", href: "#" },
  { name: "ลลิตา", href: "#" },
  { name: "นฤมล", href: "#" },
  { name: "โยชิตา", href: "#" },
  { name: "ศิตธร", href: "#" },
  { name: "พรเทพ", href: "#" },
  { name: "อัสมา", href: "#" },
  { name: "ลูกนำ", href: "#" },
  { name: "ญาณิน", href: "#" },
  { name: "จิตมณี", href: "#" },
  { name: "ณัฐธิดา", href: "#" },
  { name: "ธนาวดี", href: "#" },
  { name: "อัศรา", href: "#" },
  { name: "ญาราภรณ์", href: "#" },
];

const assistants: Person[] = [
  { name: "ศักดิ์ดา", href: "#" },
  { name: "พรทิพย์", href: "#" },
  { name: "กิตติพงษ์", href: "#" },
  { name: "ฐาปราณี", href: "#" },
  { name: "ชลิตา", href: "#" },
  { name: "พัชรินทร์", href: "#" },
  { name: "สุกลักษณ์", href: "#" },
  { name: "ผกาภาญจน์", href: "#" },
  { name: "ธนโชติ", href: "#" },
];

// ══════════════════════════════════════════════════════════════
// COMPONENTS
// ══════════════════════════════════════════════════════════════

function PersonCard({ person }: { person: Person }) {
  const hasLink = person.href !== "#";

  return (
    <button
      onClick={() => hasLink && window.open(person.href, "_blank")}
      disabled={!hasLink}
      title={hasLink ? "คลิกดูข้อมูลการสัมผัสรังสี" : "ยังไม่มีข้อมูล"}
      className={`group flex flex-col items-center gap-2 bg-white border-2 rounded-2xl p-4 transition-all duration-200
        ${
          hasLink
            ? "border-[#3b6bc7] hover:border-primary hover:shadow-lg hover:scale-105 cursor-pointer"
            : "border-[#3b6bc7]/40 opacity-60 cursor-default"
        }`}
    >
      <p className="text-base font-bold text-[#1e3a6e] text-center leading-tight">
        {person.name}
      </p>

      <p className="text-[10px] text-[#6c757d] text-center leading-snug">
        บันทึกการสัมผัสรังสี
      </p>

      {hasLink && (
        <span className="text-[10px] text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
          ดูข้อมูล →
        </span>
      )}
    </button>
  );
}

function SectionHeader({
  emoji,
  title,
  gradient,
}: {
  emoji: string;
  title: string;
  gradient: string;
}) {
  return (
    <div
      className="flex items-center gap-3 rounded-2xl px-6 py-4 mb-5"
      style={{ background: gradient }}
    >
      <span className="text-3xl">{emoji}</span>
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════

function StaffRadiationPage() {
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
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* ── Hero ── */}
      <div
        className="relative overflow-hidden"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-white" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-white" />
        </div>

        <div className="relative max-w-6xl mx-auto px-5 py-8">
          {/* back button */}
          <button
            onClick={() => navigate({ to: "/staff/internal" })}
            className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs mb-4 transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            กลับหน้าบริหารภายใน
          </button>

          <h1 className="text-white text-2xl font-bold">
            บันทึกข้อมูลการปฏิบัติงานสัมผัสรังสี
          </h1>

          <p className="text-white/70 text-sm mt-1">
            ตารางข้อมูลและบันทึกการสัมผัสรังสีของพยาบาลและผู้ช่วยพยาบาล
          </p>
        </div>

        <div className="h-5 bg-[#f5f7fa] rounded-t-[2rem] relative z-10" />
      </div>

      {/* ── Content ── */}
      <div className="max-w-6xl mx-auto px-5 -mt-1 pb-12 space-y-10">
        {/* พยาบาล */}
        <section>
          <SectionHeader
            emoji="👩‍⚕️"
            title="พยาบาล"
            gradient="linear-gradient(135deg,#667eea 0%,#764ba2 100%)"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {nurses.map((p, i) => (
              <PersonCard key={`n-${i}`} person={p} />
            ))}
          </div>
        </section>

        {/* ผู้ช่วยพยาบาล */}
        <section>
          <SectionHeader
            emoji="🧑‍⚕️"
            title="ผู้ช่วยพยาบาล"
            gradient="linear-gradient(135deg,#f093fb 0%,#f5576c 100%)"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {assistants.map((p, i) => (
              <PersonCard key={`a-${i}`} person={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}