import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/translations";
import { Clock, Globe, Star, Users } from "lucide-react";
import { useEffect, useRef } from "react";

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const tx = t[lang].stats;

  const stats = [
    { icon: Globe, value: "500+", label: tx.destinations },
    { icon: Users, value: "12,000+", label: tx.travelers },
    { icon: Clock, value: "15+", label: tx.excellence },
    { icon: Star, value: "4.9★", label: tx.rating },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.2 },
    );

    const el = ref.current;
    if (el) {
      const reveals = el.querySelectorAll(".reveal");
      for (const r of reveals) {
        observer.observe(r);
      }
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section data-ocid="stats.section" className="relative z-10 -mt-1">
      {/* Tier 2 glass panel — dark ground behind it from hero, so blur reads */}
      <div
        className="mx-4 md:mx-8 lg:mx-16 rounded-2xl overflow-hidden"
        style={{
          background: "rgba(12, 16, 30, 0.65)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderTop: "1px solid rgba(255,255,255,0.20)",
          borderRight: "1px solid rgba(255,255,255,0.07)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          borderLeft: "1px solid rgba(255,255,255,0.07)",
          boxShadow:
            "0 16px 48px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.10)",
        }}
        ref={ref}
      >
        {/* Subtle inner glow strip at top */}
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 5%, rgba(212,160,23,0.35) 30%, rgba(200,100,15,0.35) 60%, transparent 95%)",
          }}
        />

        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            const isOrange = i % 2 === 0;
            return (
              <div
                key={stat.label}
                className="reveal flex flex-col items-center text-center py-8 px-6 group relative"
                style={{
                  transitionDelay: `${i * 100}ms`,
                  borderRight:
                    i < stats.length - 1
                      ? "1px solid rgba(255,255,255,0.06)"
                      : undefined,
                  borderBottom:
                    i < 2 ? "1px solid rgba(255,255,255,0.06)" : undefined,
                }}
              >
                {/* Hover highlight */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                />

                {/* Icon ring */}
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center mb-4 flex-shrink-0"
                  style={{
                    background: isOrange
                      ? "linear-gradient(135deg, rgba(200,100,15,0.18), rgba(200,100,15,0.08))"
                      : "linear-gradient(135deg, rgba(212,160,23,0.18), rgba(212,160,23,0.08))",
                    border: isOrange
                      ? "1px solid rgba(200,100,15,0.30)"
                      : "1px solid rgba(212,160,23,0.30)",
                  }}
                >
                  <Icon
                    className="h-4.5 w-4.5"
                    style={{
                      color: isOrange
                        ? "oklch(0.68 0.18 42)"
                        : "oklch(0.78 0.14 82)",
                      width: "1.125rem",
                      height: "1.125rem",
                    }}
                  />
                </div>

                {/* Value */}
                <div
                  className="font-serif text-3xl font-bold mb-1 leading-none"
                  style={{
                    color: isOrange
                      ? "oklch(0.72 0.18 42)"
                      : "oklch(0.80 0.14 82)",
                  }}
                >
                  {stat.value}
                </div>

                {/* Label */}
                <div
                  className="font-sans text-xs font-medium tracking-wide"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
