import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/context/LanguageContext";
import { useActor } from "@/hooks/useActor";
import { t } from "@/translations";
import {
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Mail,
  MapPin,
  Minus,
  Phone,
  Plus,
  User,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface BookingData {
  destination: string;
  specialRequests: string;
  travelDate: string;
  groupSize: number;
  name: string;
  email: string;
  phone: string;
}

const EMPTY_BOOKING: BookingData = {
  destination: "",
  specialRequests: "",
  travelDate: "",
  groupSize: 2,
  name: "",
  email: "",
  phone: "",
};

export default function BookingWidget() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState<BookingData>(EMPTY_BOOKING);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { actor } = useActor();
  const { lang } = useLanguage();
  const tx = t[lang].booking;

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

  const update = <K extends keyof BookingData>(
    key: K,
    value: BookingData[K],
  ) => {
    setBooking((prev) => ({ ...prev, [key]: value }));
  };

  const canNext = () => {
    if (step === 1) return booking.destination.trim() !== "";
    if (step === 2)
      return booking.travelDate.trim() !== "" && booking.groupSize > 0;
    if (step === 3)
      return (
        booking.name.trim() !== "" &&
        booking.email.trim() !== "" &&
        booking.phone.trim() !== ""
      );
    return true;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      if (actor) {
        const id = await actor.submitBooking({
          customerName: booking.name,
          destinationName: booking.destination,
          email: booking.email,
          travelDate: booking.travelDate,
          phone: booking.phone,
          groupSize: BigInt(booking.groupSize),
          specialRequests: booking.specialRequests || undefined,
        });
        setBookingId(`STB-${id.toString().padStart(6, "0")}`);
      } else {
        // Fallback without backend
        await new Promise((r) => setTimeout(r, 1200));
        setBookingId(
          `STB-${String(Math.floor(Math.random() * 900000) + 100000)}`,
        );
      }
      setStep(4);
    } catch {
      setError(tx.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setBooking(EMPTY_BOOKING);
    setBookingId(null);
    setError(null);
  };

  const steps = [
    { num: 1, label: tx.step1Label },
    { num: 2, label: tx.step2Label },
    { num: 3, label: tx.step3Label },
  ];

  return (
    <section
      id="booking"
      data-ocid="booking.section"
      ref={sectionRef}
      className="section-pad relative overflow-hidden"
      style={{ background: "oklch(0.22 0.04 260)" }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 left-0 w-full h-1"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.62 0.18 45), oklch(0.75 0.14 85), oklch(0.62 0.18 45))",
        }}
      />
      <div
        className="absolute top-1/2 right-0 w-96 h-96 rounded-full opacity-8 blur-3xl pointer-events-none -translate-y-1/2"
        style={{ background: "oklch(0.62 0.18 45)" }}
      />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="reveal text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block font-sans text-sandhi-orange text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            {tx.label}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {tx.heading1}
            <br />
            <em className="italic text-gradient">{tx.heading2}</em>
          </h2>
          <p className="font-sans text-white/50 text-base leading-relaxed">
            {tx.subtext}
          </p>
        </div>

        {/* Widget */}
        <div
          className="reveal max-w-2xl mx-auto rounded-3xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
          }}
        >
          {step < 4 && (
            <>
              {/* Step indicator */}
              <div className="px-8 pt-8 pb-6 border-b border-white/8">
                <div className="flex items-center justify-between relative">
                  {/* Progress line */}
                  <div
                    className="absolute top-1/2 left-6 right-6 h-0.5 -translate-y-1/2"
                    style={{ background: "rgba(255,255,255,0.1)" }}
                  />
                  <div
                    className="absolute top-1/2 left-6 h-0.5 -translate-y-1/2 transition-all duration-500"
                    style={{
                      background:
                        "linear-gradient(90deg, oklch(0.62 0.18 45), oklch(0.75 0.14 85))",
                      width: `${((step - 1) / 2) * 100}%`,
                    }}
                  />

                  {steps.map((s) => (
                    <div
                      key={s.num}
                      className="relative z-10 flex flex-col items-center gap-2"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-sans font-bold text-sm transition-all duration-300 ${
                          step > s.num
                            ? "bg-sandhi-gold text-sandhi-slate"
                            : step === s.num
                              ? "bg-sandhi-orange text-white shadow-orange"
                              : "bg-white/10 text-white/40"
                        }`}
                      >
                        {step > s.num ? <Check className="h-4 w-4" /> : s.num}
                      </div>
                      <span
                        className={`font-sans text-xs font-medium hidden sm:block transition-colors duration-300 ${
                          step === s.num ? "text-sandhi-gold" : "text-white/40"
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form panels */}
              <div className="p-8">
                {/* Step 1 */}
                {step === 1 && (
                  <div data-ocid="booking.step1.panel" className="space-y-6">
                    <h3 className="font-serif text-2xl font-bold text-white mb-6">
                      {tx.step1Heading}
                    </h3>

                    <div className="space-y-2">
                      <Label className="text-white/70 font-sans text-sm font-medium flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-sandhi-orange" />
                        {tx.destination}
                      </Label>
                      <Select
                        value={booking.destination}
                        onValueChange={(v) => update("destination", v)}
                      >
                        <SelectTrigger
                          data-ocid="booking.destination.select"
                          className="bg-white/8 border-white/15 text-white rounded-xl h-12 font-sans focus:ring-sandhi-orange focus:border-sandhi-orange"
                        >
                          <SelectValue placeholder={tx.selectPlaceholder} />
                        </SelectTrigger>
                        <SelectContent className="bg-sandhi-slate border-white/15 text-white">
                          {tx.destinations.map((d) => (
                            <SelectItem
                              key={d}
                              value={d}
                              className="text-white/90 hover:bg-white/10 focus:bg-white/10 focus:text-white"
                            >
                              {d}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white/70 font-sans text-sm font-medium">
                        {tx.specialRequests}
                      </Label>
                      <Textarea
                        placeholder={tx.specialRequestsPlaceholder}
                        value={booking.specialRequests}
                        onChange={(e) =>
                          update("specialRequests", e.target.value)
                        }
                        className="bg-white border-white/20 text-gray-900 placeholder:text-gray-400 rounded-xl font-sans resize-none focus:ring-sandhi-orange focus:border-sandhi-orange"
                        style={{ color: "#111827" }}
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <div data-ocid="booking.step2.panel" className="space-y-6">
                    <h3 className="font-serif text-2xl font-bold text-white mb-6">
                      {tx.step2Heading}
                    </h3>

                    <div className="space-y-2">
                      <Label className="text-white/70 font-sans text-sm font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-sandhi-orange" />
                        {tx.travelDate}
                      </Label>
                      <Input
                        data-ocid="booking.date.input"
                        type="date"
                        value={booking.travelDate}
                        onChange={(e) => update("travelDate", e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="bg-white border-white/20 text-gray-900 rounded-xl h-12 font-sans focus:ring-sandhi-orange focus:border-sandhi-orange [color-scheme:light]"
                        style={{ color: "#111827" }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white/70 font-sans text-sm font-medium flex items-center gap-2">
                        <Users className="h-4 w-4 text-sandhi-orange" />
                        {tx.groupSize}
                      </Label>
                      <div
                        data-ocid="booking.groupsize.input"
                        className="flex items-center gap-4"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            update(
                              "groupSize",
                              Math.max(1, booking.groupSize - 1),
                            )
                          }
                          className="w-11 h-11 rounded-full flex items-center justify-center bg-white/10 hover:bg-sandhi-orange text-white transition-colors duration-200 border border-white/20 hover:border-sandhi-orange"
                          aria-label="Decrease group size"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <div className="flex-1 text-center">
                          <span className="font-serif text-4xl font-bold text-white">
                            {booking.groupSize}
                          </span>
                          <span className="font-sans text-white/50 text-sm block mt-0.5">
                            {booking.groupSize === 1 ? tx.person : tx.people}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            update(
                              "groupSize",
                              Math.min(20, booking.groupSize + 1),
                            )
                          }
                          className="w-11 h-11 rounded-full flex items-center justify-center bg-white/10 hover:bg-sandhi-orange text-white transition-colors duration-200 border border-white/20 hover:border-sandhi-orange"
                          aria-label="Increase group size"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="font-sans text-white/30 text-xs mt-2">
                        {tx.largeGroup}
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 3 */}
                {step === 3 && (
                  <div data-ocid="booking.step3.panel" className="space-y-5">
                    <h3 className="font-serif text-2xl font-bold text-white mb-6">
                      {tx.step3Heading}
                    </h3>

                    <div className="space-y-2">
                      <Label className="text-white/70 font-sans text-sm font-medium flex items-center gap-2">
                        <User className="h-4 w-4 text-sandhi-orange" />
                        {tx.fullName}
                      </Label>
                      <Input
                        data-ocid="booking.name.input"
                        type="text"
                        placeholder={tx.fullNamePlaceholder}
                        value={booking.name}
                        onChange={(e) => update("name", e.target.value)}
                        autoComplete="name"
                        className="bg-white border-white/20 text-gray-900 placeholder:text-gray-400 rounded-xl h-12 font-sans focus:ring-sandhi-orange focus:border-sandhi-orange"
                        style={{ color: "#111827" }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white/70 font-sans text-sm font-medium flex items-center gap-2">
                        <Mail className="h-4 w-4 text-sandhi-orange" />
                        {tx.email}
                      </Label>
                      <Input
                        data-ocid="booking.email.input"
                        type="email"
                        placeholder={tx.emailPlaceholder}
                        value={booking.email}
                        onChange={(e) => update("email", e.target.value)}
                        autoComplete="email"
                        className="bg-white border-white/20 text-gray-900 placeholder:text-gray-400 rounded-xl h-12 font-sans focus:ring-sandhi-orange focus:border-sandhi-orange"
                        style={{ color: "#111827" }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white/70 font-sans text-sm font-medium flex items-center gap-2">
                        <Phone className="h-4 w-4 text-sandhi-orange" />
                        {tx.phone}
                      </Label>
                      <Input
                        data-ocid="booking.phone.input"
                        type="tel"
                        placeholder={tx.phonePlaceholder}
                        value={booking.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        autoComplete="tel"
                        className="bg-white border-white/20 text-gray-900 placeholder:text-gray-400 rounded-xl h-12 font-sans focus:ring-sandhi-orange focus:border-sandhi-orange"
                        style={{ color: "#111827" }}
                      />
                    </div>

                    {/* Booking summary */}
                    <div
                      className="mt-6 p-4 rounded-xl space-y-2"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <p className="font-sans text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">
                        {tx.summary}
                      </p>
                      <div className="flex justify-between text-sm font-sans">
                        <span className="text-white/60">
                          {tx.destinationLabel}
                        </span>
                        <span className="text-white font-medium">
                          {booking.destination}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm font-sans">
                        <span className="text-white/60">
                          {tx.travelDateLabel}
                        </span>
                        <span className="text-white font-medium">
                          {booking.travelDate
                            ? new Date(booking.travelDate).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                },
                              )
                            : "—"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm font-sans">
                        <span className="text-white/60">
                          {tx.groupSizeLabel}
                        </span>
                        <span className="text-white font-medium">
                          {booking.groupSize}{" "}
                          {booking.groupSize === 1 ? tx.person : tx.people}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div
                    data-ocid="booking.error_state"
                    className="mt-4 p-3 rounded-xl text-red-300 text-sm font-sans flex items-center gap-2"
                    style={{
                      background: "rgba(220,60,60,0.12)",
                      border: "1px solid rgba(220,60,60,0.2)",
                    }}
                  >
                    {error}
                  </div>
                )}

                {/* Navigation */}
                <div className="flex items-center gap-3 mt-8">
                  {step > 1 && (
                    <Button
                      data-ocid="booking.back.button"
                      variant="outline"
                      onClick={() => setStep((p) => p - 1)}
                      className="flex-1 h-12 rounded-xl border-white/20 text-white hover:bg-white/8 bg-transparent font-semibold"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      {tx.back}
                    </Button>
                  )}

                  {step < 3 && (
                    <Button
                      data-ocid="booking.next.button"
                      onClick={() => setStep((p) => p + 1)}
                      disabled={!canNext()}
                      className="flex-1 h-12 rounded-xl bg-sandhi-orange hover:bg-sandhi-orange/90 text-white font-semibold shadow-orange border-0 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {tx.continue}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  )}

                  {step === 3 && (
                    <Button
                      data-ocid="booking.submit.button"
                      onClick={handleSubmit}
                      disabled={!canNext() || isSubmitting}
                      className="flex-1 h-12 rounded-xl bg-sandhi-orange hover:bg-sandhi-orange/90 text-white font-semibold shadow-orange border-0 disabled:opacity-40"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          {tx.confirming}
                        </>
                      ) : (
                        <>
                          {tx.confirmBooking}
                          <Check className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Success state */}
          {step === 4 && (
            <div data-ocid="booking.success_state" className="p-10 text-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.62 0.18 45), oklch(0.75 0.14 85))",
                }}
              >
                <Check className="h-10 w-10 text-white" strokeWidth={3} />
              </div>
              <h3 className="font-serif text-3xl font-bold text-white mb-3">
                {tx.successHeading}
              </h3>
              <p className="font-sans text-white/60 text-base mb-6 leading-relaxed">
                {tx.back === "Back" ? "Thank you, " : "આભાર, "}
                <span className="text-sandhi-gold font-semibold">
                  {booking.name}
                </span>
                {tx.successText}
              </p>
              <div
                className="inline-block px-6 py-3 rounded-xl mb-8"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <p className="font-sans text-white/50 text-xs uppercase tracking-widest mb-1">
                  {tx.bookingRef}
                </p>
                <p className="font-serif text-2xl font-bold text-sandhi-gold">
                  {bookingId}
                </p>
              </div>
              <br />
              <Button
                onClick={resetForm}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent rounded-xl font-semibold"
              >
                {tx.bookAnother}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
