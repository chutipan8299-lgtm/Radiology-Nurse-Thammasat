import { createFileRoute } from "@tanstack/react-router";
import {
  ClipboardList,
  FileSpreadsheet,
  UserRound,
  Stethoscope,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/staff/workaccount")({
  component: StaffWorkloadPage,
});

function ActionCard({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: {
    label: string;
    href: string;
  }[];
}) {
  return (
    <div className="rounded-[32px] border border-pink-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex flex-col items-center text-center">
        <div className="mb-5 flex h-28 w-28 items-center justify-center rounded-full bg-pink-100 text-pink-500 shadow-inner">
          {icon}
        </div>

        <h2 className="mb-6 text-3xl font-black text-[#4b1630]">
          {title}
        </h2>

        <div className="w-full space-y-3">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl bg-pink-50 px-5 py-4 text-left transition-all hover:bg-pink-100"
            >
              <span className="text-lg font-semibold text-[#4b1630]">
                {item.label}
              </span>

              <ChevronRight className="text-pink-400 transition-all group-hover:translate-x-1" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  icon,
  title,
  label,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-[32px] border border-pink-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-5 flex h-28 w-28 items-center justify-center rounded-full bg-pink-100 text-pink-500">
          {icon}
        </div>

        <h2 className="mb-6 text-3xl font-black text-[#4b1630]">
          {title}
        </h2>

        <div className="w-full rounded-2xl bg-pink-50 px-5 py-4 transition-all group-hover:bg-pink-100">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-[#4b1630]">
              {label}
            </span>

            <ChevronRight className="text-pink-400 transition-all group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </a>
  );
}

function StaffWorkloadPage() {
  return (
    <div className="min-h-screen bg-[#fff8fc]">
      {/* HERO */}
      <div className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-pink-400 to-pink-300 px-8 py-20 text-white">
        <div className="absolute -left-16 top-10 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <div className="mb-4 inline-flex rounded-full bg-white/20 px-5 py-2 text-sm font-semibold backdrop-blur">
              Radiology Nursing
            </div>

            <h1 className="mb-6 text-5xl font-black leading-tight md:text-6xl">
              ตารางจ่ายงานและ
              <br />
              สรุปการปฏิบัติงานรายวัน
            </h1>

            <p className="max-w-3xl text-lg leading-8 text-white/90">
              ระบบจัดการภาระงานพยาบาลรังสีวิทยา สำหรับลงทะเบียนภาระงาน
              สรุปผลการปฏิบัติงาน และติดตามข้อมูลภายในหน่วยงาน
              ด้วยรูปแบบใหม่ที่ใช้งานง่ายและรวดเร็ว
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="mx-auto max-w-7xl px-6 py-14">
        {/* SECTION 1 */}
        <div className="mb-14">
          <div className="mb-8">
            <h2 className="text-4xl font-black text-[#4b1630]">
              แบบการลงทะเบียนภาระงาน
            </h2>

            <div className="mt-3 h-1 w-40 rounded-full bg-pink-400" />
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Nurse */}
            <ActionCard
              icon={<UserRound size={56} />}
              title="พยาบาล"
              items={[
                {
                  label: "ลงทะเบียนภาระงาน IR",
                  href: "https://docs.google.com/forms/d/e/1FAIpQLSdHDMZHu8yVjlQXVE21Ilv5ekuJW4HFHgyMLKhxrRh1xTgbFw/viewform",
                },
                {
                  label: "ลงทะเบียนภาระงาน RT",
                  href: "https://docs.google.com/forms/d/e/1FAIpQLSfO3qVCrQVWHeksXp4WId1YDHFethYU1m_qJtT8elzqKbHxNQ/viewform",
                },
                {
                  label: "ตารางแก้ไขภาระงาน",
                  href: "https://docs.google.com/spreadsheets/d/1wgT-dif1CnWHAQVT7VmRlDP2tYqLGpmqSeVwwLTuuKI/edit?usp=sharing",
                },
              ]}
            />

            {/* Assistant */}
            <ActionCard
              icon={<Stethoscope size={56} />}
              title="ผู้ช่วยพยาบาล"
              items={[
                {
                  label: "ลงทะเบียนภาระงาน",
                  href: "https://docs.google.com/forms/d/e/1FAIpQLScoImgZthVds3IrcgDIXKZ8RPOlL5PEiDhrMvfFfREc7LBy3Q/viewform",
                },
                {
                  label: "ตารางแก้ไขภาระงาน",
                  href: "https://docs.google.com/spreadsheets/d/1aP6YBgh7qqLJrABgE1qwFTDjIA3en3SkTwXsw3BNp9Q/edit?usp=sharing",
                },
              ]}
            />
          </div>
        </div>

        {/* SECTION 2 */}
        <div>
          <div className="mb-8">
            <h2 className="text-4xl font-black text-[#4b1630]">
              แบบการสรุปการปฏิบัติงานประจำวัน
            </h2>

            <div className="mt-3 h-1 w-52 rounded-full bg-pink-400" />
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <SummaryCard
              icon={<ClipboardList size={56} />}
              title="สรุปการปฏิบัติงาน"
              label="แบบฟอร์มสรุปการปฏิบัติงาน"
              href="https://docs.google.com/forms/d/e/1FAIpQLSc1ucC4Fq60u_ZD0xYeA83lOnFX7gWTToPHA_cFPTg7JWLhNQ/viewform?usp=sf_link"
            />

            <SummaryCard
              icon={<FileSpreadsheet size={56} />}
              title="Google Sheets"
              label="ตารางสรุปข้อมูลรายวัน"
              href="https://sheets.google.com"
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-20 rounded-[32px] bg-gradient-to-r from-pink-500 to-pink-400 px-8 py-10 text-center text-white shadow-lg">
          <h3 className="text-3xl font-black">
            Radiology Nursing Management
          </h3>

          <p className="mt-3 text-lg text-white/90">
            ระบบจัดการงานพยาบาลรังสีวิทยา มหาวิทยาลัยธรรมศาสตร์
          </p>
        </div>
      </div>
    </div>
  );
}