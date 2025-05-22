
export interface Article {
  id: string;
  title: string;
  content: string;
  summary?: string;
  category: string;
  imageUrl: string;
  publishedAt: string; // ISO date string
  keywords?: string[];
  source: string;
}
