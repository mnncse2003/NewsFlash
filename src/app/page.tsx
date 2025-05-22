import { NewsFeedClient } from '@/components/NewsFeedClient';
import { fetchArticles, fetchCategories } from '@/actions/newsActions';

export default async function HomePage() {
  const articles = await fetchArticles();
  const categories = await fetchCategories();

  return (
    <NewsFeedClient initialArticles={articles} categories={categories} />
  );
}
