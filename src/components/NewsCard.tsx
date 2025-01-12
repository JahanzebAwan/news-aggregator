import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";

interface Article {
  title: string;
  description: string;
  image: string;
  url: string;
  author: string;
  published_date: string;
  source: string;
}

interface NewsCardProps {
  article: Article;
}

const NewsCard = ({ article }: NewsCardProps) => {
  return (
    <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column" }}>
      {article.image && (
        <CardMedia
          component="img"
          height="140"
          image={article.image}
          alt={article.title}
        />
      )}
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {article.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
          sx={{ height: 60, overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {article.description}
        </Typography>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          <strong>Author:</strong> {article.author || "Unknown"} |{" "}
          <strong>Source:</strong> {article.source} | <strong>Date:</strong>{" "}
          {new Date(article.published_date).toDateString()}
        </Typography>
        <Box mt={2}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            href={article.url}
            target="_blank"
          >
            Read More
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
