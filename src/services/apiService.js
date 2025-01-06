import axios from "axios";

const NEWSAPI_API_KEY = "76aae0c75ed742faafbe41dea6d756a0";

export const fetchArticles = async (searchQuery, filters) => {
  const { category, source } = filters;

  const response = await axios.get("https://newsapi.org/v2/top-headlines", {
    params: {
      q: searchQuery || "latest",
      category: category || undefined,
      sources: source || undefined,
      apiKey: NEWSAPI_API_KEY,
    },
  });

  return response.data.articles.map((article) => ({
    title: article.title,
    description: article.description,
    image: article.urlToImage,
    url: article.url,
  }));
};
