import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
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
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useMode } from "@/contexts/mode-context";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/staff/select")({
  head: () => ({
    meta: [
      { title: "Select Internal System — Radiology Nursing Unit" },
      {
        name: "description",
        content:
          "Choose between Internal Management and Medical Equipment systems after staff sign-in.",
      },
    ],
  }),
  component: StaffSelectPage,
});

const copy = {
  en: {
    eyebrow: "Staff portal",
    heading: "Select Internal System",
    sub: "Please choose the system you want to access.",
    welcome: "Signed in as",
    guest: "Staff member",
    signOut: "Sign out",
    enter: "Enter system",
    last: "Last accessed",
    mgmt: {
      title: "Internal Management",
      desc: "Day-to-day operations for the nursing unit.",
      items: ["Staff administration", "Documents", "Reports", "Scheduling"],
    },
    eq: {
      title: "Medical Equipment",
      desc: "Track, maintain and inspect clinical devices.",
      items: ["Equipment inventory", "Maintenance", "Inspection records", "Device tracking"],
    },
  },
  th: {
    eyebrow: "พอร์ทัลเจ้าหน้าที่",
    heading: "เลือกระบบภายใน",
    sub: "กรุณาเลือกระบบที่คุณต้องการเข้าใช้งาน",
    welcome: "เข้าสู่ระบบในชื่อ",
    guest: "เจ้าหน้าที่",
    signOut: "ออกจากระบบ",
    enter: "เข้าสู่ระบบ",
    last: "เข้าใช้งานล่าสุด",
    mgmt: {
      title: "ระบบจัดการภายใน",
      desc: "การปฏิบัติงานประจำวันของหน่วยพยาบาล",
      items: ["จัดการเจ้าหน้าที่", "เอกสาร", "รายงาน", "ตารางเวร"],
    },
    eq: {
      title: "ระบบเครื่องมือแพทย์",
      desc: "ติดตาม บำรุงรักษา และตรวจสอบอุปกรณ์การแพทย์",
      items: ["คลังอุปกรณ์", "การบำรุงรักษา", "บันทึกการตรวจสอบ", "ติดตามอุปกรณ์"],
    },
  },
};

type Choice = "management" | "equipment";

function StaffSelectPage() {
  const { lang } = useLanguage();
  const { mode } = useMode();
  const navigate = useNavigate();
  const c = copy[lang];

  const [staffId, setStaffId] = useState<string>("");
  const [last, setLast] = useState<Choice | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (mode !== "staff") {
      navigate({ to: "/staff/login" });
      return;
    }
    setStaffId(window.localStorage.getItem("rnu-staff-id") ?? "");
    const stored = window.localStorage.getItem("rnu-staff-system");
    if (stored === "management" || stored === "equipment") setLast(stored);
  }, [mode, navigate]);

  const handleSelect = (choice: Choice) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("rnu-staff-system", choice);
    }
    navigate({ to: "/" });
  };

  return (
    <div className="relative -mt-8 min-h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-br from-pink-50 via-background to-pink-100/50 px-4 py-16">
      <div className="pointer-events-none absolute -top-32 -left-24 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        {/* header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              {c.eyebrow}
            </span>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {c.heading}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">{c.sub}</p>
          </div>

          <div className="flex items-center gap-3 rounded-full border border-border/60 bg-background/80 px-4 py-2 shadow-sm backdrop-blur">
            <div className="grid h-9 w-9 place-content-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-sm font-semibold text-primary-foreground">
              {(staffId || c.guest).charAt(0).toUpperCase()}
            </div>
            <div className="leading-tight">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                {c.welcome}
              </p>
              <p className="text-sm font-medium text-foreground">{staffId || c.guest}</p>
            </div>
            <Link
              to="/staff/login"
              className="ml-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs text-muted-foreground transition hover:text-primary"
            >
              <LogOut className="h-3.5 w-3.5" />
              {c.signOut}
            </Link>
          </div>
        </div>

        {/* cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <SystemCard
            title={c.mgmt.title}
            desc={c.mgmt.desc}
            items={c.mgmt.items}
            icons={[Users, FileText, BarChart3, CalendarDays]}
            accentIcon={Stethoscope}
            isLast={last === "management"}
            lastLabel={c.last}
            cta={c.enter}
            onSelect={() => handleSelect("management")}
          />
          <SystemCard
            title={c.eq.title}
            desc={c.eq.desc}
            items={c.eq.items}
            icons={[Activity, Wrench, ClipboardCheck, Sparkles]}
            accentIcon={Wrench}
            isLast={last === "equipment"}
            lastLabel={c.last}
            cta={c.enter}
            onSelect={() => handleSelect("equipment")}
          />
        </div>
      </div>
    </div>
  );
}

type IconType = React.ComponentType<{ className?: string }>;

function SystemCard({
  title,
  desc,
  items,
  icons,
  accentIcon: AccentIcon,
  isLast,
  lastLabel,
  cta,
  onSelect,
}: {
  title: string;
  desc: string;
  items: string[];
  icons: IconType[];
  accentIcon: IconType;
  isLast: boolean;
  lastLabel: string;
  cta: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-background/90 p-7 text-left shadow-sm backdrop-blur",
        "transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
      )}
    >
      <div className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:opacity-80" />

      <div className="relative flex items-start justify-between">
        <div className="grid h-14 w-14 place-content-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-md shadow-primary/20">
          <AccentIcon className="h-7 w-7" />
        </div>
        {isLast && (
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
            {lastLabel}
          </span>
        )}
      </div>

      <h2 className="relative mt-5 text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <p className="relative mt-1.5 text-sm text-muted-foreground">{desc}</p>

      <ul className="relative mt-5 grid grid-cols-2 gap-2.5">
        {items.map((item, i) => {
          const Icon = icons[i] ?? icons[0];
          return (
            <li
              key={item}
              className="flex items-center gap-2 rounded-xl bg-muted/40 px-3 py-2 text-xs text-foreground/80 transition-colors group-hover:bg-primary/5"
            >
              <Icon className="h-3.5 w-3.5 text-primary" />
              <span className="truncate">{item}</span>
            </li>
          );
        })}
      </ul>

      <div className="relative mt-6 flex items-center justify-between border-t border-border/60 pt-4 text-sm font-medium text-primary">
        <span>{cta}</span>
        <span className="grid h-9 w-9 place-content-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:translate-x-1">
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </button>
  );
}