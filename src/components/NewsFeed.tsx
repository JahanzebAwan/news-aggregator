import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "../services/apiService";
import NewsCard from "./NewsCard";

const NewsFeed = ({ searchQuery, filters }) => {
  const {
    data: articles = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["articles", searchQuery, filters],
    queryFn: () => fetchArticles(searchQuery, filters),
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });

  if (isLoading) return <p>Loading articles...</p>;
  if (isError) return <p>Error fetching articles.</p>;

  return (
    <div
      style={{
        padding: "16px",
        display: "grid",
        gap: "16px",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        justifyContent: "center",
      }}
    >
      {articles.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
    </div>
  );
};

export default NewsFeed;
