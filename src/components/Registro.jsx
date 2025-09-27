import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Snackbar,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
  Email,
  LocationOn,
  PersonAdd,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";

const Registro = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    nombre_completo: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError("");
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    // Validar nombre completo
    if (!formData.nombre_completo.trim()) {
      setError("El nombre completo es requerido");
      setSnackbarOpen(true);
      return false;
    }

    // Validar username
    if (!formData.username.trim()) {
      setError("El usuario es requerido");
      setSnackbarOpen(true);
      return false;
    }

    if (formData.username.length < 3) {
      setError("El usuario debe tener al menos 3 caracteres");
      setSnackbarOpen(true);
      return false;
    }

    // Validar email
    if (!formData.email.trim()) {
      setError("El email es requerido");
      setSnackbarOpen(true);
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Por favor ingresa un email válido");
      setSnackbarOpen(true);
      return false;
    }

    // Validar contraseña
    if (!formData.password.trim()) {
      setError("La contraseña es requerida");
      setSnackbarOpen(true);
      return false;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setSnackbarOpen(true);
      return false;
    }

    // Validar confirmación de contraseña
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      setSnackbarOpen(true);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Preparar datos para enviar al backend
      const userData = {
        nombre_completo: formData.nombre_completo.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
      };

      const result = await register(userData);

      if (result.success) {
        // Redirigir al dashboard después del registro exitoso
        navigate("/dashboard", { replace: true });
      } else {
        setError(result.error || "Error al crear usuario");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setError(error.message || "Error al crear usuario. Intenta nuevamente.");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
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
        py: 4,
      }}
    >
      {/* Elementos decorativos de fondo */}
      <Box
        sx={{
          position: "absolute",
          top: "5%",
          left: "5%",
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "70%",
          right: "10%",
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.05)",
          animation: "float 8s ease-in-out infinite reverse",
        }}
      />

      <Container component="main" maxWidth="sm">
        <Fade in timeout={800}>
          <Card
            sx={{
              backdropFilter: "blur(20px)",
              background: "rgba(255, 255, 255, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: 4,
              boxShadow: "0 25px 45px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            <CardContent sx={{ p: 6 }}>
              {/* Header */}
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <PersonAdd
                  sx={{
                    fontSize: 60,
                    color: "white",
                    mb: 2,
                    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                  }}
                />
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    fontWeight: "bold",
                    color: "white",
                    mb: 1,
                    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  Crear Usuario
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "1.1rem",
                  }}
                >
                  Completa los datos para crear tu cuenta
                </Typography>
              </Box>

              {/* Form */}
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ width: "100%" }}
              >
                <TextField
                  fullWidth
                  name="nombre_completo"
                  label="Nombre Completo"
                  value={formData.nombre_completo}
                  onChange={handleChange}
                  disabled={loading}
                  autoComplete="name"
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
                  name="email"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  autoComplete="email"
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  name="username"
                  label="Usuario"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={loading}
                  autoComplete="username"
                  sx={{ mb: 3 }}
                  helperText="Mínimo 3 caracteres"
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
                  autoComplete="new-password"
                  helperText="Mínimo 6 caracteres"
                  sx={{ mb: 3 }}
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

                <TextField
                  fullWidth
                  name="confirmPassword"
                  label="Confirmar Contraseña"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                  autoComplete="new-password"
                  sx={{ mb: 4 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: "text.secondary" }} />
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
                      "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #15803d 0%, #16a34a 100%)",
                    },
                  }}
                >
                  {loading ? "Creando usuario..." : "Crear Usuario"}
                </Button>

                {/* Link al login */}
                <Box sx={{ textAlign: "center", mt: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255, 255, 255, 0.8)" }}
                  >
                    ¿Ya tienes una cuenta?{" "}
                    <Link
                      to="/login"
                      style={{
                        color: "white",
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                    >
                      Iniciar Sesión
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Container>

      {/* Snackbar para mostrar errores */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Registro;
