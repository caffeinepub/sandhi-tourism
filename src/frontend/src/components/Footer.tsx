import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/translations";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const { lang } = useLanguage();
  const tx = t[lang].footer;
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      data-ocid="footer.section"
      className="relative overflow-hidden"
      style={{ background: "oklch(0.17 0.04 260)" }}
    >
      {/* Top accent */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(200,100,15,0.5), rgba(212,160,23,0.5), transparent)",
        }}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <button
              type="button"
              onClick={() => scrollTo("#home")}
              className="flex items-center gap-3 mb-5 group"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-sandhi-orange/40 group-hover:ring-sandhi-orange transition-all duration-300">
                <img
                  src="/assets/uploads/images-1.jpg"
                  alt="Sandhi Tourism"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-white font-bold text-lg">
                  Sandhi
                </span>
                <span className="text-sandhi-gold text-[9px] font-medium tracking-[0.25em] uppercase">
                  Tourism
                </span>
              </div>
            </button>

            <p className="font-sans text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              {tx.tagline}
            </p>

            {/* Contact — real info */}
            <div className="space-y-3">
              {/* Phone — real number */}
              <a
                data-ocid="footer.phone.link"
                href="tel:+919099786906"
                className="flex items-center gap-3 text-white/50 hover:text-sandhi-gold transition-colors text-sm font-sans group"
              >
                <Phone className="h-4 w-4 flex-shrink-0 text-sandhi-orange group-hover:text-sandhi-gold transition-colors" />
                +91 90997 86906
              </a>
              {/* WhatsApp */}
              <a
                data-ocid="footer.whatsapp.link"
                href="https://wa.me/919099786906"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-emerald-400 hover:text-emerald-300 transition-colors text-sm font-sans font-semibold group"
              >
                <MessageCircle className="h-4 w-4 flex-shrink-0 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                {lang === "gu" ? "વૉટ્સએપ કરો" : "WhatsApp Us"}
              </a>
              {/* Hours — replacing email */}
              <div className="flex items-center gap-3 text-white/50 text-sm font-sans">
                <Clock className="h-4 w-4 flex-shrink-0 text-sandhi-orange" />
                <span>{tx.hours}</span>
              </div>
              {/* Real address */}
              <div className="flex items-start gap-3 text-white/50 text-sm font-sans">
                <MapPin className="h-4 w-4 flex-shrink-0 text-sandhi-orange mt-0.5" />
                <span>
                  SANDHI SERVICE STATION, Alankar Cinema Rd, opp. masjid, samay,
                  Bhatpara, Surendranagar, Gujarat 363001
                </span>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { Icon: SiX, href: "#", label: "X (Twitter)" },
                { Icon: SiInstagram, href: "#", label: "Instagram" },
                { Icon: SiFacebook, href: "#", label: "Facebook" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-sandhi-orange/20 transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-serif text-white font-bold text-lg mb-5">
              {tx.company}
            </h4>
            <ul className="space-y-3">
              {tx.companyLinks.map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    className="font-sans text-white/50 hover:text-sandhi-gold text-sm transition-colors duration-200"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-serif text-white font-bold text-lg mb-5">
              {tx.destinations}
            </h4>
            <ul className="space-y-3">
              {tx.destinationLinks.map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    className="font-sans text-white/50 hover:text-sandhi-gold text-sm transition-colors duration-200"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-serif text-white font-bold text-lg mb-5">
              {tx.support}
            </h4>
            <ul className="space-y-3">
              {tx.supportLinks.map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    className="font-sans text-white/50 hover:text-sandhi-gold text-sm transition-colors duration-200"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>

            {/* Newsletter teaser */}
            <div className="mt-8">
              <h5 className="font-sans text-white/70 text-xs font-semibold uppercase tracking-widest mb-3">
                {tx.newsletterTitle}
              </h5>
              <p className="font-sans text-white/40 text-xs mb-3 leading-relaxed">
                {tx.newsletterText}
              </p>
              <button
                type="button"
                onClick={() => scrollTo("#booking")}
                className="font-sans text-sandhi-orange hover:text-sandhi-gold text-xs font-semibold transition-colors duration-200 underline underline-offset-2"
              >
                {tx.subscribe}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-white/30 text-xs text-center md:text-left">
            © {year} Sandhi Tourism. {tx.rights}
          </p>
          <p className="font-sans text-white/30 text-xs text-center">
            {tx.builtWith}{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sandhi-gold/60 hover:text-sandhi-gold transition-colors duration-200"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="font-sans text-white/25 hover:text-white/50 text-xs transition-colors"
            >
              {tx.terms}
            </button>
            <button
              type="button"
              className="font-sans text-white/25 hover:text-white/50 text-xs transition-colors"
            >
              {tx.privacy}
            </button>
            <button
              type="button"
              className="font-sans text-white/25 hover:text-white/50 text-xs transition-colors"
            >
              {tx.cookies}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
