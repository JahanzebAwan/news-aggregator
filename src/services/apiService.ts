import axios from "axios";

const NEWSAPI_API_KEY = "76aae0c75ed742faafbe41dea6d756a0";
const NY_API_KEY = "nUj1Uk4m9Q0fN69PVmYWISkZ9hA4Jidk";
const GUARDIAN_API_KEY = "44467cfb-8bf5-4c07-b1eb-823e59c80c12";

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

  const fetchFromGuardianApi = async () => {
    try {
      const response = await axios.get(
        "https://content.guardianapis.com/search",
        {
          params: {
            q: searchQuery || "latest",
            "api-key": GUARDIAN_API_KEY,
            "show-fields": "headline,trailText,thumbnail,byline,publication",
          },
        }
      );

      return response.data.response.results.map((article) => ({
        title: article.fields.headline,
        description: article.fields.trailText,
        image: article.fields.thumbnail || "",
        url: article.webUrl,
        author: article.fields.byline || "Unknown Author",
        published_date: article.webPublicationDate,
        source: "The Guardian",
      }));
    } catch (error) {
      console.error("Error fetching from The Guardian API:", error);
      return [];
    }
  };

  // Fetch from all APIs concurrently
  const [newsApiArticles, nyTimesArticles, guardianArticles] =
    await Promise.all([
      fetchFromNewsApi(),
      fetchFromNewYorkTimes(),
      fetchFromGuardianApi(),
    ]);

  const filterNewsApiArticles = newsApiArticles.filter(
    (article) => !article.title.includes("[Removed]")
  ); // Filter out articles with [Removed] in the title from NewsApi

  return [...filterNewsApiArticles, ...nyTimesArticles, ...guardianArticles];
};
