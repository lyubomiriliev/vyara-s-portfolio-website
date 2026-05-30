import type { Metadata } from "next";
import FAQPage from "@/components/pages/FAQPage";

export const metadata: Metadata = {
  title: "FAQ — Aviva Digital",
  description:
    "Answers to the most common questions about working with Aviva Digital — services, pricing, timelines, AI approach, and onboarding.",
  alternates: { canonical: "https://www.avivadigital.bg/faq" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What services does Aviva Digital offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer 18 services across three disciplines: Digital Marketing (social media management, AI-powered marketing, Meta Ads), Creative & Content (graphic design, video filming & editing, copywriting, AI image/video generation), and Web & Development (custom websites, e-commerce, SaaS solutions, hosting). Everything under one roof — no handoffs, no gaps.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to start seeing results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Social media and paid ads campaigns typically show measurable engagement within the first 30 days. SEO and organic brand building take 3–6 months to compound. Web projects are delivered in 2–6 weeks depending on scope.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with small businesses or only large companies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We work with ambitious brands of all sizes — from local startups to growing regional businesses. Our packages are structured so you get real value whether you're just launching or scaling aggressively.",
      },
    },
    {
      "@type": "Question",
      name: "How does your AI-powered approach actually work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We use AI for content ideation and generation, predictive ad targeting, automated posting pipelines, A/B testing at scale, and photorealistic image and video production. This lets us move faster and deliver more for every budget.",
      },
    },
    {
      "@type": "Question",
      name: "What does the onboarding process look like?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We start with a free 30-minute strategy call to understand your goals, audience, and current situation. From there we build a custom proposal. Once agreed, onboarding takes 3–5 business days: brand deep-dive, access setup, and a kickoff meeting with your dedicated team.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get a website built without taking other services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Our web development service is fully standalone. You can commission a custom Next.js site, an e-commerce store, or a SaaS MVP without signing up for marketing services.",
      },
    },
    {
      "@type": "Question",
      name: "How do you price your services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We work on monthly retainers for ongoing services (social media, marketing, ads) and fixed-scope quotes for one-off projects (websites, brand identity, video). Pricing is transparent — no hidden fees.",
      },
    },
    {
      "@type": "Question",
      name: "Will I have a dedicated point of contact?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every client gets a direct communication line with the team leads working on their account. You're never passed between account managers or left chasing updates. We use Slack or WhatsApp depending on your preference, and you get weekly reports.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer one-time projects or only monthly retainers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both. One-time projects (a website, a brand identity package, a video shoot) are quoted as fixed-scope engagements. Ongoing services like social media management or Meta Ads are retainer-based. We also offer flexible 3-month starter packages.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Aviva Digital based and do you work internationally?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We are based in Sofia, Bulgaria, and work with clients across Europe and beyond. All work is delivered remotely and digitally, so geography is never a barrier.",
      },
    },
  ],
};

export default function FAQ() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQPage />
    </>
  );
}
