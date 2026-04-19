export interface PortfolioItem {
  src: string
  title: string
  category: 'Designs' | 'Social' | 'Web' | 'Video'
}

export const portfolioItems: PortfolioItem[] = [
  { src: '/designs/design1.jpg', title: 'Brand Identity Design',     category: 'Designs' },
  { src: '/designs/design2.jpg', title: 'Social Media Campaign',     category: 'Social'  },
  { src: '/designs/design3.jpg', title: 'Digital Marketing Visuals',  category: 'Designs' },
  { src: '/designs/design4.jpg', title: 'E-commerce Web Design',     category: 'Web'     },
  { src: '/designs/design5.jpg', title: 'Video Ad Creative',         category: 'Video'   },
  { src: '/designs/design6.jpg', title: 'Product Photography',       category: 'Designs' },
  { src: '/designs/design7.jpg', title: 'Social Content Series',     category: 'Social'  },
  { src: '/designs/design8.jpg', title: 'Landing Page Design',       category: 'Web'     },
]

export const portfolioCategories = ['All', 'Designs', 'Social', 'Web', 'Video'] as const
