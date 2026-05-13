"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { fadeUp, scaleIn, slideInLeft } from "@/lib/animations";
import { ButtonPrimary } from "@/components/ui/ButtonPrimary";
import { Glow } from "@/components/ui/Glow";
import { useLang } from "@/lib/LanguageContext";

const STORAGE_KEY = "contact_page_draft";

type FormStatus = "idle" | "loading" | "success" | "error";

interface FieldState {
  name: string;
  phone: string;
  email: string;
  company: string;
  message: string;
  services: string[];
}

const EMPTY_FIELDS: FieldState = {
  name: "",
  phone: "",
  email: "",
  company: "",
  message: "",
  services: [],
};

function loadDraft(): FieldState {
  if (typeof window === "undefined") return EMPTY_FIELDS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...EMPTY_FIELDS, ...JSON.parse(raw) } : EMPTY_FIELDS;
  } catch {
    return EMPTY_FIELDS;
  }
}

export default function ContactPage() {
  const { t } = useLang();
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fields, setFields] = useState<FieldState>(EMPTY_FIELDS);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownRect, setDropdownRect] = useState<DOMRect | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  // Hydrate from localStorage after mount
  useEffect(() => {
    setFields(loadDraft());
  }, []);

  // Persist on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fields));
    } catch {}
  }, [fields]);

  const setField =
    (key: keyof Omit<FieldState, "services">) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((f) => ({ ...f, [key]: e.target.value }));

  const selectedServices = fields.services;

  const toggleService = (title: string) => {
    setFields((f) => ({
      ...f,
      services: f.services.includes(title)
        ? f.services.filter((s) => s !== title)
        : [...f.services, title],
    }));
  };

  const removeService = (title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFields((f) => ({
      ...f,
      services: f.services.filter((s) => s !== title),
    }));
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideTrigger = dropdownRef.current?.contains(target);
      const insidePortal = portalRef.current?.contains(target);
      if (!insideTrigger && !insidePortal) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!dropdownOpen) return;
    const updateRect = () => {
      if (triggerRef.current)
        setDropdownRect(triggerRef.current.getBoundingClientRect());
    };
    window.addEventListener("scroll", updateRect, true);
    window.addEventListener("resize", updateRect);
    return () => {
      window.removeEventListener("scroll", updateRect, true);
      window.removeEventListener("resize", updateRect);
    };
  }, [dropdownOpen]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("loading");
    setErrorMessage("");

    const formData = new FormData();
    formData.append("name", fields.name);
    formData.append("phone", fields.phone);
    formData.append("email", fields.email);
    if (fields.company) formData.append("company", fields.company);
    if (fields.services.length > 0)
      formData.append("services", fields.services.join(", "));
    formData.append("message", fields.message);

    try {
      const response = await fetch("https://formspree.io/f/xlgzjekl", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setFormStatus("success");
        setFields(EMPTY_FIELDS);
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {}
      } else {
        throw new Error("Failed to send message");
      }
    } catch {
      setFormStatus("error");
      setErrorMessage(t.contactForm.errorFull);
    }
  };

  return (
    <>
      {/* ── Main form + image + info ── */}
      <section className="pb-16 sm:pb-20 md:pb-24 relative">
        <Glow color="pink" size={700} className="top-1/2 left-1/4" />
        <Glow color="orange" size={400} className="bottom-0 right-1/3" />

        {/* Background dot grid */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="container relative z-10">
          <div className="max-w-5xl 3xl:max-w-6xl 4xl:max-w-7xl mx-auto flex flex-col gap-4 sm:gap-5 md:gap-6">
            {/* Form */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-4 sm:p-6 md:p-8 lg:p-10"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.09)",
                backdropFilter: "blur(16px)",
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-1/4 right-1/4 h-[1px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(224,64,160,0.6), transparent)",
                }}
              />

              {formStatus === "success" ? (
                <motion.div
                  variants={scaleIn}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col items-center justify-center gap-3 sm:gap-4 py-10 sm:py-12 md:py-16 text-center"
                >
                  <div
                    className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #FFB76C, #E040A0)",
                    }}
                  >
                    <CheckCircle size={36} className="text-white" />
                  </div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                    {t.contactForm.successTitle}
                  </h3>
                  <p className="text-white/60 text-sm sm:text-base max-w-xs">
                    {t.contactForm.successSub}
                  </p>
                  <button
                    onClick={() => setFormStatus("idle")}
                    className="text-sm text-accent-pink hover:text-white transition-colors mt-2 cursor-pointer flex items-center gap-1"
                  >
                    {t.contactForm.sendAnother} <ArrowRight size={14} />
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
                  <div className="mb-1 sm:mb-2">
                    <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl 3xl:text-4xl text-white mt-2">
                      {t.contactForm.title}
                    </h2>
                    <p className="text-white/50 text-sm sm:text-base mt-1">
                      {t.contactForm.sub}
                    </p>
                  </div>

                  {/* Row 1: Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="name"
                        className="text-xs text-white/50 uppercase tracking-wider font-medium"
                      >
                        {t.contactForm.fullName} *
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        value={fields.name}
                        onChange={setField("name")}
                        placeholder={t.contactForm.firstNamePlaceholder}
                        className="form-field"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="phone"
                        className="text-xs text-white/50 uppercase tracking-wider font-medium"
                      >
                        {t.contactForm.phone} *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={fields.phone}
                        onChange={setField("phone")}
                        placeholder={t.contactForm.phonePlaceholder}
                        className="form-field"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email + Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="email"
                        className="text-xs text-white/50 uppercase tracking-wider font-medium"
                      >
                        {t.contactForm.emailAddress} *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={fields.email}
                        onChange={setField("email")}
                        placeholder={t.contactForm.emailPlaceholder2}
                        className="form-field"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="company"
                        className="text-xs text-white/50 uppercase tracking-wider font-medium"
                      >
                        {t.contactForm.company}
                      </label>
                      <input
                        id="company"
                        name="company"
                        value={fields.company}
                        onChange={setField("company")}
                        placeholder={t.contactForm.companyPlaceholder}
                        className="form-field"
                      />
                    </div>
                  </div>

                  {/* Service interest — multi-select dropdown */}
                  <div
                    className="flex flex-col gap-1.5 relative"
                    ref={dropdownRef}
                  >
                    <label className="text-xs text-white/50 uppercase tracking-wider font-medium">
                      {t.contactForm.serviceInterest}
                    </label>

                    {/* Hidden inputs for form submission */}
                    {selectedServices.map((s) => (
                      <input key={s} type="hidden" name="service" value={s} />
                    ))}

                    {/* Trigger */}
                    <button
                      ref={triggerRef}
                      type="button"
                      onClick={() => {
                        if (triggerRef.current)
                          setDropdownRect(
                            triggerRef.current.getBoundingClientRect(),
                          );
                        setDropdownOpen((o) => !o);
                      }}
                      className="form-field flex items-center justify-between gap-2 text-left cursor-pointer"
                    >
                      <span
                        className={
                          selectedServices.length === 0
                            ? "text-white/30 text-sm"
                            : "text-white/80 text-sm"
                        }
                      >
                        {selectedServices.length === 0
                          ? t.contactForm.selectService
                          : `${selectedServices.length} ${selectedServices.length > 1 ? t.contactForm.servicesSelectedPlural : t.contactForm.servicesSelected}`}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`text-white/40 flex-shrink-0 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Selected tags — always rendered to reserve space and avoid layout shift */}
                    <div className="flex flex-wrap gap-2 min-h-[28px]">
                      {selectedServices.map((s) => (
                        <span
                          key={s}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(224,64,160,0.2), rgba(155,89,245,0.15))",
                            border: "1px solid rgba(224,64,160,0.4)",
                            color: "#fff",
                          }}
                        >
                          {s}
                          <button
                            type="button"
                            onClick={(e) => removeService(s, e)}
                            className="ml-0.5 text-white/50 hover:text-white transition-colors cursor-pointer"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>

                    {/* Dropdown rendered via portal so it escapes all stacking contexts */}
                    {typeof window !== "undefined" &&
                      dropdownRect &&
                      createPortal(
                        <motion.div
                          initial={false}
                          animate={
                            dropdownOpen
                              ? { opacity: 1, y: 0, pointerEvents: "auto" }
                              : { opacity: 0, y: -8, pointerEvents: "none" }
                          }
                          transition={{
                            duration: 0.22,
                            ease: [0.4, 0, 0.2, 1],
                          }}
                          style={{
                            position: "fixed",
                            top: dropdownRect.bottom + 4,
                            left: dropdownRect.left,
                            width: dropdownRect.width,
                            zIndex: 9999,
                          }}
                        >
                          <div
                            ref={portalRef}
                            className="rounded-[12px] overflow-hidden"
                            style={{
                              background: "rgba(18,18,26,0.97)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              backdropFilter: "blur(20px)",
                              boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
                            }}
                          >
                            {(() => {
                              const catIds: Record<string, string[]> = {
                                marketing: [
                                  "social-media-management",
                                  "ai-powered-marketing",
                                  "meta-ads-campaigns",
                                  "influencer-marketing",
                                  "email-marketing",
                                  "seo-optimization",
                                ],
                                creative: [
                                  "graphic-design-print",
                                  "graphic-design-digital",
                                  "video-filming",
                                  "video-editing",
                                  "ai-image-generation",
                                  "ai-video-generation",
                                ],
                                web: [
                                  "website-creation",
                                  "custom-websites-nextjs",
                                  "shopify-websites",
                                  "online-store-ecommerce",
                                  "web-applications",
                                  "saas-solutions",
                                ],
                              };
                              return t.categoriesList.map((cat, idx) => (
                                <div key={cat.id}>
                                  {idx > 0 && (
                                    <div className="h-px bg-white/[0.06]" />
                                  )}
                                  <div className="px-3 pt-3 pb-1">
                                    <span className="text-[10px] uppercase tracking-widest text-white/30 font-semibold">
                                      {cat.label}
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 px-3 pb-2">
                                    {t.servicesList
                                      .filter((s) =>
                                        catIds[cat.id]?.includes(s.id),
                                      )
                                      .map((s) => {
                                        const active =
                                          selectedServices.includes(s.title);
                                        return (
                                          <button
                                            key={s.id}
                                            type="button"
                                            onClick={() =>
                                              toggleService(s.title)
                                            }
                                            className="flex items-center justify-between gap-1 px-3 py-2 rounded-lg text-xs transition-colors duration-150 cursor-pointer text-left"
                                            style={{
                                              color: active
                                                ? "#fff"
                                                : "rgba(255,255,255,0.6)",
                                              background: active
                                                ? "rgba(224,64,160,0.15)"
                                                : "rgba(255,255,255,0.03)",
                                              border: active
                                                ? "1px solid rgba(224,64,160,0.35)"
                                                : "1px solid rgba(255,255,255,0.06)",
                                            }}
                                            onMouseEnter={(e) => {
                                              if (!active)
                                                (
                                                  e.currentTarget as HTMLButtonElement
                                                ).style.background =
                                                  "rgba(255,255,255,0.07)";
                                            }}
                                            onMouseLeave={(e) => {
                                              if (!active)
                                                (
                                                  e.currentTarget as HTMLButtonElement
                                                ).style.background =
                                                  "rgba(255,255,255,0.03)";
                                            }}
                                          >
                                            <span className="leading-snug text-[14px]">
                                              {s.title}
                                            </span>
                                            {active && (
                                              <span className="text-accent-pink text-sm leading-none flex-shrink-0">
                                                ✓
                                              </span>
                                            )}
                                          </button>
                                        );
                                      })}
                                  </div>
                                  <div className="pb-1" />
                                </div>
                              ));
                            })()}
                          </div>
                        </motion.div>,
                        document.body,
                      )}
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="message"
                      className="text-xs text-white/50 uppercase tracking-wider font-medium"
                    >
                      {t.contactForm.message} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={fields.message}
                      onChange={setField("message")}
                      placeholder={t.contactForm.messagePlaceholder}
                      className="form-field resize-none"
                    />
                  </div>

                  {formStatus === "error" && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle size={16} />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <ButtonPrimary
                    type="submit"
                    size="md"
                    className="self-stretch sm:self-start flex-wrap justify-center"
                    disabled={formStatus === "loading"}
                  >
                    {formStatus === "loading" ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        {t.contactForm.sending}
                      </>
                    ) : (
                      <>
                        {t.contactForm.submit} <ArrowRight size={16} />
                      </>
                    )}
                  </ButtonPrimary>
                </form>
              )}
            </motion.div>

            {/* Bottom info row — brand card + contact details */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6"
            >
              {/* Brand card */}
              <div
                className="relative overflow-hidden rounded-[16px] sm:rounded-[20px] md:rounded-[24px] flex flex-col gap-4 sm:gap-5 md:gap-6 px-5 pt-5 pb-16 sm:px-6 sm:pt-6 sm:pb-20 md:px-8 md:pt-8 md:pb-20"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(224,64,160,0.1), rgba(155,89,245,0.08))",
                  border: "1px solid rgba(224,64,160,0.25)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none rounded-[16px] sm:rounded-[20px] md:rounded-[24px]"
                  style={{
                    background:
                      "radial-gradient(ellipse 90% 70% at 50% 110%, rgba(224,64,160,0.12) 0%, transparent 70%)",
                  }}
                />
                <div
                  className="absolute top-0 left-1/4 right-1/4 h-[1px]"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(224,64,160,0.7), transparent)",
                  }}
                />
                <div className="relative z-10">
                  <Image
                    src="/aviva-digital-white-logo.png"
                    alt="Aviva Digital"
                    width={140}
                    height={56}
                    className="h-10 sm:h-12 md:h-14 w-auto mb-3 sm:mb-4 md:mb-5"
                  />
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                    {t.contactForm.infoTagline}
                  </p>
                </div>
                {/* Ribbon */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-10 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 flex items-center flex-wrap gap-2"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(224,64,160,0.25) 0%, rgba(155,89,245,0.18) 100%)",
                    borderTop: "1px solid rgba(224,64,160,0.2)",
                  }}
                >
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    {t.contactForm.responseNote}
                  </span>
                </div>
              </div>

              {/* Contact details card */}
              <div
                className="glass-card p-5 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-5"
                style={{ backdropFilter: "blur(16px)" }}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,183,108,0.15), rgba(224,64,160,0.15))",
                      border: "1px solid rgba(224,64,160,0.2)",
                    }}
                  >
                    <Mail size={18} className="text-accent-pink" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">
                      {t.contactForm.emailLabel}
                    </p>
                    <a
                      href="mailto:office@avivadigital.bg"
                      className="text-sm sm:text-base text-white hover:text-accent-pink transition-colors break-all"
                    >
                      office@avivadigital.bg
                    </a>
                  </div>
                </div>

                <div className="h-px bg-white/[0.06]" />

                <div className="flex items-center gap-3 sm:gap-4">
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,183,108,0.15), rgba(224,64,160,0.15))",
                      border: "1px solid rgba(224,64,160,0.2)",
                    }}
                  >
                    <Phone size={18} className="text-accent-pink" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">
                      {t.contactForm.phoneLabel}
                    </p>
                    <a
                      href="tel:+359888123456"
                      className="text-sm sm:text-base text-white hover:text-accent-pink transition-colors"
                    >
                      +359 886 66 20 20
                    </a>
                  </div>
                </div>

                <div className="h-px bg-white/[0.06]" />

                <div className="flex items-center gap-3 sm:gap-4">
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,183,108,0.15), rgba(224,64,160,0.15))",
                      border: "1px solid rgba(224,64,160,0.2)",
                    }}
                  >
                    <MapPin size={18} className="text-accent-pink" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">
                      {t.contactForm.locationLabel}
                    </p>
                    <p className="text-sm sm:text-base text-white">
                      {t.contactForm.location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
