import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Close as CloseIcon, Add as AddIcon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addProject } from "../store/projectSlice";

const AddProjectModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    finishingDate: "",
    color: "#6366f1",
    description: "",
  });

  const projectColors = [
    { value: "#6366f1", label: "Indigo" },
    { value: "#f59e0b", label: "Amber" },
    { value: "#8b5cf6", label: "Purple" },
    { value: "#3b82f6", label: "Blue" },
    { value: "#10b981", label: "Emerald" },
    { value: "#ef4444", label: "Red" },
    { value: "#f97316", label: "Orange" },
    { value: "#06b6d4", label: "Cyan" },
  ];

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      return;
    }

    const newProject = {
      name: formData.name.trim(),
      finishingDate: formData.finishingDate,
      color: formData.color,
      description: formData.description,
      createdAt: new Date().toISOString(),
    };

    dispatch(addProject(newProject));
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: "",
      finishingDate: "",
      color: "#6366f1",
      description: "",
    });
    onClose();
  };

  // Get today's date for minimum date selection
  const today = new Date().toISOString().split("T")[0];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        },
      }}
    >
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AddIcon sx={{ color: "white" }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Create New Project
            </Typography>
          </Box>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Project Name */}
          <TextField
            label="Project Name"
            value={formData.name}
            onChange={handleChange("name")}
            fullWidth
            required
            placeholder="Enter project name..."
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          {/* Project Description */}
          <TextField
            label="Description"
            value={formData.description}
            onChange={handleChange("description")}
            fullWidth
            multiline
            rows={3}
            placeholder="Brief description of the project..."
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            {/* Finishing Date */}
            <TextField
              label="Project Deadline"
              type="date"
              value={formData.finishingDate}
              onChange={handleChange("finishingDate")}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: today,
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            {/* Project Color */}
            <FormControl fullWidth>
              <InputLabel>Project Color</InputLabel>
              <Select
                value={formData.color}
                onChange={handleChange("color")}
                label="Project Color"
                sx={{
                  borderRadius: 2,
                }}
              >
                {projectColors.map((color) => (
                  <MenuItem key={color.value} value={color.value}>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                    >
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          bgcolor: color.value,
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      />
                      {color.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Preview */}
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "background.default",
              border: "1px dashed",
              borderColor: "divider",
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Project Preview:
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  bgcolor: formData.color,
                }}
              />
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {formData.name || "Project Name"}
              </Typography>
            </Box>
            {formData.finishingDate && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                Deadline:{" "}
                {new Date(formData.finishingDate).toLocaleDateString()}
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2.5 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            borderRadius: 2,
            px: 3,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!formData.name.trim() || !formData.finishingDate}
          sx={{
            borderRadius: 2,
            px: 3,
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
            },
          }}
        >
          Create Project
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProjectModal;
