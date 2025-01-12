import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  SelectChangeEvent,
} from "@mui/material";

interface FilterProps {
  onFilterChange: (filters: {
    startDate: string;
    endDate: string;
    source: string;
  }) => void;
  availableSources: string[];
}

const Filter = ({ onFilterChange, availableSources }: FilterProps) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [source, setSource] = useState<string>("");

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const handleSourceChange = (event: SelectChangeEvent<string>) => {
    setSource(event.target.value);
  };

  const handleApplyFilters = () => {
    onFilterChange({ startDate, endDate, source });
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: "column",
        marginBottom: "20px",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            value={startDate}
            onChange={handleStartDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="End Date"
            type="date"
            fullWidth
            value={endDate}
            onChange={handleEndDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="source-label">Source</InputLabel>
            <Select
              labelId="source-label"
              id="source-label"
              value={source}
              onChange={handleSourceChange}
            >
              <MenuItem value="">All Sources</MenuItem>
              {availableSources.map((source, index) => (
                <MenuItem key={index} value={source}>
                  {source}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={handleApplyFilters}
        sx={{ alignSelf: "flex-start", marginTop: 2 }}
      >
        Apply Filters
      </Button>
    </Box>
  );
};

export default Filter;
