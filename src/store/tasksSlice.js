import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// Sample tasks for demonstration
const sampleTasks = {
  "task-1": {
    id: "task-1",
    title: "Design Landing Page",
    description:
      "Create a modern and responsive landing page design for the new product launch",
    priority: "high",
    category: "design",
    createdAt: "2025-09-20T10:00:00.000Z",
    deadline: "2024-01-25T23:59:59.000Z",
  },
  "task-2": {
    id: "task-2",
    title: "Implement User Authentication",
    description: "Set up login and registration functionality with JWT tokens",
    priority: "high",
    category: "development",
    createdAt: "2025-09-20T09:30:00.000Z",
    deadline: "2024-01-22T23:59:59.000Z",
  },
  "task-3": {
    id: "task-3",
    title: "Write API Documentation",
    description:
      "Document all API endpoints with examples and response formats",
    priority: "medium",
    category: "documentation",
    createdAt: "2025-09-20T09:00:00.000Z",
    deadline: "2024-01-30T23:59:59.000Z",
  },
  "task-4": {
    id: "task-4",
    title: "Fix Navigation Bug",
    description:
      "Resolve the issue where navigation menu doesn't work on mobile devices",
    priority: "high",
    category: "bug-fix",
    createdAt: "2025-09-19T15:00:00.000Z",
    deadline: "2024-01-20T23:59:59.000Z",
  },
  "task-5": {
    id: "task-5",
    title: "Database Optimization",
    description: "Optimize database queries for better performance",
    priority: "medium",
    category: "development",
    createdAt: "2025-09-19T14:00:00.000Z",
    deadline: "2024-01-28T23:59:59.000Z",
  },
};

const initialState = {
  columns: {
    todo: {
      id: "todo",
      title: "To Do",
      taskIds: ["task-1", "task-2", "task-3"],
    },
    inprogress: {
      id: "inprogress",
      title: "In Progress",
      taskIds: ["task-4"],
    },
    done: {
      id: "done",
      title: "Done",
      taskIds: ["task-5"],
    },
  },
  tasks: sampleTasks,
  columnOrder: ["todo", "inprogress", "done"],
  filters: {
    priority: "all",
    category: "all",
    deadline: "all",
    searchText: "",
  },
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { columnId, task } = action.payload;
      const taskId = uuidv4();
      const newTask = {
        id: taskId,
        title: task.title,
        description: task.description,
        priority: task.priority || "medium",
        category: task.category || "general",
        deadline: task.deadline || null,
        createdAt: new Date().toISOString(),
        ...task,
      };

      state.tasks[taskId] = newTask;
      state.columns[columnId].taskIds.push(taskId);
    },

    moveTask: (state, action) => {
      const { taskId, sourceColumnId, destinationColumnId, destinationIndex } =
        action.payload;

      // Remove task from source column
      const sourceColumn = state.columns[sourceColumnId];
      sourceColumn.taskIds = sourceColumn.taskIds.filter((id) => id !== taskId);

      // Add task to destination column
      const destinationColumn = state.columns[destinationColumnId];
      destinationColumn.taskIds.splice(destinationIndex, 0, taskId);
    },

    deleteTask: (state, action) => {
      const { taskId, columnId } = action.payload;

      // Remove from tasks object
      delete state.tasks[taskId];

      // Remove from column
      state.columns[columnId].taskIds = state.columns[columnId].taskIds.filter(
        (id) => id !== taskId
      );
    },

    updateTask: (state, action) => {
      const { taskId, updates } = action.payload;
      if (state.tasks[taskId]) {
        state.tasks[taskId] = { ...state.tasks[taskId], ...updates };
      }
    },

    setFilter: (state, action) => {
      const { filterType, value } = action.payload;
      state.filters[filterType] = value;
    },

    clearFilters: (state) => {
      state.filters = {
        priority: "all",
        category: "all",
        deadline: "all",
        searchText: "",
      };
    },
  },
});

export const {
  addTask,
  moveTask,
  deleteTask,
  updateTask,
  setFilter,
  clearFilters,
} = tasksSlice.actions;

export default tasksSlice.reducer;
