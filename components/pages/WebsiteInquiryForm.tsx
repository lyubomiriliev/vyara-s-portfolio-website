"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Loader2,
  Check,
} from "lucide-react";
import { useLang } from "@/lib/LanguageContext";

type FormStatus = "idle" | "loading" | "success" | "error";

const STORAGE_KEY = "website_inquiry_draft";

interface FieldState {
  websiteType: string;
  features: string[];
  timeline: string;
  pages: string;
  hasContent: string;
  industry: string;
  reference: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  details: string;
}

const EMPTY_FIELDS: FieldState = {
  websiteType: "",
  features: [],
  timeline: "",
  pages: "",
  hasContent: "",
  industry: "",
  reference: "",
  name: "",
  email: "",
  phone: "",
  company: "",
  details: "",
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

export function WebsiteInquiryForm() {
  const { t } = useLang();
  const wi = t.websiteInquiry;

  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [fields, setFields] = useState<FieldState>(EMPTY_FIELDS);

  // Hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    setFields(loadDraft());
  }, []);

  // Persist on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fields));
    } catch {}
  }, [fields]);

  const {
    websiteType,
    features,
    timeline,
    pages,
    hasContent,
    industry,
    reference,
    name,
    email,
    phone,
    company,
    details,
  } = fields;

  const setField =
    <K extends keyof FieldState>(key: K) =>
    (value: FieldState[K]) =>
      setFields((f) => ({ ...f, [key]: value }));

  const setWebsiteType = setField("websiteType");
  const setTimeline = setField("timeline");
  const setPages = setField("pages");
  const setHasContent = setField("hasContent");

  const setText =
    (key: keyof FieldState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((f) => ({ ...f, [key]: e.target.value }));

  const toggleFeature = (id: string) =>
    setFields((f) => ({
      ...f,
      features: f.features.includes(id)
        ? f.features.filter((x) => x !== id)
        : [...f.features, id],
    }));

  // Resolve an option id to its localized title for a readable submission
  const labelFor = (
    list: ReadonlyArray<{ id: string; title: string }>,
    id: string,
  ) => list.find((o) => o.id === id)?.title ?? id;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("loading");
    setErrorMessage("");

    const formData = new FormData();
    formData.append("_subject", "New website inquiry — Aviva Digital");
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("website_type", labelFor(wi.types, websiteType));
    if (industry) formData.append("industry", industry);
    if (features.length > 0)
      formData.append(
        "features",
        features.map((id) => labelFor(wi.features, id)).join(", "),
      );
    if (timeline) formData.append("timeline", labelFor(wi.timelines, timeline));
    if (pages) formData.append("pages", labelFor(wi.pages, pages));
    if (hasContent)
      formData.append("has_content", labelFor(wi.hasContent, hasContent));
    if (reference) formData.append("reference", reference);
    if (company) formData.append("company", company);
    formData.append("message", details);

    try {
      const response = await fetch("https://formspree.io/f/xlgzjekl", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        setFormStatus("success");
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {}
      } else {
        throw new Error("Failed to send inquiry");
      }
    } catch {
      setFormStatus("error");
      setErrorMessage(wi.errorFull);
    }
  };

  return (
    <section className="relative section-padding overflow-hidden">
      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-5xl mx-auto text-center mb-10 sm:mb-12 md:mb-14"
        >
          <span
            className="inline-block text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase mb-6"
            style={{ color: "#f472b6" }}
          >
            {wi.label}
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl 3xl:text-[5.5rem] text-white leading-[1.05] mb-6">
            {wi.title}{" "}
            <span className="text-gradient-warm">{wi.titleAccent}</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            {wi.sub}
          </p>
        </motion.div>

        {/* Form */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="relative rounded-[20px] sm:rounded-[28px] p-5 sm:p-8 md:p-10 lg:p-12"
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
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-4 py-12 sm:py-16 text-center"
              >
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #FFB76C, #E040A0)",
                  }}
                >
                  <CheckCircle size={36} className="text-white" />
                </div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                  {wi.successTitle}
                </h3>
                <p className="text-white/60 text-base sm:text-lg max-w-sm">
                  {wi.successSub}
                </p>
                <button
                  onClick={() => {
                    setFormStatus("idle");
                    setFields(EMPTY_FIELDS);
                  }}
                  className="text-base text-accent-pink hover:text-white transition-colors mt-2 cursor-pointer flex items-center gap-1"
                >
                  {wi.sendAnother}
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 sm:gap-8"
              >
                {/* 1. Website type — card selector */}
                <Fieldset
                  label={wi.typeLabel}
                  required
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
                    {wi.types.map((opt) => {
                      const active = websiteType === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setWebsiteType(opt.id)}
                          className="relative text-left rounded-xl p-3.5 sm:p-4 transition-all duration-200 cursor-pointer"
                          style={{
                            background: active
                              ? "rgba(224,64,160,0.12)"
                              : "rgba(255,255,255,0.03)",
                            border: active
                              ? "1px solid rgba(224,64,160,0.45)"
                              : "1px solid rgba(255,255,255,0.07)",
                          }}
                        >
                          <span
                            className="block text-base sm:text-lg font-semibold leading-tight"
                            style={{
                              color: active ? "#fff" : "rgba(255,255,255,0.85)",
                            }}
                          >
                            {opt.title}
                          </span>
                          <span className="block text-xs sm:text-sm mt-1 text-white/45 leading-snug">
                            {opt.desc}
                          </span>
                          {active && (
                            <span className="absolute top-3 right-3 text-accent-pink">
                              <Check size={16} strokeWidth={3} />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </Fieldset>

                {/* 2. Industry */}
                <Fieldset label={wi.industryLabel}>
                  <input
                    value={industry}
                    onChange={setText("industry")}
                    placeholder={wi.industryPlaceholder}
                    className="form-field min-h-[48px] text-base"
                  />
                </Fieldset>

                {/* 3. Features — chip multi-select */}
                <Fieldset label={wi.featuresLabel}>
                  <div className="flex flex-wrap gap-2.5">
                    {wi.features.map((opt) => {
                      const active = features.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => toggleFeature(opt.id)}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-200 cursor-pointer"
                          style={{
                            background: active
                              ? "linear-gradient(135deg, rgba(224,64,160,0.22), rgba(155,89,245,0.16))"
                              : "rgba(255,255,255,0.03)",
                            border: active
                              ? "1px solid rgba(224,64,160,0.45)"
                              : "1px solid rgba(255,255,255,0.08)",
                            color: active ? "#fff" : "rgba(255,255,255,0.6)",
                          }}
                        >
                          {active && <Check size={14} strokeWidth={3} />}
                          {opt.title}
                        </button>
                      );
                    })}
                  </div>
                </Fieldset>

                {/* 4. Number of pages */}
                <Fieldset label={wi.pagesLabel}>
                  <PillGroup
                    options={wi.pages}
                    value={pages}
                    onChange={setPages}
                  />
                </Fieldset>

                {/* 5. Existing content */}
                <Fieldset label={wi.hasContentLabel}>
                  <PillGroup
                    options={wi.hasContent}
                    value={hasContent}
                    onChange={setHasContent}
                  />
                </Fieldset>

                {/* 6. Estimated timeline */}
                <Fieldset label={wi.timelineLabel}>
                  <PillGroup
                    options={wi.timelines}
                    value={timeline}
                    onChange={setTimeline}
                  />
                </Fieldset>

                {/* 7. Reference site */}
                <Fieldset label={wi.referenceLabel}>
                  <input
                    value={reference}
                    onChange={setText("reference")}
                    placeholder={wi.referencePlaceholder}
                    className="form-field min-h-[48px] text-base"
                  />
                </Fieldset>

                <div
                  className="h-px w-full"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                />

                {/* 8. Contact details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  <Fieldset label={wi.nameLabel} required>
                    <input
                      required
                      value={name}
                      onChange={setText("name")}
                      placeholder={wi.namePlaceholder}
                      className="form-field min-h-[48px] text-base"
                    />
                  </Fieldset>
                  <Fieldset label={wi.emailLabel} required>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={setText("email")}
                      placeholder={wi.emailPlaceholder}
                      className="form-field min-h-[48px] text-base"
                    />
                  </Fieldset>
                  <Fieldset label={wi.phoneLabel} required>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={setText("phone")}
                      placeholder={wi.phonePlaceholder}
                      className="form-field min-h-[48px] text-base"
                    />
                  </Fieldset>
                </div>

                {/* 9. Company */}
                <Fieldset label={wi.companyLabel}>
                  <input
                    value={company}
                    onChange={setText("company")}
                    placeholder={wi.companyPlaceholder}
                    className="form-field min-h-[48px] text-base"
                  />
                </Fieldset>

                {/* 7. Details */}
                <Fieldset label={wi.detailsLabel}>
                  <textarea
                    rows={4}
                    value={details}
                    onChange={setText("details")}
                    placeholder={wi.detailsPlaceholder}
                    className="form-field resize-none text-base"
                  />
                </Fieldset>

                {formStatus === "error" && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle size={16} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === "loading" || !websiteType}
                  className="self-stretch sm:self-start inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base sm:text-lg font-semibold text-white transition-opacity duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background:
                      "linear-gradient(135deg, #FFB76C 0%, #E040A0 55%, #9B59F5 100%)",
                  }}
                >
                  {formStatus === "loading" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      {wi.sending}
                    </>
                  ) : (
                    <>
                      {wi.submit} <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function Fieldset({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-sm text-white/55 uppercase tracking-wider font-medium flex items-center gap-1.5">
        {label}
        {required && <span className="text-accent-pink">*</span>}
      </label>
      {children}
    </div>
  );
}

function PillGroup({
  options,
  value,
  onChange,
}: {
  options: ReadonlyArray<{ id: string; title: string }>;
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(active ? "" : opt.id)}
            className="px-4 py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-200 cursor-pointer"
            style={{
              background: active
                ? "linear-gradient(135deg, rgba(224,64,160,0.22), rgba(155,89,245,0.16))"
                : "rgba(255,255,255,0.03)",
              border: active
                ? "1px solid rgba(224,64,160,0.45)"
                : "1px solid rgba(255,255,255,0.08)",
              color: active ? "#fff" : "rgba(255,255,255,0.6)",
            }}
          >
            {opt.title}
          </button>
        );
      })}
    </div>
  );
}
