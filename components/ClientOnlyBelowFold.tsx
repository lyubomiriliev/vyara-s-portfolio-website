"use client";

import dynamic from "next/dynamic";

// Non-SEO-critical sections rendered client-only to keep initial HTML small.
// Each slot reserves a min-height so layout doesn't shift when it hydrates.
const MarqueeBanner = dynamic(
  () => import("@/components/sections/MarqueeBanner"),
  { ssr: false, loading: () => <div style={{ minHeight: 80 }} /> },
);
const Clients = dynamic(() => import("@/components/sections/Clients"), {
  ssr: false,
  loading: () => <div style={{ minHeight: 600 }} />,
});
const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials"),
  { ssr: false, loading: () => <div style={{ minHeight: 500 }} /> },
);
const CTABanner = dynamic(() => import("@/components/sections/CTABanner"), {
  ssr: false,
  loading: () => <div style={{ minHeight: 400 }} />,
});

type Slot = "marquee" | "clients" | "testimonials" | "cta";

export default function ClientOnlyBelowFold({ slot }: { slot: Slot }) {
  switch (slot) {
    case "marquee":
      return <MarqueeBanner />;
    case "clients":
      return <Clients />;
    case "testimonials":
      return <Testimonials />;
    case "cta":
      return <CTABanner />;
  }
}
