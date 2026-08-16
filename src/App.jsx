// ============================================================
// App Component - Root of the Application
// ============================================================
//
// This component sets up:
//   1. The Material UI theme (ThemeProvider)
//   2. The Auth context (AuthProvider)
//   3. The router (BrowserRouter) and AppRoutes route tree
//
// Routes are managed centrally in src/routes/AppRoutes.jsx.
//
// The route structure:
//   /                     → Public website (with navbar + footer)
//   /login                → Login page (standalone, no navbar)
//   /register             → Register page (standalone)
//   /forgot-password      → Forgot password page (standalone)
//   /dashboard/*          → User dashboard (protected, sidebar)
//   /admin/*              → Admin dashboard (admin-only, sidebar)
// ============================================================

import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { AuthProvider } from "./context/AuthContext";

// Route configuration and rendering utilities
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline applies the MUI CSS reset */}
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
