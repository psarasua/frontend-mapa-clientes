import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
  IconButton,
  InputAdornment,
  Fade,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
  LocationOn,
} from "@mui/icons-material";
import authService from "../services/authService";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!formData.username.trim()) {
      setError("Por favor ingresa tu usuario");
      return;
    }

    if (!formData.password) {
      setError("Por favor ingresa tu contraseña");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Usar el servicio de autenticación para conectar con el backend
      const result = await authService.login({
        username: formData.username,
        password: formData.password,
      });

      if (result.success) {
        // Login exitoso, pasar los datos del usuario al componente padre
        onLogin({
          ...result.user,
          isAuthenticated: true,
        });
      } else {
        setError(result.message || "Credenciales incorrectas");
      }
    } catch (error) {
      setError("Error al conectar con el servidor. Intenta nuevamente.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Elementos decorativos de fondo */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -150,
          left: -150,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
        }}
      />

      <Container maxWidth="sm">
        <Fade in timeout={800}>
          <Card
            sx={{
              backdropFilter: "blur(20px)",
              background: "rgba(255, 255, 255, 0.95)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent sx={{ p: 6 }}>
              {/* Header */}
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 64,
                    height: 64,
                    borderRadius: 3,
                    background:
                      "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
                    mb: 2,
                  }}
                >
                  <LocationOn sx={{ color: "white", fontSize: 32 }} />
                </Box>

                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: "text.primary", mb: 1 }}
                >
                  Mapa Clientes
                </Typography>

                <Typography variant="body1" color="text.secondary">
                  Inicia sesión en tu cuenta
                </Typography>
              </Box>

              {/* Error Alert */}
              {error && (
                <Fade in>
                  <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                    {error}
                  </Alert>
                </Fade>
              )}

              {/* Form */}
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ width: "100%" }}
              >
                <TextField
                  fullWidth
                  name="username"
                  label="Usuario"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={loading}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                  sx={{ mb: 4 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePassword}
                          edge="end"
                          disabled={loading}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: 600,
                    background:
                      "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
                    },
                  }}
                >
                  {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>
              </Box>

              {/* Footer */}
              <Box sx={{ textAlign: "center", mt: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  Sistema de gestión de clientes v1.0
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};

export default Login;
