import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

const NewsCard = ({ article }) => {
  return (
    <Card>
      {article.image && (
        <CardMedia
          component="img"
          height="140"
          image={article.image}
          alt={article.title}
        />
      )}
      <CardContent>
        <Typography variant="h6">{article.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {article.description}
        </Typography>
        <Button size="small" color="primary" href={article.url} target="_blank">
          Read More
        </Button>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
