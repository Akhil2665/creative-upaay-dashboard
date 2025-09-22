import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  InputBase,
  Avatar,
  Badge,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  CalendarToday as CalendarIcon,
  Notifications as NotificationsIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";
import { setFilter } from "../store/tasksSlice";

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const { filters } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleSearchChange = (event) => {
    dispatch(
      setFilter({ filterType: "searchText", value: event.target.value })
    );
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        borderBottom: "1px solid",
        borderBottomColor: "divider",
      }}
    >
      <Toolbar sx={{ px: 3, py: 1, minHeight: "64px" }}>
        {/* Center - Search Bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "background.default",
            borderRadius: 2,
            px: 2,
            py: 1,
            width: "100%",
            maxWidth: 400,
            mx: "auto",
          }}
        >
          <SearchIcon sx={{ color: "text.secondary", mr: 1.5, fontSize: 20 }} />
          <InputBase
            placeholder="Search for anything..."
            value={filters.searchText || ""}
            onChange={handleSearchChange}
            sx={{
              flexGrow: 1,
              fontSize: "0.875rem",
              "& .MuiInputBase-input::placeholder": {
                color: "text.secondary",
                opacity: 0.7,
              },
            }}
          />
        </Box>

        {/* Right side - Calendar, Notifications, Theme Toggle, User Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Theme Toggle Button */}
          <IconButton onClick={toggleTheme} sx={{ p: 1 }}>
            {isDarkMode ? (
              <LightModeIcon sx={{ fontSize: 20, color: "text.secondary" }} />
            ) : (
              <DarkModeIcon sx={{ fontSize: 20, color: "text.secondary" }} />
            )}
          </IconButton>

          <IconButton sx={{ p: 1 }}>
            <CalendarIcon sx={{ fontSize: 20, color: "text.secondary" }} />
          </IconButton>

          <IconButton sx={{ p: 1 }}>
            <Badge
              badgeContent={3}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "0.625rem",
                  height: 16,
                  minWidth: 16,
                },
              }}
            >
              <NotificationsIcon
                sx={{ fontSize: 20, color: "text.secondary" }}
              />
            </Badge>
          </IconButton>

          {/* User Profile */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 1 }}>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: "primary.main",
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
            >
              PJ
            </Avatar>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  lineHeight: 1.2,
                  fontSize: "0.875rem",
                }}
              >
                Palak Jain
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.2,
                  fontSize: "0.75rem",
                }}
              >
                Rajathan, India
              </Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
