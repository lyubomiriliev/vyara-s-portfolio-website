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
      line3: "Engineered to Convert.",
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
      brandCount: "+ brands we've worked with",
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
      firstName: "First Name",
      lastName: "Last Name",
      firstNamePlaceholder: "Your first name",
      lastNamePlaceholder: "Your last name",
      emailAddress: "Email Address",
      emailPlaceholder2: "you@company.com",
      phone: "Phone",
      phonePlaceholder: "Your phone number",
      company: "Company",
      companyPlaceholder: "Company name (optional)",
      serviceInterest: "Service Interest",
      selectService: "Select a service...",
      message: "Message",
      successTitle: "Message Sent!",
      successSub: "We'll get back to you within 24 hours.",
      sendAnother: "Send another message →",
      errorFull:
        "Something went wrong. Please try again or email us directly at info@avivadigital.bg.",
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
        tagline: "Premium nightlife brand reimagined.",
        description:
          "A complete social-first rebuild that turned a local lounge into a regional destination — with content that books tables before the doors open.",
        industry: "Hospitality & Lifestyle",
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
        tagline: "From storefront to scroll-stopping.",
        description:
          "A bold visual system and conversion-engineered ad creative that turned product drops into sell-out events.",
        industry: "E-commerce / Fitness",
        metrics: [
          { label: "ROAS" },
          { label: "Repeat Buyers" },
          { label: "AOV Growth" },
        ],
      },
      {
        tagline: "A fitness brand built to scale.",
        description:
          "Identity, social, and creator partnerships engineered into one growth machine — with retention metrics to match.",
        industry: "Fitness & Wellness",
        metrics: [
          { label: "Brand Recognition" },
          { label: "Client Retention" },
          { label: "Reach Expanded" },
        ],
      },
      {
        tagline: "Wellness that feels like luxury.",
        description:
          "Editorial-grade content and a refined visual language that positioned El Well as the premium choice in a crowded market.",
        industry: "Wellness & Beauty",
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
        industry: "Education",
        metrics: [
          { label: "Brand Recognition" },
          { label: "Client Retention" },
          { label: "Reach Expanded" },
        ],
      },
      {
        tagline: "Architecture, scaled by storytelling.",
        description:
          "Premium portfolio design and Instagram storytelling that elevated every project into a marketing asset.",
        industry: "Interior & Architecture",
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
        industry: "Consumer Tech",
        metrics: [
          { label: "ROAS" },
          { label: "Trial Signups" },
          { label: "Brand Recall" },
        ],
      },
      {
        tagline: "A personal brand with executive polish.",
        description:
          "Long-form positioning, short-form distribution, and a brand voice engineered for trust at every touchpoint.",
        industry: "Personal Brand",
        metrics: [
          { label: "Audience Growth" },
          { label: "Engagement" },
          { label: "Reach" },
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
    cta: "Свържи се",
    seeAll: "Виж всички →",

    // Hero
    hero: {
      badge: "AI дигитална агенция",
      line1: "Изграждаме",
      line2: "Силни брандове",
      line3: "Които продават.",
      sub: "Ново поколение дигитална агенция — където AI технологиите срещат истинска креативност. Правим брандове, на които хората обръщат внимание.",
      ctaPrimary: "Започни проекта си →",
      ctaSecondary: "Виж нашата работа",
      stats: [
        { label: "Поста и сторита" },
        { label: "Дизайна" },
        { label: "Кампании" },
        { label: "Клиенти" },
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
      learnMore: "Разбери повече за нас →",
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
          body: "Работим с данни. Следим какво работи, оптимизираме и мащабираме — и ти виждаш всичко.",
        },
      ],
    },

    // ServicesPreview
    services: {
      label: "КАКВО ПРАВИМ",
      title: "Всичко, от което брандът ти се нуждае",
      sub: "От AI съдържание до уеб разработка — работим по целия процес, не само по части от него.",
      seeAll: "Виж всичките 18 услуги →",
      learnMore: "Научи повече →",
      getStarted: "Започни →",
      across3: "18 услуги в 3 направления",
      allServices: "Всички услуги",
      columns: [
        { label: "Маркетинг и социални мрежи" },
        { label: "Креатив и съдържание" },
        { label: "Уеб и разработка" },
      ],
    },

    // PortfolioPreview
    portfolio: {
      label: "НАШЕТО ПОРТФОЛИО",
      title: "Работата говори",
      titleLine2: "сама за себе си",
      acrossCategories: "проекта в 4 категории",
      sub: "Избрани проекти с реални резултати за реални бизнеси.",
      viewAll: "Виж цялото портфолио →",
      viewProject: "Виж проекта →",
    },

    // Clients (section on homepage)
    clients: {
      label: "РЕЗУЛТАТИ",
      title1: "Реални брандове.",
      titleAccent: "Реални резултати.",
      sub: "Всеки проект носи измерими резултати — не просто хубав дизайн.",
      seeAll: "Виж всички клиенти →",
      sectionLabel: "НАШИТЕ КЛИЕНТИ",
      sectionTitle: "Брандове, които",
      sectionTitleAccent: "ни се довериха",
      sectionSub:
        "Работим с амбициозни бизнеси — от малки местни марки до разрастващи се компании. Помагаме им да изградят силно онлайн присъствие.",
      brandCount: "+ бранда, с които сме работили",
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
      showcaseLabel: "РАЗГЛЕДАЙ ВСИЧКИ",
      showcaseTitle: "Всеки бранд —",
      showcaseTitleAccent: "история, която си струва да се разкаже.",
      showcaseSub:
        "Разгледай клиентите, с които сме работили — от хотелиерство и недвижими имоти до лични брандове и технологии.",
      caseStudy: "Казус",
      ctaTitle: "Искаш и твоят бранд",
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
      titleAccent: "нашиите клиенти",
    },

    // CTABanner
    ctaBanner: {
      label: "ГОТОВИ ЛИ СТЕ?",
      title: "Искате ли брандът ви да расте",
      titleAccent: "с помощта на AI?",
      sub: "Нека поговорим какво е възможно. Безплатна консултация, без задължения.",
      cta: "Безплатна консултация",
      ctaSecondary: "Пишете ни",
    },

    // Contact form
    contactForm: {
      label: "СВЪРЖИ СЕ С НАС",
      title: "Нека поговорим",
      sub: "Имаш идея или проект? Попълни формата и ще се свържем с теб до 24 часа.",
      namePlaceholder: "Твоето име",
      emailPlaceholder: "Твоят имейл",
      messagePlaceholder: "Разкажи ни за проекта си...",
      submit: "Изпрати съобщение",
      sending: "Изпращане...",
      successMsg: "Съобщението е изпратено! Скоро ще се чуем.",
      errorMsg: "Нещо се обърка. Опитай пак.",
      firstName: "Собствено име",
      lastName: "Фамилия",
      firstNamePlaceholder: "Твоето собствено име",
      lastNamePlaceholder: "Твоята фамилия",
      emailAddress: "Имейл адрес",
      emailPlaceholder2: "ти@компания.com",
      phone: "Телефон",
      phonePlaceholder: "Твоят телефон",
      company: "Компания",
      companyPlaceholder: "Название на компанията (по желание)",
      serviceInterest: "Интересуваш се от",
      selectService: "Избери услуга...",
      message: "Съобщение",
      successTitle: "Съобщението е изпратено!",
      successSub: "Ще се свържем с теб до 24 часа.",
      sendAnother: "Изпрати ново съобщение →",
      errorFull:
        "Нещо се обърка. Опитай пак или ни пиши директно на info@avivadigital.bg.",
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
      liveProject: "Виж сайта →",
      viewDetails: "Виж детайли →",
      ctaTitle: "Искаш сайт, който",
      ctaTitleAccent: "наистина работи?",
      ctaSub: "Разкажи ни за проекта си и ще се свържем с теб до 24 часа.",
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
      processTitleAccent: "с теб",
      role: "Креативен директор",
      bio: "Виара е човекът зад стратегията и визията на Aviva Digital. С опит в AI маркетинга, социалните мрежи и управлението на брандове, тя ръководи екипа към резултати, които се усещат — не просто изглеждат добре.",
      ctaTitle: "Искаш да работим заедно?",
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
      freeAudit: "Поискай безплатен одит на дигиталното ти присъствие.",
      freeAuditCta: "Безплатен одит →",
      services: "Услуги",
      company: "Компания",
      pages: "Страници",
      connect: "Свържи се",
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
        title: "Всичко, от което брандът ти се нуждае, за да",
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
        tagline: "Премиум нощен бранд, преосмислен от нулата.",
        description:
          "Пълно преизграждане с фокус върху социалните мрежи — превърнахме местен lounge в регионална дестинация с content, който запълва масите още преди вратите да се отворят.",
        industry: "Хотелиерство и лайфстайл",
        metrics: [
          { label: "Ангажираност" },
          { label: "Ръст в продажбите" },
          { label: "Обхват / мес." },
        ],
      },
      {
        tagline: "Обяви, които затварят сделки — не само изглеждат добре.",
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
        tagline: "От витрина до спиране на скрола.",
        description:
          "Смела визуална система и рекламни креативи, насочени към конверсии — пускането на нови продукти се превърна в разпродадени событие.",
        industry: "Е-commerce / Фитнес",
        metrics: [
          { label: "ROAS" },
          { label: "Повторни купувачи" },
          { label: "Ръст в AOV" },
        ],
      },
      {
        tagline: "Фитнес бранд, изграден за мащабиране.",
        description:
          "Идентичност, социални мрежи и партньорства с инфлуенсъри — всичко обединено в една машина за растеж с метрики за задържане, които говорят сами.",
        industry: "Фитнес и уелнес",
        metrics: [
          { label: "Разпознаваемост" },
          { label: "Задържане на клиенти" },
          { label: "Разширен обхват" },
        ],
      },
      {
        tagline: "Уелнес, който се усеща като лукс.",
        description:
          "Редакционно съдържание и изчистен визуален език, позиционирали El Well като премиум избор на претъпкан пазар.",
        industry: "Уелнес и красота",
        metrics: [
          { label: "Разпознаваемост" },
          { label: "Задържане на клиенти" },
          { label: "Разширен обхват" },
        ],
      },
      {
        tagline: "Образование, създадено за ерата на алгоритмите.",
        description:
          "Пълна контент машина — кратки видеа, дълги публикации и lead magnets — превърнала любопитството в записвания за курсове.",
        industry: "Образование",
        metrics: [
          { label: "Разпознаваемост" },
          { label: "Задържане на клиенти" },
          { label: "Разширен обхват" },
        ],
      },
      {
        tagline: "Архитектура, мащабирана чрез разказване.",
        description:
          "Премиум портфолио дизайн и Instagram разказване, превърнали всеки проект в маркетингов актив.",
        industry: "Интериор и архитектура",
        metrics: [
          { label: "Входящи запитвания" },
          { label: "Ангажираност" },
          { label: "Посещения на профила" },
        ],
      },
      {
        tagline: "Лансиране с импулс.",
        description:
          "Рекламни креативи, платени фунии и контент календар, изкарали нов продукт от нулев старт до претендент за категорията.",
        industry: "Потребителски технологии",
        metrics: [
          { label: "ROAS" },
          { label: "Регистрации за тест" },
          { label: "Разпознаваемост" },
        ],
      },
      {
        tagline: "Личен бранд с изпълнителски лъск.",
        description:
          "Дългосрочно позициониране, разпространение в кратък формат и бранд глас, изграден за доверие на всяка точка на контакт.",
        industry: "Личен бранд",
        metrics: [
          { label: "Ръст на аудиторията" },
          { label: "Ангажираност" },
          { label: "Обхват" },
        ],
      },
      {
        tagline: "Автомобилно съдържание, което задвижва намерения.",
        description:
          "Премиум продуктови визуали и кампании на ниво дилърство, превели дигиталните импресии в посещения на шоурума.",
        industry: "Автомобилна индустрия",
        metrics: [
          { label: "Посещения на шоурума" },
          { label: "Тест-драйви" },
          { label: "CTR" },
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

    // Language
    language: "Език",
  },
} satisfies Record<Locale, unknown>;

export type Translations = typeof translations.en;
