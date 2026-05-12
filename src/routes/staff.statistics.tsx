import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/contexts/auth-context";

export const Route = createFileRoute("/staff/statistics")({
  component: StaffStatisticsPage,
});

const years = [2561, 2562, 2563, 2564, 2565, 2566, 2567, 2568];

// ใส่ link ของแต่ละปีตรงนี้ได้เลย
const yearLinks: Record<number, string> = {
  2561: "#",
  2562: "#",
  2563: "#",
  2564: "#",
  2565: "#",
  2566: "#",
  2567: "#",
  2568: "#",
};

function StaffStatisticsPage() {
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
          <h1 className="text-white text-2xl font-bold">สถิติผู้รับบริการ รายเดือน</h1>
          <p className="text-white/70 text-sm mt-1">รวมสถิติผู้รับบริการแยกตามปีงบประมาณ</p>
        </div>
        <div className="h-5 bg-background rounded-t-[2rem] relative z-10" />
      </div>

      <div className="max-w-5xl mx-auto px-5 -mt-1 pb-12">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-1 h-5 rounded-full bg-primary inline-block" />
          <h2 className="text-sm font-semibold text-foreground">รวมสถิติผู้รับบริการ รายเดือน</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {years.map((year) => (
            <a
              key={year}
              href={yearLinks[year] !== "#" ? yearLinks[year] : undefined}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => yearLinks[year] === "#" && e.preventDefault()}
              className="group flex flex-col items-center gap-3 bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-md transition-all duration-200 text-center cursor-pointer"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="text-4xl group-hover:scale-110 transition-transform duration-200">📊</div>
              <p className="text-xs font-medium text-foreground">รวมสถิติผู้รับบริการ</p>
              <p className="text-sm font-bold text-primary">ปีงบประมาณ {year}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}