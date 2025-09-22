import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
} from "@mui/material";
import {
  FilterList as FilterIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import { setFilter, clearFilters } from "../store/tasksSlice";

const FilterBar = () => {
  const { filters } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleFilterChange = (filterType, value) => {
    dispatch(setFilter({ filterType, value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const hasActiveFilters =
    filters.priority !== "all" ||
    filters.category !== "all" ||
    filters.deadline !== "all";

  const priorities = [
    { value: "all", label: "All Priorities" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "general", label: "General" },
    { value: "development", label: "Development" },
    { value: "design", label: "Design" },
    { value: "testing", label: "Testing" },
    { value: "documentation", label: "Documentation" },
    { value: "bug-fix", label: "Bug Fix" },
    { value: "feature", label: "Feature" },
    { value: "research", label: "Research" },
  ];

  const deadlineFilters = [
    { value: "all", label: "All Tasks" },
    { value: "overdue", label: "Overdue" },
    { value: "today", label: "Due Today" },
    { value: "upcoming", label: "Due This Week" },
    { value: "has-deadline", label: "Has Deadline" },
  ];

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        py: 2,
        px: 3,
        mb: 3,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Filter Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: hasActiveFilters ? 2 : 0,
        }}
      >
        <FilterIcon sx={{ color: "text.secondary", fontSize: 20 }} />

        {/* Priority Filter */}
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="priority-filter-label">Priority</InputLabel>
          <Select
            labelId="priority-filter-label"
            value={filters.priority}
            label="Priority"
            onChange={(e) => handleFilterChange("priority", e.target.value)}
            sx={{
              borderRadius: 1,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "divider",
              },
              "& .MuiSelect-select": {
                py: 1,
              },
            }}
          >
            {priorities.map((priority) => (
              <MenuItem key={priority.value} value={priority.value}>
                {priority.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Category Filter */}
        <FormControl size="small" sx={{ minWidth: 170 }}>
          <InputLabel id="category-filter-label">Category</InputLabel>
          <Select
            labelId="category-filter-label"
            value={filters.category}
            label="Category"
            onChange={(e) => handleFilterChange("category", e.target.value)}
            sx={{
              borderRadius: 1,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "divider",
              },
              "& .MuiSelect-select": {
                py: 1,
              },
            }}
          >
            {categories.map((category) => (
              <MenuItem key={category.value} value={category.value}>
                {category.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Deadline Filter */}
        <FormControl size="small" sx={{ minWidth: 170 }}>
          <InputLabel id="deadline-filter-label">Deadline</InputLabel>
          <Select
            labelId="deadline-filter-label"
            value={filters.deadline}
            label="Deadline"
            onChange={(e) => handleFilterChange("deadline", e.target.value)}
            sx={{
              borderRadius: 1,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "divider",
              },
              "& .MuiSelect-select": {
                py: 1,
              },
            }}
          >
            {deadlineFilters.map((deadline) => (
              <MenuItem key={deadline.value} value={deadline.value}>
                {deadline.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button
            variant="text"
            startIcon={<ClearIcon />}
            onClick={handleClearFilters}
            size="small"
            sx={{
              textTransform: "none",
              color: "text.secondary",
              ml: "auto",
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            Clear All
          </Button>
        )}
      </Box>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <>
          <Box
            sx={{
              width: "100%",
              height: "1px",
              bgcolor: "divider",
              mb: 2,
            }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                fontSize: "0.875rem",
                color: "text.secondary",
                fontWeight: 500,
                mr: 1,
              }}
            >
              Active Filters:
            </Box>
            {filters.priority !== "all" && (
              <Chip
                label={`Priority: ${filters.priority}`}
                size="small"
                color="primary"
                variant="outlined"
                onDelete={() => handleFilterChange("priority", "all")}
                sx={{
                  fontSize: "0.75rem",
                  "& .MuiChip-deleteIcon": {
                    fontSize: "0.875rem",
                  },
                }}
              />
            )}
            {filters.category !== "all" && (
              <Chip
                label={`Category: ${filters.category}`}
                size="small"
                color="secondary"
                variant="outlined"
                onDelete={() => handleFilterChange("category", "all")}
                sx={{
                  fontSize: "0.75rem",
                  "& .MuiChip-deleteIcon": {
                    fontSize: "0.875rem",
                  },
                }}
              />
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default FilterBar;
