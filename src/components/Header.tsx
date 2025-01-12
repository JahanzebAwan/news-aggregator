import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PersonalizedNewsFeed from "./PersonalizedNewsFeed";

interface HeaderProps {
  setSearchQuery: (query: string) => void;
}

const Header = ({ setSearchQuery }: HeaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [query, setQuery] = React.useState("");

  const onSearch = () => {
    setSearchQuery(query);
  };

  return (
    <AppBar position="static" style={{ marginBottom: "16px" }}>
      <Toolbar
        style={{ flexDirection: isMobile ? "column" : "row", gap: "8px" }}
      >
        <Typography
          variant="h6"
          style={{
            flexGrow: isMobile ? 0 : 1,
            marginBottom: isMobile ? "8px" : "0",
          }}
        >
          News Aggregator
        </Typography>
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          alignItems="center"
          gap="8px"
          width={isMobile ? "100%" : "auto"}
        >
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              backgroundColor: "white",
              borderRadius: "4px",
              flexGrow: 1,
              width: isMobile ? "100%" : "auto",
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={onSearch}
            style={{
              width: isMobile ? "100%" : "auto",
            }}
          >
            Search
          </Button>
          <PersonalizedNewsFeed />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
