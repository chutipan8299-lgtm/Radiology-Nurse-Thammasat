import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Menu, X, Stethoscope, User, Languages, LogIn } from "lucide-react";
import { useMode } from "@/contexts/mode-context";
import { useLanguage } from "@/contexts/language-context";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", key: "nav.home" },
  { to: "/procedures", key: "nav.procedures" },
  { to: "/journey", key: "nav.journey" },
  { to: "/contact", key: "nav.contact" },
];

export function SiteHeader() {
  const { mode, setMode } = useMode();
  const { lang, setLang, t } = useLanguage();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  const goPatient = () => {
    setMode("patient");
    navigate({ to: "/" });
    setOpen(false);
  };
  const goStaff = () => {
    setMode("staff");
    navigate({ to: user ? "/staff/select" : "/staff/login" });
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--gradient-hero)] shadow-[var(--shadow-soft)]">
            <Heart className="h-5 w-5 text-primary-foreground" fill="currentColor" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-foreground">{t("brand.name")}</div>
            <div className="text-[11px] text-muted-foreground">{t("brand.tagline")}</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => {
            const active = n.to === "/" ? path === "/" : path.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                )}
              >
                {t(n.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "en" ? "th" : "en")}
            className="hidden h-9 items-center gap-1.5 rounded-full border border-border bg-muted px-3 text-xs font-semibold text-foreground transition-colors hover:bg-secondary sm:inline-flex"
            aria-label="Toggle language"
          >
            <Languages className="h-3.5 w-3.5" />
            {lang === "en" ? "TH" : "EN"}
          </button>
          <div className="hidden items-center rounded-full border border-border bg-muted p-1 sm:flex">
            <button
              onClick={goPatient}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                mode === "patient"
                  ? "bg-background text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <User className="h-3.5 w-3.5" /> {t("mode.patient")}
            </button>
            <button
              onClick={goStaff}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                mode === "staff"
                  ? "bg-background text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Stethoscope className="h-3.5 w-3.5" /> {t("mode.staff")}
            </button>
          </div>

          {!user && (
            <Link
              to="/staff/login"
              className="hidden h-9 items-center gap-1.5 rounded-full bg-primary px-3.5 text-xs font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-opacity hover:opacity-95 sm:inline-flex"
            >
              <LogIn className="h-3.5 w-3.5" />
              {lang === "en" ? "Staff Login" : "เข้าสู่ระบบ"}
            </Link>
          )}

          <button
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border md:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {t(n.key)}
              </Link>
            ))}
            <button
              onClick={() => setLang(lang === "en" ? "th" : "en")}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-muted px-3 py-2 text-xs font-semibold text-foreground"
            >
              <Languages className="h-3.5 w-3.5" />
              {lang === "en" ? "ภาษาไทย" : "English"}
            </button>
            <div className="mt-2 flex items-center rounded-full border border-border bg-muted p-1">
              <button
                onClick={goPatient}
                className={cn(
                  "flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium",
                  mode === "patient" ? "bg-background text-primary shadow-sm" : "text-muted-foreground",
                )}
              >
                <User className="h-3.5 w-3.5" /> {t("mode.patient")}
              </button>
              <button
                onClick={goStaff}
                className={cn(
                  "flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium",
                  mode === "staff" ? "bg-background text-primary shadow-sm" : "text-muted-foreground",
                )}
              >
                <Stethoscope className="h-3.5 w-3.5" /> {t("mode.staff")}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}