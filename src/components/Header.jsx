import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";

const Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <AppBar position="static" style={{ marginBottom: "16px" }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          News Aggregator
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {/* <SearchIcon /> */}
              </InputAdornment>
            ),
          }}
          style={{ backgroundColor: "white", borderRadius: "4px" }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
