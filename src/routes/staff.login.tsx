import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
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
    subtitle: "Sign in to continue.",
    password: "Password",
    passwordPlaceholder: "••••••••",
    employeeId: "Staff ID",
    idPlaceholder: "e.g. RNU-00421",
    forgot: "Forgot password?",
    submit: "Login",
    backHome: "Back to patient site",
    invalid: "Please enter a valid Staff ID and password.",
    success: "Signed in. Redirecting…",
  },
  th: {
    brand: "หน่วยพยาบาลรังสีวิทยา",
    eyebrow: "พอร์ทัลเจ้าหน้าที่",
    title: "ยินดีต้อนรับกลับ",
    subtitle: "เข้าสู่ระบบเพื่อดำเนินการต่อ",
    password: "รหัสผ่าน",
    passwordPlaceholder: "••••••••",
    employeeId: "รหัสพนักงาน",
    idPlaceholder: "เช่น RNU-00421",
    forgot: "ลืมรหัสผ่าน?",
    submit: "เข้าสู่ระบบ",
    backHome: "กลับไปหน้าผู้ป่วย",
    invalid: "กรุณากรอกรหัสพนักงานและรหัสผ่านให้ถูกต้อง",
    success: "เข้าสู่ระบบสำเร็จ กำลังนำคุณไป…",
  },
};

function StaffLoginPage() {
  const { lang } = useLanguage();
  const { setMode } = useMode();
  const navigate = useNavigate();
  const c = copy[lang];

  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [status, setStatus] = useState<"idle" | "error" | "loading" | "success">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (employeeId.trim().length < 3 || password.length < 6) {
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
    <div className="relative -mt-8 flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-background to-pink-100/60 px-4 py-12">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative w-full max-w-sm">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {c.backHome}
        </Link>

        <div className="rounded-2xl border border-border/60 bg-card/90 p-8 shadow-xl shadow-primary/5 backdrop-blur sm:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-pink-400 text-primary-foreground shadow-md shadow-primary/30">
              <span className="text-lg font-semibold">R</span>
            </div>
            <div className="text-[11px] font-medium uppercase tracking-wider text-primary">
              {c.eyebrow}
            </div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">{c.title}</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">{c.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <CleanField
              id="employeeId"
              label={c.employeeId}
              value={employeeId}
              onChange={setEmployeeId}
              placeholder={c.idPlaceholder}
              autoComplete="username"
              required
            />

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-foreground">
                {c.password}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder={c.passwordPlaceholder}
                  required
                  className="h-11 w-full rounded-full border border-input bg-background px-4 pr-11 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Toggle password visibility"
                >
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <div className="mt-2 text-right">
                <button type="button" className="text-xs text-primary transition-colors hover:text-primary/80">
                  {c.forgot}
                </button>
              </div>
            </div>

            {status === "error" && (
              <p role="alert" className="text-center text-xs text-destructive">
                {c.invalid}
              </p>
            )}
            {status === "success" && (
              <p className="inline-flex w-full items-center justify-center gap-1.5 text-xs text-primary">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {c.success}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className={cn(
                "inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-primary to-pink-400 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-primary/40 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60",
              )}
            >
              {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
              {c.submit}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">{c.brand}</p>
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
        className="h-11 w-full rounded-full border border-input bg-background px-4 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}