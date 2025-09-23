import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Login from "./components/Login";
import authService from "./services/authService";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authService.isUserAuthenticated()) {
      const currentUser = authService.getCurrentUser();
      setUser({
        ...currentUser,
        isAuthenticated: true,
      });
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  if (!user?.isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "background.default",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <h1>¡Bienvenido, {user.username || user.name}!</h1>
        <p>Aplicación cargada correctamente</p>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </Box>
    </Box>
  );
}

export default App;
