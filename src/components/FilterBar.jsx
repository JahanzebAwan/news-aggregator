import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const FilterBar = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ display: "flex", gap: "16px", margin: "16px" }}>
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          value={filters.category}
          name="category"
          onChange={handleChange}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="technology">Technology</MenuItem>
          <MenuItem value="sports">Sports</MenuItem>
          <MenuItem value="business">Business</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Source</InputLabel>
        <Select value={filters.source} name="source" onChange={handleChange}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="bbc">BBC</MenuItem>
          <MenuItem value="guardian">The Guardian</MenuItem>
          <MenuItem value="nyt">New York Times</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterBar;
