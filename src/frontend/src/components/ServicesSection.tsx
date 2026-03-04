import type { TourPackage } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useActor } from "@/hooks/useActor";
import { t } from "@/translations";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Clock, Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";

const fallbackPackages: TourPackage[] = [
  {
    id: BigInt(1),
    title: "Hajj Package",
    description:
      "Fulfil the fifth pillar of Islam with a fully guided Hajj journey — visa, accommodation near Masjid al-Haram, transport, and expert religious guidance included.",
    durationDays: BigInt(21),
    priceUSD: BigInt(2499),
    category: "hajj" as TourPackage["category"],
    featured: false,
  },
  {
    id: BigInt(2),
    title: "Umrah Package",
    description:
      "Experience the blessed Umrah pilgrimage to Makkah and Madinah with curated hotel stays, guided ziyarat visits, and seamless visa processing.",
    durationDays: BigInt(10),
    priceUSD: BigInt(1299),
    category: "umrah" as TourPackage["category"],
    featured: true,
  },
  {
    id: BigInt(3),
    title: "Ziyarat Tour",
    description:
      "A sacred journey through Iraq and Iran — visit the holy shrines of Karbala, Najaf, Mashhad, and Baghdad Sharif with expert guides and comfortable travel.",
    durationDays: BigInt(14),
    priceUSD: BigInt(1899),
    category: "ziyarat" as TourPackage["category"],
    featured: true,
  },
  {
    id: BigInt(4),
    title: "Dubai City Tour",
    description:
      "Explore the dazzling city of Dubai — the Burj Khalifa, Dubai Creek, desert safaris, luxury shopping, and a perfect blend of tradition and modernity.",
    durationDays: BigInt(5),
    priceUSD: BigInt(799),
    category: "dubai" as TourPackage["category"],
    featured: false,
  },
];

const packageImages: Record<string, string> = {
  hajj: "/assets/generated/service-makkah.dim_600x600.jpg",
  umrah: "/assets/generated/service-madinah.dim_600x600.jpg",
  ziyarat: "/assets/generated/service-karbala.dim_600x600.jpg",
  dubai: "/assets/generated/service-dubai.dim_600x600.jpg",
};

const categoryColors: Record<string, string> = {
  hajj: "bg-emerald-800/80 text-emerald-100",
  umrah: "bg-yellow-700/80 text-yellow-100",
  ziyarat: "bg-teal-800/80 text-teal-100",
  dubai: "bg-blue-800/80 text-blue-100",
};

