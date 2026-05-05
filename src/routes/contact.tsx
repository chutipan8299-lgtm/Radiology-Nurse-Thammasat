import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Radiology Nursing Unit" },
      { name: "description", content: "Phone, email, location, and operating hours for the Radiology Nursing Unit." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useLanguage();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t("contact.title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("contact.subtitle")}</p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <ContactCard icon={Phone} title={t("contact.phone")} lines={[t("contact.phone.main"), t("contact.phone.emergency")]} />
          <ContactCard icon={Mail} title={t("contact.email")} lines={["rnu@hospital.org", "appointments@hospital.org"]} />
          <ContactCard icon={MapPin} title={t("contact.location")} lines={[t("contact.address1"), t("contact.address2")]} />
          <ContactCard icon={Clock} title={t("contact.hours")} lines={[t("contact.hours.weekday"), t("contact.hours.sat"), t("contact.hours.closed")]} />
          <div className="flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
            <div className="text-sm">
              <div className="font-semibold text-foreground">{t("contact.emergency.title")}</div>
              <div className="text-muted-foreground">{t("contact.emergency.desc")}</div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)]">
          <iframe
            title="Hospital location"
            src="https://www.openstreetmap.org/export/embed.html?bbox=100.50%2C13.74%2C100.55%2C13.78&layer=mapnik"
            className="h-full min-h-[400px] w-full"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

function ContactCard({ icon: Icon, title, lines }: { icon: typeof Phone; title: string; lines: string[] }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-sm font-semibold text-foreground">{title}</div>
        {lines.map((l) => (
          <div key={l} className="text-sm text-muted-foreground">{l}</div>
        ))}
      </div>
    </div>
  );
}
