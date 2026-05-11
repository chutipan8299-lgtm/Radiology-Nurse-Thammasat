
import { Heart, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/contexts/language-context";

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="mt-24 border-t border-border bg-muted/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4 md:px-6">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl"
              style={{ background: "var(--gradient-hero)" }}
            >
              <Heart
                className="h-5 w-5 text-primary-foreground"
                fill="currentColor"
              />
            </div>

            <span className="font-semibold text-foreground">
              {t("brand.fullName")}
            </span>
          </div>

          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            {t("footer.about")}
          </p>
        </div>

        <div>
          <div className="text-sm font-semibold text-foreground">
            {t("footer.quickLinks")}
          </div>

          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/procedures" className="hover:text-primary">
                {t("nav.procedures")}
              </Link>
            </li>

            <li>
              <Link to="/journey" className="hover:text-primary">
                {t("nav.journey")}
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-primary">
                {t("nav.contact")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold text-foreground">
            {t("footer.contact")}
          </div>

          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+66 2 123 4567</span>
            </li>

            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>rnu@hospital.org</span>
            </li>

            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{t("contact.address1")}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {t("footer.copyright")}
      </div>
    </footer>
  );
}