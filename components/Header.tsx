"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  Share2,
  Brain,
  Target,
  Video,
  Film,
  Clapperboard,
  Code2,
  Store,
  Smartphone,
} from "lucide-react";
import { useLang } from "@/lib/LanguageContext";

const SERVICE_DROPDOWN_KEYS = [
  {
    categoryKey: "marketing" as const,
    accent: "#FF419D",
    services: [
      { id: "social-media-management", icon: Share2 },
      { id: "ai-powered-marketing", icon: Brain },
      { id: "meta-ads-campaigns", icon: Target },
    ],
  },
  {
    categoryKey: "creative" as const,
    accent: "#FF953C",
    services: [
      { id: "video-filming", icon: Video },
      { id: "video-editing", icon: Film },
      { id: "ai-video-generation", icon: Clapperboard },
    ],
  },
  {
    categoryKey: "web" as const,
    accent: "#38BDF8",
    services: [
      { id: "custom-websites-nextjs", icon: Code2 },
      { id: "online-store-ecommerce", icon: Store },
      { id: "web-applications", icon: Smartphone },
    ],
  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { locale, setLocale, t } = useLang();
  const lastY = useRef(0);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navLinks = [
    { label: t.nav.work, href: "/work" },
    { label: t.nav.clients, href: "/clients" },
    { label: t.nav.about, href: "/about" },
    { label: t.faq.nav, href: "/faq" },
    { label: t.nav.contact, href: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setVisible(y < 80 ? true : y < lastY.current);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Close menus on Escape for keyboard users
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setServicesOpen(false);
        setMobileServicesOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const isServicesActive = pathname.startsWith("/services");

  const handleServicesEnter = () => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setServicesOpen(true);
  };
  const handleServicesLeave = () => {
    dropdownTimer.current = setTimeout(() => setServicesOpen(false), 150);
  };

  const handleCategoryClick = (categoryKey: string) => {
    setServicesOpen(false);
    setMobileOpen(false);
    if (pathname === "/services") {
      window.dispatchEvent(new CustomEvent("services:category", { detail: categoryKey }));
    } else {
      router.push(`/services#${categoryKey}`);
    }
  };

  const gradientText = (label: string) => (
    <span style={{ color: "#fff" }}>{label}</span>
  );

  const categoryIndexMap: Record<string, number> = { marketing: 0, creative: 1, web: 2 };
  const getServiceLabel = (id: string) =>
    t.servicesList.find((s) => s.id === id)?.title ?? id;
  const getCategoryLabel = (key: string) =>
    t.categoriesList[categoryIndexMap[key]]?.label ?? key;

  return (
    <>
      {/* ── Desktop floating pill ── */}
      <div
        className="fixed top-4 left-0 right-0 z-50 hidden lg:flex justify-center px-4"
        style={{
          transform: visible ? "translateY(0)" : "translateY(-120%)",
          transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <header
          className="relative flex items-center gap-2 px-3 py-2.5 rounded-[22px]"
          style={{
            background: scrolled
              ? "rgba(10,10,15,0.92)"
              : "rgba(10,10,15,0.78)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: scrolled
              ? "1px solid rgba(255,255,255,0.10)"
              : "1px solid rgba(255,255,255,0.07)",
            boxShadow: scrolled
              ? "0 8px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,183,108,0.06), inset 0 1px 0 rgba(255,255,255,0.06)"
              : "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 mr-2">
            <Image
              src="/aviva-digital-white-logo.png"
              alt="Aviva Digital"
              width={120}
              height={64}
              className="h-16 mt-2 w-auto object-contain"
            />
          </Link>

          <div className="w-px h-5 bg-white/[0.08] mx-1" />

          {/* Nav links */}
          <nav className="flex items-center gap-0.5">
            {/* Home link */}
            <Link
              href="/"
              className={`relative px-3.5 py-1.5 rounded-xl text-[13px] font-semibold tracking-[0.08em] uppercase transition-all duration-200 ${
                isActive("/")
                  ? "text-white"
                  : "text-white/45 hover:text-white/80"
              }`}
              style={
                isActive("/") ? { background: "linear-gradient(135deg, rgba(224,64,160,0.18), rgba(255,183,108,0.18))" } : {}
              }
            >
              {isActive("/") ? gradientText(t.nav.home) : t.nav.home}
            </Link>

            {/* Services with dropdown */}
            <div
              className="relative"
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <Link
                href="/services"
                onClick={() => setServicesOpen(false)}
                aria-haspopup="true"
                aria-expanded={servicesOpen}
                aria-controls="services-megamenu"
                className={`relative flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-[13px] font-semibold tracking-[0.08em] uppercase transition-all duration-200 ${
                  isServicesActive
                    ? "text-white"
                    : "text-white/45 hover:text-white/80"
                }`}
                style={
                  isServicesActive
                    ? { background: "linear-gradient(135deg, rgba(224,64,160,0.18), rgba(255,183,108,0.18))" }
                    : {}
                }
              >
                {isServicesActive
                  ? gradientText(t.nav.services)
                  : t.nav.services}
                <ChevronDown
                  size={11}
                  strokeWidth={2.5}
                  style={{
                    transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                />
              </Link>
            </div>

            {/* Regular nav links */}
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 rounded-xl text-[13px] font-semibold tracking-[0.08em] uppercase transition-all duration-200 ${
                    active ? "text-white" : "text-white/45 hover:text-white/80"
                  }`}
                  style={active ? { background: "linear-gradient(135deg, rgba(224,64,160,0.18), rgba(255,183,108,0.18))" } : {}}
                >
                  {active ? gradientText(link.label) : link.label}
                </Link>
              );
            })}
          </nav>

          <div className="w-px h-5 bg-white/[0.08] mx-1" />

          {/* Language switcher */}
          <div
            className="flex items-center gap-0.5 rounded-xl p-0.5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {(["bg", "en"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLocale(lang)}
                aria-pressed={locale === lang}
                aria-label={lang === "bg" ? "Български" : "English"}
                className={`relative px-3 py-1 rounded-[10px] text-[13px] font-bold tracking-widest uppercase transition-all duration-200 ${
                  locale === lang
                    ? "text-white"
                    : "text-white/30 hover:text-white/60"
                }`}
                style={
                  locale === lang
                    ? {
                        background:
                          "linear-gradient(135deg, rgba(224,64,160,0.25), rgba(255,183,108,0.25))",
                        boxShadow: "0 0 12px rgba(255,183,108,0.2)",
                      }
                    : {}
                }
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>


          {/* Dropdown — centered on header */}
          {servicesOpen && (
            <>
              {/* Invisible bridge */}
              <div
                className="absolute w-full h-3 z-40"
                style={{ top: "100%", left: 0 }}
                onMouseEnter={handleServicesEnter}
                onMouseLeave={handleServicesLeave}
              />
              <div
                id="services-megamenu"
                className="absolute w-[min(820px,calc(100vw-2rem))] rounded-2xl overflow-hidden z-50"
                style={{
                  top: "calc(100% + 16px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(8,8,12,0.98)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.11)",
                  boxShadow:
                    "0 24px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,183,108,0.07)",
                }}
                onMouseEnter={handleServicesEnter}
                onMouseLeave={handleServicesLeave}
              >
                <div
                  className="h-px w-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,183,108,0.5), rgba(224,64,160,0.4), transparent)",
                  }}
                />
                <div className="grid grid-cols-3 gap-0 p-7">
                  {SERVICE_DROPDOWN_KEYS.map((group) => (
                    <div key={group.categoryKey} className="px-4 flex flex-col">
                      <div
                        className="text-[11px] font-bold uppercase tracking-[0.16em] mb-4 pb-3 border-b whitespace-nowrap"
                        style={{
                          color: group.accent,
                          borderColor: `${group.accent}25`,
                        }}
                      >
                        {getCategoryLabel(group.categoryKey)}
                      </div>
                      <div className="flex flex-col gap-1 flex-1">
                        {group.services.map((svc) => {
                          const Icon = svc.icon;
                          return (
                            <button
                              key={svc.id}
                              onClick={() => handleCategoryClick(group.categoryKey)}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] text-white/75 hover:text-white hover:bg-white/[0.04] transition-all duration-150 group text-left"
                            >
                              <span
                                className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity"
                                style={{ background: `${group.accent}18` }}
                              >
                                <Icon
                                  size={14}
                                  style={{ color: group.accent }}
                                />
                              </span>
                              <span className="font-medium leading-snug">
                                {getServiceLabel(svc.id)}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      <button
                        onClick={() => handleCategoryClick(group.categoryKey)}
                        className="mt-3 px-3 py-2 text-[12px] font-semibold tracking-wide transition-colors duration-150 text-left"
                        style={{ color: `${group.accent}99` }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = group.accent)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = `${group.accent}99`)}
                      >
                        {t.seeAll}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </header>
      </div>

      {/* ── Mobile/Tablet header ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 lg:hidden"
        style={{
          transform: visible ? "translateY(0)" : "translateY(-110%)",
          transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
          background: "rgba(10,10,15,0.85)",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="flex items-center justify-between px-5 h-14">
          <Link href="/">
            <Image
              src="/aviva-digital-white-logo.png"
              alt="Aviva Digital"
              width={100}
              height={40}
              className="h-10 w-auto object-contain"
            />
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white/70 hover:text-white p-1.5 transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileOpen && (
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="px-5 pt-2 pb-7 flex flex-col gap-1"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            {/* Home */}
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 px-3 py-3 rounded-xl text-[14px] font-semibold tracking-[0.08em] uppercase transition-colors ${
                isActive("/") ? "text-white" : "text-white/55 hover:text-white"
              }`}
              style={
                isActive("/") ? { background: "linear-gradient(135deg, rgba(224,64,160,0.18), rgba(255,183,108,0.18))" } : {}
              }
            >
              {isActive("/") ? gradientText(t.nav.home) : t.nav.home}
              {isActive("/") && (
                <span
                  className="ml-auto w-1.5 h-1.5 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #E040A0, #FFB76C)",
                  }}
                />
              )}
            </Link>

            {/* Services accordion */}
            <div
              className={`flex items-center justify-between px-3 py-3 rounded-xl text-[14px] font-semibold tracking-[0.08em] uppercase transition-colors ${
                isServicesActive
                  ? "text-white"
                  : "text-white/55 hover:text-white"
              }`}
              style={
                isServicesActive ? { background: "linear-gradient(135deg, rgba(224,64,160,0.18), rgba(255,183,108,0.18))" } : {}
              }
            >
              <Link
                href="/services"
                onClick={() => setMobileOpen(false)}
                className="flex-1"
              >
                {isServicesActive
                  ? gradientText(t.nav.services)
                  : t.nav.services}
              </Link>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="p-1"
                aria-label={
                  mobileServicesOpen
                    ? "Collapse services"
                    : "Expand services"
                }
                aria-expanded={mobileServicesOpen}
                aria-controls="mobile-services-list"
              >
                <ChevronDown
                  size={14}
                  style={{
                    transform: mobileServicesOpen
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                />
              </button>
            </div>
            {mobileServicesOpen && (
              <div
                id="mobile-services-list"
                className="ml-3 mb-1 flex flex-col gap-0.5"
              >
                {SERVICE_DROPDOWN_KEYS.map((group) => (
                  <div key={group.categoryKey} className="mb-2">
                    <div
                      className="text-[10px] font-bold uppercase tracking-[0.14em] px-3 py-1 mb-1"
                      style={{ color: group.accent }}
                    >
                      {getCategoryLabel(group.categoryKey)}
                    </div>
                    {group.services.map((svc) => {
                      const Icon = svc.icon;
                      return (
                        <button
                          key={svc.id}
                          onClick={() => handleCategoryClick(group.categoryKey)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] text-white/50 hover:text-white transition-colors text-left"
                        >
                          <Icon size={13} style={{ color: group.accent }} />
                          {getServiceLabel(svc.id)}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}

            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-3 py-3 rounded-xl text-[14px] font-semibold tracking-[0.08em] uppercase transition-colors ${
                    active ? "text-white" : "text-white/55 hover:text-white"
                  }`}
                  style={active ? { background: "linear-gradient(135deg, rgba(224,64,160,0.18), rgba(255,183,108,0.18))" } : {}}
                >
                  {active ? gradientText(link.label) : link.label}
                  {active && (
                    <span
                      className="ml-auto w-1.5 h-1.5 rounded-full"
                      style={{
                        background: "linear-gradient(135deg, #E040A0, #FFB76C)",
                      }}
                    />
                  )}
                </Link>
              );
            })}

            <div
              className="flex items-center gap-3 mt-4 pt-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span className="text-white/30 text-[11px] uppercase tracking-widest">
                {t.language}
              </span>
              <div
                className="flex items-center gap-0.5 rounded-xl p-0.5"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {(["bg", "en"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLocale(lang)}
                    aria-pressed={locale === lang}
                    aria-label={lang === "bg" ? "Български" : "English"}
                    className={`px-4 py-1.5 rounded-[10px] text-[13px] font-bold tracking-widest uppercase transition-all duration-200 ${
                      locale === lang
                        ? "text-white"
                        : "text-white/30 hover:text-white/60"
                    }`}
                    style={
                      locale === lang
                        ? {
                            background:
                              "linear-gradient(135deg, rgba(224,64,160,0.25), rgba(255,183,108,0.25))",
                            boxShadow: "0 0 12px rgba(255,183,108,0.2)",
                          }
                        : {}
                    }
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white"
              style={{
                background: "linear-gradient(135deg, #E040A0, #FFB76C)",
              }}
            >
              {t.cta} <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
