import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { addTask } from "../store/tasksSlice";

const AddTaskModal = ({ open, onClose, columnId }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    category: "general",
    deadline: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (task.title.trim()) {
      const taskData = {
        ...task,
        deadline: task.deadline || null,
      };

      dispatch(
        addTask({
          columnId,
          task: taskData,
        })
      );
      setTask({
        title: "",
        description: "",
        priority: "medium",
        category: "general",
        deadline: "",
      });
      onClose();
    }
  };

  const handleClose = () => {
    setTask({
      title: "",
      description: "",
      priority: "medium",
      category: "general",
      deadline: "",
    });
    onClose();
  };

  const categories = [
    "general",
    "development",
    "design",
    "testing",
    "documentation",
    "bug-fix",
    "feature",
    "research",
  ];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Task Title"
            fullWidth
            required
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            placeholder="Enter task title..."
          />

          <TextField
            label="Description"
            multiline
            rows={4}
            fullWidth
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            placeholder="Enter task description..."
          />

          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={task.priority}
              label="Priority"
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={task.category}
              label="Category"
              onChange={(e) => setTask({ ...task, category: e.target.value })}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() +
                    category.slice(1).replace("-", " ")}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Deadline"
            type="datetime-local"
            fullWidth
            value={task.deadline}
            onChange={(e) => setTask({ ...task, deadline: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: new Date().toISOString().slice(0, 16),
            }}
            helperText="Optional: Set a deadline for this task"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!task.title.trim()}
        >
          Add Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskModal;
