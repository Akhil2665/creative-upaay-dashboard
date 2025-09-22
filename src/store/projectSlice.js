import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentProject: {
    name: "Mobile App",
    description:
      "Create a modern and responsive landing page design for the new product launch",
    color: "#6366f1",
    active: true,
    finishingDate: "2025-12-31",
    createdAt: "2025-01-01",
  },
  projects: [
    {
      id: 1,
      name: "Mobile App",
      color: "#6366f1",
      active: true,
      finishingDate: "2025-12-31",
      description:
        "Create a modern and responsive landing page design for the new product launch",
      createdAt: "2025-01-01",
    },
    {
      id: 2,
      name: "Website Redesign",
      color: "#f59e0b",
      active: false,
      finishingDate: "2025-11-30",
      description: "Complete redesign of company website",
      createdAt: "2025-02-01",
    },
    {
      id: 3,
      name: "Design System",
      color: "#8b5cf6",
      active: false,
      finishingDate: "2025-10-15",
      description: "Create comprehensive design system",
      createdAt: "2025-03-01",
    },
    {
      id: 4,
      name: "Wireframes",
      color: "#3b82f6",
      active: false,
      finishingDate: "2025-09-30",
      description: "Design wireframes for new features",
      createdAt: "2025-04-01",
    },
  ],
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    updateProjectName: (state, action) => {
      state.currentProject.name = action.payload;
      // Update in projects list as well
      const activeProject = state.projects.find((p) => p.active);
      if (activeProject) {
        activeProject.name = action.payload;
      }
    },
    setActiveProject: (state, action) => {
      // Set all projects to inactive
      state.projects.forEach((p) => (p.active = false));
      // Set selected project as active
      const project = state.projects.find((p) => p.id === action.payload);
      if (project) {
        project.active = true;
        state.currentProject = {
          name: project.name,
          color: project.color,
          description: project.description,
          finishingDate: project.finishingDate,
          createdAt: project.createdAt,
          active: true,
        };
      }
    },
    addProject: (state, action) => {
      const newProject = {
        id: Date.now(),
        name: action.payload.name,
        color: action.payload.color || "#6366f1",
        description: action.payload.description || "",
        finishingDate: action.payload.finishingDate,
        createdAt: action.payload.createdAt || new Date().toISOString(),
        active: false,
      };
      state.projects.push(newProject);
    },
  },
});

export const { updateProjectName, setActiveProject, addProject } =
  projectSlice.actions;
export default projectSlice.reducer;
