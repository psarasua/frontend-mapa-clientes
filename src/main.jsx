import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.css";
import App from "./App.jsx";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2563eb", // Azul moderno y profesional
      light: "#3b82f6",
      dark: "#1d4ed8",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#64748b", // Gris elegante
      light: "#94a3b8",
      dark: "#475569",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
    },
    success: {
      main: "#10b981",
      light: "#34d399",
      dark: "#059669",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#f59e0b",
      light: "#fbbf24",
      dark: "#d97706",
      contrastText: "#ffffff",
    },
    error: {
      main: "#ef4444",
      light: "#f87171",
      dark: "#dc2626",
      contrastText: "#ffffff",
    },
    info: {
      main: "#3b82f6",
      light: "#60a5fa",
      dark: "#2563eb",
      contrastText: "#ffffff",
    },
    grey: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 500,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 24px",
          fontSize: "0.875rem",
          fontWeight: 500,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 2px 8px rgba(37, 99, 235, 0.2)",
          },
        },
        contained: {
          "&:hover": {
            boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
          border: "1px solid #f1f5f9",
          "&:hover": {
            boxShadow:
              "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            backgroundColor: "#ffffff",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#3b82f6",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#2563eb",
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#1e293b",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          borderBottom: "1px solid #f1f5f9",
        },
      },
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
