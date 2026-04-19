export type ServiceCategory = "marketing" | "creative" | "web";

export interface Service {
  id: string;
  category: ServiceCategory;
  categoryLabel: string;
  icon: string; // Lucide icon name as string
  title: string;
  description: string;
  benefits: string[];
}

export const services: Service[] = [
  // Marketing & Social
  {
    id: "social-media-management",
    category: "marketing",
    categoryLabel: "Marketing & Social",
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
    categoryLabel: "Marketing & Social",
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
    categoryLabel: "Marketing & Social",
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
    id: "influencer-marketing",
    category: "marketing",
    categoryLabel: "Marketing & Social",
    icon: "Users",
    title: "Influencer Marketing",
    description:
      "Partnerships with the right voices to amplify your brand authentically.",
    benefits: [
      "Influencer sourcing",
      "Campaign management",
      "Content approval",
      "Performance tracking",
    ],
  },
  {
    id: "email-marketing",
    category: "marketing",
    categoryLabel: "Marketing & Social",
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
  {
    id: "seo-optimization",
    category: "marketing",
    categoryLabel: "Marketing & Social",
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
  // Creative & Content
  {
    id: "graphic-design-print",
    category: "creative",
    categoryLabel: "Creative & Content",
    icon: "Printer",
    title: "Graphic Design (Print)",
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
    id: "graphic-design-digital",
    category: "creative",
    categoryLabel: "Creative & Content",
    icon: "Monitor",
    title: "Graphic Design (Digital)",
    description:
      "Social creatives, web banners, and UI assets built for scroll-stopping impact.",
    benefits: [
      "Social media sizes",
      "Animated assets",
      "Brand guidelines",
      "Fast turnaround",
    ],
  },
  {
    id: "video-filming",
    category: "creative",
    categoryLabel: "Creative & Content",
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
    categoryLabel: "Creative & Content",
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
    id: "ai-image-generation",
    category: "creative",
    categoryLabel: "Creative & Content",
    icon: "Image",
    title: "AI Image Generation",
    description:
      "Photorealistic AI visuals and product shots — hours of shooting, minutes of output.",
    benefits: [
      "Photorealistic outputs",
      "Product visualization",
      "Brand-consistent style",
      "Rapid iteration",
    ],
  },
  {
    id: "ai-video-generation",
    category: "creative",
    categoryLabel: "Creative & Content",
    icon: "Clapperboard",
    title: "AI Video Generation",
    description:
      "Cinematic AI video sequences for ads, reels and property showcases.",
    benefits: [
      "Cinematic quality",
      "Custom style transfer",
      "Fast delivery",
      "Multiple aspect ratios",
    ],
  },
  // Web & Development
  {
    id: "website-creation",
    category: "web",
    categoryLabel: "Web & Development",
    icon: "Globe",
    title: "E-Commerce Website Creation",
    description:
      "Fast, beautiful websites built for conversion and search performance.",
    benefits: [
      "Mobile-first design",
      "SEO optimized",
      "CMS integration",
      "Performance audited",
    ],
  },
  {
    id: "custom-websites-nextjs",
    category: "web",
    categoryLabel: "Web & Development",
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
    id: "shopify-websites",
    category: "web",
    categoryLabel: "Web & Development",
    icon: "ShoppingBag",
    title: "Shopify Websites",
    description:
      "Custom Shopify themes and apps that turn visitors into customers.",
    benefits: [
      "Custom theme dev",
      "App integrations",
      "Conversion CRO",
      "Analytics setup",
    ],
  },
  {
    id: "online-store-ecommerce",
    category: "web",
    categoryLabel: "Web & Development",
    icon: "Store",
    title: "Online Store / E-commerce",
    description:
      "Full e-commerce solutions with payment, inventory and logistics integrations.",
    benefits: [
      "Payment gateways",
      "Inventory management",
      "Order automation",
      "Multi-currency",
    ],
  },
  {
    id: "web-applications",
    category: "web",
    categoryLabel: "Web & Development",
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
    categoryLabel: "Web & Development",
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
];

export const categories = [
  { id: "marketing", label: "Marketing & Social" },
  { id: "creative", label: "Creative & Content" },
  { id: "web", label: "Web & Development" },
] as const;