function PackageCard({
  pkg,
  index,
}: {
  pkg: TourPackage;
  index: number;
}) {
  const { lang } = useLanguage();
  const tx = t[lang].services;
  const imageKey = String(pkg.category).toLowerCase();
  const image = packageImages[imageKey] ?? packageImages.hajj;
  const catColor = categoryColors[imageKey] ?? "bg-slate-700/80 text-slate-100";

  // Get translated title if available
  const titleKey = imageKey as keyof typeof tx.titles;
  const displayTitle =
    tx.titles[titleKey] !== undefined ? tx.titles[titleKey] : pkg.title;

  return (
    <article
      data-ocid={`packages.card.${index + 1}`}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "rgba(20, 24, 38, 0.72)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(255,255,255,0.22)",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        borderLeft: "1px solid rgba(255,255,255,0.08)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.1)",
        transition:
          "transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(-10px) scale(1.005)";
        el.style.boxShadow =
          "0 28px 64px rgba(0,0,0,0.40), 0 0 0 1px rgba(200,100,15,0.2), inset 0 1px 0 rgba(255,255,255,0.14)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(0) scale(1)";
        el.style.boxShadow =
          "0 8px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.1)";
      }}
    >
      {/* Image */}
      <div className="relative h-64 md:h-72 overflow-hidden">
        <img
          src={image}
          alt={displayTitle}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(14,18,32,0.96) 0%, rgba(14,18,32,0.5) 40%, transparent 75%)",
          }}
        />
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest ${catColor} backdrop-blur-md`}
            style={{ letterSpacing: "0.12em" }}
          >
            {String(pkg.category)}
          </span>
        </div>
        {pkg.featured && (
          <div className="absolute top-4 right-4">
            <Badge
              className="text-xs font-semibold border-0 px-3 py-1"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.75 0.14 85), oklch(0.68 0.16 72))",
                color: "oklch(0.22 0.04 260)",
              }}
            >
              {tx.featured}
            </Badge>
          </div>
        )}
        {/* Title overlaid on image bottom */}
        <div className="absolute bottom-4 left-5 right-5">
          <h3
            className="font-serif text-2xl font-bold text-white leading-tight"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
          >
            {displayTitle}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 pt-4">
        <p className="font-sans text-white/55 text-sm leading-relaxed line-clamp-2 mb-5">
          {pkg.description}
        </p>

        {/* Meta row */}
        <div
          className="flex items-center gap-4 mb-5 pb-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div
            className="flex items-center gap-1.5"
            style={{ color: "oklch(0.78 0.12 82)" }}
          >
            <Clock className="h-3.5 w-3.5" />
            <span className="font-sans text-sm font-medium">
              {Number(pkg.durationDays)} {tx.days}
            </span>
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <span
              className="font-sans text-xs"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {tx.from}
            </span>
            <span
              className="font-serif text-xl font-bold"
              style={{ color: "oklch(0.68 0.18 42)" }}
            >
              ${Number(pkg.priceUSD).toLocaleString()}
            </span>
            <span
              className="font-sans text-xs"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {tx.perPerson}
            </span>
          </div>
        </div>

        {/* CTA */}
        <Button
          data-ocid={`packages.explore.button.${index + 1}`}
          variant="outline"
          className="w-full rounded-xl font-semibold text-sm group/btn transition-all duration-300"
          style={{
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.85)",
            background: "rgba(255,255,255,0.04)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "oklch(0.62 0.18 45)";
            el.style.border = "1px solid oklch(0.62 0.18 45)";
            el.style.color = "white";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "rgba(255,255,255,0.04)";
            el.style.border = "1px solid rgba(255,255,255,0.15)";
            el.style.color = "rgba(255,255,255,0.85)";
          }}
          onClick={() => {
            const el = document.querySelector("#booking");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {tx.explorePackage}
          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
        </Button>
      </div>
    </article>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { actor, isFetching } = useActor();
  const { lang } = useLanguage();
  const tx = t[lang].services;

  const { data: packages, isLoading } = useQuery<TourPackage[]>({
    queryKey: ["packages"],
    queryFn: async () => {
      if (!actor) return fallbackPackages;
      try {
        const result = await actor.getAllPackages();
        return result.length > 0 ? result : fallbackPackages;
      } catch {
        return fallbackPackages;
      }
    },
    enabled: !!actor && !isFetching,
    placeholderData: fallbackPackages,
  });

  const displayPackages = packages ?? fallbackPackages;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.1 },
    );

    const el = sectionRef.current;
    if (el) {
      const reveals = el.querySelectorAll(".reveal");
      for (const r of reveals) {
        observer.observe(r);
      }
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="tours"
      data-ocid="packages.section"
      ref={sectionRef}
      className="section-pad relative overflow-hidden"
      style={{ background: "oklch(0.22 0.04 260)" }}
    >
      {/* Dot-grid motif for texture */}
      <div className="absolute inset-0 bg-motif opacity-100 pointer-events-none" />

      {/* Warm glow top-right */}
      <div
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.62 0.18 45 / 0.12) 0%, transparent 70%)",
        }}
      />
      {/* Cool glow bottom-left */}
      <div
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.75 0.14 85 / 0.07) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="reveal text-center max-w-2xl mx-auto mb-16">
          <span
            className="inline-block font-sans text-sm font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: "oklch(0.72 0.16 55)" }}
          >
            {tx.label}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            {tx.heading1}
            <br />
            <em className="italic text-gradient">{tx.heading2}</em>
          </h2>
          <p className="font-sans text-white/50 text-lg leading-relaxed">
            {tx.subtext}
          </p>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div
            className="flex justify-center py-12"
            data-ocid="packages.loading_state"
          >
            <Loader2 className="h-8 w-8 animate-spin text-sandhi-orange" />
          </div>
        )}

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {displayPackages.slice(0, 4).map((pkg, i) => (
            <div
              key={pkg.id.toString()}
              className="reveal"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <PackageCard pkg={pkg} index={i} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="reveal text-center mt-12">
          <button
            type="button"
            onClick={() => {
              const el = document.querySelector("#booking");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="group inline-flex items-center gap-2 font-sans font-semibold text-base transition-colors duration-200"
            style={{ color: "oklch(0.72 0.16 55)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "oklch(0.80 0.14 82)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "oklch(0.72 0.16 55)";
            }}
          >
            <span
              className="underline underline-offset-4"
              style={{ textDecorationColor: "oklch(0.62 0.18 45 / 0.4)" }}
            >
              {tx.viewAll}
            </span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </section>
  );
}
