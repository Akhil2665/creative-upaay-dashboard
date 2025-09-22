import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import TaskColumn from "./TaskColumn";
import AddTaskModal from "./AddTaskModal";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import PageHeader from "./PageHeader";

const Dashboard = ({ isDarkMode, toggleTheme }) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("todo");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { columns, columnOrder, tasks, filters } = useSelector(
    (state) => state.tasks
  );

  // Filter tasks based on current filters
  const getFilteredTasks = (taskIds) => {
    return taskIds
      .map((id) => tasks[id])
      .filter((task) => {
        if (!task) return false;

        // Priority filter
        if (filters.priority !== "all" && task.priority !== filters.priority) {
          return false;
        }

        // Category filter
        if (filters.category !== "all" && task.category !== filters.category) {
          return false;
        }

        // Deadline filter
        if (filters.deadline !== "all" && task.deadline) {
          const now = new Date();
          const deadline = new Date(task.deadline);
          const diffMs = deadline - now;
          const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

          switch (filters.deadline) {
            case "overdue":
              if (diffMs > 0) return false;
              break;
            case "today":
              if (days !== 0) return false;
              break;
            case "upcoming":
              if (days <= 0 || days > 7) return false;
              break;
            case "has-deadline":
              // Task has deadline, so continue (don't filter out)
              break;
            default:
              break;
          }
        } else if (filters.deadline === "has-deadline" && !task.deadline) {
          return false;
        }

        // Search text filter
        if (
          filters.searchText &&
          !task.title
            .toLowerCase()
            .includes(filters.searchText.toLowerCase()) &&
          !task.description
            .toLowerCase()
            .includes(filters.searchText.toLowerCase())
        ) {
          return false;
        }

        return true;
      })
      .map((task) => task.id);
  };

  const handleAddTask = (columnId) => {
    setSelectedColumn(columnId);
    setOpenAddModal(true);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarCollapseChange = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  // Auto-collapse sidebar on mobile and close on mobile
  React.useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
      setSidebarCollapsed(true);
    } else {
      setSidebarOpen(true);
      setSidebarCollapsed(false);
    }
  }, [isMobile]);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onToggle={handleSidebarToggle}
        variant={isMobile ? "temporary" : "persistent"}
        isCollapsed={sidebarCollapsed}
        onCollapseChange={handleSidebarCollapseChange}
      />

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          minWidth: 0, // Allow content to shrink properly
        }}
      >
        {/* Top Navbar */}
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

        {/* Page Header */}
        <PageHeader />

        {/* Main Content Area */}
        <Box sx={{ p: 2 }}>
          {/* Task Columns */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              minHeight: "600px",
              overflowX: "auto", // Allow horizontal scroll on very small screens
              pb: 2,
            }}
          >
            {columnOrder.map((columnId) => {
              const column = columns[columnId];
              const filteredTaskIds = getFilteredTasks(column.taskIds);

              return (
                <Box
                  key={columnId}
                  sx={{
                    flex: "1 1 300px", // Grow and shrink with min width of 300px
                    minWidth: "300px", // Minimum column width
                    maxWidth: "400px", // Maximum column width
                  }}
                >
                  <TaskColumn
                    column={column}
                    tasks={filteredTaskIds
                      .map((id) => tasks[id])
                      .filter(Boolean)}
                    onAddTask={() => handleAddTask(columnId)}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>

      {/* Add Task Modal */}
      <AddTaskModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        columnId={selectedColumn}
      />
    </Box>
  );
};

export default Dashboard;
