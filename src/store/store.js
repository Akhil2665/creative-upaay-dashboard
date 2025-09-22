import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./tasksSlice";
import projectSlice from "./projectSlice";

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("dashboardState");
    console.log(
      "Loading from localStorage:",
      serializedState ? "Data found" : "No data"
    );

    if (serializedState === null) {
      return undefined;
    }

    const parsed = JSON.parse(serializedState);
    console.log("Loaded state:", {
      hasTasksObject: !!parsed.tasks,
      tasksCount: parsed.tasks ? Object.keys(parsed.tasks).length : 0,
      hasColumns: !!parsed.columns,
      columnsCount: parsed.columns ? Object.keys(parsed.columns).length : 0,
    });

    // Validate the loaded state has required structure
    if (!parsed.tasks || !parsed.columns || !parsed.columnOrder) {
      console.warn("Invalid state structure, clearing localStorage");
      localStorage.removeItem("dashboardState");
      return undefined;
    }

    return parsed;
  } catch (err) {
    console.error("Error loading state from localStorage:", err);
    localStorage.removeItem("dashboardState");
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    // Only save the tasks slice, not the entire state
    const tasksState = state.tasks;
    const serializedState = JSON.stringify(tasksState);
    localStorage.setItem("dashboardState", serializedState);
    console.log("State saved to localStorage:", {
      tasksCount: Object.keys(tasksState.tasks || {}).length,
      columnsCount: Object.keys(tasksState.columns || {}).length,
    });
  } catch (err) {
    console.error("Error saving state:", err);
  }
};

const preloadedState = loadState();

// Create the store with proper preloaded state structure
const storeConfig = {
  reducer: {
    tasks: tasksSlice,
    project: projectSlice,
  },
};

// If we have tasks state from localStorage, add it to preloaded state
if (preloadedState) {
  storeConfig.preloadedState = {
    tasks: preloadedState,
    // project slice will use its own initial state
  };
}

export const store = configureStore(storeConfig);

// Subscribe to store changes and save to localStorage with debouncing
let saveTimeout;
store.subscribe(() => {
  // Debounce the save operation to avoid excessive writes during drag operations
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    saveState(store.getState());
  }, 100); // Wait 100ms after the last change before saving
});

export default store;
