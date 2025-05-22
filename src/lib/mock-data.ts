import type { Article } from '@/types';

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Groundbreaking AI Discovers New Material for Batteries',
    content: 'Researchers at Tech University have utilized a novel AI algorithm to identify a new material that could revolutionize battery technology. The material, dubbed "Energon-X," promises to double energy density and reduce charging times by half. This discovery could pave the way for longer-lasting electric vehicles and more efficient portable electronics. The team is now working on scaling up production for commercial viability.',
    category: 'Technology',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'technology battery',
    publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    source: 'Tech Chronicle',
  },
  {
    id: '2',
    title: 'Global Summit Addresses Climate Change Urgency',
    content: 'Leaders from around the world convened today for a high-stakes summit on climate change. Discussions centered on accelerating the transition to renewable energy sources and implementing stricter emissions targets. Several developing nations called for increased financial support from wealthier countries to aid in their green initiatives. A joint declaration is expected by the end of the week.',
    category: 'World',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'world summit',
    publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    source: 'Global News Network',
  },
  {
    id: '3',
    title: 'SpaceX Launches Starlink Satellites, Expanding Global Coverage',
    content: 'SpaceX successfully launched another batch of Starlink satellites earlier this morning. This mission further expands the company\'s ambitious plan to provide high-speed internet access to remote and underserved areas globally. The Falcon 9 rocket delivered the payload to orbit without a hitch, and the first stage booster made a successful landing on the droneship.',
    category: 'Science',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'space rocket',
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    source: 'Cosmic Times',
  },
  {
    id: '4',
    title: 'Stock Market Hits Record High Amidst Economic Optimism',
    content: 'The stock market surged to a new record high today, fueled by positive economic indicators and strong corporate earnings reports. Investor confidence appears to be on the rise as inflation concerns ease slightly. Analysts are cautiously optimistic, noting potential headwinds but overall a robust outlook for the coming quarter.',
    category: 'Business',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'business stock market',
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), // 10 hours ago
    source: 'Financial Post',
  },
  {
    id: '5',
    title: 'New Breakthrough in Cancer Research: Personalized Therapy Shows Promise',
    content: 'A new study published in the Journal of Medicine highlights a promising personalized cancer therapy. The treatment, which tailors drug regimens based on individual genetic markers, has shown remarkable success in early-stage clinical trials for a specific type of lung cancer. Researchers are hopeful this approach could be adapted for other forms of cancer.',
    category: 'Health',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'health research',
    publishedAt: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(), // 15 hours ago
    source: 'Medical Today',
  },
  {
    id: '6',
    title: 'The Future of Urban Transportation: Flying Taxis Take Flight',
    content: 'The dream of flying taxis is inching closer to reality. Several companies showcased their latest electric vertical takeoff and landing (eVTOL) aircraft at the Future Mobility Expo. While regulatory hurdles and public acceptance remain, proponents envision a future where urban commutes are transformed by these aerial vehicles, reducing congestion on city streets.',
    category: 'Technology',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'technology future',
    publishedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(), // 20 hours ago
    source: 'Future Forward',
  },
];

export const getMockArticles = async (): Promise<Article[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};

export const getMockArticleById = async (id: string): Promise<Article | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 50));
  return mockArticles.find(article => article.id === id);
};

export const getMockCategories = async (): Promise<string[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 50));
  const categories = new Set(mockArticles.map(article => article.category));
  return ['All', ...Array.from(categories)];
};
