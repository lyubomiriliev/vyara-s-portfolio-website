"use client";

import Link from "next/link";
import Image from "next/image";
import {
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
  LinkedinIcon,
} from "lucide-react";
import { useLang } from "@/lib/LanguageContext";

const SERVICE_HREFS = [
  "/services",
  "/services",
  "/services",
  "/services",
  "/services",
];
const COMPANY_HREFS = ["/about", "/clients", "/work"];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/aviva.digital",
    icon: InstagramIcon,
  },
  {
    label: "Facebook",
    href: "https://facebook.com/avivadigital",
    icon: FacebookIcon,
  },
  { label: "YouTube", href: "https://youtube.com", icon: YoutubeIcon },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedinIcon },
];

export default function Footer() {
  const { t, locale } = useLang();

  return (
    <footer className="relative bg-[#07070C] overflow-hidden">
      {/* Top gradient separator */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(224,64,160,0.7), rgba(155,89,245,0.7), rgba(74,158,255,0.5), transparent)",
        }}
      />

      {/* Background image */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage: "url('/background-images/floating-wave-purple.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          opacity: 0.15,
        }}
      />

      {/* Ambient glows */}
      <div
        aria-hidden
        className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(224,64,160,0.09), transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 right-1/4 translate-x-1/2 w-[500px] h-[350px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(155,89,245,0.08), transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container relative z-10">
        {/* ── BIG statement headline ── */}
        <div className="pt-20 pb-16 border-b border-white/[0.05]">
          {locale === "bg" ? (
            <h2
              className="font-display font-bold leading-[1.1] text-[clamp(36px,5vw,68px)] text-white whitespace-nowrap"
              style={{ letterSpacing: "-0.02em" }}
            >
              {t.footer.futureHeadline}{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #FFB76C, #FF419D)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t.footer.futureAccent1}
              </span>{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #FFB76C, #FF419D)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t.footer.futureMiddle}
              </span>
            </h2>
          ) : (
            <h2
              className="font-display font-bold leading-[0.95] text-[clamp(40px,6.5vw,80px)] text-white"
              style={{ letterSpacing: "-0.03em" }}
            >
              {t.footer.futureHeadline}{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #FFB76C, #FF419D)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t.footer.futureAccent1}
              </span>
              <br />
              {t.footer.futureMiddle}
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #FFB76C, #FF419D)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t.footer.futureAccent2}
              </span>
            </h2>
          )}
        </div>

        {/* ── Links + social row ── */}
        <div className="py-14 flex flex-col md:flex-row justify-between gap-12">
          {/* Brand + social */}
          <div className="flex flex-col gap-6 max-w-[220px]">
            <Link href="/">
              <Image
                src="/aviva-digital-white-logo.png"
                alt="Aviva Digital"
                width={160}
                height={96}
                className="h-24 w-auto object-contain opacity-100"
              />
            </Link>
            <div className="flex items-center gap-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "rgba(224,64,160,0.12)",
                    border: "1px solid rgba(224,64,160,0.3)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(224,64,160,0.22)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(224,64,160,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(224,64,160,0.12)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(224,64,160,0.3)";
                  }}
                >
                  <Icon
                    size={14}
                    className="text-white/80 group-hover:text-white transition-colors duration-200"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-8">
            <div>
              <h4 className="font-display font-semibold text-white/60 text-xs uppercase tracking-[0.16em] mb-5">
                {t.footer.services}
              </h4>
              <ul className="space-y-3">
                {t.footer.serviceLinks.map((label, i) => (
                  <li key={label}>
                    <Link
                      href={SERVICE_HREFS[i]}
                      className="text-white/60 hover:text-white text-base transition-colors duration-150"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold text-white/60 text-xs uppercase tracking-[0.16em] mb-5">
                {t.footer.company}
              </h4>
              <ul className="space-y-3">
                {t.footer.companyLinks.map((label, i) => (
                  <li key={label}>
                    <Link
                      href={COMPANY_HREFS[i]}
                      className="text-white/60 hover:text-white text-base transition-colors duration-150"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Aviva Digital · avivadigital.bg ·{" "}
            {t.footer.copyright}
          </p>
          <a
            href="https://lyubomir-iliev.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold hover:opacity-80 transition-opacity duration-150"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,183,108,0.6), rgba(255,65,157,0.6))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t.footer.builtBy}
          </a>
        </div>
      </div>
    </footer>
  );
}
