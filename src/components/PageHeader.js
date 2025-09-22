import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Button,
  IconButton,
  AvatarGroup,
  Avatar,
  Chip,
  TextField,
} from "@mui/material";
import {
  FilterList as FilterIcon,
  CalendarToday as CalendarIcon,
  Share as ShareIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Link as LinkIcon,
  PersonAdd as InviteIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { updateProjectName } from "../store/projectSlice";

const PageHeader = () => {
  const dispatch = useDispatch();
  const { currentProject } = useSelector((state) => state.project);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(currentProject.name);

  // Mock team members for avatar group matching the reference
  const teamMembers = [
    { name: "John Doe", avatar: "JD", color: "#F59E0B" },
    { name: "Sarah Miller", avatar: "SM", color: "#10B981" },
    { name: "Alex Brown", avatar: "AB", color: "#3B82F6" },
    { name: "Emma Wilson", avatar: "EW", color: "#8B5CF6" },
  ];

  const handleEditClick = () => {
    setIsEditing(true);
    setEditValue(currentProject.name);
  };

  const handleSave = () => {
    if (editValue.trim()) {
      dispatch(updateProjectName(editValue.trim()));
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(currentProject.name);
    setIsEditing(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSave();
    } else if (event.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        px: 3,
        py: 3,
      }}
    >
      {/* First Row - Mobile App Title with Team Members and Actions */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        {/* Left Side - Title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {isEditing ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TextField
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyDown}
                variant="outlined"
                size="small"
                autoFocus
                sx={{
                  "& .MuiOutlinedInput-root": {
                    fontSize: "2rem",
                    fontWeight: 700,
                    height: "auto",
                    "& input": {
                      padding: "8px 12px",
                    },
                  },
                }}
              />
              <IconButton
                size="small"
                onClick={handleSave}
                sx={{ p: 0.5, color: "#10B981" }}
              >
                <CheckIcon sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton
                size="small"
                onClick={handleCancel}
                sx={{ p: 0.5, color: "#EF4444" }}
              >
                <CloseIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Box>
          ) : (
            <>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  fontSize: "2rem",
                  color: "text.primary",
                }}
              >
                {currentProject.name}
              </Typography>
              <IconButton
                size="small"
                onClick={handleEditClick}
                sx={{ p: 0.5, ml: 0.5 }}
              >
                <EditIcon sx={{ fontSize: 20, color: "#8B5CF6" }} />
              </IconButton>
              <IconButton size="small" sx={{ p: 0.5 }}>
                <LinkIcon sx={{ fontSize: 20, color: "#8B5CF6" }} />
              </IconButton>
            </>
          )}
        </Box>

        {/* Right Side - Team Avatars with Invite and Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Team Avatars */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AvatarGroup
              max={4}
              spacing="medium"
              sx={{
                "& .MuiAvatarGroup-avatar": {
                  width: 32,
                  height: 32,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  border: "2px solid white",
                  marginLeft: "-8px",
                },
              }}
            >
              {teamMembers.map((member, index) => (
                <Avatar
                  key={index}
                  sx={{
                    bgcolor: member.color,
                    width: 32,
                    height: 32,
                  }}
                >
                  {member.avatar}
                </Avatar>
              ))}
            </AvatarGroup>

            <Chip
              label="+2"
              size="small"
              sx={{
                height: 24,
                fontSize: "0.75rem",
                fontWeight: 500,
                bgcolor: "#F3F4F6",
                color: "#6B7280",
                border: "none",
                ml: 0.5,
                "& .MuiChip-label": {
                  px: 1,
                },
              }}
            />
          </Box>

          {/* Invite Button */}
          <Button
            variant="contained"
            startIcon={<InviteIcon />}
            size="small"
            sx={{
              textTransform: "none",
              fontWeight: 500,
              fontSize: "0.875rem",
              bgcolor: "#8B5CF6",
              color: "white",
              px: 2,
              py: 0.75,
              borderRadius: 2,
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#7C3AED",
                boxShadow: "none",
              },
            }}
          >
            Invite
          </Button>

          {/* Action Buttons */}
          <Button
            variant="outlined"
            startIcon={<ShareIcon />}
            size="small"
            sx={{
              textTransform: "none",
              fontWeight: 500,
              fontSize: "0.875rem",
              color: "#6B7280",
              borderColor: "#D1D5DB",
              bgcolor: "white",
              px: 2,
              py: 0.75,
              borderRadius: 2,
              "&:hover": {
                borderColor: "#9CA3AF",
                bgcolor: "#F9FAFB",
              },
            }}
          >
            Share
          </Button>

          <IconButton
            sx={{
              bgcolor: "#6366F1",
              color: "white",
              width: 36,
              height: 36,
              borderRadius: 2,
              "&:hover": {
                bgcolor: "#4F46E5",
              },
            }}
          >
            <MoreVertIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Second Row - Filter and Today Buttons */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button
          variant="outlined"
          startIcon={<FilterIcon />}
          size="small"
          sx={{
            textTransform: "none",
            fontWeight: 500,
            fontSize: "0.875rem",
            color: "#D97706",
            borderColor: "#F59E0B",
            bgcolor: "#FFFBEB",
            px: 2.5,
            py: 0.75,
            borderRadius: 2,
            minWidth: "auto",
            "&:hover": {
              borderColor: "#D97706",
              bgcolor: "#FEF3C7",
            },
          }}
        >
          Filter
        </Button>

        <Button
          variant="outlined"
          startIcon={<CalendarIcon />}
          size="small"
          sx={{
            textTransform: "none",
            fontWeight: 500,
            fontSize: "0.875rem",
            color: "#D97706",
            borderColor: "#F59E0B",
            bgcolor: "#FFFBEB",
            px: 2.5,
            py: 0.75,
            borderRadius: 2,
            minWidth: "auto",
            "&:hover": {
              borderColor: "#D97706",
              bgcolor: "#FEF3C7",
            },
          }}
        >
          Today
        </Button>
      </Box>
    </Box>
  );
};

export default PageHeader;
