import type { Testimonial } from "@/backend.d";
import { useLanguage } from "@/context/LanguageContext";
import { useActor } from "@/hooks/useActor";
import { t } from "@/translations";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { useEffect, useRef } from "react";

const fallbackTestimonials: Testimonial[] = [
  {
    id: BigInt(1),
    clientName: "Priya Sharma",
    location: "Mumbai, India",
    starRating: BigInt(5),
    reviewText:
      "The Heritage Walk through Jaipur was an absolutely magical experience. Our guide knew every stone's story, every forgotten corridor's secret. Sandhi Tourism transformed history into something I could feel.",
    avatarLabel: "PS",
  },
  {
    id: BigInt(2),
    clientName: "James Whitfield",
    location: "London, UK",
    starRating: BigInt(5),
    reviewText:
      "We did the Desert Safari package and it was the highlight of our entire year. Sleeping under the stars in Jaisalmer, watching the sunrise over the dunes — utterly breathtaking. Could not recommend more.",
    avatarLabel: "JW",
  },
  {
    id: BigInt(3),
    clientName: "Aiko Tanaka",
    location: "Tokyo, Japan",
    starRating: BigInt(5),
    reviewText:
      "The Luxury Stay in Udaipur exceeded every expectation. A palace hotel with personal butler, spa treatments, candlelit dinners by the lake. Sandhi's attention to detail is unmatched.",
    avatarLabel: "AT",
  },
  {
    id: BigInt(4),
    clientName: "Sofia Martínez",
    location: "Barcelona, Spain",
    starRating: BigInt(5),
    reviewText:
      "As a solo female traveler, I felt completely safe and cared for throughout the Cultural Tour. The team was professional, warm, and genuinely passionate about their country's heritage.",
    avatarLabel: "SM",
  },
  {
    id: BigInt(5),
    clientName: "Rajan Mehta",
    location: "New Delhi, India",
    starRating: BigInt(5),
    reviewText:
      "I've travelled with many agencies but Sandhi Tourism is in a completely different league. The itinerary was perfect, hotels were exceptional, and the hidden gems they showed us were once-in-a-lifetime.",
    avatarLabel: "RM",
  },
  {
    id: BigInt(6),
    clientName: "Rubina Shekh",
    location: "Surendranagar, Gujarat",
    starRating: BigInt(5),
    reviewText: "Great service good food and best hotel.",
    avatarLabel: "RS",
  },
  {
    id: BigInt(7),
    clientName: "Anish Amreliya",
    location: "Wakaner, Gujarat",
    starRating: BigInt(5),
    reviewText: "I am from wakaner best tour in India best food best work",
    avatarLabel: "AA",
  },
  {
    id: BigInt(8),
    clientName: "Nishar badi",
    location: "Surendranagar, Gujarat",
    starRating: BigInt(5),
    reviewText: "Best tour experience I've ever had.",
    avatarLabel: "NB",
  },
];

const AVATAR_COLORS = ["#c8640f", "#d4a017", "#8b5c2a", "#b87333", "#9c6b3c"];

function AvatarBubble({ label, index }: { label: string; index: number }) {
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
  return (
    <div
      className="relative w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 font-serif font-bold text-white text-lg"
      style={{
        background: `radial-gradient(circle at 35% 35%, ${color}cc, ${color}66)`,
        boxShadow: `0 4px 16px ${color}55, inset 0 1px 0 rgba(255,255,255,0.2)`,
      }}
    >
      {label}
      {/* 3D light spec */}
      <div
        className="absolute top-2 left-3 w-3 h-2 rounded-full opacity-40"
        style={{ background: "white" }}
      />
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: { testimonial: Testimonial; index: number }) {
  const stars = Number(testimonial.starRating);
  const ocidIndex = (index % 5) + 1;
  return (
    <article
      data-ocid={`testimonials.card.${ocidIndex}`}
      className="flex-shrink-0 w-80 md:w-96 p-6 rounded-2xl mx-3 group hover:-translate-y-1 transition-transform duration-300"
      style={{
        background: "rgba(30, 34, 52, 0.88)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(255,255,255,0.18)",
        borderRight: "1px solid rgba(255,255,255,0.07)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        borderLeft: "1px solid rgba(255,255,255,0.07)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={`star-${n}`}
            className={`h-3.5 w-3.5 ${n <= stars ? "fill-sandhi-gold text-sandhi-gold" : "text-white/15"}`}
          />
        ))}
      </div>

      {/* Review text */}
      <blockquote
        className="font-serif italic leading-relaxed mb-6 line-clamp-4"
        style={{
          color: "rgba(255,255,255,0.72)",
          fontSize: "0.9375rem",
        }}
      >
        "{testimonial.reviewText}"
      </blockquote>

      {/* Divider */}
      <div
        className="mb-4"
        style={{ height: "1px", background: "rgba(255,255,255,0.07)" }}
      />

      {/* Client */}
      <div className="flex items-center gap-3">
        <AvatarBubble label={testimonial.avatarLabel} index={index} />
        <div>
          <p className="font-sans font-semibold text-white text-sm leading-tight">
            {testimonial.clientName}
          </p>
          <p
            className="font-sans text-xs mt-0.5"
            style={{ color: "rgba(255,255,255,0.40)" }}
          >
            {testimonial.location}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function TestimonialsCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { actor, isFetching } = useActor();
  const { lang } = useLanguage();
  const tx = t[lang].testimonials;

  const { data: testimonials } = useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return fallbackTestimonials;
      try {
        const result = await actor.getAllTestimonials();
        return result.length > 0 ? result : fallbackTestimonials;
      } catch {
        return fallbackTestimonials;
      }
    },
    enabled: !!actor && !isFetching,
    placeholderData: fallbackTestimonials,
  });

  const displayTestimonials = testimonials ?? fallbackTestimonials;
  // Duplicate for infinite loop
  const doubled = [...displayTestimonials, ...displayTestimonials];

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
      id="testimonials"
      data-ocid="testimonials.section"
      ref={sectionRef}
      className="section-pad relative overflow-hidden"
      style={{ background: "oklch(0.97 0.005 80)" }}
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8640f' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Header */}
      <div className="reveal text-center max-w-2xl mx-auto mb-14 px-4">
        <span className="inline-block font-sans text-sandhi-orange text-sm font-semibold tracking-[0.2em] uppercase mb-4">
          {tx.label}
        </span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-sandhi-slate mb-4 leading-tight">
          {tx.heading1}
          <br />
          <em className="italic text-gradient">{tx.heading2}</em>
        </h2>
        <p className="font-sans text-sandhi-slate/60 text-base leading-relaxed">
          {tx.subtext}
        </p>
      </div>

      {/* Carousel — overflow hidden mask */}
      <div className="relative overflow-hidden">
        {/* Left fade — matches pearl section bg */}
        <div
          className="absolute left-0 top-0 bottom-0 w-20 md:w-40 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, oklch(0.97 0.005 80) 10%, transparent 100%)",
          }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-20 md:w-40 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, oklch(0.97 0.005 80) 10%, transparent 100%)",
          }}
        />

        {/* Scrolling track */}
        <div className="carousel-track flex py-4">
          {doubled.map((t, i) => (
            <TestimonialCard
              key={`testimonial-${t.id.toString()}-${i < displayTestimonials.length ? "a" : "b"}`}
              testimonial={t}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="reveal text-center mt-10">
        <div className="inline-flex items-center gap-2 font-sans text-sandhi-slate/60 text-sm">
          <span className="text-sandhi-gold font-bold text-base">★★★★★</span>
          <span>{tx.rating}</span>
        </div>
      </div>
    </section>
  );
}
