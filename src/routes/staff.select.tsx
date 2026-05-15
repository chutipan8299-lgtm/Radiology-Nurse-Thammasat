import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Users,
  FileText,
  BarChart3,
  CalendarDays,
  Stethoscope,
  Wrench,
  ClipboardCheck,
  Activity,
  ArrowRight,
  LogOut,
  Sparkles,
  Building2,
  Zap,
  ScanLine,
  HeartPulse,
  Microscope,
  RadioTower,
  FlaskConical,
  MonitorCheck,
  PackageSearch,
  ChevronRight,
} from "lucide-react";

import { useMode } from "@/contexts/mode-context";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/staff/select")({
  head: () => ({
    meta: [
      { title: "เลือกระบบภายใน — หน่วยพยาบาลรังสีวิทยา" },
      {
        name: "description",
        content: "เลือกระบบจัดการภายในหรือระบบเครื่องมือแพทย์หลังเข้าสู่ระบบ",
      },
    ],
  }),
  component: StaffSelectPage,
});

// ══════════════════════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════════════════════

const EQUIPMENT_DEPTS = [
  {
    key: "intervention",
    label: "รังสีร่วมรักษา",
    sub: "Intervention",
    icon: HeartPulse,
    color: "#e879a0",
    bg: "#fce7f3",
    route: "/staff/medicalequipmentpage",          
  },
  {
    key: "spect",
    label: "เวชศาสตร์นิวเคลียร์",
    sub: "SPECT / CT",
    icon: Microscope,
    color: "#8b5cf6",
    bg: "#f3e8ff",
    route: "/staff/medicalequipmentpage_spect",
  },
  {
    key: "radiation",
    label: "รังสีรักษาและมะเร็งวิทยา",
    sub: "Radiation Therapy",
    icon: RadioTower,
    color: "#f59e0b",
    bg: "#fef3c7",
    route: "/staff/medicalequipmentpage_radiation",
  },
  {
    key: "screening",
    label: "รังสีวินิจฉัย",
    sub: "Diagnostic Radiology",
    icon: ScanLine,
    color: "#10b981",
    bg: "#d1fae5",
    route: "/staff/medicalequipmentpage_sceening",  // สะกดตามชื่อไฟล์
  },
];

const WORKLOAD_DEPTS = [
  {
    key: "intervention-work",
    label: "รังสีร่วมรักษา",
    sub: "Intervention",
    icon: HeartPulse,
    color: "#e879a0",
    bg: "#fce7f3",
    dept: "intervention",
    section: "workload",
    tasks: ["C-line", "PICC line", "ส่งผู้ป่วย", "IV Insertion"],
    route: "/staff/work_intervention",
  },
  {
    key: "spect-work",
    label: "เวชศาสตร์นิวเคลียร์",
    sub: "SPECT / CT",
    icon: FlaskConical,
    color: "#8b5cf6",
    bg: "#f3e8ff",
    dept: "spect",
    section: "workload",
    tasks: ["บันทึกผู้รับบริการ", "รายงาน", "ตรวจสอบ", "ติดตาม"],
    route: "/staff/work_spect",
  },
  {
    key: "radiation-work",
    label: "รังสีรักษา",
    sub: "Radiation Therapy",
    icon: RadioTower,
    color: "#f59e0b",
    bg: "#fef3c7",
    dept: "rt",
    section: "workload",
    tasks: ["บันทึกการรักษา", "รายงาน", "ติดตามผู้ป่วย", "ตารางงาน"],
    route: "/staff/work_radiation",
  },
  {
    key: "diagnostic-work",
    label: "รังสีวินิจฉัย",
    sub: "Diagnostic Radiology",
    icon: MonitorCheck,
    color: "#10b981",
    bg: "#d1fae5",
    dept: "diag",
    section: "workload",
    tasks: ["บันทึกผู้ป่วย", "รายงาน", "ตรวจสอบ", "สถิติ"],
    route: "/staff/work_screening",
  },
];

type Choice = "management" | "equipment" | "workunit";

