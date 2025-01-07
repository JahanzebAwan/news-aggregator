import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

export type SourceType = "NewsApi" | "NewYorkTimes" | "all";

export interface Filters {
  category: string;
  source: SourceType;
}

// Define the props structure
interface FilterBarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters }) => {
  const onCategoryChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setFilters((prev) => ({ ...prev, category: value }));
  };

  const onSourceChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as SourceType;
    setFilters((prev) => ({ ...prev, source: value }));
  };

  return (
    <div style={{ display: "flex", gap: "16px", margin: "16px" }}>
      <FormControl fullWidth>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          value={filters.category}
          onChange={onCategoryChange}
          label="Category"
          id="category-label"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="technology">Technology</MenuItem>
          <MenuItem value="sports">Sports</MenuItem>
          <MenuItem value="business">Business</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="source-label">Source</InputLabel>
        <Select
          value={filters.source}
          onChange={onSourceChange}
          label="Source"
          id="source-label"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="NewsApi">NewsApi</MenuItem>
          <MenuItem value="NewYorkTimes">New York Times</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterBar;
