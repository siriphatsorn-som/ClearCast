import { useEffect, useState } from "react";
import { getNews } from "../services/api";
import { formatDate } from "../utils/dateUtil";
import EmptyState from "../components/EmptyState";
import NewsSkeleton from "../components/News/NewsSkeleton";

export default function News({ city }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getNews(city);
        setNews(res.data);
      } catch (err) {
        setError("Failed to fetch news", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [city]);

  if (loading) return <NewsSkeleton />;
  if (error) return <p className="text-red-400">{error}</p>;
  if (news.length === 0)
    return (
      <EmptyState
        icon="news"
        title="No news available"
        message="No recent news found for this location"
      />
    );

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-(--text-primary) font-semibold text-xl">
        Weather News
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {news.map((article) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-4 bg-(--bg-card) rounded-2xl p-4 border border-(--border) hover:opacity-80 transition-opacity"
          >
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                className="w-24 h-24 md:size-40 object-cover rounded-xl shrink-0"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/160x160?text=No+Image";
                }}
              />
            )}
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs text-(--text-secondary) bg-(--bg-input) px-2 py-0.5 rounded-full shrink-0">
                  {article.source.name}
                </span>
                <span className="text-xs text-(--text-secondary) truncate">
                  {formatDate(article.publishedAt)}
                </span>
              </div>
              <p className="text-(--text-primary) font-medium text-sm line-clamp-1 md:line-clamp-2 ">
                {article.title}
              </p>
              <p className="text-(--text-secondary) text-xs line-clamp-2 md:line-clamp-4">
                {article.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
