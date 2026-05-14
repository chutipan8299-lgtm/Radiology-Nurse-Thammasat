import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/contexts/auth-context";

export const Route = createFileRoute("/staff/select")({
  component: WorkUnitPage,
});

type WorkLink = { label: string; href: string };

type Department = {
  id: string;
  name: string;
  name_en: string;
  emoji: string;
  gradient: string;
  accent: string;
  description: string;
  nurseLinks: WorkLink[];
  assistantLinks: WorkLink[];
};

const departments: Department[] = [
  {
    id: "intervention",
    name: "รังสีร่วมรักษา",
    name_en: "Intervention",
    emoji: "💉",
    gradient: "from-rose-500 to-pink-700",
    accent: "rose",
    description:
      "งานรังสีร่วมรักษาให้บริการตรวจและรักษาโรคด้วยเทคนิคทางรังสีวิทยาหลอดเลือดและอวัยวะต่างๆ",
    nurseLinks: [
      { label: "ภาระงานพยาบาล (ปัจจุบัน)", href: "/staff/Intervention" },
      { label: "ภาระงานพยาบาลย้อนหลัง", href: "#" },
    ],
    assistantLinks: [
      { label: "ภาระงานผู้ช่วยพยาบาล (ปัจจุบัน)", href: "#" },
      { label: "ภาระงานผู้ช่วยพยาบาลย้อนหลัง", href: "#" },
    ],
  },
  {
    id: "spect",
    name: "เวชศาสตร์นิวเคลียร์",
    name_en: "SPECT / CT",
    emoji: "⚛️",
    gradient: "from-violet-500 to-purple-700",
    accent: "violet",
    description:
      "ให้บริการตรวจวินิจฉัยและรักษาโรคด้วยสารเภสัชรังสี ครอบคลุมการตรวจ SPECT และ CT",
    nurseLinks: [
      { label: "ภาระงานพยาบาล (ปัจจุบัน)", href: "#" },
      { label: "ภาระงานพยาบาลย้อนหลัง", href: "#" },
    ],
    assistantLinks: [
      { label: "ภาระงานผู้ช่วยพยาบาล (ปัจจุบัน)", href: "#" },
      { label: "ภาระงานผู้ช่วยพยาบาลย้อนหลัง", href: "#" },
    ],
  },
  {
    id: "rt",
    name: "รังสีรักษาและมะเร็งวิทยา",
    name_en: "Radiation Therapy",
    emoji: "🎯",
    gradient: "from-sky-500 to-cyan-700",
    accent: "sky",
    description:
      "ให้บริการฉายรังสีรักษามะเร็งด้วยเครื่องมือทันสมัย ดูแลผู้ป่วยตลอดกระบวนการรักษา",
    nurseLinks: [
      { label: "ภาระงานพยาบาล (ปัจจุบัน)", href: "#" },
      { label: "ภาระงานพยาบาลย้อนหลัง", href: "#" },
    ],
    assistantLinks: [
      { label: "ภาระงานผู้ช่วยพยาบาล (ปัจจุบัน)", href: "#" },
      { label: "ภาระงานผู้ช่วยพยาบาลย้อนหลัง", href: "#" },
    ],
  },
  {
    id: "diag",
    name: "รังสีวินิจฉัย",
    name_en: "Diagnostic Radiology",
    emoji: "🩻",
    gradient: "from-emerald-500 to-green-700",
    accent: "emerald",
    description:
      "ให้บริการตรวจวินิจฉัยโรคด้วยเครื่องมือรังสีวิทยาครบวงจร X-ray, CT, MRI และ Ultrasound",
    nurseLinks: [
      { label: "ภาระงานพยาบาล (ปัจจุบัน)", href: "#" },
      { label: "ภาระงานพยาบาลย้อนหลัง", href: "#" },
    ],
    assistantLinks: [],
  },
];

function LinkRow({ link }: { link: WorkLink }) {
  const hasLink = link.href !== "#";

  return (
    <a
      href={hasLink ? link.href : undefined}
      target={hasLink ? "_blank" : undefined}
      rel="noopener noreferrer"
      onClick={(e) => !hasLink && e.preventDefault()}
      className={`
        group flex items-center gap-3 rounded-2xl px-4 py-3
        border transition-all duration-200
        ${
          hasLink
            ? "bg-white hover:bg-slate-50 border-slate-200 hover:border-pink-300 hover:shadow-sm cursor-pointer"
            : "bg-slate-100/70 border-slate-200 opacity-60 cursor-default"
        }
      `}
    >
      <div
        className={`
          w-9 h-9 rounded-xl flex items-center justify-center shrink-0
          ${
            hasLink
              ? "bg-pink-100 text-pink-700"
              : "bg-slate-200 text-slate-500"
          }
        `}
      >
        📄
      </div>

      <div className="flex-1 min-w-0">
        <p
          className={`
            text-sm font-medium truncate
            ${hasLink ? "text-slate-700" : "text-slate-500"}
          `}
        >
          {link.label}
        </p>
      </div>

      {hasLink && (
        <svg
          className="w-4 h-4 text-slate-400 group-hover:text-pink-600 transition"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5h5m0 0v5m0-5L10 14"
          />
        </svg>
      )}
    </a>
  );
}

