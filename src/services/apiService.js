import axios from "axios";

const NEWSAPI_API_KEY = "76aae0c75ed742faafbe41dea6d756a0";
const NY_API_KEY = "nUj1Uk4m9Q0fN69PVmYWISkZ9hA4Jidk";

export const fetchArticles = async (searchQuery, filters) => {
  const { source } = filters;

  const fetchFromNewsApi = async () => {
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        q: "latest",
        apiKey: NEWSAPI_API_KEY,
      },
    });
    return response.data.articles.map((article) => ({
      title: article.title,
      description: article.description,
      image: article.urlToImage,
      url: article.url,
      author: article.author || "Unknown Author",
      published_date: article.publishedAt,
      source: "NewsApi",
    }));
  };

  const fetchFromNewYorkTimes = async () => {
    const response = await axios.get(
      `https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?api-key=${NY_API_KEY}`
    );
    return response.data.results.map((article) => ({
      title: article.title,
      description: article.abstract,
      image: article.media?.[0]?.["media-metadata"]?.[2]?.url || "",
      url: article.url,
      author: article.byline || "Unknown Author",
      published_date: article.published_date,
      source: "NewYorkTimes",
    }));
  };

  if (source === "NewsApi") {
    return await fetchFromNewsApi();
  } else if (source === "NewYorkTimes") {
    return await fetchFromNewYorkTimes();
  } else if (source === "all") {
    // Fetch from both APIs concurrently
    const [newsApiArticles, nyTimesArticles] = await Promise.all([
      fetchFromNewsApi(),
      fetchFromNewYorkTimes(),
    ]);
    const filterNewsApiArticles = newsApiArticles.filter(
      (article) => !article.title.includes("[Removed]")
    );
    return [...filterNewsApiArticles, ...nyTimesArticles];
  }

  return [];
};
