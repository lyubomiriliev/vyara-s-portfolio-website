export type Locale = "en" | "bg";

export const translations = {
  en: {
    // Header
    nav: {
      home: "Home",
      services: "Services",
      work: "Work",
      projects: "Projects",
      clients: "Clients",
      about: "About",
      contact: "Contact",
    },
    cta: "Contact Us",
    seeAll: "See all →",

    // Hero
    hero: {
      badge: "AI-Powered Digital Agency",
      line1: "Crafting",
      line2: "Iconic Brands",
      line3: "Engineered",
      sub: "A new breed of digital agency — fusing AI intelligence with award-winning craft. We design, build, and scale brands the world stops to look at.",
      ctaPrimary: "Start Your Project →",
      ctaSecondary: "See Our Work",
      stats: [
        { label: "Posts & Stories" },
        { label: "Designs" },
        { label: "Campaigns" },
        { label: "Customers" },
      ],
      floatingCards: {
        aiContent: { label: "AI-Generated Content", value: "+340% Engagement" },
        webDev: { label: "Web Development", value: "Shipped in 14 days" },
        paidAds: { label: "Paid Social Ads", value: "4.8x Avg. ROAS" },
        brandDesign: { label: "Brand Design", value: "100+ Assets / mo" },
      },
    },

    // MarqueeBanner
    marquee: { label: "Trusted by brands across industries" },

    // WhyAviva
    whyAviva: {
      label: "OUR EDGE",
      title: "Where AI Meets Human Creativity",
      sub: "We engineer growth by combining AI-powered tools with deep marketing expertise and full-stack technical development.",
      learnMore: "Learn more about us →",
      toolsLabel: "TOOLS & PLATFORMS WE MASTER",
      cards: [
        {
          title: "AI-First Approach",
          body: "We embed AI into every layer: generative visuals, predictive ad targeting, automated content pipelines.",
        },
        {
          title: "Full-Circle Solutions",
          body: "Strategy, creative, development, advertising — all under one roof. No handoffs, no gaps.",
        },
        {
          title: "Measurable Results",
          body: "Every decision is data-driven. We track, optimize and scale what works with full transparency.",
        },
      ],
    },

    // ServicesPreview
    services: {
      label: "WHAT WE DO",
      title: "Every Service Your Brand Needs",
      sub: "From AI-generated content to custom web applications — we handle it all.",
      seeAll: "See All 18 Services →",
      learnMore: "Learn More →",
      getStarted: "Get Started →",
      across3: "18 services across 3 disciplines",
      allServices: "All Services",
      columns: [
        { label: "Marketing & Social" },
        { label: "Creative & Content" },
        { label: "Web & Development" },
      ],
    },

    // PortfolioPreview
    portfolio: {
      label: "OUR WORK",
      title: "Projects That Speak",
      titleLine2: "for Themselves",
      acrossCategories: "projects across 4 categories",
      sub: "A selection of our latest design, social, and web work.",
      viewAll: "View All Projects →",
      viewProject: "View Project →",
    },

    // Clients (section on homepage)
    clients: {
      label: "CLIENT RESULTS",
      title1: "Real Brands.",
      titleAccent: "Real Results.",
      sub: "Measurable impact across every project we touch.",
      seeAll: "See all client results →",
      sectionLabel: "OUR CLIENTS",
      sectionTitle: "Brands That",
      sectionTitleAccent: "Trust Us",
      sectionSub:
        "We partner with ambitious brands — from local ventures to growing businesses — and shape the way they're seen online.",
      brandCount: " brands we've worked with",
      serviceTags: ["Social Media", "Brand Strategy", "Content Creation"],
      // ClientsPage
      pageLabel: "OUR CLIENTS",
      pageTitle: "Brands That Refuse",
      pageTitleAccent: "To Blend In",
      pageSub:
        "Ten brands. Ten transformations. Each one built into a category-defining force through a fusion of strategy, design, and AI-powered execution.",
      scrollCue: "Scroll",
      curvedText: "ELEVATE YOUR BRAND PRESENCE",
      showcaseLabel: "SCROLL TO EXPLORE",
      showcaseTitle: "Each brand,",
      showcaseTitleAccent: "a story worth telling.",
      showcaseSub:
        "Scroll through every client we've helped scale — from premium hospitality to consumer tech, real estate to personal brands.",
      caseStudy: "Case Study",
      ctaTitle: "Ready to become",
      ctaTitleAccent: "our next success story?",
      ctaSub: "Free 30-minute strategy call. No commitment. Real ideas.",
      ctaButton: "Start a Project",
      ctaCall: "Or call us →",
      stats: [
        { value: "10+", label: "Brands Scaled" },
        { value: "3 yrs", label: "Experience" },
        { value: "100%", label: "Committed" },
      ],
    },

    // Testimonials
    testimonials: {
      label: "TESTIMONIALS",
      title: "What Our",
      titleAccent: "Clients Say",
    },

    // CTABanner
    ctaBanner: {
      label: "READY TO GROW?",
      title: "Ready to Scale Your Brand",
      titleAccent: "with AI?",
      sub: "Let's build something extraordinary together. Free strategy call, no commitment.",
      cta: "Get a Free Strategy Call",
      ctaSecondary: "Send Us a Message",
    },

    // Contact form
    contactForm: {
      label: "GET IN TOUCH",
      title: "Let's Talk",
      sub: "Have a project in mind? Fill in the form and we'll get back to you within 24 hours.",
      namePlaceholder: "Your name",
      emailPlaceholder: "Your email",
      messagePlaceholder: "Tell us about your project...",
      submit: "Send Message",
      sending: "Sending...",
      successMsg: "Message sent! We'll be in touch soon.",
      errorMsg: "Something went wrong. Please try again.",
      fullName: "Full Name",
      firstName: "First Name",
      lastName: "Last Name",
      firstNamePlaceholder: "Your full name",
      lastNamePlaceholder: "Your last name",
      emailAddress: "Email Address",
      emailPlaceholder2: "you@company.com",
      phone: "Phone",
      phonePlaceholder: "Your phone number",
      company: "Company",
      companyPlaceholder: "Company name (optional)",
      serviceInterest: "Service Interest",
      selectService: "Select a service...",
      servicesSelected: "service selected",
      servicesSelectedPlural: "services selected",
      message: "Message",
      successTitle: "Message Sent!",
      successSub: "We'll get back to you within 24 hours.",
      sendAnother: "Send another message →",
      errorFull:
        "Something went wrong. Please try again or email us directly at office@avivadigital.bg.",
      infoTagline:
        "AI-powered strategies. Human creativity. Full-circle digital solutions.",
      emailLabel: "Email",
      phoneLabel: "Phone",
      locationLabel: "Location",
      location: "Sofia, Bulgaria",
      responseNote: "We respond within 24 hours on business days.",
    },

    // Projects page (web dev)
    projects: {
      pageLabel: "WEB DEVELOPMENT",
      pageTitle: "Websites That",
      pageTitleAccent: "Convert & Perform",
      pageSub:
        "Custom-built websites and web applications engineered for speed, SEO, and conversions. From landing pages to full e-commerce platforms.",
      filterAll: "All Projects",
      filterLanding: "Landing Pages",
      filterEcommerce: "E-Commerce",
      filterCustom: "Custom Builds",
      techStack: "Tech Stack",
      liveProject: "Live Project →",
      viewDetails: "View Details →",
      ctaTitle: "Ready to build your",
      ctaTitleAccent: "dream website?",
      ctaSub:
        "Tell us about your project and we'll get back to you within 24 hours.",
      ctaButton: "Start Your Project →",
    },

    // About page
    about: {
      pageLabel: "WHO WE ARE",
      pageTitle: "Built for Brands That Want More",
      pageDescription:
        "AI-powered strategies. Human creativity. Full-circle digital solutions.",
      teamLabel: "THE TEAM",
      teamTitle: "Led by Vision,",
      teamTitleMid: "Powered by",
      teamTitleAccent: "Expertise",
      processTitle: "How We",
      processTitleMid: "Work With",
      processTitleAccent: "You",
      role: "Creative Director",
      bio: "With deep expertise in AI-powered marketing, social media strategy, and creative direction, Vyara leads the Aviva Digital team in delivering full-circle digital solutions for brands that want to grow faster and smarter.",
      ctaTitle: "Ready to work with us?",
      ctaButton: "Start a Project →",
    },

    // Footer
    footer: {
      tagline:
        "The Future of Marketing is Here. AI-powered strategies. Human creativity. Full-circle digital solutions.",
      futureHeadline: "The",
      futureAccent1: "Future",
      futureMiddle: "of Marketing",
      futureAccent2: "is Here.",
      readyToGrow: "Ready to grow?",
      letsBuilt: "Let's build something",
      extraordinary: "extraordinary.",
      freeAudit: "Get a free audit of your current digital presence.",
      freeAuditCta: "Get a Free Audit →",
      services: "Services",
      company: "Company",
      pages: "Pages",
      connect: "Connect",
      copyright: "All rights reserved.",
      builtBy: "Built by Lyubomir Iliev",
      serviceLinks: [
        "Social Media Management",
        "AI Content Generation",
        "Meta Ads",
        "SEO & Strategy",
        "Web Development",
      ],
      companyLinks: ["About", "Clients", "Work"],
      pageLinks: ["Services", "Work", "Contact"],
    },

    // Page heroes (used in app/*.tsx page files)
    pageHeroes: {
      services: {
        label: "WHAT WE DO",
        title: "Every Service Your Brand Needs to",
        titleGradient: "Dominate Online",
        description:
          "From AI-powered marketing to custom web applications — 18 services across marketing, creative and development.",
      },
      work: {
        label: "OUR WORK",
        title: "Projects That",
        titleGradient: "Speak for Themselves",
        description:
          "A full showcase of our latest work across design, social, web and AI-generated content.",
      },
      contact: {
        label: "GET IN TOUCH",
        title: "Let's Build Something",
        titleGradient: "Unique Together",
        description:
          "Tell us about your project. We'll get back to you within 24 hours.",
      },
      projects: {
        label: "WEB DEVELOPMENT",
        title: "Websites That",
        titleGradient: "Convert & Perform",
        description:
          "Custom-built websites and web applications engineered for speed, SEO, and conversions.",
      },
    },

    // Contact page quick stats strip
    contactQuickStats: [
      { label: "< 24h", sub: "Response time" },
      { label: "Free", sub: "Strategy call" },
      { label: "100%", sub: "Committed" },
    ],

    // Clients section — client card content
    clientCards: {
      featured: {
        tagline: "Social presence that turned foot traffic into a full house.",
        industry: "Hospitality",
      },
      grid: [
        {
          tagline: "A brand identity as premium as the properties they sell.",
          industry: "Real Estate",
        },
        {
          tagline: "Content strategy that energises their online community.",
          industry: "Fitness",
        },
        {
          tagline:
            "Visual storytelling that resonates with a mindful audience.",
          industry: "Wellness",
        },
        {
          tagline: "Digital campaigns built around curiosity and growth.",
          industry: "Education",
        },
        {
          tagline: "Elevated aesthetics crafted for a luxury audience.",
          industry: "Fashion",
        },
      ],
    },

    // Clients page — full client stories
    clientStories: [
      {
        tagline: "Architecture, scaled by storytelling.",
        description:
          "Premium portfolio design and Instagram storytelling that elevated every project into a marketing asset.",
        industry: "Interior Design",
        metrics: [
          { label: "Inbound Leads" },
          { label: "Engagement" },
          { label: "Profile Visits" },
        ],
      },
      {
        tagline: "A product launch with momentum.",
        description:
          "Launch creative, paid funnels, and a content calendar that took a new product from cold launch to category challenger.",
        industry: "Supplements",
        metrics: [
          { label: "ROAS" },
          { label: "Trial Signups" },
          { label: "Brand Recall" },
        ],
      },
      {
        tagline: "Automotive content that drives intent.",
        description:
          "Premium product visuals and dealership-level campaign work that translated digital impressions into showroom visits.",
        industry: "Automotive",
        metrics: [
          { label: "Showroom Visits" },
          { label: "Test Drives" },
          { label: "CTR" },
        ],
      },
      {
        tagline: "A fitness brand built to scale.",
        description:
          "Identity, social, and creator partnerships engineered into one growth machine — with retention metrics to match.",
        industry: "Sport & Wellness",
        metrics: [
          { label: "Brand Recognition" },
          { label: "Client Retention" },
          { label: "Reach Expanded" },
        ],
      },
      {
        tagline: "Education built for the algorithm age.",
        description:
          "A complete content engine — short-form, longform, and lead magnets — that turned curiosity into enrollments.",
        industry: "Beauty",
        metrics: [
          { label: "Brand Recognition" },
          { label: "Client Retention" },
          { label: "Reach Expanded" },
        ],
      },
      {
        tagline: "Premium nightlife brand reimagined.",
        description:
          "A complete social-first rebuild that turned a local lounge into a regional destination — with content that books tables before the doors open.",
        industry: "Vaping",
        metrics: [
          { label: "Engagement" },
          { label: "Sales Growth" },
          { label: "Reach / mo" },
        ],
      },
      {
        tagline: "Listings that close, not just look good.",
        description:
          "High-fidelity property storytelling backed by paid social funnels — every listing converted into a qualified lead pipeline.",
        industry: "Real Estate",
        metrics: [
          { label: "Brand Awareness" },
          { label: "Lead Generation" },
          { label: "Reach Expanded" },
        ],
      },
      {
        tagline: "Wellness that feels like luxury.",
        description:
          "Editorial-grade content and a refined visual language that positioned El Well as the premium choice in a crowded market.",
        industry: "AI & News",
        metrics: [
          { label: "Brand Recognition" },
          { label: "Client Retention" },
          { label: "Reach Expanded" },
        ],
      },
      {
        tagline: "A personal brand with executive polish.",
        description:
          "Long-form positioning, short-form distribution, and a brand voice engineered for trust at every touchpoint.",
        industry: "Perfumery",
        metrics: [
          { label: "Audience Growth" },
          { label: "Engagement" },
          { label: "Reach" },
        ],
      },
    ],

    // Testimonials
    testimonialQuotes: [
      {
        quote:
          "The Aviva Digital team helped us reach new heights with their social media strategies. Our engagement grew by 200% in just 3 months!",
        name: "John Doe",
        role: "CEO at El Shisha",
      },
      {
        quote:
          "Professional and insightful! The work Aviva Digital delivers is exceptional — they know exactly what a brand needs.",
        name: "Jane Smith",
        role: "Marketing Director at ABC Corp",
      },
      {
        quote:
          "Fantastic collaboration! Their ideas are always fresh and relevant. A true social media powerhouse!",
        name: "Alex Johnson",
        role: "Brand Manager at XYZ Ltd",
      },
      {
        quote:
          "Working with Aviva Digital transformed our online presence completely. Sales increased by 50% within the first quarter.",
        name: "Maria Ivanova",
        role: "Founder at La Manière",
      },
      {
        quote:
          "Their AI-driven approach to marketing is unlike anything we've seen. Lead generation doubled in two months.",
        name: "Dimitar Petrov",
        role: "Director at Pulse Homes",
      },
      {
        quote:
          "The content quality and turnaround speed is incredible. Our community grew by 30% organically — no shortcuts.",
        name: "Sofia Georgieva",
        role: "CMO at Fox Academy",
      },
    ],

    // Service dropdown
    serviceDropdown: {
      categories: {
        marketing: "Marketing & Social",
        creative: "Creative & Content",
        web: "Web & Development",
      },
      services: {
        socialMedia: "Social Media Management",
        aiMarketing: "AI-Powered Marketing",
        metaAds: "Meta Ads Campaigns",
        graphicPrint: "Graphic Design (Print)",
        graphicDigital: "Graphic Design (Digital)",
        videoFilming: "Video Filming & Editing",
        websiteDev: "Website Development",
        customSolutions: "Custom Solutions",
        ecommerce: "E-commerce Websites",
      },
    },

    // Services list (full data for /services page)
    categoriesList: [
      { id: "marketing", label: "Digital Marketing" },
      { id: "creative", label: "Design & Video" },
      { id: "web", label: "Web & Development" },
    ],
    servicesList: [
      {
        id: "social-media-management",
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
        id: "graphic-design",
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
      {
        id: "ai-image-generation",
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
      {
        id: "seo-optimization",
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
        title: "Web Applications",
        description:
          "Cross-platform apps built with React Native and Electron.",
        benefits: [
          "Cross-platform",
          "Offline support",
          "Push notifications",
          "App store ready",
        ],
      },
      {
        id: "saas-solutions",
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
        title: "Hosting & Domain",
        description:
          "Fast, secure hosting and domain management — your site, always online and always performing.",
        benefits: [
          "Managed hosting setup",
          "Domain registration & DNS",
          "SSL certificates",
          "Uptime monitoring",
        ],
      },
    ],

    // Work page filter labels
    workFilters: {
      socialContent: "Social & Content",
      webDevelopment: "Web Development",
      all: "All",
      visual: "Visual",
      reels: "Reels",
      ai: "AI",
      print: "Print",
      customWebsites: "Custom Websites",
      ecommerce: "E-Commerce",
      visitWebsite: "Browse Website",
      visit: "Visit",
      browseWebsite: "Browse Website",
    },

    // Language
    language: "Language",
  },

  bg: {
    // Header
    nav: {
      home: "Начало",
      services: "Услуги",
      work: "Портфолио",
      projects: "Проекти",
      clients: "Клиенти",
      about: "За нас",
      contact: "Контакт",
    },
    cta: "Свържете се",
    seeAll: "Вижте всички →",

    // Hero
    hero: {
      badge: "AI дигитална агенция",
      line1: "Изграждаме",
      line2: "Силни брандове",
      line3: "които продават.",
      sub: "Ново поколение дигитална агенция — където AI технологиите срещат истинска креативност. Правим брандове, на които хората обръщат внимание.",
      ctaPrimary: "Започни проекта си →",
      ctaSecondary: "Вижте нашата работа",
      stats: [
        { label: "Поста и сторита" },
        { label: "Дизайна" },
        { label: "Кампании" },
        { label: "Бизнеса" },
      ],
      floatingCards: {
        aiContent: {
          label: "AI съдържание",
          value: "+340% Ангажираност",
        },
        webDev: { label: "Уеб разработка", value: "Готово за 14 дни" },
        paidAds: { label: "Платена реклама", value: "4.8x Avg. ROAS" },
        brandDesign: { label: "Бранд дизайн", value: "100+ Материала / мес." },
      },
    },

    // MarqueeBanner
    marquee: { label: "Избрани от водещи брандове" },

    // WhyAviva
    whyAviva: {
      label: "ЗАЩО ДА ИЗБЕРЕТЕ НАС",
      title: "AI технологии + истинска креативност",
      sub: "Комбинираме AI инструменти с маркетингов опит и техническа разработка — за да растат брандовете на нашите клиенти по-бързо и по-умно.",
      learnMore: "Разберете повече за нас →",
      toolsLabel: "ИНСТРУМЕНТИ И ПЛАТФОРМИ",
      cards: [
        {
          title: "AI от самото начало",
          body: "AI е в основата на всичко — от визуалите и текстовете до рекламното таргетиране и автоматизацията на съдържанието.",
        },
        {
          title: "Всичко под един покрив",
          body: "Стратегия, дизайн, разработка, реклама — при нас. Без посредници, без загубено време в координация.",
        },
        {
          title: "Резултати, не обещания",
          body: "Работим с данни. Следим какво работи, оптимизираме и мащабираме — и вие виждате всичко.",
        },
      ],
    },

    // ServicesPreview
    services: {
      label: "КАКВО ПРАВИМ",
      title: "Всичко, от което брандът ви се нуждае",
      sub: "От AI съдържание до уеб разработка — работим по целия процес, не само по части от него.",
      seeAll: "Вижте всички услуги →",
      learnMore: "Научете повече →",
      getStarted: "Започни →",
      across3: "18 услуги в 3 направления",
      allServices: "Всички услуги",
      columns: [
        { label: "Маркетинг и социални мрежи" },
        { label: "Криейтив и съдържание" },
        { label: "Създаване на\nуеб сайтове" },
      ],
    },

    // PortfolioPreview
    portfolio: {
      label: "НАШЕТО ПОРТФОЛИО",
      title: "Работата говори",
      titleLine2: "сама за себе си",
      acrossCategories: "проекта в 4 категории",
      sub: "Избрани проекти с реални резултати за реални бизнеси.",
      viewAll: "Вижте цялото портфолио →",
      viewProject: "Вижте проекта →",
    },

    // Clients (section on homepage)
    clients: {
      label: "РЕЗУЛТАТИ",
      title1: "Реални брандове.",
      titleAccent: "Реални резултати.",
      sub: "Всеки проект носи измерими резултати — не просто хубав дизайн.",
      seeAll: "Вижте всички клиенти →",
      sectionLabel: "НАШИТЕ КЛИЕНТИ",
      sectionTitle: "Брандовете, които",
      sectionTitleAccent: "ни се довериха",
      sectionSub:
        "Работим с амбициозни бизнеси — от малки местни марки до разрастващи се компании. Помагаме им да изградят силно онлайн присъствие.",
      brandCount: " бранда, с които сме работили",
      serviceTags: [
        "Социални мрежи",
        "Бранд стратегия",
        "Създаване на съдържание",
      ],
      // ClientsPage
      pageLabel: "НАШИТЕ КЛИЕНТИ",
      pageTitle: "Брандове, които се",
      pageTitleAccent: "открояват",
      pageSub:
        "Десет бизнеса. Десет трансформации. Всеки превърнат в разпознаваема марка чрез стратегия, дизайн и AI изпълнение.",
      scrollCue: "Скролни надолу",
      curvedText: "ИЗДИГНИ ПРИСЪСТВИЕТО НА СВОЯ БРАНД",
      showcaseLabel: "РАЗГЛЕДАЙТЕ ВСИЧКИ",
      showcaseTitle: "Всеки бранд —",
      showcaseTitleAccent: "история, която си струва да се разкаже.",
      showcaseSub:
        "Разгледайте клиентите, с които сме работили — от хотелиерство и недвижими имоти до лични брандове и технологии.",
      caseStudy: "Казус",
      ctaTitle: "Искате ли и вашият бранд",
      ctaTitleAccent: "да расте така?",
      ctaSub:
        "Безплатна 30-минутна стратегическа среща. Без ангажимент. Конкретни идеи.",
      ctaButton: "Започни проект",
      ctaCall: "Или се обади →",
      stats: [
        { value: "10+", label: "Обслужени бранда" },
        { value: "3 год.", label: "Опит" },
        { value: "100%", label: "Ангажираност" },
      ],
    },

    // Testimonials
    testimonials: {
      label: "ОТЗИВИ",
      title: "Какво казват",
      titleAccent: "нашите клиенти?",
    },

    // CTABanner
    ctaBanner: {
      label: "ГОТОВИ ЛИ СТЕ?",
      title: "Искате ли брандът ви да",
      titleAccent: "расте с помощта на AI?",
      sub: "Нека поговорим какво е възможно. Безплатна консултация, без задължения.",
      cta: "Безплатна консултация",
      ctaSecondary: "Пишете ни",
    },

    // Contact form
    contactForm: {
      label: "СВЪРЖИ СЕ С НАС",
      title: "Нека поговорим",
      sub: "Имате идея или проект? Попълнете формата и ще се свържем с вас до 24 часа.",
      namePlaceholder: "Вашите имена",
      emailPlaceholder: "Вашият имейл",
      messagePlaceholder: "Разкажете ни за проекта си...",
      submit: "Изпратете съобщение",
      sending: "Изпращане...",
      successMsg: "Съобщението е изпратено! Скоро ще се чуем.",
      errorMsg: "Нещо се обърка. Опитайте пак.",
      fullName: "Вашите имена",
      firstName: "Собствено име",
      lastName: "Фамилия",
      firstNamePlaceholder: "Иван Иванов",
      lastNamePlaceholder: "Вашата фамилия",
      emailAddress: "Имейл адрес",
      emailPlaceholder2: "email@gmail.com",
      phone: "Телефон",
      phonePlaceholder: "+359 XXX XX XX XX",
      company: "Компания",
      companyPlaceholder: "Название на компанията (по желание)",
      serviceInterest: "Интересувате се от",
      selectService: "Изберете услуга...",
      servicesSelected: "услуга избрана",
      servicesSelectedPlural: "услуги избрани",
      message: "Съобщение",
      successTitle: "Съобщението е изпратено!",
      successSub: "Ще се свържем с вас до 24 часа.",
      sendAnother: "Изпратете ново съобщение ",
      errorFull:
        "Нещо се обърка. Опитайте отново или ни пишете директно на office@avivadigital.bg",
      infoTagline:
        "AI стратегии. Истинска креативност. Дигитални решения от А до Я.",
      emailLabel: "Имейл",
      phoneLabel: "Телефон",
      locationLabel: "Локация",
      location: "София, България",
      responseNote: "Отговаряме до 24 часа.",
    },

    // Projects page (web dev)
    projects: {
      pageLabel: "УЕБ РАЗРАБОТКА",
      pageTitle: "Сайтове, които",
      pageTitleAccent: "работят и продават",
      pageSub:
        "Разработваме уебсайтове и уеб приложения с фокус върху скорост, SEO и конверсии. От landing pages до пълни e-commerce платформи.",
      filterAll: "Всички проекти",
      filterLanding: "Landing Pages",
      filterEcommerce: "Е-Commerce",
      filterCustom: "По поръчка",
      techStack: "Технологии",
      liveProject: "Вижте сайта →",
      viewDetails: "Вижте детайли →",
      ctaTitle: "Искате сайт, който",
      ctaTitleAccent: "наистина работи?",
      ctaSub: "Разкажете ни за проекта си и ще се свържем с вас до 24 часа.",
      ctaButton: "Започни проекта →",
    },

    // About page
    about: {
      pageLabel: "КОИ СМЕ НИЕ ?",
      pageTitle: "Агенция, създадена за амбициозни брандове",
      pageDescription:
        "AI стратегии. Истинска креативност. Дигитални решения от А до Я.",
      teamLabel: "ЕКИПЪТ",
      teamTitle: "Визия",
      teamTitleMid: "и опит",
      teamTitleAccent: "в едно",
      processTitle: "Как",
      processTitleMid: "работим",
      processTitleAccent: "с вас",
      role: "Креативен директор",
      bio: "Вяра е човекът зад стратегията и визията на Aviva Digital. С опит в AI маркетинга, социалните мрежи и управлението на брандове, тя ръководи екипа към резултати, които се усещат — не просто изглеждат добре.",
      ctaTitle: "Искате ли да работим заедно?",
      ctaButton: "Започни проект →",
    },

    // Footer
    footer: {
      tagline:
        "Бъдещето на маркетинга е тук. AI стратегии. Истинска креативност. Дигитални решения от А до Я.",
      futureHeadline: "Бъдещето на",
      futureAccent1: "Маркетинга е",
      futureMiddle: "тук.",
      futureAccent2: "",
      readyToGrow: "Готови за растеж?",
      letsBuilt: "Нека изградим нещо",
      extraordinary: "по-добро заедно.",
      freeAudit: "Поискайте безплатен одит на дигиталното ви присъствие.",
      freeAuditCta: "Безплатен одит →",
      services: "Услуги",
      company: "Компания",
      pages: "Страници",
      connect: "Свържете се",
      copyright: "Всички права запазени.",
      builtBy: "Изградено от Lyubomir Iliev",
      serviceLinks: [
        "Управление на социални мрежи",
        "AI генериране на съдържание",
        "Meta реклами",
        "SEO и стратегия",
        "Уеб разработка",
      ],
      companyLinks: ["За нас", "Клиенти", "Портфолио"],
      pageLinks: ["Услуги", "Портфолио", "Контакт"],
    },

    // Page heroes
    pageHeroes: {
      services: {
        label: "КАКВО ПРАВИМ",
        title: "Всичко, от което брандът ви се нуждае, за да",
        titleGradient: "доминира онлайн",
        description:
          "От AI маркетинг до уеб разработка — 18 услуги в три направления, всички под един покрив.",
      },
      work: {
        label: "НАШЕТО ПОРТФОЛИО",
        title: "Работата говори",
        titleGradient: "сама за себе си",
        description:
          "Пълна колекция от нашите последни проекти — дизайн, социални мрежи, уеб и AI съдържание.",
      },
      contact: {
        label: "СВЪРЖИ СЕ С НАС",
        title: "Нека изградим нещо",
        titleGradient: "уникално заедно",
        description:
          "Разкажи ни за проекта си. Ще се свържем с теб до 24 часа.",
      },
      projects: {
        label: "УЕБ РАЗРАБОТКА",
        title: "Сайтове, които",
        titleGradient: "работят и продават",
        description:
          "Уебсайтове и уеб приложения с фокус върху скорост, SEO и конверсии.",
      },
    },

    // Contact page quick stats strip
    contactQuickStats: [
      { label: "< 24ч", sub: "Отговор" },
      { label: "Безплатно", sub: "Консултация" },
      { label: "100%", sub: "Ангажираност" },
    ],

    // Clients section — client card content
    clientCards: {
      featured: {
        tagline: "Онлайн присъствие, което запълва масите преди отваряне.",
        industry: "Хотелиерство",
      },
      grid: [
        {
          tagline:
            "Бранд идентичност, толкова премиум, колкото имотите, които продават.",
          industry: "Недвижими имоти",
        },
        {
          tagline: "Контент стратегия, която заредена общността им онлайн.",
          industry: "Фитнес",
        },
        {
          tagline: "Визуално разказване, което резонира с осъзната аудитория.",
          industry: "Уелнес",
        },
        {
          tagline:
            "Дигитални кампании, изградени около любопитство и развитие.",
          industry: "Образование",
        },
        {
          tagline: "Издигнати визуали, създадени за луксозна публика.",
          industry: "Мода",
        },
      ],
    },

    // Clients page — full client stories
    clientStories: [
      {
        tagline: "Цялостно интериорно проектиране и реализация",
        description:
          "Премиум портфолио дизайн и Instagram разказване, превърнали всеки проект в маркетингов актив.",
        industry: "Интериорен дизайн",
        metrics: [
          { label: "Входящи запитвания" },
          { label: "Ангажираност" },
          { label: "Посещения на профила" },
        ],
      },
      {
        tagline: "Орални лентички с витамини и добавки",
        description:
          "Рекламни креативи, платени фунии и контент календар, изкарали нов продукт от нулев старт до претендент за категорията.",
        industry: "Хранителни добавки",
        metrics: [
          { label: "ROAS" },
          { label: "Регистрации за тест" },
          { label: "Разпознаваемост" },
        ],
      },
      {
        tagline: "Водеща марка китайски автомобили",
        description:
          "Премиум продуктови визуали и кампании на ниво дилърство, превели дигиталните импресии в посещения на шоурума.",
        industry: "Автомобили",
        metrics: [
          { label: "Посещения на шоурума" },
          { label: "Тест-драйви" },
          { label: "CTR" },
        ],
      },
      {
        tagline: "Корпоративна бенефит спортна карта",
        description:
          "Идентичност, социални мрежи и партньорства с инфлуенсъри — всичко обединено в една машина за растеж с метрики за задържане, които говорят сами.",
        industry: "Спорт и уелнес",
        metrics: [
          { label: "Разпознаваемост" },
          { label: "Задържане на клиенти" },
          { label: "Разширен обхват" },
        ],
      },
      {
        tagline: "Студио и академия за перманентен грим",
        description:
          "Пълна контент машина — кратки видеа, дълги публикации и lead magnets — превърнала любопитството в записвания за курсове.",
        industry: "Красота",
        metrics: [
          { label: "Разпознаваемост" },
          { label: "Задържане на клиенти" },
          { label: "Разширен обхват" },
        ],
      },
      {
        tagline: "Премиум бранд за електронни наргилета",
        description:
          "Пълно преизграждане с фокус върху социалните мрежи — превърнахме местен lounge в регионална дестинация с content, който запълва масите още преди вратите да се отворят.",
        industry: "Вейпинг",
        metrics: [
          { label: "Ангажираност" },
          { label: "Ръст в продажбите" },
          { label: "Обхват / мес." },
        ],
      },
      {
        tagline: "Wellplex имоти и строителство на сгради",
        description:
          "Висококачествено разказване на имоти, подкрепено от платени фунии — всяка обява превърната в канал за квалифицирани лийдове.",
        industry: "Недвижими имоти",
        metrics: [
          { label: "Разпознаваемост" },
          { label: "Генерирани лийдове" },
          { label: "Разширен обхват" },
        ],
      },
      {
        tagline: "Общност за уелнес и личностно развитие",
        description:
          "Редакционно съдържание и изчистен визуален език, позиционирали El Well като премиум избор на претъпкан пазар.",
        industry: "AI и новини",
        metrics: [
          { label: "Разпознаваемост" },
          { label: "Задържане на клиенти" },
          { label: "Разширен обхват" },
        ],
      },
      {
        tagline: "Парфюмни отливки от нишови аромати",
        description:
          "Дългосрочно позициониране, разпространение в кратък формат и бранд глас, изграден за доверие на всяка точка на контакт.",
        industry: "Парфюмерия",
        metrics: [
          { label: "Ръст на аудиторията" },
          { label: "Ангажираност" },
          { label: "Обхват" },
        ],
      },
    ],

    // Testimonials
    testimonialQuotes: [
      {
        quote:
          "Екипът на Aviva Digital ни помогна да достигнем нови висоти. Ангажираността ни нарасна с 200% само за 3 месеца!",
        name: "John Doe",
        role: "CEO на El Shisha",
      },
      {
        quote:
          "Професионализъм и реални идеи! Работата, която Aviva Digital върши, е на друго ниво — знаят точно от какво се нуждае един бранд.",
        name: "Jane Smith",
        role: "Маркетинг директор",
      },
      {
        quote:
          "Страхотно сътрудничество! Идеите им винаги са свежи и точни. Истинска силна машина за социални мрежи!",
        name: "Alex Johnson",
        role: "Бранд мениджър",
      },
      {
        quote:
          "Работата с Aviva Digital изцяло трансформира онлайн присъствието ни. Продажбите се увеличиха с 50% само за първото тримесечие.",
        name: "Maria Ivanova",
        role: "Основател на La Manière",
      },
      {
        quote:
          "AI подходът им към маркетинга е нещо, каквото не бяхме виждали. Генерирането на лийдове се удвои за два месеца.",
        name: "Dimitar Petrov",
        role: "Директор на Pulse Homes",
      },
      {
        quote:
          "Качеството на съдържанието и скоростта на изпълнение са невероятни. Общността ни нарасна с 30% органично — без преки пътища.",
        name: "Sofia Georgieva",
        role: "CMO на Fox Academy",
      },
    ],

    // Service dropdown
    serviceDropdown: {
      categories: {
        marketing: "Маркетинг и социални мрежи",
        creative: "Криейтив и съдържание",
        web: "Уеб и разработка",
      },
      services: {
        socialMedia: "Управление на социални мрежи",
        aiMarketing: "AI маркетинг",
        metaAds: "Meta реклами",
        graphicPrint: "Графичен дизайн (печат)",
        graphicDigital: "Графичен дизайн (дигитален)",
        videoFilming: "Заснемане и монтаж на видео",
        websiteDev: "Изграждане на уебсайтове",
        customSolutions: "Персонализирани решения",
        ecommerce: "Е-commerce уебсайтове",
      },
    },

    // Services list (full data for /services page)
    categoriesList: [
      { id: "marketing", label: "Дигитален маркетинг" },
      { id: "creative", label: "Дизайн и видео" },
      { id: "web", label: "Уебсайтове и приложения" },
    ],
    servicesList: [
      {
        id: "social-media-management",
        title: "Управление на социални мрежи",
        description:
          "Стратегическо съдържание, планиране и управление на общност във всички платформи.",
        benefits: [
          "Ежедневно създаване на съдържание",
          "Ангажиране на общността",
          "Анализ и отчети",
          "Платформена стратегия",
        ],
      },
      {
        id: "ai-powered-marketing",
        title: "Маркетинг с изкуствен интелект",
        description:
          "Кампании, задвижвани от машинно обучение, които се адаптират и оптимизират в реално време.",
        benefits: [
          "Предиктивно таргетиране на аудитория",
          "Оптимизация в реално време",
          "AI копирайтинг",
          "Прогнозиране на резултати",
        ],
      },
      {
        id: "meta-ads-campaigns",
        title: "Meta Ads кампании",
        description:
          "Високоефективни рекламни кампании във Facebook и Instagram с прецизно таргетиране.",
        benefits: [
          "Стратегия на кампанията",
          "A/B тестване",
          "Ретаргетинг фунии",
          "ROAS оптимизация",
        ],
      },
      {
        id: "email-marketing",
        title: "Имейл маркетинг",
        description:
          "Автоматизирани последователности и кампании, които изграждат доверие и генерират продажби.",
        benefits: [
          "Автоматизирани потоци",
          "Сегментиране на списъци",
          "A/B тестване",
          "Оптимизация на доставяемост",
        ],
      },
      {
        id: "graphic-design",
        title: "Графичен дизайн",
        description:
          "Дигитални визии — дизайн, съответстващ на бранда, който спира скролването.",
        benefits: [
          "Консистентност на бранда",
          "Дигитални формати",
          "Анимирани активи",
          "Неограничени корекции",
        ],
      },
      {
        id: "print-materials",
        title: "Печатни материали",
        description:
          "Брошури, банери, опаковки и всички печатни материали — перфектни до последния пиксел.",
        benefits: [
          "Консистентност на бранда",
          "Файлове готови за печат",
          "Множество формати",
          "Неограничени корекции",
        ],
      },
      {
        id: "video-filming",
        title: "Видео заснемане",
        description:
          "Професионална видеопродукция за реклами, brand истории и съдържание за социални мрежи.",
        benefits: [
          "4K продукция",
          "Снимки на локация",
          "Писане на сценарий",
          "Формати за всички платформи",
        ],
      },
      {
        id: "video-editing",
        title: "Видео обработка",
        description:
          "Постпродукция, цветова корекция, субтитри и експорт, оптимизиран за всяка платформа.",
        benefits: [
          "Цветова корекция",
          "Motion graphics",
          "Субтитри",
          "Платформена оптимизация",
        ],
      },
      {
        id: "copywriting",
        title: "Копирайтинг",
        description:
          "Убедителни текстове за реклами, уебсайтове, социални мрежи и имейли — думи, които конвертират.",
        benefits: [
          "Текстове за реклами и landing pages",
          "Надписи за социални мрежи",
          "Имейл последователности",
          "Насоки за бранд глас",
        ],
      },
      {
        id: "ai-image-generation",
        title: "AI генериране на изображения",
        description:
          "Фотореалистични AI визии — изображения, съответстващи на бранда, създадени за минути, не за дни.",
        benefits: [
          "Фотореалистични изображения",
          "Стил, съответстващ на бранда",
          "Множество съотношения на екрана",
          "Неограничени вариации",
        ],
      },
      {
        id: "ai-video-generation",
        title: "AI генериране на видео",
        description:
          "Кинематографични AI видео последователности — часове продукция, компресирани в минути изпълнение.",
        benefits: [
          "Кинематографично AI видео",
          "Стил, съответстващ на бранда",
          "Множество съотношения на екрана",
          "Оптимизиран експорт за платформи",
        ],
      },
      {
        id: "seo-optimization",
        title: "SEO оптимизация",
        description:
          "Техническо и съдържателно SEO за доминиране в резултатите от търсене във вашата ниша.",
        benefits: [
          "Проучване на ключови думи",
          "On-page оптимизация",
          "Изграждане на връзки",
          "Месечни отчети",
        ],
      },
      {
        id: "custom-websites-nextjs",
        title: "Персонализирани уебсайтове",
        description:
          "Уникални React / Next.js разработки с архитектура, ориентирана към производителност.",
        benefits: [
          "99+ Lighthouse резултат",
          "TypeScript кодова база",
          "Статичен експорт",
          "CI/CD готовност",
        ],
      },
      {
        id: "online-store-ecommerce",
        title: "Онлайн магазин / E-commerce",
        description:
          "Пълни e-commerce решения — Shopify магазини, персонализирани разработки, плащания, склад и логистика.",
        benefits: [
          "Shopify и персонализирани разработки",
          "Платежни портали",
          "Управление на склад",
          "Автоматизация на поръчки",
        ],
      },
      {
        id: "web-applications",
        title: "Уеб приложения",
        description:
          "Кросплатформени приложения, изградени с React Native и Electron.",
        benefits: [
          "Кросплатформеност",
          "Офлайн поддръжка",
          "Push известия",
          "Готовност за App Store",
        ],
      },
      {
        id: "saas-solutions",
        title: "SaaS решения",
        description:
          "Мащабируеми SaaS продукти — от MVP до производствено-готова платформа.",
        benefits: [
          "Мащабируема архитектура",
          "Автентикация & фактуриране",
          "Dashboard интерфейс",
          "API интеграции",
        ],
      },
      {
        id: "hosting-domain",
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
    ],

    // Work page filter labels
    workFilters: {
      socialContent: "Социални мрежи и съдържание",
      webDevelopment: "Уеб разработка",
      all: "Всички",
      visual: "Дизайни",
      reels: "Reels",
      ai: "AI",
      print: "Печат",
      customWebsites: "Уебсайтове по поръчка",
      ecommerce: "Онлайн магазини",
      visitWebsite: "Разгледайте сайта",
      visit: "Посети",
      browseWebsite: "Разгледайте сайта",
    },

    // Language
    language: "Език",
  },
} satisfies Record<Locale, unknown>;

export type Translations = typeof translations.en;