function DeptCard({ dept }: { dept: Department }) {
  const [open, setOpen] = React.useState(dept.id === "intervention");

  return (
    <div className="group bg-white border border-slate-200 rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div
        onClick={() => setOpen((v) => !v)}
        className={`
          relative overflow-hidden cursor-pointer
          bg-gradient-to-r ${dept.gradient}
        `}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full translate-x-10 -translate-y-10" />
        </div>

        <div className="relative px-6 py-6 flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl shadow-inner">
            {dept.emoji}
          </div>

          <div className="flex-1">
            <h2 className="text-white text-xl font-bold">
              {dept.name}
            </h2>

            <p className="text-white/75 text-sm mt-1">
              {dept.name_en}
            </p>

            <p className="text-white/85 text-xs leading-6 mt-3 max-w-2xl">
              {dept.description}
            </p>
          </div>

          <div
            className={`
              w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm
              flex items-center justify-center transition-transform duration-300
              ${open ? "rotate-180" : ""}
            `}
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      {open && (
        <div className="p-6 space-y-6 bg-[#fafafa]">
          {/* Nurse */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-pink-100 flex items-center justify-center">
                👩‍⚕️
              </div>

              <div>
                <p className="font-semibold text-slate-800">
                  ภาระงานพยาบาล
                </p>
                <p className="text-xs text-slate-500">
                  Nurse Workload System
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              {dept.nurseLinks.map((link) => (
                <LinkRow key={link.label} link={link} />
              ))}
            </div>
          </div>

          {/* Assistant */}
          {dept.assistantLinks.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
                  🧑‍⚕️
                </div>

                <div>
                  <p className="font-semibold text-slate-800">
                    ภาระงานผู้ช่วยพยาบาล
                  </p>

                  <p className="text-xs text-slate-500">
                    Assistant Nurse Workload
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                {dept.assistantLinks.map((link) => (
                  <LinkRow key={link.label} link={link} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function WorkUnitPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/staff/login" });
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f4f5]">
        <div className="w-8 h-8 border-[3px] border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f4f5]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#111827]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-[-80px] right-[-60px] w-[300px] h-[300px] rounded-full bg-white" />
          <div className="absolute bottom-[-100px] left-[-60px] w-[320px] h-[320px] rounded-full bg-white" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-12">
          <button
            onClick={() => navigate({ to: "/staff/select" as any })}
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm mb-8 transition"
          >
            <svg
              className="w-4 h-4"
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
            กลับหน้าเลือกระบบ
          </button>

          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-[28px] bg-white/10 backdrop-blur-md flex items-center justify-center text-4xl shadow-xl">
                🏥
              </div>

              <div>
                <h1 className="text-white text-4xl font-black tracking-tight">
                  หน่วยปฏิบัติงาน
                </h1>

                <p className="text-white/70 text-lg mt-2 max-w-2xl leading-8">
                  ระบบภาระงานพยาบาลและผู้ช่วยพยาบาล
                  สำหรับหน่วยงานรังสีวิทยาและรังสีร่วมรักษา
                </p>
              </div>
            </div>
          </div>

          {/* Chips */}
          <div className="flex flex-wrap gap-3 mt-10">
            {departments.map((dept) => (
              <div
                key={dept.id}
                className={`
                  bg-white/10 backdrop-blur-md border border-white/10
                  rounded-2xl px-4 py-2 text-white text-sm font-medium
                  flex items-center gap-2
                `}
              >
                <span>{dept.emoji}</span>
                <span>{dept.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-8 bg-[#f4f4f5] rounded-t-[40px]" />
      </section>

      {/* CONTENT */}
      <main className="max-w-6xl mx-auto px-6 pb-16 -mt-2 relative z-10">
        {/* Title */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 rounded-full px-4 py-2 text-sm font-semibold">
            ✨ หน่วยงานทั้งหมด
          </div>

          <h2 className="text-3xl font-black text-slate-900 mt-4">
            เลือกหน่วยงานที่ต้องการใช้งาน
          </h2>

          <p className="text-slate-500 mt-2 leading-7">
            คลิกที่การ์ดเพื่อดูภาระงาน เอกสารออนไลน์
            และระบบที่เกี่ยวข้องของแต่ละหน่วยงาน
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6">
          {departments.map((dept) => (
            <DeptCard key={dept.id} dept={dept} />
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-8 bg-white border border-slate-200 rounded-3xl p-5 flex items-start gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl shrink-0">
            💡
          </div>

          <div>
            <h3 className="font-bold text-slate-800">
              คำแนะนำการใช้งาน
            </h3>

            <p className="text-sm text-slate-500 leading-7 mt-1">
              ระบบนี้ออกแบบให้สอดคล้องกับหน้า Intervention ใหม่
              โดยใช้รูปแบบ Card Layout, Gradient Header และ Rounded UI
              เพื่อให้ใช้งานง่ายทั้งบน Desktop และ Tablet
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}