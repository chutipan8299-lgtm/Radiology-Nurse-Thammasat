import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/contexts/auth-context";

export const Route = createFileRoute("/staff/internal")({
  component: StaffInternalPage,
});

type SubItem = {
  label: string;
  href: string;
};

type CardItem = {
  icon: string;
  label: string;
  href?: string;
  navigateTo?: string;   // navigate ไปหน้าใหม่ในเว็บ
  subItems?: SubItem[];
};

type Section = {
  title: string;
  items: CardItem[];
};

const sections: Section[] = [
  {
    title: "ข้อมูลสำหรับบุคลากร",
    items: [
      { icon: "📅", label: "ตารางขอเวร", href: "#" },
      {
        icon: "📝", label: "บันทึกการอบรม",
        subItems: [
          { label: "บันทึกการอบรม 2566", href: "#" },
          { label: "บันทึกการอบรม 2567", href: "#" },
          { label: "บันทึกการอบรม 2568", href: "#" },
        ],
      },
      { icon: "☢️", label: "ค่าสัมผัสรังสี", href: "#" },
      { icon: "📊", label: "ตัวชี้วัด", href: "#" },
      { icon: "📋", label: "การประเมินผลการปฏิบัติงาน", href: "#" },
      {
        icon: "👥", label: "ยอดผู้ป่วยส่งเวรตรวจการ",
        subItems: [
          { label: "ยอดเวรตรวจการ 2566", href: "#" },
          { label: "ยอดเวรตรวจการ เดิม", href: "#" },
        ],
      },
      { icon: "💰", label: "ตารางจ่ายงาน", href: "#" },
      {
        icon: "🗣️", label: "รายงานการประชุม",
        subItems: [
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
      { icon: "🏥", label: "ภาระงานแต่ละหน่วยงาน", href: "#" },
      { icon: "📥", label: "Download เอกสาร", href: "#" },
      { icon: "🏆", label: "รายงานผลการอบรม", href: "#" },
    ],
  },
  {
    title: "Google Form สำหรับพยาบาลลงทะเบียนเพิ่มเติม",
    items: [
      { icon: "📄", label: "Form เพิ่มเติมภาระงาน IR", href: "#" },
      { icon: "📄", label: "RT ลงยอดเวรตรวจการ & ภาระงาน", href: "#" },
      { icon: "📄", label: "ยอดเวรตรวจการ Screening", href: "#" },
      { icon: "📄", label: "ข้อมูลผู้ป่วยแพ้สารทึบรังสี", href: "#" },
      { icon: "📄", label: "ข้อมูลผู้ป่วย Contrast leak", href: "#" },
    ],
  },
  {
    title: "Google Form สำหรับผู้ช่วยพยาบาลลงทะเบียนเพิ่มเติม",
    items: [
      { icon: "📄", label: "Form ผู้ช่วยพยาบาล IR", href: "#" },
      { icon: "📄", label: "Form ผู้ช่วยพยาบาล RT", href: "#" },
    ],
  },
  {
    title: "PN Intervention",
    items: [
      { icon: "📄", label: "PN Intervention", href: "#" },
      { icon: "📄", label: "PN RT", href: "#" },
    ],
  },
  {
    title: "ข้อมูลผู้ป่วย",
    items: [
      { icon: "📓", label: "รายชื่อผู้ป่วยที่ทำหัตถการ", navigateTo: "/staff/patients" },
      { icon: "📈", label: "สถิติผู้รับบริการ รายเดือน", navigateTo: "/staff/statistics" },
    ],
  },
];

function ItemCard({ item, onNavigate }: { item: CardItem; onNavigate: (to: string) => void }) {
  const [expanded, setExpanded] = React.useState(false);
  const hasSubItems = item.subItems && item.subItems.length > 0;

  const handleClick = () => {
    if (item.navigateTo) {
      onNavigate(item.navigateTo);
    } else if (hasSubItems) {
      setExpanded((v) => !v);
    } else if (item.href && item.href !== "#") {
      window.open(item.href, "_blank");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleClick}
        className={`group flex flex-col items-center gap-3 bg-card border rounded-2xl p-5 transition-all duration-200 text-center w-full
          ${expanded
            ? "border-primary bg-primary/5 shadow-md"
            : "border-border hover:border-primary/30 hover:shadow-md"
          }`}
        style={{ boxShadow: expanded ? undefined : "var(--shadow-card)" }}
      >
        <div className="text-4xl group-hover:scale-110 transition-transform duration-200">{item.icon}</div>
        <p className="text-xs font-medium text-foreground leading-snug">{item.label}</p>
        {item.navigateTo && (
          <span className="text-[10px] text-primary font-medium">ดูทั้งหมด →</span>
        )}
        {hasSubItems && (
          <span className={`text-[10px] transition-transform duration-200 text-muted-foreground ${expanded ? "rotate-180" : ""}`}>
            ▼
          </span>
        )}
      </button>

      {hasSubItems && expanded && (
        <div className="flex flex-col gap-1.5 pl-1">
          {item.subItems!.map((sub) => (
            <a
              key={sub.label}
              href={sub.href !== "#" ? sub.href : undefined}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => sub.href === "#" && e.preventDefault()}
              className="flex items-center gap-2 bg-secondary/60 hover:bg-secondary border border-border rounded-xl px-3 py-2.5 text-xs font-medium text-foreground transition-all hover:border-primary/30"
            >
              <span className="text-primary">→</span>
              {sub.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function StaffInternalPage() {
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
            onClick={() => navigate({ to: "/staff/dashboard" })}
            className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs mb-4 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            กลับหน้า Dashboard
          </button>
          <h1 className="text-white text-2xl font-bold">บริหารภายใน</h1>
          <p className="text-white/70 text-sm mt-1">การบริหารจัดการข้อมูลและแผนงานทั่วไปของงานการพยาบาลรังสีวิทยา</p>
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {section.items.map((item) => (
                <ItemCard
                  key={item.label}
                  item={item}
                  onNavigate={(to) => navigate({ to: to as any })}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}