import { useQuery } from "@tanstack/react-query";
import NewsCard from "./NewsCard";
import { fetchArticles } from "../services/apiService";
import Filter from "./Filter";
import { Box } from "@mui/material";
import { useState } from "react";
import { usePreferences } from "../hooks/usePreferences";

interface NewsFeedProps {
  searchQuery: string;
}

const NewsFeed = ({ searchQuery }: NewsFeedProps) => {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    source: "",
  });

  const { preferredAuthor, preferredSource } = usePreferences(); // Using the custom hook

  const {
    data: articles = [],
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["articles", searchQuery], // Do not include filters in the query
    queryFn: () => fetchArticles(searchQuery),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 3, // Retry 3 times
  });

  // Filter function
  const applyFilters = ({
    startDate,
    endDate,
    source,
  }: {
    startDate: string;
    endDate: string;
    source: string;
  }) => {
    setFilters({ startDate, endDate, source });
  };

  // Helper function to safely normalize and compare strings
  const normalizeString = (str: string | null) => {
    return str ? str.toLowerCase().trim() : "";
  };

  // Filtered articles based on the selected date range, source, and preferences
  const filteredArticles = articles.filter((article) => {
    let matches = true;

    // Normalize preferred author and article author (case insensitive)
    if (
      preferredAuthor &&
      normalizeString(article.author) !== normalizeString(preferredAuthor)
    ) {
      console.log(
        `Excluding article by ${article.author} (doesn't match preferred author)`
      );
      matches = false;
    }

    // Normalize preferred source and article source (case insensitive)
    if (
      preferredSource &&
      normalizeString(article.source) !== normalizeString(preferredSource)
    ) {
      console.log(
        `Excluding article from ${article.source} (doesn't match preferred source)`
      );
      matches = false;
    }

    // Date range filter
    if (filters.startDate) {
      const articleDate = new Date(article.published_date);
      const filterStartDate = new Date(filters.startDate);
      if (articleDate < filterStartDate) {
        console.log(`Excluding article (before start date)`);
        matches = false;
      }
    }

    if (filters.endDate) {
      const articleDate = new Date(article.published_date);
      const filterEndDate = new Date(filters.endDate);
      if (articleDate > filterEndDate) {
        console.log(`Excluding article (after end date)`);
        matches = false;
      }
    }

    // Source filter (from filter options)
    if (
      filters.source &&
      normalizeString(article.source) !== normalizeString(filters.source)
    ) {
      console.log(`Excluding article (doesn't match selected source)`);
      matches = false;
    }

    return matches;
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return (
      <div>
        <p>Error fetching articles: {errorMessage}</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  return (
    <Box>
      <Filter
        onFilterChange={applyFilters}
        availableSources={[
          ...new Set(articles.map((article) => article.source)),
        ]}
      />
      <Box
        sx={{
          padding: "16px",
          display: "grid",
          gap: "16px",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          justifyContent: "center",
        }}
      >
        {filteredArticles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </Box>
    </Box>
  );
};

export default NewsFeed;
