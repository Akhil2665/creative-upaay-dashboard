import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  AvatarGroup,
  useTheme,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  ArrowForward as ArrowForwardIcon,
  ChatBubbleOutline as CommentIcon,
  AttachFile as FileIcon,
  AccessTime as TimeIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { deleteTask, moveTask } from "../store/tasksSlice";

// Utility function to calculate time remaining
const getTimeRemaining = (deadline, theme) => {
  if (!deadline) return null;

  const now = new Date();
  const deadlineDate = new Date(deadline);
  const diffMs = deadlineDate - now;

  if (diffMs <= 0) {
    return {
      status: "overdue",
      text: "Overdue",
      color: theme.palette.error.main,
      bgColor: theme.palette.error.light,
    };
  }

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days === 0) {
    if (hours === 0) {
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      return {
        status: "urgent",
        text: `${minutes}m left`,
        color: theme.palette.error.main,
        bgColor: theme.palette.error.light,
      };
    }
    return {
      status: "urgent",
      text: `${hours}h left`,
      color: theme.palette.error.main,
      bgColor: theme.palette.error.light,
    };
  } else if (days === 1) {
    return {
      status: "soon",
      text: "1 day left",
      color: theme.palette.warning.main,
      bgColor: theme.palette.warning.light,
    };
  } else if (days <= 3) {
    return {
      status: "soon",
      text: `${days} days left`,
      color: theme.palette.warning.main,
      bgColor: theme.palette.warning.light,
    };
  } else if (days <= 7) {
    return {
      status: "normal",
      text: `${days} days left`,
      color: theme.palette.success.main,
      bgColor: theme.palette.success.light,
    };
  } else {
    return {
      status: "normal",
      text: `${days} days left`,
      color: theme.palette.text.secondary,
      bgColor: theme.palette.action.hover,
    };
  }
};

