export type ServiceCategory = "marketing" | "creative" | "web";

export interface Service {
  id: string;
  category: ServiceCategory;
  categories: ServiceCategory[];
  categoryLabel: string;
  icon: string; // Lucide icon name as string
  title: string;
  description: string;
  benefits: string[];
}

export const services: Service[] = [
  // Дигитален маркетинг
  {
    id: "social-media-management",
    category: "marketing",
    categories: ["marketing"],
    categoryLabel: "Дигитален маркетинг",
    icon: "Share2",
    title: "Social Media Management",
    description:
      "Strategic content, scheduling and community management across all platforms.",
    benefits: [
      "Daily content creation",
      "Community engagement",
      "Analytics reporting",
      "Platform strategy",
    ],
  },
  {
    id: "ai-powered-marketing",
    category: "marketing",
    categories: ["marketing", "ai"],
    categoryLabel: "Дигитален маркетинг",
    icon: "Brain",
    title: "AI-Powered Marketing",
    description:
      "Machine learning-driven campaigns that adapt and optimize in real time.",
    benefits: [
      "Predictive audience targeting",
      "Real-time optimization",
      "AI copywriting",
      "Performance forecasting",
    ],
  },
  {
    id: "meta-ads-campaigns",
    category: "marketing",
    categories: ["marketing"],
    categoryLabel: "Дигитален маркетинг",
    icon: "Target",
    title: "Meta Ads Campaigns",
    description:
      "High-converting Facebook and Instagram ad campaigns with precise targeting.",
    benefits: [
      "Campaign strategy",
      "A/B testing",
      "Retargeting funnels",
      "ROAS optimization",
    ],
  },
  {
    id: "email-marketing",
    category: "marketing",
    categories: ["marketing"],
    categoryLabel: "Дигитален маркетинг",
    icon: "Mail",
    title: "Email Marketing",
    description:
      "Automated sequences and campaigns that nurture leads and drive sales.",
    benefits: [
      "Automation flows",
      "List segmentation",
      "A/B testing",
      "Deliverability optimization",
    ],
  },
  // Дизайн и видео
  {
    id: "graphic-design",
    category: "creative",
    categories: ["creative"],
    categoryLabel: "Дизайн и видео",
    icon: "Palette",
    title: "Graphic Design",
    description:
      "Digital creatives — brand-consistent design that stops the scroll.",
    benefits: [
      "Brand consistency",
      "Digital formats",
      "Animated assets",
      "Unlimited revisions",
    ],
  },
  {
    id: "print-materials",
    category: "creative",
    categories: ["creative"],
    categoryLabel: "Дизайн и видео",
    icon: "Printer",
    title: "Print Materials",
    description:
      "Brochures, banners, packaging and all print collateral, pixel-perfect.",
    benefits: [
      "Brand consistency",
      "Print-ready files",
      "Multiple formats",
      "Unlimited revisions",
    ],
  },
  {
    id: "video-filming",
    category: "creative",
    categories: ["creative"],
    categoryLabel: "Дизайн и видео",
    icon: "Video",
    title: "Video Filming",
    description:
      "Professional video production for ads, brand stories and social content.",
    benefits: [
      "4K production",
      "On-location shoots",
      "Scriptwriting",
      "Multi-platform formats",
    ],
  },
  {
    id: "video-editing",
    category: "creative",
    categories: ["creative"],
    categoryLabel: "Дизайн и видео",
    icon: "Film",
    title: "Video Editing",
    description:
      "Post-production, color grading, captions and platform-optimized exports.",
    benefits: [
      "Color grading",
      "Motion graphics",
      "Caption overlays",
      "Platform optimization",
    ],
  },
  {
    id: "copywriting",
    category: "marketing",
    categories: ["marketing"],
    categoryLabel: "Дигитален маркетинг",
    icon: "PenLine",
    title: "Copywriting",
    description:
      "Compelling copy for ads, websites, social media and email — words that convert.",
    benefits: [
      "Ad & landing page copy",
      "Social media captions",
      "Email sequences",
      "Brand voice guidelines",
    ],
  },
  // AI
  {
    id: "ai-image-generation",
    category: "creative",
    categories: ["creative"],
    categoryLabel: "Дизайн и видео",
    icon: "ImagePlay",
    title: "AI Image Generation",
    description:
      "Photorealistic AI visuals — brand-consistent imagery produced in minutes, not days.",
    benefits: [
      "Photorealistic image outputs",
      "Brand-consistent style",
      "Multiple aspect ratios",
      "Unlimited variations",
    ],
  },
  {
    id: "ai-video-generation",
    category: "creative",
    categories: ["creative"],
    categoryLabel: "Дизайн и видео",
    icon: "Clapperboard",
    title: "AI Video Generation",
    description:
      "Cinematic AI video sequences — hours of production compressed into minutes of output.",
    benefits: [
      "Cinematic AI video",
      "Brand-consistent style",
      "Multiple aspect ratios",
      "Platform-optimized exports",
    ],
  },
  // Уеб & Разработка
  {
    id: "seo-optimization",
    category: "marketing",
    categories: ["marketing", "web"],
    categoryLabel: "Дигитален маркетинг",
    icon: "Search",
    title: "SEO Optimization",
    description:
      "Technical and content SEO to dominate search rankings in your niche.",
    benefits: [
      "Keyword research",
      "On-page optimization",
      "Link building",
      "Monthly reporting",
    ],
  },
  {
    id: "custom-websites-nextjs",
    category: "web",
    categories: ["web"],
    categoryLabel: "Уеб & Разработка",
    icon: "Code2",
    title: "Custom Websites",
    description:
      "Bespoke React / Next.js builds with performance-first architecture.",
    benefits: [
      "99+ Lighthouse score",
      "TypeScript codebase",
      "Static export",
      "CI/CD ready",
    ],
  },
  {
    id: "online-store-ecommerce",
    category: "web",
    categories: ["web"],
    categoryLabel: "Уеб & Разработка",
    icon: "Store",
    title: "Online Store / E-commerce",
    description:
      "Full e-commerce solutions — Shopify stores, custom builds, payment, inventory and logistics integrations.",
    benefits: [
      "Shopify & custom builds",
      "Payment gateways",
      "Inventory management",
      "Order automation",
    ],
  },
  {
    id: "web-applications",
    category: "web",
    categories: ["web"],
    categoryLabel: "Уеб & Разработка",
    icon: "Smartphone",
    title: "Web Applications",
    description: "Cross-platform apps built with React Native and Electron.",
    benefits: [
      "Cross-platform",
      "Offline support",
      "Push notifications",
      "App store ready",
    ],
  },
  {
    id: "saas-solutions",
    category: "web",
    categories: ["web"],
    categoryLabel: "Уеб & Разработка",
    icon: "Layers",
    title: "SaaS Solutions",
    description:
      "Scalable SaaS products from MVP to production-ready platform.",
    benefits: [
      "Scalable architecture",
      "Auth & billing",
      "Dashboard UI",
      "API integrations",
    ],
  },
  {
    id: "hosting-domain",
    category: "web",
    categories: ["web"],
    categoryLabel: "Уеб & Разработка",
    icon: "Server",
    title: "Хостинг & домейн",
    description:
      "Бърз и сигурен хостинг и управление на домейн — вашият сайт винаги онлайн и винаги с висока производителност.",
    benefits: [
      "Настройка на управляван хостинг",
      "Регистрация на домейн и DNS",
      "SSL сертификати",
      "Мониторинг на наличност",
    ],
  },
];

export const categories = [
  { id: "marketing", label: "Дигитален маркетинг" },
  { id: "creative", label: "Дизайн и видео" },
  { id: "web", label: "Уебсайтове и приложения" },
] as const;
