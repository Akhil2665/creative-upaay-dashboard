import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Divider,
  Tooltip,
} from "@mui/material";
import {
  Home as HomeIcon,
  Message as MessageIcon,
  Assignment as TaskIcon,
  Group as GroupIcon,
  Settings as SettingsIcon,
  FiberManualRecord as DotIcon,
  Add as AddIcon,
  Edit as EditIcon,
  KeyboardDoubleArrowLeft as CollapseIcon,
  KeyboardDoubleArrowRight as ExpandIcon,
} from "@mui/icons-material";
import { setActiveProject } from "../store/projectSlice";
import AddProjectModal from "./AddProjectModal";

const DRAWER_WIDTH = 240;
const COLLAPSED_WIDTH = 64;

const Sidebar = ({
  open,
  onToggle,
  variant = "persistent",
  isCollapsed,
  onCollapseChange,
}) => {
  const [selectedItem, setSelectedItem] = useState("Tasks");

  const dispatch = useDispatch();
  const { projects, currentProject } = useSelector((state) => state.project);
  const [openAddProjectModal, setOpenAddProjectModal] = useState(false);

  // Use prop if provided, otherwise manage internally
  const collapsed = isCollapsed !== undefined ? isCollapsed : false;

  const navigationItems = [
    { name: "Home", icon: <HomeIcon />, path: "/" },
    { name: "Messages", icon: <MessageIcon />, path: "/messages" },
    { name: "Tasks", icon: <TaskIcon />, path: "/tasks" },
    { name: "Members", icon: <GroupIcon />, path: "/members" },
    { name: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  const handleToggleCollapse = () => {
    if (onCollapseChange) {
      onCollapseChange(!collapsed);
    }
  };

  const handleProjectClick = (projectId) => {
    dispatch(setActiveProject(projectId));
  };

  const handleAddProject = () => {
    setOpenAddProjectModal(true);
  };

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
      {/* Header with Project M and Toggle Button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: collapsed ? 1 : 3,
          py: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
          minHeight: 64,
          justifyContent: collapsed ? "center" : "space-between",
        }}
      >
        {!collapsed ? (
          <>
            {/* Project Branding */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",

                  borderRadius: 1,
                  px: 1.5,
                  py: 0.5,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    fontSize: "1.5rem",
                  }}
                >
                  {`Project ${
                    currentProject?.name.slice(0, 1) || "Project M."
                  }`}
                </Typography>
              </Box>
            </Box>

            {/* Toggle Button */}
            <Tooltip title="Collapse sidebar">
              <IconButton onClick={handleToggleCollapse} size="small">
                <CollapseIcon sx={{ fontSize: 20, color: "text.secondary" }} />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <Tooltip title="Expand sidebar">
            <IconButton onClick={handleToggleCollapse} size="small">
              <ExpandIcon sx={{ fontSize: 20, color: "text.secondary" }} />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Navigation Items */}
      <Box sx={{ pt: 3, pb: 2 }}>
        <List sx={{ px: collapsed ? 1 : 2 }}>
          {navigationItems.map((item) => (
            <ListItem key={item.name} disablePadding sx={{ mb: 1 }}>
              <Tooltip title={collapsed ? item.name : ""} placement="right">
                <ListItemButton
                  onClick={() => setSelectedItem(item.name)}
                  selected={selectedItem === item.name}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    px: collapsed ? 1 : 2,
                    minHeight: 48,
                    justifyContent: collapsed ? "center" : "flex-start",
                    "&.Mui-selected": {
                      bgcolor: "transparent",
                      color: "text.primary",
                      "& .MuiListItemIcon-root": {
                        color: "text.primary",
                      },
                    },
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: collapsed ? "auto" : 36,
                      justifyContent: "center",
                      color:
                        selectedItem === item.name
                          ? "text.primary"
                          : "text.secondary",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {!collapsed && <ListItemText primary={item.name} />}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ mx: collapsed ? 1 : 2 }} />

      {/* MY PROJECTS Section */}
      {!collapsed && (
        <Box sx={{ pt: 3, pb: 2 }}>
          <Box
            sx={{
              px: 3,
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="overline"
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "text.secondary",
                letterSpacing: 1,
              }}
            >
              MY PROJECTS
            </Typography>
            <IconButton
              size="small"
              onClick={handleAddProject}
              sx={{ color: "text.secondary" }}
            >
              <AddIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>

          <List sx={{ px: 2 }}>
            {projects.map((project) => (
              <ListItem key={project.id} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => handleProjectClick(project.id)}
                  sx={{
                    borderRadius: 2,
                    py: 1,
                    px: 2,
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <DotIcon
                      sx={{
                        fontSize: 12,
                        color: project.color,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={project.name}
                    primaryTypographyProps={{
                      fontSize: "0.875rem",
                      fontWeight: project.active ? 600 : 400,
                      color: project.active ? "text.primary" : "text.secondary",
                    }}
                  />
                  {project.active && (
                    <IconButton
                      size="small"
                      sx={{ color: "text.secondary", ml: 1 }}
                    >
                      <EditIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Spacer to push content to bottom */}
      <Box sx={{ flexGrow: 1 }} />

      {/* Thoughts Time Section */}
      {!collapsed && (
        <Box
          sx={{
            mx: 2,
            mb: 3,
            p: 2.5,
            borderRadius: 3,
            bgcolor: "#FFF4E6",
            border: "1px solid #FED7AA",
          }}
        >
          {/* Light bulb icon */}
          <Box sx={{ mb: 2, textAlign: "center" }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                bgcolor: "#F59E0B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
              }}
            >
              <Typography sx={{ fontSize: "1.5rem" }}>💡</Typography>
            </Box>
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "#92400E",
              mb: 1,
              textAlign: "center",
            }}
          >
            Thoughts Time
          </Typography>

          <Typography
            variant="body2"
            sx={{
              fontSize: "0.75rem",
              color: "#92400E",
              textAlign: "center",
              lineHeight: 1.4,
              mb: 2.5,
            }}
          >
            We don't have any notice for you, till then you can share your
            thoughts with your peers.
          </Typography>

          <Box sx={{ textAlign: "center" }}>
            <ListItemButton
              sx={{
                borderRadius: 2,
                py: 1,
                px: 2,
                bgcolor: "rgba(245, 158, 11, 0.1)",
                "&:hover": {
                  bgcolor: "rgba(245, 158, 11, 0.2)",
                },
              }}
            >
              <ListItemText
                primary="Write a message"
                primaryTypographyProps={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#92400E",
                  textAlign: "center",
                }}
              />
            </ListItemButton>
          </Box>
        </Box>
      )}
    </Box>
  );

  const currentWidth = collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH;

  return (
    <>
      <Drawer
        variant={variant}
        open={open}
        onClose={onToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          width: open ? currentWidth : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: currentWidth,
            boxSizing: "border-box",
            borderRight: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            transition: "width 0.3s ease",
            overflowX: "hidden",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <AddProjectModal
        open={openAddProjectModal}
        onClose={() => setOpenAddProjectModal(false)}
      />
    </>
  );
};

export default Sidebar;
