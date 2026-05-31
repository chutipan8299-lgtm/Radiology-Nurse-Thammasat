import {
  ClipboardList,
  Bookmark,
} from "lucide-react";

const formSections = [
  {
    title: "การลงข้อมูลผู้รับบริการ",
    items: [
      {
        title: "การลงข้อมูลผู้รับบริการที่ทำหัตถการห้อง DSA",
        links: [
          {
            label: "แบบการลงข้อมูลผู้รับบริการที่ทำหัตถการห้อง DSA 👍🏻",
            href: "#",
            type: "form",
          },
          {
            label: "รายงานการลงข้อมูลผู้รับบริการที่ทำหัตถการห้อง DSA 💡",
            href: "#",
            type: "report",
          },
        ],
      },

      {
        title: "การลงข้อมูลผู้รับบริการที่ทำหัตถการห้อง Ultrasound",
        links: [
          {
            label: "แบบการลงข้อมูลผู้รับบริการที่ทำหัตถการห้อง Ultrasound 👍🏻",
            href: "#",
            type: "form",
          },
          {
            label:
              "รายงานการลงข้อมูลผู้รับบริการที่ทำหัตถการห้อง Ultrasound 💡",
            href: "#",
            type: "report",
          },
        ],
      },

      {
        title: "การลงข้อมูลผู้รับบริการที่ทำหัตถการ Thrombectomy",
        links: [
          {
            label: "แบบการลงข้อมูลผู้รับบริการที่ทำหัตถการ Thrombectomy 👍🏻",
            href: "#",
            type: "form",
          },
          {
            label:
              "รายงานการลงข้อมูลผู้รับบริการที่ทำหัตถการ Thrombectomy 💡",
            href: "#",
            type: "report",
          },
        ],
      },

      {
        title:
          "การลงข้อมูลเยี่ยมตรวจผู้รับบริการ ก่อน / หลังหัตถการ / เฉพาะหัตถการ C-line",
        links: [
          {
            label:
              "แบบการลงข้อมูลเยี่ยมตรวจผู้รับบริการ ก่อน / หลังหัตถการ / เฉพาะหัตถการ C-line 👍🏻",
            href: "#",
            type: "form",
          },
          {
            label:
              "รายงานการลงข้อมูลเยี่ยมตรวจผู้รับบริการ ก่อน / หลังหัตถการ / เฉพาะหัตถการ C-line 💡",
            href: "#",
            type: "report",
          },
        ],
      },

      {
        title: "การลงข้อมูลผู้รับบริการที่ทำหัตถการ Picc line",
        links: [
          {
            label:
              "แบบการลงข้อมูลผู้รับบริการที่ทำหัตถการ Picc line 👍🏻",
            href: "#",
            type: "form",
          },
          {
            label:
              "แบบการลงข้อมูลผู้รับบริการที่นำสาย Picc line ออก 👍🏻",
            href: "#",
            type: "form",
          },
          {
            label:
              "แบบการลงข้อมูลผู้รับบริการที่นำสาย Picc line กลับบ้าน 👍🏻",
            href: "#",
            type: "form",
          },
          {
            label:
              "แฟ้มเอกสารออนไลน์ที่แปลงข้อมูลใน google form เป็นเอกสารการดูแลผู้รับบริการที่ทำหัตถการ Picc line 💡",
            href: "#",
            type: "report",
          },
        ],
      },

      {
        title: "การส่งผู้ป่วยกลับหอผู้ป่วย",
        links: [
          {
            label: "แบบการส่งผู้ป่วยกลับหอผู้ป่วย 👍🏻",
            href: "#",
            type: "form",
          },
          {
            label: "รายงานการส่งผู้ป่วยกลับหอผู้ป่วย 💡",
            href: "#",
            type: "report",
          },
        ],
      },

      {
        title: "Consult For IV Insertion",
        links: [
          {
            label: "แบบ Consult For IV Insertion 👍🏻",
            href: "#",
            type: "form",
          },
          {
            label: "รายงาน Consult For IV Insertion 💡",
            href: "#",
            type: "report",
          },
        ],
      },
    ],
  },
];

const equipmentSections = [
  {
    title: "การตรวจสอบความครบถ้วนของเครื่องมือแพทย์",
    links: [
      {
        label: "แบบการตรวจสอบความครบถ้วนของเครื่องมือแพทย์ 👍🏻",
        href: "#",
        type: "form",
      },
      {
        label: "รายงานการตรวจสอบความครบถ้วนของเครื่องมือแพทย์ 💡",
        href: "#",
        type: "report",
      },
    ],
  },

  {
    title: "การตรวจสอบความสมบูรณ์และพร้อมใช้งานของปราศจากเชื้อ",
    links: [
      {
        label:
          "แบบการตรวจสอบความสมบูรณ์และพร้อมใช้งานของปราศจากเชื้อ 👍🏻",
        href: "#",
        type: "form",
      },
      {
        label:
          "รายงานการตรวจสอบความสมบูรณ์และพร้อมใช้งานของปราศจากเชื้อ 💡",
        href: "#",
        type: "report",
      },
    ],
  },

  {
    title: "การตรวจสอบรถฉุกเฉิน",
    links: [
      {
        label: "แบบการตรวจสอบรถฉุกเฉิน 👍🏻",
        href: "#",
        type: "form",
      },
      {
        label: "รายงานการตรวจสอบรถฉุกเฉิน 💡",
        href: "#",
        type: "report",
      },
    ],
  },
];