// ══════════════════════════════════════════════════════════════
// PAGE
// ══════════════════════════════════════════════════════════════
function StaffSelectPage() {
  const { setMode } = useMode();
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  const [staffId, setStaffId] = useState<string>("");
  const [last, setLast] = useState<Choice | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (loading) return;
    if (!user) {
      navigate({ to: "/staff/login", replace: true });
      return;
    }
    setMode("staff");
    const fromEmail = user.email?.replace("@staff.th", "") ?? "";
    setStaffId(window.localStorage.getItem("rnu-staff-id") || fromEmail);
    const stored = window.localStorage.getItem("rnu-staff-system") as Choice | null;
    if (stored) setLast(stored);
  }, [user, loading, navigate, setMode]);

  const handleSignOut = async () => {
    try { await signOut(); } catch (err) { console.error(err); } finally {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("rnu-staff-id");
        window.localStorage.removeItem("rnu-staff-system");
      }
      navigate({ to: "/staff/login", replace: true });
    }
  };

  const handleSelect = (choice: Choice) => {
    if (typeof window !== "undefined") window.localStorage.setItem("rnu-staff-system", choice);
    const destinations: Record<Choice, string> = {
      management: "/staff/internal",
      equipment: "/staff/medical",
      workunit: "/staff/workunit",
    };
    navigate({ to: destinations[choice] as any });
  };
  if (loading || !user) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="relative -mt-8 min-h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-br from-pink-50 via-background to-pink-100/50 px-4 py-16">
      {/* Blobs */}
      <div className="pointer-events-none absolute -top-32 -left-24 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">

        {/* ── HEADER ── */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              พอร์ทัลเจ้าหน้าที่
            </span>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              เลือกระบบภายใน
            </h1>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              กรุณาเลือกระบบที่คุณต้องการเข้าใช้งาน
            </p>
          </div>

          {/* User badge */}
          <div className="flex items-center gap-3 rounded-full border border-border/60 bg-background/80 px-4 py-2 shadow-sm backdrop-blur">
            <div className="grid h-9 w-9 place-content-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-sm font-semibold text-primary-foreground">
              {(staffId || "เจ้าหน้าที่").charAt(0).toUpperCase()}
            </div>
            <div className="leading-tight">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">เข้าสู่ระบบในชื่อ</p>
              <p className="text-sm font-medium text-foreground">{staffId || "เจ้าหน้าที่"}</p>
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              className="ml-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs text-muted-foreground transition hover:text-primary"
            >
              <LogOut className="h-3.5 w-3.5" />
              ออกจากระบบ
            </button>
          </div>
        </div>

        {/* ── TOP SYSTEM CARDS ── */}
        <div className="grid gap-6 md:grid-cols-2 mb-10">
          <SystemCard
            title="ระบบจัดการภายใน"
            desc="การปฏิบัติงานประจำวันของหน่วยพยาบาล"
            items={["จัดการเจ้าหน้าที่", "เอกสาร", "รายงาน", "ตารางเวร"]}
            icons={[Users, FileText, BarChart3, CalendarDays]}
            accentIcon={Stethoscope}
            isLast={last === "management"}
            cta="เข้าสู่ระบบ"
            onSelect={() => handleSelect("management")}
          />
          <SystemCard
            title="ระบบเครื่องมือแพทย์"
            desc="ติดตาม บำรุงรักษา และตรวจสอบอุปกรณ์การแพทย์"
            items={["คลังอุปกรณ์", "การบำรุงรักษา", "บันทึกการตรวจสอบ", "ติดตามอุปกรณ์"]}
            icons={[Activity, Wrench, ClipboardCheck, Sparkles]}
            accentIcon={Wrench}
            isLast={last === "equipment"}
            cta="เข้าสู่ระบบ"
            onSelect={() => handleSelect("equipment")}
          />
        </div>

        {/* ══════════════════════════════════════════
            QUICK ACCESS — EXPANDED
        ══════════════════════════════════════════ */}
        <SectionLabel icon={<Zap className="h-3.5 w-3.5" />} label="เข้าถึงด่วน" />

        {/* ── 1. Equipment Inspection ── */}
        <QuickAccessPanel
          icon={<PackageSearch className="h-5 w-5" />}
          title="ตรวจสอบเครื่องมือแพทย์"
          subtitle="เข้าถึงแบบตรวจสอบและรายงานอุปกรณ์แยกตามฝ่าย"
          accentColor="#e879a0"
          className="mb-4"
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {EQUIPMENT_DEPTS.map((dept) => (
              <EquipmentDeptCard 
              key={dept.key} 
              dept={dept} 
              onClick={() => navigate({ to: (dept as any).route})}
              />
            ))}
          </div>
        </QuickAccessPanel>

        {/* ── 2. Nursing Workload ── */}
        <QuickAccessPanel
          icon={<HeartPulse className="h-5 w-5" />}
          title="ภาระงานการพยาบาล"
          subtitle="บันทึกและติดตามภาระงานพยาบาลแยกตามหน่วยงาน"
          accentColor="#8b5cf6"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {WORKLOAD_DEPTS.map((dept) => (
              <WorkloadDeptCard key={dept.key} dept={dept} onClick={() => navigate({ to: dept.route as any})} />
            ))}
          </div>
        </QuickAccessPanel>

      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SECTION LABEL
// ══════════════════════════════════════════════════════════════
function SectionLabel({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
        {icon}
        {label}
      </span>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// QUICK ACCESS PANEL WRAPPER
// ══════════════════════════════════════════════════════════════
function QuickAccessPanel({
  icon,
  title,
  subtitle,
  accentColor,
  children,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  accentColor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border/60 bg-background/90 shadow-sm backdrop-blur overflow-hidden",
        className
      )}
    >
      {/* Panel header */}
      <div
        className="flex items-center gap-3 px-6 py-4 border-b border-border/50"
        style={{ borderLeftWidth: 4, borderLeftColor: accentColor, borderLeftStyle: "solid" }}
      >
        <div
          className="grid h-9 w-9 place-content-center rounded-xl text-white shadow-sm shrink-0"
          style={{ background: accentColor }}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground leading-tight">{title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        </div>
      </div>

      {/* Panel content */}
      <div className="p-5">{children}</div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// EQUIPMENT DEPT CARD (compact, 4-col grid)
// ══════════════════════════════════════════════════════════════
function EquipmentDeptCard({
  dept,
  onClick,
}: {
  dept: (typeof EQUIPMENT_DEPTS)[number];
  onClick: () => void;
}) {
  const Icon = dept.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex flex-col items-start gap-2 rounded-2xl border border-border/50 bg-muted/30 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <div
        className="grid h-9 w-9 place-content-center rounded-xl"
        style={{ background: dept.bg }}
      >
        <Icon className="h-4 w-4" style={{ color: dept.color }} />
      </div>
      <div>
        <p className="text-xs font-semibold text-foreground leading-snug">{dept.label}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">{dept.sub}</p>
      </div>
      <div className="mt-auto flex w-full items-center justify-between pt-1">
        <span className="text-[10px] font-medium" style={{ color: dept.color }}>
          ตรวจสอบ
        </span>
        <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" style={{ color: dept.color }} />
      </div>
    </button>
  );
}

// ══════════════════════════════════════════════════════════════
// WORKLOAD DEPT CARD (wider, 2-col, with task chips)
// ══════════════════════════════════════════════════════════════
function WorkloadDeptCard({
  dept,
  onClick,
}: {
  dept: (typeof WORKLOAD_DEPTS)[number];
  onClick: () => void;
}) {
  const Icon = dept.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex items-center gap-4 rounded-2xl border border-border/50 bg-muted/30 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      {/* Icon */}
      <div
        className="grid h-11 w-11 shrink-0 place-content-center rounded-2xl"
        style={{ background: dept.bg }}
      >
        <Icon className="h-5 w-5" style={{ color: dept.color }} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground leading-tight">{dept.label}</p>
        <p className="text-[10px] text-muted-foreground mb-2">{dept.sub}</p>
        <div className="flex flex-wrap gap-1">
          {dept.tasks.map((t) => (
            <span
              key={t}
              className="rounded-full px-2 py-0.5 text-[9px] font-medium"
              style={{ background: dept.bg, color: dept.color }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Arrow */}
      <div
        className="grid h-7 w-7 shrink-0 place-content-center rounded-full transition-transform group-hover:translate-x-0.5"
        style={{ background: dept.bg }}
      >
        <ChevronRight className="h-3.5 w-3.5" style={{ color: dept.color }} />
      </div>
    </button>
  );
}

// ══════════════════════════════════════════════════════════════
// SYSTEM CARD (unchanged from original, kept for top 2 cards)
// ══════════════════════════════════════════════════════════════
type IconType = React.ComponentType<{ className?: string }>;

function SystemCard({
  title,
  desc,
  items,
  icons,
  accentIcon: AccentIcon,
  isLast,
  cta,
  onSelect,
}: {
  title: string;
  desc: string;
  items: string[];
  icons: IconType[];
  accentIcon: IconType;
  isLast: boolean;
  cta: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-background/90 p-7 text-left shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <div className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:opacity-80" />

      <div className="relative flex items-start justify-between">
        <div className="grid h-14 w-14 place-content-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-md shadow-primary/20">
          <AccentIcon className="h-7 w-7" />
        </div>
        {isLast && (
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
            เข้าใช้งานล่าสุด
          </span>
        )}
      </div>

      <h2 className="relative mt-5 text-xl font-semibold tracking-tight text-foreground">{title}</h2>
      <p className="relative mt-1.5 text-sm text-muted-foreground">{desc}</p>

      <ul className="relative mt-5 grid grid-cols-2 gap-2.5">
        {items.map((item, i) => {
          const Icon = icons[i] ?? icons[0];
          return (
            <li
              key={item}
              className="flex items-center gap-2 rounded-xl bg-muted/40 px-3 py-2 text-xs text-foreground/80 transition-colors group-hover:bg-primary/5"
            >
              <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="truncate">{item}</span>
            </li>
          );
        })}
      </ul>

      <div className="relative mt-6 flex items-center justify-between border-t border-border/60 pt-4 text-sm font-medium text-primary">
        <span>{cta}</span>
        <span className="grid h-8 w-8 place-content-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:translate-x-1">
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </button>
  );
}