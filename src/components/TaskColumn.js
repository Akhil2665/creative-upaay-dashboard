import React from "react";
import { useDispatch } from "react-redux";
import { Box, Typography, Button, Stack } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import TaskCard from "./TaskCard";
import { moveTask } from "../store/tasksSlice";

const TaskColumn = ({ column, tasks, onAddTask }) => {
  const dispatch = useDispatch();

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedData = JSON.parse(e.dataTransfer.getData("text/plain"));
    const { taskId, sourceColumnId } = draggedData;

    if (sourceColumnId !== column.id) {
      dispatch(
        moveTask({
          taskId,
          sourceColumnId,
          destinationColumnId: column.id,
          destinationIndex: tasks.length, // Add to end of column
        })
      );
    }
  };

  const handleMoveTask = (
    taskId,
    sourceColumnId,
    destinationColumnId,
    destinationIndex
  ) => {
    dispatch(
      moveTask({
        taskId,
        sourceColumnId,
        destinationColumnId,
        destinationIndex,
      })
    );
  };

  const getColumnColor = (columnId) => {
    switch (columnId) {
      case "todo":
        return "#8B5DFF"; // Purple from reference
      case "inprogress":
        return "#FFA500"; // Orange from reference
      case "done":
        return "#8BC1F7"; // Blue from reference
      default:
        return "#6b7280";
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        minWidth: 300,
        bgcolor: "background.paper",
      }}
    >
      {/* Column Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
          pb: 1,
          borderBottom: `2px solid ${getColumnColor(column.id)}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: getColumnColor(column.id),
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "text.primary",
              fontSize: "1rem",
            }}
          >
            {column.title}
          </Typography>
          <Box
            sx={{
              bgcolor: getColumnColor(column.id),
              color: "white",
              px: 1,
              py: 0.25,
              borderRadius: 1,
              fontSize: "0.75rem",
              fontWeight: 600,
              minWidth: 20,
              textAlign: "center",
            }}
          >
            {tasks.length}
          </Box>
        </Box>

        {column.id === "todo" && (
          <Button
            variant="text"
            onClick={onAddTask}
            sx={{
              minWidth: 24,
              width: 24,
              height: 24,
              p: 0,
              borderRadius: 1,
              color: "text.secondary",
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <AddIcon sx={{ fontSize: 16 }} />
          </Button>
        )}
      </Box>

      {/* Tasks Container */}
      <Stack
        spacing={2}
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          minHeight: "200px",
          pr: 1, // Small padding for scrollbar
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {tasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            columnId={column.id}
            index={index}
            onMove={handleMoveTask}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default TaskColumn;
