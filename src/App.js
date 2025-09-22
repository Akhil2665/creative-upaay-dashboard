import React, { useState, useMemo } from "react";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import store from "./store/store";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
          primary: {
            main: "#6366f1", // Indigo from reference design
            light: "#818cf8",
            dark: "#4f46e5",
          },
          secondary: {
            main: "#f59e0b", // Amber for accents
            light: "#fbbf24",
            dark: "#d97706",
          },
          success: {
            main: isDarkMode ? "#10b981" : "#059669",
            light: isDarkMode ? "#34d399" : "#d1fae5",
            dark: isDarkMode ? "#047857" : "#16a34a",
          },
          error: {
            main: isDarkMode ? "#f87171" : "#dc2626",
            light: isDarkMode ? "#fca5a5" : "#fee2e2",
            dark: isDarkMode ? "#dc2626" : "#991b1b",
          },
          warning: {
            main: isDarkMode ? "#fbbf24" : "#d97706",
            light: isDarkMode ? "#fde68a" : "#fef3c7",
            dark: isDarkMode ? "#d97706" : "#92400e",
          },
          info: {
            main: isDarkMode ? "#06b6d4" : "#0891b2",
            light: isDarkMode ? "#67e8f9" : "#e0f2fe",
            dark: isDarkMode ? "#0891b2" : "#0e7490",
          },
          background: {
            default: isDarkMode ? "#0f172a" : "#f8fafc", // Slate colors
            paper: isDarkMode ? "#1e293b" : "#ffffff",
          },
          text: {
            primary: isDarkMode ? "#f1f5f9" : "#0f172a",
            secondary: isDarkMode ? "#94a3b8" : "#64748b",
          },
          divider: isDarkMode ? "#334155" : "#e2e8f0",
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h4: {
            fontWeight: 700,
            fontSize: "1.75rem",
          },
          h6: {
            fontWeight: 600,
            fontSize: "1.125rem",
          },
          body1: {
            fontSize: "0.875rem",
          },
          body2: {
            fontSize: "0.75rem",
          },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: isDarkMode
                  ? "0 1px 3px rgba(0, 0, 0, 0.5)"
                  : "0 1px 3px rgba(0, 0, 0, 0.1)",
                border: isDarkMode ? "1px solid #334155" : "1px solid #e2e8f0",
                borderRadius: 12,
              },
            },
          },
          MuiDrawer: {
            styleOverrides: {
              paper: {
                borderRight: isDarkMode
                  ? "1px solid #334155"
                  : "1px solid #e2e8f0",
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
                fontWeight: 500,
              },
            },
          },
        },
      }),
    [isDarkMode]
  );

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Dashboard
          isDarkMode={isDarkMode}
          toggleTheme={() => setIsDarkMode(!isDarkMode)}
        />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
