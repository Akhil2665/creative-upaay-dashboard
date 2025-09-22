import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./tasksSlice";
import projectSlice from "./projectSlice";

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("dashboardState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("dashboardState", serializedState);
  } catch (err) {
    console.log("Error saving state:", err);
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    project: projectSlice,
  },
  preloadedState,
});

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
