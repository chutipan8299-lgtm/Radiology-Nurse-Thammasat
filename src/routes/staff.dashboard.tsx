import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/contexts/auth-context";

export const Route = createFileRoute("/staff/dashboard")({
  component: StaffDashboardPage,
});

type MenuItem = {
  icon: React.ReactNode;
  label: string;
  desc: string;
  navigateTo?: string;
};

const internalItems: MenuItem[] = [
  {
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
    label: "ประวัติบุคลากร",
    desc: "ข้อมูลพยาบาลและเจ้าหน้าที่",
  },
  {
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>,
    label: "คณะกรรมการ",
    desc: "โครงสร้างและการบริหาร",
  },
  {
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>,
    label: "บริหารจัดการภายใน",
    desc: "นโยบายและระเบียบปฏิบัติ",
    navigateTo: "/staff/internal",
  },
  {
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
    label: "สถิติผู้ป่วย",
    desc: "ข้อมูลสถิติแต่ละหน่วยงาน",
  },
];

const medicalItems: MenuItem[] = [
  {
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>,
    label: "เครื่องมือแพทย์",
    desc: "รายการและสถานะอุปกรณ์",
    navigateTo: "/staff/medical",
  },
  {
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" /></svg>,
    label: "การบำรุงรักษา",
    desc: "ตารางและประวัติซ่อมบำรุง",
    navigateTo: "/staff/medical",
  },
  {
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>,
    label: "แจ้งซ่อม / ปัญหา",
    desc: "รายงานความผิดปกติ",
    navigateTo: "/staff/medical",
  },
  {
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
    label: "เอกสารคู่มือ",
    desc: "คู่มือการใช้งานอุปกรณ์",
    navigateTo: "/staff/medical",
  },
];

function Card({ item, accent = false, onNavigate }: {
  item: MenuItem;
  accent?: boolean;
  onNavigate: (to: string) => void;
}) {
  return (
    <button
      onClick={() => item.navigateTo && onNavigate(item.navigateTo)}
      className={`group w-full text-left bg-card border border-border rounded-2xl p-4 transition-all duration-200
        ${item.navigateTo ? "hover:border-primary/40 hover:shadow-md cursor-pointer" : "cursor-default"}`}
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-center gap-3">
        <div className={`rounded-xl p-2.5 transition-transform group-hover:scale-105 ${accent ? "bg-accent text-accent-foreground" : "bg-secondary text-primary"}`}>
          {item.icon}
        </div>
        <div className="flex-1 min-w-0 text-left">
          <p className="text-sm font-medium text-foreground leading-snug">{item.label}</p>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{item.desc}</p>
        </div>
        <svg
          className={`w-4 h-4 shrink-0 transition-all ${item.navigateTo ? "text-muted-foreground/40 group-hover:text-primary/60 group-hover:translate-x-0.5" : "text-muted-foreground/20"}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </div>
    </button>
  );
}

function StaffDashboardPage() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !user) navigate({ to: "/staff/login" });
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/staff/login" });
  };

  const rawId = user?.email?.replace("@staff.th", "") ?? "";
  const maskedId = rawId.length === 13
    ? `${rawId[0]}-${rawId.slice(1, 5)}-${rawId.slice(5, 10)}-${rawId.slice(10, 12)}-${rawId[12]}`
    : rawId;
  const initials = rawId.slice(0, 2);

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
        <div className="relative max-w-3xl mx-auto px-5 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white font-semibold text-sm">
              {initials}
            </div>
            <div>
              <p className="text-white/70 text-xs">รหัสบัตร</p>
              <p className="text-white font-medium text-sm tracking-wide">{maskedId}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs transition-colors px-3 py-1.5 rounded-lg hover:bg-white/10"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            ออกจากระบบ
          </button>
        </div>
        <div className="relative max-w-3xl mx-auto px-5 pb-8">
          <h1 className="text-white text-2xl font-bold">สวัสดี 👋</h1>
          <p className="text-white/70 text-sm mt-1">ระบบจัดการรังสีวิทยา มหาวิทยาลัยธรรมศาสตร์</p>
        </div>
        <div className="h-5 bg-background rounded-t-[2rem] relative z-10" />
      </div>

      <div className="max-w-3xl mx-auto px-5 -mt-1 pb-10 space-y-7">
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1 h-4 rounded-full bg-primary inline-block" />
            <h2 className="text-sm font-semibold text-foreground">บริหารภายใน</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {internalItems.map((item) => (
              <Card key={item.label} item={item} onNavigate={(to) => navigate({ to: to as any })} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1 h-4 rounded-full bg-accent-foreground inline-block" />
            <h2 className="text-sm font-semibold text-foreground">เครื่องมือแพทย์</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {medicalItems.map((item) => (
              <Card key={item.label} item={item} accent onNavigate={(to) => navigate({ to: to as any })} />
            ))}
          </div>
        </section>

        <p className="text-center text-xs text-muted-foreground pt-2">
          Radiology Nursing Unit · มหาวิทยาลัยธรรมศาสตร์
        </p>
      </div>
    </div>
  );
}