const teachingMedia = [
  {
    title: "เครื่อง Ultrasound",
    image:
      "https://images.unsplash.com/photo-1581595219315-a187dd40c322?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "ขั้นตอนการทำหัตถการ Vascular",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "การดูแลผู้ป่วยหลังทำหัตถการ",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "การป้องกันอันตรายจากรังสี",
    image:
      "https://images.unsplash.com/photo-1580281657527-47c6d2f51c8f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "คู่มือการใช้อุปกรณ์ Intervention",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "แนวทางการพยาบาล Intervention",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop",
  },
];

function ActionLink({
  label,
  href,
  type,
}: {
  label: string;
  href: string;
  type: string;
}) {
  const isReport = type === "report";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        flex items-center gap-3 rounded-2xl border px-4 py-3
        transition-all duration-200 hover:shadow-sm
        ${
          isReport
            ? "bg-amber-50 border-amber-200 hover:border-amber-300"
            : "bg-blue-50 border-blue-200 hover:border-blue-300"
        }
      `}
    >
      <div
        className={`
          w-10 h-10 rounded-xl flex items-center justify-center shrink-0
          ${isReport ? "bg-amber-100" : "bg-blue-100"}
        `}
      >
        {isReport ? "💡" : "👍🏻"}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-700 leading-6">
          {label}
        </p>
      </div>

      <svg
        className="w-4 h-4 text-slate-400"
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
    </a>
  );
}

export default function InterventionPage() {
  return (
    <div className="min-h-screen bg-[#efefef]">
      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-950 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <h1 className="text-5xl font-extrabold mb-5">
            รังสีวินิจฉัยและรังสีร่วมรักษา (Intervention)
          </h1>

          <p className="text-lg leading-8 max-w-5xl text-blue-100">
            งานรังสีวินิจฉัยและรังสีร่วมรักษา (Intervention)
            เป็นส่วนหนึ่งของงานรังสีวิทยา
            โดยงานการพยาบาลรังสีวิทยาจัดเป็นส่วนหนึ่งที่ให้การสนับสนุนการทำหัตถการของสหวิชาชีพ
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* SECTION 1 */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-blue-100 p-3 rounded-2xl">
              <ClipboardList className="text-blue-900" />
            </div>

            <div>
              <h2 className="text-3xl font-extrabold text-blue-950">
                ภาระงานของพยาบาล / ผู้ช่วยพยาบาล
              </h2>

              <p className="text-slate-500">
                ระบบเอกสารและการลงข้อมูลสำหรับ Intervention
              </p>
            </div>
          </div>

          {formSections.map((section, index) => (
            <div key={index} className="space-y-8">
              {section.items.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-3xl p-6 bg-slate-50 hover:shadow-md transition"
                >
                  <h3 className="text-2xl font-bold text-blue-900 mb-5">
                    {item.title}
                  </h3>

                  <div className="grid gap-3">
                    {item.links.map((link, i) => (
                      <ActionLink
                        key={i}
                        label={link.label}
                        href={link.href}
                        type={link.type}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </section>

        {/* SECTION 2 */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-blue-100 p-3 rounded-2xl">
              <ClipboardList className="text-blue-900" />
            </div>

            <div>
              <h2 className="text-3xl font-extrabold text-blue-950">
                การตรวจสอบอื่นๆ
              </h2>

              <p className="text-slate-500">
                ระบบตรวจสอบเครื่องมือและอุปกรณ์ภายในหน่วยงาน
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {equipmentSections.map((item, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-3xl p-6 bg-slate-50 hover:shadow-md transition"
              >
                <h3 className="text-2xl font-bold text-blue-900 mb-5">
                  {item.title}
                </h3>

                <div className="grid gap-3">
                  {item.links.map((link, i) => (
                    <ActionLink
                      key={i}
                      label={link.label}
                      href={link.href}
                      type={link.type}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ONLINE DOCS */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-3xl font-extrabold text-blue-950 mb-8">
            เอกสารออนไลน์อื่นๆ ที่ใช้งาน
          </h2>

          <div className="space-y-5">
            <div className="flex items-center gap-3 text-xl font-semibold text-blue-900 hover:translate-x-1 transition cursor-pointer">
              <Bookmark className="fill-blue-900 text-blue-900" />
              <span>ตารางการตรวจสอบข้อมูลผู้ป่วยแต่ละวัน click!!!</span>
            </div>

            <div className="flex items-center gap-3 text-xl font-semibold text-blue-900 hover:translate-x-1 transition cursor-pointer">
              <Bookmark className="fill-blue-900 text-blue-900" />
              <span>แบบประเมินค่าใช้จ่าย Intervention</span>
            </div>
          </div>
        </section>

        {/* MEDIA */}
        <section className="pb-10">
          <div className="mb-8">
            <h2 className="text-4xl font-extrabold text-blue-950">
              สื่อการสอนสำหรับบุคลากร
            </h2>

            <p className="text-slate-500 mt-2">
              คู่มือ วิดีโอ และสื่อประกอบการเรียนรู้ภายในหน่วยงาน
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {teachingMedia.map((media, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition duration-300"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={media.image}
                    alt={media.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-blue-950 leading-8">
                    {media.title}
                  </h3>

                  <button className="mt-5 w-full bg-blue-900 hover:bg-blue-950 text-white rounded-xl py-3 font-semibold transition">
                    เปิดสื่อการสอน
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}