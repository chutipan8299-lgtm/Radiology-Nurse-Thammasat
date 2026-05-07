import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Lock, Eye, EyeOff, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
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
    brand: "Radiology Nursing Unit",
    eyebrow: "Staff portal",
    title: "Welcome back",
    subtitle: "Sign in to access protocols and clinical resources.",
    email: "Hospital email",
    emailPlaceholder: "name@hospital.org",
    password: "Password",
    passwordPlaceholder: "••••••••",
    employeeId: "Employee ID",
    idPlaceholder: "e.g. RNU-00421",
    remember: "Remember me",
    forgot: "Forgot password?",
    submit: "Sign in",
    sso: "Continue with hospital SSO",
    or: "or",
    backHome: "Back to patient site",
    contactIT: "Contact IT support",
    invalid: "Please enter a valid hospital email and password.",
    success: "Signed in. Redirecting…",
    quote: "Calm, coordinated, compassionate care for every patient.",
    quoteAuthor: "Radiology Nursing Unit",
  },
  th: {
    brand: "หน่วยพยาบาลรังสีวิทยา",
    eyebrow: "พอร์ทัลเจ้าหน้าที่",
    title: "ยินดีต้อนรับกลับ",
    subtitle: "เข้าสู่ระบบเพื่อเข้าถึงโปรโตคอลและทรัพยากรทางคลินิก",
    email: "อีเมลโรงพยาบาล",
    emailPlaceholder: "name@hospital.org",
    password: "รหัสผ่าน",
    passwordPlaceholder: "••••••••",
    employeeId: "รหัสพนักงาน",
    idPlaceholder: "เช่น RNU-00421",
    remember: "จดจำฉัน",
    forgot: "ลืมรหัสผ่าน?",
    submit: "เข้าสู่ระบบ",
    sso: "เข้าสู่ระบบด้วย SSO โรงพยาบาล",
    or: "หรือ",
    backHome: "กลับไปหน้าผู้ป่วย",
    contactIT: "ติดต่อฝ่าย IT",
    invalid: "กรุณากรอกอีเมลโรงพยาบาลและรหัสผ่านให้ถูกต้อง",
    success: "เข้าสู่ระบบสำเร็จ กำลังนำคุณไป…",
    quote: "การดูแลที่สงบ ประสานงาน และเปี่ยมด้วยความเมตตาสำหรับผู้ป่วยทุกคน",
    quoteAuthor: "หน่วยพยาบาลรังสีวิทยา",
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
    <div className="relative -mt-8 min-h-[calc(100vh-4rem)] bg-background">
      <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
        {/* Left: brand panel */}
        <aside className="relative hidden overflow-hidden bg-primary/5 lg:block">
          <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-30" />
          <div className="relative flex h-full flex-col justify-between p-12 xl:p-16">
            <div className="flex items-center gap-2.5">
              <div className="h-2.5 w-2.5 rounded-full bg-primary" />
              <span className="text-sm font-medium tracking-tight text-foreground">{c.brand}</span>
            </div>
            <div className="max-w-md">
              <p className="text-2xl font-light leading-relaxed tracking-tight text-foreground xl:text-3xl">
                "{c.quote}"
              </p>
              <p className="mt-6 text-sm text-muted-foreground">— {c.quoteAuthor}</p>
            </div>
            <div />
          </div>
        </aside>

        {/* Right: form */}
        <main className="flex items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-sm">
            <Link
              to="/"
              className="mb-10 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {c.backHome}
            </Link>

            <div className="mb-1 text-xs font-medium uppercase tracking-wider text-primary">
              {c.eyebrow}
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">{c.title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{c.subtitle}</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <CleanField
                id="email"
                label={c.email}
                type="email"
                value={email}
                onChange={setEmail}
                placeholder={c.emailPlaceholder}
                autoComplete="email"
                required
              />
              <CleanField
                id="employeeId"
                label={c.employeeId}
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
                  <button type="button" className="text-xs text-primary transition-colors hover:text-primary/80">
                    {c.forgot}
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPwd ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    placeholder={c.passwordPlaceholder}
                    required
                    className="h-11 w-full rounded-lg border border-input bg-background px-3.5 pr-10 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="Toggle password visibility"
                  >
                    {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <label className="flex cursor-pointer select-none items-center gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-input accent-[hsl(var(--primary))]"
                />
                {c.remember}
              </label>

              {status === "error" && (
                <p role="alert" className="text-xs text-destructive">
                  {c.invalid}
                </p>
              )}
              {status === "success" && (
                <p className="inline-flex items-center gap-1.5 text-xs text-primary">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {c.success}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className={cn(
                  "inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60",
                )}
              >
                {status === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Lock className="h-3.5 w-3.5" />
                )}
                {c.submit}
              </button>

              <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-muted-foreground">
                <div className="h-px flex-1 bg-border" />
                {c.or}
                <div className="h-px flex-1 bg-border" />
              </div>

              <button
                type="button"
                className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-border bg-background text-sm font-medium text-foreground transition hover:bg-muted/60"
              >
                {c.sso}
              </button>
            </form>

            <p className="mt-8 text-center text-xs text-muted-foreground">
              <a href="mailto:it@hospital.org" className="text-primary hover:underline">
                {c.contactIT}
              </a>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}

function CleanField({ id, label, value, onChange, placeholder, type = "text", autoComplete, required }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="h-11 w-full rounded-lg border border-input bg-background px-3.5 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
      />
    </div>
  );
}