import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/contexts/auth-context";

export const Route = createFileRoute("/staff/patients")({
  component: StaffPatientsPage,
});

type CardItem = {
  icon: string;
  label: string;
  href: string;
};

type Section = {
  title: string;
  items: CardItem[];
};

const sections: Section[] = [
  {
    title: "รายชื่อผู้ป่วยที่ทำหัตถการรังสีวินิจฉัยและร่วมรักษา (Intervention)",
    items: [
      { icon: "📍", label: "การลงข้อมูลผู้รับบริการที่ทำหัตถการห้อง DSA", href: "#" },
      { icon: "📚", label: "การลงข้อมูลผู้รับบริการที่ทำหัตถการห้อง Ultrasound", href: "#" },
      { icon: "🔄", label: "การลงข้อมูลผู้รับบริการที่ทำหัตถการ Thrombectomy", href: "#" },
      { icon: "📋", label: "การลงข้อมูลเยี่ยมตรวจผู้รับบริการ ก่อน/หลังหัตถการ/เฉพาะหัตถการ C-line", href: "#" },
      { icon: "🏠", label: "การส่งผู้ป่วยกลับหอผู้ป่วย", href: "#" },
      { icon: "📖", label: "ข้อมูลย้อนหลัง ปีงบประมาณ 2560–2564", href: "#" },
    ],
  },
  {
    title: "รายชื่อผู้ป่วยที่ทำหัตถการเวชศาสตร์นิวเคลียร์ (SPECT/CT)",
    items: [
      { icon: "📍", label: "การลงข้อมูลผู้รับบริการที่ทำหัตถการห้อง SPECT/CT", href: "#" },
      { icon: "📖", label: "ข้อมูลย้อนหลัง", href: "#" },
    ],
  },
  {
    title: "รายชื่อผู้ป่วยที่ทำหัตถการรังสีรักษาและมะเร็งวิทยา (Radiation Therapy)",
    items: [
      { icon: "👤", label: "พยาบาล RT 1", href: "#" },
      { icon: "👤", label: "พยาบาล RT 2", href: "#" },
      { icon: "👤", label: "พยาบาล RT 3", href: "#" },
      { icon: "👤", label: "พยาบาล RT 4", href: "#" },
      { icon: "📖", label: "ข้อมูลย้อนหลัง", href: "#" },
    ],
  },
];

function ItemCard({ item }: { item: CardItem }) {
  return (
    <a
      href={item.href !== "#" ? item.href : undefined}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => item.href === "#" && e.preventDefault()}
      className="group flex flex-col items-center gap-3 bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-md transition-all duration-200 text-center cursor-pointer"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="text-4xl group-hover:scale-110 transition-transform duration-200">{item.icon}</div>
      <p className="text-xs font-medium text-foreground leading-snug">{item.label}</p>
    </a>
  );
}

function StaffPatientsPage() {
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
      <div className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-10">
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
          <h1 className="text-white text-2xl font-bold">รายชื่อผู้ป่วยที่ทำหัตถการ</h1>
          <p className="text-white/70 text-sm mt-1">สถิติรายชื่อผู้ป่วยแต่ละหน่วยงาน</p>
        </div>
        <div className="h-5 bg-background rounded-t-[2rem] relative z-10" />
      </div>

      <div className="max-w-5xl mx-auto px-5 -mt-1 pb-12 space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1 h-5 rounded-full bg-primary inline-block" />
              <h2 className="text-sm font-semibold text-foreground">{section.title}</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {section.items.map((item) => (
                <ItemCard key={item.label} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}