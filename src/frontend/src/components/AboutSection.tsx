import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/translations";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Headphones,
  Leaf,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useRef } from "react";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const tx = t[lang].about;

  const features = [
    {
      icon: Compass,
      title: tx.features.guides.title,
      description: tx.features.guides.description,
    },
    {
      icon: BookOpen,
      title: tx.features.itineraries.title,
      description: tx.features.itineraries.description,
    },
    {
      icon: Headphones,
      title: tx.features.support.title,
      description: tx.features.support.description,
    },
    {
      icon: Leaf,
      title: tx.features.sustainable.title,
      description: tx.features.sustainable.description,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        }
      },
      { threshold: 0.1 },
    );
    const el = sectionRef.current;
    if (el) {
      for (const r of el.querySelectorAll(".reveal")) {
        observer.observe(r);
      }
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-pad relative overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Decorative elements */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(212,160,23,0.3), transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "oklch(0.75 0.14 85)" }}
      />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <div className="reveal">
              <span className="inline-block font-sans text-sandhi-orange text-sm font-semibold tracking-[0.2em] uppercase mb-4">
                {tx.label}
              </span>

              {/* Government Approved + International & Domestic badges */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(22,163,74,0.18), rgba(22,163,74,0.08))",
                    border: "1px solid rgba(22,163,74,0.35)",
                    color: "oklch(0.72 0.18 145)",
                  }}
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>{tx.govtBadge}</span>
                </div>
                <div
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: "rgba(212,160,23,0.12)",
                    border: "1px solid rgba(212,160,23,0.28)",
                    color: "oklch(0.78 0.14 82)",
                  }}
                >
                  {tx.intlDomesticBadge}
                </div>
              </div>

              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {tx.heading1}
                <br />
                <em className="italic text-gradient">{tx.heading2}</em>
              </h2>
              <p className="font-sans text-white/60 text-base leading-relaxed mb-4">
                {tx.description1}
              </p>
              <p className="font-sans text-white/50 text-sm leading-relaxed mb-10">
                {tx.description2}
              </p>

              <Button
                data-ocid="about.start_journey.button"
                onClick={() => {
                  const el = document.querySelector("#booking");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-sandhi-orange hover:bg-sandhi-orange/90 text-white font-semibold px-8 py-3 h-auto rounded-full shadow-orange hover:shadow-orange-lg transition-all duration-300 hover:-translate-y-0.5 border-0 group"
              >
                {tx.startJourney}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </div>
          </div>

          {/* Right: Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="reveal p-6 rounded-2xl group hover:bg-white/5 transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(200,100,15,0.2), rgba(212,160,23,0.15))",
                      border: "1px solid rgba(200,100,15,0.25)",
                    }}
                  >
                    <Icon className="h-5 w-5 text-sandhi-orange" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white mb-2">
                    {feat.title}
                  </h3>
                  <p className="font-sans text-white/50 text-sm leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
