import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Stethoscope, Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft, KeyRound, Building2 } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useMode } from "@/contexts/mode-context";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/staff/login")({
  head: () => ({
    meta: [
      { title: "Staff Login — Radiology Nursing Unit" },
      { name: "description", content: "Secure sign-in for Radiology Nursing Unit staff to access protocols, internal documents, and clinical resources." },
      { property: "og:title", content: "Staff Login — Radiology Nursing Unit" },
      { property: "og:description", content: "Secure sign-in for Radiology Nursing Unit staff." },
    ],
  }),
  component: StaffLoginPage,
});

const copy = {
  en: {
    badge: "Staff Access",
    title: "Sign in to your workspace",
    subtitle: "Access protocols, internal documents and clinical resources for the Radiology Nursing Unit.",
    email: "Hospital email",
    emailPlaceholder: "name@hospital.org",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    employeeId: "Employee ID",
    idPlaceholder: "e.g. RNU-00421",
    remember: "Keep me signed in on this device",
    forgot: "Forgot password?",
    submit: "Sign in securely",
    sso: "Continue with hospital SSO",
    or: "or",
    secureNote: "Protected by hospital network security.",
    backHome: "Back to patient site",
    needHelp: "Need access?",
    contactIT: "Contact IT support",
    invalid: "Please enter a valid hospital email and password.",
    success: "Signed in. Redirecting…",
    patient: "Are you a patient?",
    patientCta: "Continue as patient",
  },
  th: {
    badge: "สำหรับเจ้าหน้าที่",
    title: "เข้าสู่ระบบเจ้าหน้าที่",
    subtitle: "เข้าถึงโปรโตคอล เอกสารภายใน และทรัพยากรทางคลินิกของหน่วยพยาบาลรังสีวิทยา",
    email: "อีเมลโรงพยาบาล",
    emailPlaceholder: "name@hospital.org",
    password: "รหัสผ่าน",
    passwordPlaceholder: "กรอกรหัสผ่าน",
    employeeId: "รหัสพนักงาน",
    idPlaceholder: "เช่น RNU-00421",
    remember: "จดจำการเข้าสู่ระบบในอุปกรณ์นี้",
    forgot: "ลืมรหัสผ่าน?",
    submit: "เข้าสู่ระบบ",
    sso: "เข้าสู่ระบบด้วย SSO โรงพยาบาล",
    or: "หรือ",
    secureNote: "ปกป้องโดยระบบความปลอดภัยของโรงพยาบาล",
    backHome: "กลับไปหน้าผู้ป่วย",
    needHelp: "ต้องการสิทธิ์การเข้าถึง?",
    contactIT: "ติดต่อฝ่าย IT",
    invalid: "กรุณากรอกอีเมลโรงพยาบาลและรหัสผ่านให้ถูกต้อง",
    success: "เข้าสู่ระบบสำเร็จ กำลังนำคุณไป…",
    patient: "คุณเป็นผู้ป่วยใช่หรือไม่?",
    patientCta: "เข้าใช้งานในฐานะผู้ป่วย",
  },
};

function StaffLoginPage() {
  const { lang } = useLanguage();
  const { setMode } = useMode();
  const navigate = useNavigate();
  const c = copy[lang];

  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const [status, setStatus] = useState<"idle" | "error" | "loading" | "success">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || password.length < 6) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    setTimeout(() => {
      setMode("staff");
      setStatus("success");
      setTimeout(() => navigate({ to: "/" }), 700);
    }, 800);
  };

  return (
    <div className="relative -mt-8 min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Background art */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-[0.08]" />
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[hsl(var(--accent))]/15 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 md:gap-16 md:px-6 md:py-20">
        {/* Left: marketing / context */}
        <div className="hidden flex-col justify-between md:flex">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              {c.backHome}
            </Link>

            <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
              <Stethoscope className="h-3.5 w-3.5 text-primary" />
              {c.badge}
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground">
              {c.title}
            </h1>
            <p className="mt-3 max-w-md text-base text-muted-foreground">{c.subtitle}</p>

            <ul className="mt-10 space-y-4">
              {[
                { icon: ShieldCheck, t: lang === "en" ? "Encrypted, HIPAA-aligned access" : "เข้าถึงแบบเข้ารหัสตามมาตรฐาน HIPAA" },
                { icon: KeyRound, t: lang === "en" ? "Single sign-on with hospital ID" : "เข้าสู่ระบบด้วยบัญชีโรงพยาบาล" },
                { icon: Building2, t: lang === "en" ? "Role-based access for nursing teams" : "สิทธิ์การเข้าถึงตามบทบาทของพยาบาล" },
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <f.icon className="h-4 w-4" />
                  </div>
                  <p className="pt-1.5 text-sm text-foreground">{f.t}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-background/60 p-5 text-sm text-muted-foreground backdrop-blur">
            <p className="font-medium text-foreground">{c.patient}</p>
            <Link to="/" className="mt-1 inline-flex text-primary hover:underline">
              {c.patientCta} →
            </Link>
          </div>
        </div>

        {/* Right: card */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="md:hidden">
              <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                {c.backHome}
              </Link>
            </div>

            <div className="mt-4 rounded-3xl border border-border bg-background/80 p-6 shadow-[var(--shadow-soft)] backdrop-blur md:p-8">
              <div className="md:hidden">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground">
                  <Stethoscope className="h-3.5 w-3.5 text-primary" />
                  {c.badge}
                </div>
                <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground">{c.title}</h1>
                <p className="mt-2 text-sm text-muted-foreground">{c.subtitle}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 md:mt-2">
                <Field
                  id="email"
                  label={c.email}
                  icon={Mail}
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder={c.emailPlaceholder}
                  autoComplete="email"
                  required
                />

                <Field
                  id="employeeId"
                  label={c.employeeId}
                  icon={Building2}
                  value={employeeId}
                  onChange={setEmployeeId}
                  placeholder={c.idPlaceholder}
                  autoComplete="username"
                />

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium text-foreground">
                      {c.password}
                    </label>
                    <button type="button" className="text-xs font-medium text-primary hover:underline">
                      {c.forgot}
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="password"
                      type={showPwd ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      placeholder={c.passwordPlaceholder}
                      required
                      className="h-11 w-full rounded-xl border border-input bg-background px-10 text-sm shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd((s) => !s)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                      aria-label="Toggle password visibility"
                    >
                      {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-input accent-[hsl(var(--primary))]"
                  />
                  {c.remember}
                </label>

                {status === "error" && (
                  <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive">
                    {c.invalid}
                  </div>
                )}
                {status === "success" && (
                  <div className="rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-xs text-primary">
                    {c.success}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={cn(
                    "inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:opacity-95 disabled:opacity-60",
                  )}
                >
                  <Lock className="h-4 w-4" />
                  {status === "loading" ? "…" : c.submit}
                </button>

                <div className="relative my-2 flex items-center gap-3 text-[11px] uppercase tracking-wide text-muted-foreground">
                  <div className="h-px flex-1 bg-border" />
                  {c.or}
                  <div className="h-px flex-1 bg-border" />
                </div>

                <button
                  type="button"
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-background text-sm font-medium text-foreground transition hover:bg-muted"
                >
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  {c.sso}
                </button>
              </form>

              <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  {c.secureNote}
                </span>
                <a href="mailto:it@hospital.org" className="font-medium text-primary hover:underline">
                  {c.contactIT}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FieldProps {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}

function Field({ id, label, icon: Icon, value, onChange, placeholder, type = "text", autoComplete, required }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className="h-11 w-full rounded-xl border border-input bg-background px-10 text-sm shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>
  );
}