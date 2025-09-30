import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaUser,
  FaUsers,
  FaChartLine,
  FaCog,
  FaHome,
  FaBuilding,
} from "react-icons/fa";

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* Navbar Horizontal Completo */}
      <Navbar
        expand="lg"
        className="shadow-sm position-sticky top-0"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          zIndex: 1020,
        }}
        variant="dark"
      >
        <Container fluid>
          {/* Logo/Brand */}
          <Navbar.Brand
            as={Link}
            to="/dashboard"
            className="fw-bold d-flex align-items-center"
          >
            <FaMapMarkerAlt className="me-2" size={24} />
            Mapa de Clientes
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            {/* Menús de Navegación Principales */}
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                to="/dashboard"
                className={location.pathname === "/dashboard" ? "active" : ""}
              >
                <FaHome className="me-2" />
                Dashboard
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/clientes"
                className={location.pathname === "/clientes" ? "active" : ""}
              >
                <FaBuilding className="me-2" />
                Clientes
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/usuarios"
                className={location.pathname === "/usuarios" ? "active" : ""}
              >
                <FaUsers className="me-2" />
                Usuarios
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/mapa"
                className={location.pathname === "/mapa" ? "active" : ""}
              >
                <FaMapMarkerAlt className="me-2" />
                Mapa
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/reportes"
                className={location.pathname === "/reportes" ? "active" : ""}
              >
                <FaChartLine className="me-2" />
                Reportes
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/configuracion"
                className={
                  location.pathname === "/configuracion" ? "active" : ""
                }
              >
                <FaCog className="me-2" />
                Configuración
              </Nav.Link>
            </Nav>

            {/* Usuario */}
            <Nav>
              <NavDropdown
                title={
                  <span className="d-flex align-items-center">
                    <div
                      className="rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold me-2"
                      style={{
                        width: "32px",
                        height: "32px",
                        backgroundColor: "rgba(255,255,255,0.2)",
                        fontSize: "0.8rem",
                      }}
                    >
                      {user?.nombre_completo?.charAt(0)?.toUpperCase() ||
                        user?.username?.charAt(0)?.toUpperCase()}
                    </div>
                    <span className="d-none d-md-inline">
                      {user?.nombre_completo || user?.username}
                    </span>
                  </span>
                }
                id="user-dropdown"
                align="end"
              >
                <NavDropdown.Item>
                  <FaUser className="me-2" />
                  Mi Perfil
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={handleLogout}
                  className="text-danger"
                >
                  <FaSignOutAlt className="me-2" />
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Contenido Principal - ANCHO COMPLETO */}
      <Container fluid className="p-0">
        {children}
      </Container>
    </div>
  );
};

export default Layout;