const TaskCard = ({ task, columnId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();

  // Calculate time remaining for the task
  const timeRemaining = getTimeRemaining(task.deadline, theme);

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        taskId: task.id,
        sourceColumnId: columnId,
      })
    );
  };

  const handleDragEnd = () => setIsDragging(false);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleDelete = () => {
    dispatch(deleteTask({ taskId: task.id, columnId }));
    handleMenuClose();
  };

  const handleMoveNext = () => {
    const columns = ["todo", "inprogress", "done"];
    const currentIndex = columns.indexOf(columnId);
    if (currentIndex < columns.length - 1) {
      dispatch(
        moveTask({
          taskId: task.id,
          sourceColumnId: columnId,
          destinationColumnId: columns[currentIndex + 1],
          destinationIndex: 0,
        })
      );
    }
    handleMenuClose();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return theme.palette.error.main;
      case "medium":
        return theme.palette.info.main;
      case "low":
        return theme.palette.warning.main;
      default:
        return theme.palette.text.secondary;
    }
  };

  const getPriorityBgColor = (priority) => {
    switch (priority) {
      case "high":
        return theme.palette.error.light;
      case "medium":
        return theme.palette.info.light;
      case "low":
        return theme.palette.warning.light;
      default:
        return theme.palette.action.hover;
    }
  };

  // Mock data matching reference - specific avatars and counts
  const getTaskAvatars = () => {
    // Return specific avatars based on task to match reference
    return ["A", "B", "C"];
  };

  const getCommentsCount = () => {
    if (task.title.toLowerCase().includes("brainstorming")) return 12;
    if (task.title.toLowerCase().includes("research")) return 10;
    return Math.floor(Math.random() * 20) + 1;
  };

  const getFilesCount = () => {
    if (task.title.toLowerCase().includes("research")) return 3;
    return Math.floor(Math.random() * 5);
  };

  return (
    <>
      <Card
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        elevation={0}
        sx={{
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          opacity: isDragging ? 0.5 : 1,
          cursor: "grab",
          transition: "all 0.2s ease",
          bgcolor: columnId === "done" ? "success.light" : "background.paper",
          "&:hover": {
            borderColor: "divider",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          },
          "&:active": {
            cursor: "grabbing",
          },
        }}
      >
        <CardContent sx={{ p: 2.5 }}>
          {/* Priority indicator and menu */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 1.5,
            }}
          >
            {columnId === "done" ? (
              <Chip
                label="Completed"
                size="small"
                sx={{
                  bgcolor: "success.light",
                  color: "success.dark",
                  fontWeight: 500,
                  fontSize: "0.75rem",
                  height: 20,
                  border: "none",
                  "& .MuiChip-label": {
                    px: 1,
                  },
                }}
              />
            ) : (
              <Chip
                label={task.priority}
                size="small"
                sx={{
                  bgcolor: getPriorityBgColor(task.priority),
                  color: getPriorityColor(task.priority),
                  fontWeight: 500,
                  textTransform: "capitalize",
                  fontSize: "0.75rem",
                  height: 20,
                  border: "none",
                  "& .MuiChip-label": {
                    px: 1,
                  },
                }}
              />
            )}
            <IconButton
              size="small"
              onClick={handleMenuOpen}
              sx={{
                color: "text.secondary",
                p: 0.5,
              }}
            >
              <MoreVertIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>

          {/* Task title */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 1.5,
              fontSize: "1rem",
              lineHeight: 1.3,
              color: "text.primary",
            }}
          >
            {task.title}
          </Typography>

          {/* Task description */}
          <Typography
            variant="body2"
            sx={{
              mb: 2,
              lineHeight: 1.4,
              fontSize: "0.875rem",
              color: "text.secondary",
            }}
          >
            {task.description}
          </Typography>

          {/* Time remaining section */}
          {timeRemaining && columnId !== "done" && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                mb: 2,
                p: 1,
                bgcolor: timeRemaining.bgColor,
                borderRadius: 1,
                border: `1px solid ${timeRemaining.color}20`,
              }}
            >
              {timeRemaining.status === "overdue" ||
              timeRemaining.status === "urgent" ? (
                <WarningIcon
                  sx={{ fontSize: 16, color: timeRemaining.color }}
                />
              ) : (
                <TimeIcon sx={{ fontSize: 16, color: timeRemaining.color }} />
              )}
              <Typography
                variant="caption"
                sx={{
                  color: timeRemaining.color,
                  fontWeight: 600,
                  fontSize: "0.75rem",
                }}
              >
                {timeRemaining.text}
              </Typography>
            </Box>
          )}

          {/* Bottom section with avatars and counts */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Avatar group */}
            <AvatarGroup
              max={3}
              sx={{
                "& .MuiAvatar-root": {
                  width: 28,
                  height: 28,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  border: "2px solid white",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                },
              }}
            >
              {getTaskAvatars().map((avatar, index) => (
                <Avatar
                  key={index}
                  sx={{
                    bgcolor:
                      index === 0
                        ? "#FF6B6B"
                        : index === 1
                        ? "#4ECDC4"
                        : "#45B7D1",
                  }}
                >
                  {avatar}
                </Avatar>
              ))}
            </AvatarGroup>

            {/* Comments and files count */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  bgcolor: task.id === "1" ? "#FFE5E5" : "transparent", // Highlight special comment
                  px: task.id === "1" ? 1 : 0,
                  py: task.id === "1" ? 0.5 : 0,
                  borderRadius: 1,
                  color: task.id === "1" ? "#FF6B6B" : "text.secondary",
                }}
              >
                <CommentIcon sx={{ fontSize: 14 }} />
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: 500,
                  }}
                >
                  {getCommentsCount()} comments
                </Typography>
              </Box>
              {getFilesCount() > 0 && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <FileIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                    }}
                  >
                    {getFilesCount()} files
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" },
        }}
      >
        {columnId !== "done" && (
          <MenuItem onClick={handleMoveNext}>
            <ArrowForwardIcon sx={{ mr: 1.5, fontSize: 18 }} /> Move Next
          </MenuItem>
        )}
        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <DeleteIcon sx={{ mr: 1.5, fontSize: 18 }} /> Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default TaskCard;
