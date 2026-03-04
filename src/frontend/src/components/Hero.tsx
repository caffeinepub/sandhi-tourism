import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/translations";
import { ArrowRight, ChevronDown, Moon, ShieldCheck } from "lucide-react";
import { useEffect, useRef } from "react";
import TravelScene3D from "./TravelScene3D";

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const { lang, toggleLang } = useLanguage();
  const tx = t[lang].hero;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      // Low threshold so reveals fire immediately on load
      { threshold: 0.05 },
    );

    const el = contentRef.current;
    if (el) {
      const reveals = el.querySelectorAll(".reveal");
      for (const r of reveals) {
        observer.observe(r);
      }
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image with parallax-ready positioning */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-makkah-haram.dim_1920x1080.jpg')",
          transformOrigin: "center bottom",
        }}
      />

      {/* Primary overlay — bottom-heavy gradient for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, oklch(0.18 0.04 260) 0%, oklch(0.22 0.04 260 / 0.82) 28%, oklch(0.25 0.04 260 / 0.45) 55%, oklch(0.25 0.04 260 / 0.12) 100%)",
        }}
      />
      {/* Side vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 100% at 50% 100%, transparent 40%, oklch(0.15 0.04 260 / 0.5) 100%)",
        }}
      />
      {/* Warm atmospheric haze top-left — counters the cool slate */}
      <div
        className="absolute top-0 left-0 w-1/2 h-2/3 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top left, oklch(0.62 0.18 45 / 0.08) 0%, transparent 65%)",
        }}
      />

      {/* 3D floating elements */}
      <TravelScene3D />

      {/* Hero content */}
      <div
        ref={contentRef}
        className="hero-content relative z-10 text-center px-4 max-w-5xl mx-auto pt-20"
      >
        {/* Govt. Approved badge — above eyebrow */}
        <div className="reveal flex items-center justify-center gap-2 mb-4">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{
              background:
                "linear-gradient(135deg, rgba(22,163,74,0.2), rgba(22,163,74,0.1))",
              border: "1px solid rgba(22,163,74,0.4)",
              color: "oklch(0.75 0.18 145)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{tx.govtApproved}</span>
          </div>
          <div
            className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "oklch(0.80 0.12 85)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            {tx.intlDomestic}
          </div>
        </div>

        {/* Eyebrow */}
        <div className="reveal flex items-center justify-center gap-4 mb-8">
          <span
            className="h-px flex-shrink-0"
            style={{
              width: "3rem",
              background:
                "linear-gradient(to right, transparent, oklch(0.75 0.14 85 / 0.7))",
            }}
          />
          <span
            className="font-sans text-xs font-semibold tracking-[0.35em] uppercase flex items-center gap-2"
            style={{ color: "oklch(0.80 0.12 85)" }}
          >
            <Moon
              className="h-3.5 w-3.5 flex-shrink-0"
              style={{ color: "oklch(0.82 0.14 82)" }}
            />
            {tx.eyebrow}
          </span>
          <span
            className="h-px flex-shrink-0"
            style={{
              width: "3rem",
              background:
                "linear-gradient(to left, transparent, oklch(0.75 0.14 85 / 0.7))",
            }}
          />
        </div>

        {/* Main heading — size contrast: line 1 dominant, line 2 italic gold flourish */}
        <div className="reveal mb-8">
          <h1
            className="font-serif font-black text-white leading-none"
            style={{ letterSpacing: "-0.02em" }}
          >
            {/* Line 1: maximum weight and size — the anchor */}
            <span
              className="block"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 7.5rem)",
                lineHeight: "0.96",
              }}
            >
              {tx.line1}
            </span>
            {/* Line 2: italic, gold gradient, slightly smaller — the flourish */}
            <span
              className="block font-serif italic text-gradient-gold"
              style={{
                fontSize: "clamp(3rem, 8.5vw, 6.5rem)",
                lineHeight: "1.05",
                marginTop: "0.05em",
              }}
            >
              {tx.line2}
            </span>
          </h1>
        </div>

        {/* Subtext */}
        <p
          className="reveal font-sans max-w-xl mx-auto leading-relaxed mb-10"
          style={{
            color: "rgba(255,255,255,0.62)",
            fontSize: "clamp(1rem, 2vw, 1.125rem)",
          }}
        >
          {tx.subtext}
        </p>

        {/* CTAs */}
        <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            data-ocid="hero.book_journey.button"
            onClick={() => scrollToSection("#booking")}
            className="group text-white font-semibold px-9 py-3.5 h-auto rounded-full transition-all duration-300 text-base border-0 min-w-[200px]"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.65 0.20 42) 0%, oklch(0.58 0.18 38) 100%)",
              boxShadow:
                "0 4px 24px oklch(0.62 0.18 45 / 0.45), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 8px 32px oklch(0.62 0.18 45 / 0.55), inset 0 1px 0 rgba(255,255,255,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 4px 24px oklch(0.62 0.18 45 / 0.45), inset 0 1px 0 rgba(255,255,255,0.15)";
            }}
          >
            {tx.bookJourney}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
          <button
            type="button"
            data-ocid="hero.explore_tours.link"
            onClick={() => scrollToSection("#tours")}
            className="group flex items-center gap-2 font-sans font-medium text-base transition-colors duration-200"
            style={{ color: "rgba(255,255,255,0.65)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "oklch(0.80 0.12 85)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "rgba(255,255,255,0.65)";
            }}
          >
            {tx.exploreTours}
            <ChevronDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform duration-200" />
          </button>
        </div>

        {/* Hero Language Toggle — prominently placed for easy access */}
        <div className="reveal flex items-center justify-center mt-8">
          <button
            type="button"
            data-ocid="hero.language_toggle.button"
            onClick={toggleLang}
            className="relative flex items-center overflow-hidden rounded-full transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.20)",
              padding: "3px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
            aria-label="Toggle language"
          >
            <span
              className="px-6 py-2.5 rounded-full font-sans font-semibold text-sm transition-all duration-300"
              style={{
                background:
                  lang === "en"
                    ? "linear-gradient(135deg, oklch(0.62 0.18 45), oklch(0.68 0.16 55))"
                    : "transparent",
                color: lang === "en" ? "white" : "rgba(255,255,255,0.45)",
                boxShadow:
                  lang === "en"
                    ? "0 2px 12px oklch(0.62 0.18 45 / 0.5)"
                    : "none",
              }}
            >
              English
            </span>
            <span
              className="px-6 py-2.5 rounded-full font-sans font-semibold text-sm transition-all duration-300"
              style={{
                background:
                  lang === "gu"
                    ? "linear-gradient(135deg, oklch(0.62 0.18 45), oklch(0.68 0.16 55))"
                    : "transparent",
                color: lang === "gu" ? "white" : "rgba(255,255,255,0.45)",
                boxShadow:
                  lang === "gu"
                    ? "0 2px 12px oklch(0.62 0.18 45 / 0.5)"
                    : "none",
              }}
            >
              ગુજરાતી
            </span>
          </button>
        </div>

        {/* Trust badges — glass pill treatment */}
        <div className="reveal mt-8 flex items-center justify-center gap-2 flex-wrap">
          {[
            { value: "500+", labelKey: "destinations" as const },
            { value: "12K+", labelKey: "travelers" as const },
            { value: "15 Yrs", labelKey: "excellence" as const },
            { value: "4.9★", labelKey: "rating" as const },
          ].map((badge, i) => (
            <div
              key={badge.labelKey}
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                animationDelay: `${600 + i * 80}ms`,
              }}
            >
              <span
                className="font-serif font-bold text-sm"
                style={{ color: "oklch(0.80 0.14 82)" }}
              >
                {badge.value}
              </span>
              <span
                className="font-sans text-xs"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {tx.badges[badge.labelKey]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase">
          {tx.scroll}
        </span>
        <ChevronDown className="h-3.5 w-3.5" />
      </div>
    </section>
  );
}
