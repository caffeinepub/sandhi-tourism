import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/translations";
import { ChevronDown, MapPin, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, toggleLang } = useLanguage();
  const tx = t[lang].nav;

  const navLinks = [
    { label: tx.home, href: "#home" },
    { label: tx.tours, href: "#tours" },
    { label: tx.about, href: "#about" },
    { label: tx.testimonials, href: "#testimonials" },
    { label: tx.contact, href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-dark shadow-glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleNavClick("#home")}
          className="flex items-center gap-3 group"
          aria-label="Sandhi Tourism home"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-sandhi-orange/50 group-hover:ring-sandhi-orange transition-all duration-300">
            <img
              src="/assets/uploads/images-1.jpg"
              alt="Sandhi Tourism Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-white font-bold text-lg leading-tight">
              Sandhi
            </span>
            <span className="font-sans text-sandhi-gold text-[10px] font-medium tracking-[0.2em] uppercase leading-tight">
              Tourism
            </span>
          </div>
        </button>

        {/* Desktop nav */}
        <nav
          className="hidden lg:flex items-center gap-8"
          aria-label="Main navigation"
        >
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              type="button"
              data-ocid={`nav.link.${i + 1}`}
              onClick={() => handleNavClick(link.href)}
              className="text-white/80 hover:text-sandhi-gold text-sm font-medium transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-sandhi-gold group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>

        {/* Desktop right: Language toggle + Book Now */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language toggle pill */}
          <button
            type="button"
            data-ocid="nav.language_toggle.button"
            onClick={toggleLang}
            className="flex items-center overflow-hidden rounded-full text-xs font-semibold transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.15)",
              padding: "2px",
            }}
            aria-label="Toggle language"
          >
            <span
              className="px-3 py-1.5 rounded-full transition-all duration-300"
              style={{
                background:
                  lang === "en"
                    ? "linear-gradient(135deg, oklch(0.62 0.18 45), oklch(0.68 0.16 55))"
                    : "transparent",
                color: lang === "en" ? "white" : "rgba(255,255,255,0.5)",
                fontFamily: "var(--font-sans)",
              }}
            >
              EN
            </span>
            <span
              className="px-3 py-1.5 rounded-full transition-all duration-300"
              style={{
                background:
                  lang === "gu"
                    ? "linear-gradient(135deg, oklch(0.62 0.18 45), oklch(0.68 0.16 55))"
                    : "transparent",
                color: lang === "gu" ? "white" : "rgba(255,255,255,0.5)",
                fontFamily: "var(--font-sans)",
              }}
            >
              ગુ
            </span>
          </button>

          <Button
            data-ocid="nav.book_now.button"
            onClick={() => handleNavClick("#booking")}
            className="bg-sandhi-orange hover:bg-sandhi-orange/90 text-white font-semibold px-6 py-2.5 rounded-full shadow-orange hover:shadow-orange-lg transition-all duration-300 hover:-translate-y-0.5 border-0"
          >
            {tx.bookNow}
          </Button>
        </div>

        {/* Mobile menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              data-ocid="nav.mobile_menu.button"
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/10"
              aria-label="Open navigation menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            data-ocid="nav.sheet"
            side="right"
            className="w-72 border-l border-white/10 p-0"
            style={{ background: "oklch(0.2 0.04 260)", color: "white" }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-sandhi-orange/50">
                    <img
                      src="/assets/uploads/images-1.jpg"
                      alt="Sandhi Tourism"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="font-serif text-white font-bold text-base">
                      Sandhi
                    </span>
                    <span className="text-sandhi-gold text-[9px] font-medium tracking-[0.2em] uppercase">
                      Tourism
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile language toggle */}
              <div className="px-4 pt-4">
                <button
                  type="button"
                  data-ocid="nav.language_toggle.button"
                  onClick={toggleLang}
                  className="w-full flex items-center overflow-hidden rounded-full text-xs font-semibold transition-all duration-300 mb-1"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    padding: "2px",
                  }}
                  aria-label="Toggle language"
                >
                  <span
                    className="flex-1 py-2 rounded-full text-center transition-all duration-300"
                    style={{
                      background:
                        lang === "en"
                          ? "linear-gradient(135deg, oklch(0.62 0.18 45), oklch(0.68 0.16 55))"
                          : "transparent",
                      color: lang === "en" ? "white" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    English
                  </span>
                  <span
                    className="flex-1 py-2 rounded-full text-center transition-all duration-300"
                    style={{
                      background:
                        lang === "gu"
                          ? "linear-gradient(135deg, oklch(0.62 0.18 45), oklch(0.68 0.16 55))"
                          : "transparent",
                      color: lang === "gu" ? "white" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    ગુજરાતી
                  </span>
                </button>
              </div>

              {/* Nav links */}
              <nav
                className="flex flex-col gap-1 p-4 flex-1"
                aria-label="Mobile navigation"
              >
                {navLinks.map((link, i) => (
                  <button
                    key={link.href}
                    type="button"
                    data-ocid={`nav.link.${i + 1}`}
                    onClick={() => handleNavClick(link.href)}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-white/80 hover:text-white hover:bg-white/8 transition-all duration-200 text-left font-medium"
                  >
                    <MapPin className="h-4 w-4 text-sandhi-orange flex-shrink-0" />
                    {link.label}
                    <ChevronDown className="h-4 w-4 ml-auto text-white/30 -rotate-90" />
                  </button>
                ))}
              </nav>

              {/* CTA */}
              <div className="p-6 border-t border-white/10">
                <Button
                  data-ocid="nav.book_now.button"
                  onClick={() => handleNavClick("#booking")}
                  className="w-full bg-sandhi-orange hover:bg-sandhi-orange/90 text-white font-semibold rounded-full py-3 shadow-orange border-0"
                >
                  {tx.bookYourJourney}
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
