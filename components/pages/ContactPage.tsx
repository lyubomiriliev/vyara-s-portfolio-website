"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowRight,
  Clock,
  MessageSquare,
  ChevronDown,
} from "lucide-react";
import {
  fadeUp,
  staggerContainer,
  scaleIn,
  slideInLeft,
} from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonPrimary } from "@/components/ui/ButtonPrimary";
import { Glow } from "@/components/ui/Glow";
import { services, categories } from "@/data/services";
import { useLang } from "@/lib/LanguageContext";

type FormStatus = "idle" | "loading" | "success" | "error";

const quickStatIcons = [Clock, MessageSquare, CheckCircle];

export default function ContactPage() {
  const { t } = useLang();
  const quickStats = t.contactQuickStats.map((s, i) => ({
    ...s,
    icon: quickStatIcons[i],
  }));
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const FORMSPREE_URL = "https://formspree.io/f/YOUR_FORM_ID";
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setFormStatus("success");
        form.reset();
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
      <section className="section-padding relative overflow-hidden">
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

        {/* Decorative image — right half, taller */}
        <div
          aria-hidden
          className="absolute top-0 right-0 w-[75%] h-full pointer-events-none hidden lg:block"
          style={{ zIndex: 1 }}
        >
          <img
            src="/background-images/working-wallpaper.png"
            alt=""
            className="w-full h-full object-cover object-center"
            style={{
              opacity: 0.55,
              maskImage:
                "linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 40%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskImage:
                "linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)",
            }}
          />
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto flex flex-col gap-6">
            {/* Form */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[24px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.09)",
                backdropFilter: "blur(16px)",
                padding: "40px",
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
                  className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #FFB76C, #E040A0)",
                    }}
                  >
                    <CheckCircle size={36} className="text-white" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white">
                    {t.contactForm.successTitle}
                  </h3>
                  <p className="text-white/60 text-sm max-w-xs">
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
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="mb-2">
                    <SectionLabel>{t.contactForm.label}</SectionLabel>
                    <h2 className="font-display font-bold text-2xl text-white mt-2">
                      {t.contactForm.title}
                    </h2>
                    <p className="text-white/50 text-sm mt-1">
                      {t.contactForm.sub}
                    </p>
                  </div>

                  {/* Name row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="firstName"
                        className="text-xs text-white/50 uppercase tracking-wider font-medium"
                      >
                        {t.contactForm.firstName} *
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        required
                        placeholder={t.contactForm.firstNamePlaceholder}
                        className="form-field"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="lastName"
                        className="text-xs text-white/50 uppercase tracking-wider font-medium"
                      >
                        {t.contactForm.lastName} *
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        required
                        placeholder={t.contactForm.lastNamePlaceholder}
                        className="form-field"
                      />
                    </div>
                  </div>

                  {/* Email */}
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
                      placeholder={t.contactForm.emailPlaceholder2}
                      className="form-field"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="phone"
                      className="text-xs text-white/50 uppercase tracking-wider font-medium"
                    >
                      {t.contactForm.phone}
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder={t.contactForm.phonePlaceholder}
                      className="form-field"
                    />
                  </div>

                  {/* Company */}
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
                      placeholder={t.contactForm.companyPlaceholder}
                      className="form-field"
                    />
                  </div>

                  {/* Service interest */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="service"
                      className="text-xs text-white/50 uppercase tracking-wider font-medium"
                    >
                      {t.contactForm.serviceInterest}
                    </label>
                    <div className="relative">
                      <select
                        id="service"
                        name="service"
                        className="form-field appearance-none pr-10"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          {t.contactForm.selectService}
                        </option>
                        {categories.map((cat) => (
                          <optgroup key={cat.id} label={cat.label}>
                            {services
                              .filter((s) => s.category === cat.id)
                              .map((s) => (
                                <option key={s.id} value={s.title}>
                                  {s.title}
                                </option>
                              ))}
                          </optgroup>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
                      />
                    </div>
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
                    className="self-start"
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
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {/* Brand card */}
              <div
                className="relative overflow-hidden rounded-[24px] flex flex-col gap-6"
                style={{
                  padding: "32px 32px 80px",
                  background:
                    "linear-gradient(135deg, rgba(224,64,160,0.1), rgba(155,89,245,0.08))",
                  border: "1px solid rgba(224,64,160,0.25)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none rounded-[24px]"
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
                  <img
                    src="/aviva-digital-white-logo.png"
                    alt="Aviva Digital"
                    className="h-14 w-auto mb-5"
                  />
                  <p className="text-white/60 text-sm leading-relaxed">
                    {t.contactForm.infoTagline}
                  </p>
                </div>
                {/* Ribbon */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-10 px-8 py-3 flex items-center"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(224,64,160,0.25) 0%, rgba(155,89,245,0.18) 100%)",
                    borderTop: "1px solid rgba(224,64,160,0.2)",
                  }}
                >
                  <span className="text-sm font-semibold text-white">
                    {t.contactForm.responseNote}
                  </span>
                </div>
              </div>

              {/* Contact details card */}
              <div
                className="glass-card p-8 flex flex-col gap-5"
                style={{ backdropFilter: "blur(16px)" }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
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
                      href="mailto:info@avivadigital.bg"
                      className="text-sm text-white hover:text-accent-pink transition-colors"
                    >
                      info@avivadigital.bg
                    </a>
                  </div>
                </div>

                <div className="h-px bg-white/[0.06]" />

                <div className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
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
                      className="text-sm text-white hover:text-accent-pink transition-colors"
                    >
                      +359 888 123 456
                    </a>
                  </div>
                </div>

                <div className="h-px bg-white/[0.06]" />

                <div className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
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
                    <p className="text-sm text-white">
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
