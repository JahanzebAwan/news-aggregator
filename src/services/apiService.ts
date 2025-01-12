import axios from "axios";

const NEWSAPI_API_KEY = "76aae0c75ed742faafbe41dea6d756a0";
const NY_API_KEY = "nUj1Uk4m9Q0fN69PVmYWISkZ9hA4Jidk";

export const fetchArticles = async (searchQuery) => {
  const fetchFromNewsApi = async () => {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: searchQuery || "latest",
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
      source: article.source.name,
    }));
  };

  const fetchFromNewYorkTimes = async () => {
    try {
      const response = await axios.get(
        "https://api.nytimes.com/svc/search/v2/articlesearch.json",
        {
          params: {
            q: "latest",
            fq: searchQuery ? searchQuery : undefined,
            "api-key": NY_API_KEY,
          },
        }
      );

      return response.data.response.docs.map((article) => ({
        title: article.headline.main,
        description: article.abstract,
        image: article.multimedia?.length
          ? `https://www.nytimes.com/${article.multimedia[0].url}`
          : "",
        url: article.web_url,
        author: article.byline?.original || "Unknown Author",
        published_date: article.pub_date,
        source: article.source,
      }));
    } catch (error) {
      console.error("Error fetching from New York Times API:", error);
      return [];
    }
  };

  // Fetch from both APIs concurrently
  const [newsApiArticles, nyTimesArticles] = await Promise.all([
    fetchFromNewsApi(),
    fetchFromNewYorkTimes(),
  ]);

  const filterNewsApiArticles = newsApiArticles.filter(
    (article) => !article.title.includes("[Removed]")
  ); // Filter out articles with [Removed] in the title from NewsApi

  return [...filterNewsApiArticles, ...nyTimesArticles];
};
