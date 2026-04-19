export interface Project {
  slug: string
  title: string
  client: string
  category: 'Designs' | 'Social' | 'Web' | 'Video'
  coverImage: string
  images: string[]
  description: string
  services: string[]
  results?: {
    value: string
    label: string
  }[]
  year?: string
}

export const projects: Project[] = [
  {
    slug: 'brand-identity-design',
    title: 'Brand Identity Design',
    client: 'Aviva Digital',
    category: 'Designs',
    coverImage: '/instagrams/elshisha.png',
    images: ['/designs/design1.jpg'],
    description:
      'A comprehensive brand identity system built to communicate trust, modernity, and precision. We developed the full visual language — logo, typography, colour palette, and brand guidelines — ensuring consistency across every touchpoint.',
    services: ['Brand Identity', 'Graphic Design', 'Art Direction'],
    results: [
      { value: '+60%', label: 'Brand Recognition' },
      { value: '2x',   label: 'Audience Engagement' },
    ],
    year: '2024',
  },
  {
    slug: 'social-media-campaign',
    title: 'Social Media Campaign',
    client: 'El Shisha',
    category: 'Social',
    coverImage: '/designs/design2.jpg',
    images: ['/designs/design2.jpg'],
    description:
      'A high-impact social media campaign designed to drive awareness and conversions across Instagram and Facebook. Through AI-assisted content planning and striking visual storytelling, we delivered measurable growth in reach and engagement.',
    services: ['Social Media Management', 'Meta Ads', 'AI Content Generation', 'Graphic Design'],
    results: [
      { value: '+40%', label: 'Sales Growth' },
      { value: '+340%', label: 'Content Engagement' },
    ],
    year: '2024',
  },
  {
    slug: 'digital-marketing-visuals',
    title: 'Digital Marketing Visuals',
    client: 'Pulse Homes',
    category: 'Designs',
    coverImage: '/designs/design3.jpg',
    images: ['/designs/design3.jpg'],
    description:
      'A full suite of digital marketing creatives crafted to amplify Pulse Homes\'s presence across digital platforms. Each visual was optimised for platform-specific performance, from feed posts to story ads.',
    services: ['Graphic Design (Digital)', 'Meta Ads', 'AI Image Generation'],
    results: [
      { value: '+40%', label: 'Reach Expanded' },
      { value: '2x',   label: 'Lead Generation' },
    ],
    year: '2024',
  },
  {
    slug: 'ecommerce-web-design',
    title: 'E-commerce Web Design',
    client: 'Coolfit',
    category: 'Web',
    coverImage: '/instagrams/fine-design.png',
    images: ['/designs/design4.jpg'],
    description:
      'A conversion-focused e-commerce experience built on Shopify. We redesigned the entire customer journey — from landing page to checkout — with a clean, modern aesthetic that reduced friction and boosted sales.',
    services: ['Shopify Websites', 'Graphic Design (Digital)', 'SEO Optimization'],
    results: [
      { value: '+35%', label: 'Conversion Rate' },
      { value: '1.8x', label: 'Average Order Value' },
    ],
    year: '2024',
  },
  {
    slug: 'video-ad-creative',
    title: 'Video Ad Creative',
    client: 'El Well',
    category: 'Video',
    coverImage: '/instagrams/el-well.png',
    images: ['/designs/design5.jpg'],
    description:
      'A series of short-form video ads produced for Meta and TikTok. Combining professional filming with AI-assisted editing and motion graphics, each video was optimised for the first-second hook that drives watch-through rates.',
    services: ['Video Filming', 'Video Editing', 'AI Video Generation', 'Meta Ads'],
    results: [
      { value: '+45%', label: 'Video Watch-Through' },
      { value: '4.8x', label: 'ROAS' },
    ],
    year: '2024',
  },
  {
    slug: 'product-photography',
    title: 'Product Photography',
    client: 'La Manière',
    category: 'Designs',
    coverImage: '/designs/design6.jpg',
    images: ['/designs/design6.jpg'],
    description:
      'Studio-quality product photography elevated with AI retouching and colour science. We produced a full catalogue of hero and lifestyle shots, ready for web, print, and paid advertising use.',
    services: ['AI Image Generation', 'Graphic Design (Digital)', 'Brand Identity'],
    results: [
      { value: '+50%', label: 'Catalogue Engagement' },
      { value: '2.5x', label: 'Product Page Conversions' },
    ],
    year: '2024',
  },
  {
    slug: 'social-content-series',
    title: 'Social Content Series',
    client: 'Fox Academy',
    category: 'Social',
    coverImage: '/designs/design7.jpg',
    images: ['/designs/design7.jpg'],
    description:
      'An ongoing monthly social content series for Fox Academy, covering educational posts, community stories, and event promotions. Content was produced at scale using AI workflows to maintain quality at speed.',
    services: ['Social Media Management', 'AI Content Generation', 'Graphic Design (Digital)'],
    results: [
      { value: '+30%', label: 'Follower Growth' },
      { value: '+45%', label: 'Organic Reach' },
    ],
    year: '2024',
  },
  {
    slug: 'landing-page-design',
    title: 'Landing Page Design',
    client: 'Vapy',
    category: 'Web',
    coverImage: '/designs/design8.jpg',
    images: ['/designs/design8.jpg'],
    description:
      'A high-converting campaign landing page designed and built in Next.js. Optimised for speed, SEO, and conversion with A/B-tested copy, strategic CTAs, and a mobile-first layout that performs across all devices.',
    services: ['Website Creation', 'Custom Websites (Next.js)', 'SEO Optimization'],
    results: [
      { value: '+55%', label: 'Landing Page CVR' },
      { value: '#1',   label: 'Google Ranking in 60 days' },
    ],
    year: '2024',
  },
]

export const projectCategories = ['All', 'Designs', 'Social', 'Web', 'Video'] as const
