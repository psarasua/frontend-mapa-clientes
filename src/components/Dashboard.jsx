import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  LocationOn,
  ExitToApp,
  Person,
  Dashboard as DashboardIcon,
  MoreVert,
} from "@mui/icons-material";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    handleMenuClose();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* App Bar */}
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar>
          <LocationOn sx={{ mr: 2, fontSize: 28 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            Mapa de Clientes
          </Typography>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleMenuClose}>
              <Person sx={{ mr: 2 }} />
              Mi Perfil
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
              <ExitToApp sx={{ mr: 2 }} />
              Cerrar Sesión
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 4, pb: 4 }}>
        {/* Welcome Section */}
        <Card
          sx={{
            mb: 4,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mr: 3,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              >
                {user?.nombre_completo
                  ? user.nombre_completo.charAt(0).toUpperCase()
                  : user?.username?.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  ¡Bienvenido, {user?.nombre_completo || user?.username}!
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
                  {user?.email}
                </Typography>
                <Chip
                  icon={<Person />}
                  label={`@${user?.username}`}
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    color: "white",
                    fontWeight: 500,
                  }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Dashboard Stats */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
            gap: 3,
            mb: 4,
          }}
        >
          <Card
            sx={{
              textAlign: "center",
              p: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <DashboardIcon
              sx={{ fontSize: 48, color: "primary.main", mb: 2 }}
            />
            <Typography variant="h6" gutterBottom>
              Panel Principal
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Accede a todas las funciones del sistema
            </Typography>
          </Card>

          <Card
            sx={{
              textAlign: "center",
              p: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <LocationOn sx={{ fontSize: 48, color: "success.main", mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Mapa de Clientes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Visualiza y gestiona la ubicación de tus clientes
            </Typography>
          </Card>

          <Card
            sx={{
              textAlign: "center",
              p: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <Person sx={{ fontSize: 48, color: "info.main", mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Gestión de Usuarios
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Administra usuarios y permisos del sistema
            </Typography>
          </Card>
        </Box>

        {/* User Information Card */}
        <Card sx={{ boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, mb: 3 }}
            >
              Información de la Cuenta
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 3,
              }}
            >
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Nombre Completo
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>
                  {user?.nombre_completo || "No especificado"}
                </Typography>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Usuario
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {user?.username}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Correo Electrónico
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>
                  {user?.email}
                </Typography>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  ID de Usuario
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  #{user?.id}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                variant="outlined"
                startIcon={<Person />}
                onClick={() => alert("Función próximamente disponible")}
              >
                Editar Perfil
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<ExitToApp />}
                onClick={handleLogout}
              >
                Cerrar Sesión
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Dashboard;
