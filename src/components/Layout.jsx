import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Offcanvas,
  ListGroup,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaUser,
  FaTachometerAlt,
  FaUsers,
  FaBars,
  FaChartLine,
  FaCog,
  FaHome,
  FaFileAlt,
  FaCalendarAlt,
  FaBuilding,
} from "react-icons/fa";

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const menuItems = [
    { path: "/dashboard", icon: FaHome, label: "Dashboard" },
    { path: "/clientes", icon: FaBuilding, label: "Gestión de Clientes" },
    { path: "/mapa", icon: FaMapMarkerAlt, label: "Mapa de Clientes" },
    { path: "/usuarios", icon: FaUsers, label: "Gestión de Usuarios" },
    { path: "/reportes", icon: FaChartLine, label: "Reportes" },
    { path: "/configuracion", icon: FaCog, label: "Configuración" },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* Top Navigation */}
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
          <div className="d-flex align-items-center">
            <Button
              variant="outline-light"
              onClick={toggleSidebar}
              className="me-3 d-lg-none border-0"
            >
              <FaBars />
            </Button>
            <Navbar.Brand
              as={Link}
              to="/dashboard"
              className="fw-bold d-flex align-items-center"
            >
              <FaMapMarkerAlt className="me-2" size={24} />
              Mapa de Clientes
            </Navbar.Brand>
          </div>

          <Nav className="ms-auto d-flex align-items-center">
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
              className="text-white"
            >
              <NavDropdown.Item>
                <FaUser className="me-2" />
                Mi Perfil
              </NavDropdown.Item>
              <NavDropdown.Item>
                <FaCog className="me-2" />
                Configuración
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} className="text-danger">
                <FaSignOutAlt className="me-2" />
                Cerrar Sesión
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>

      {/* Mobile Sidebar */}
      <Offcanvas
        show={showSidebar}
        onHide={() => setShowSidebar(false)}
        placement="start"
        className="d-lg-none"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <FaMapMarkerAlt className="me-2" />
            Menú
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <ListGroup variant="flush">
            {menuItems.map((item) => (
              <ListGroup.Item
                key={item.path}
                as={Link}
                to={item.path}
                action
                className={`border-0 py-3 ${
                  location.pathname === item.path
                    ? "bg-light text-primary fw-semibold"
                    : ""
                }`}
                onClick={() => setShowSidebar(false)}
              >
                <item.icon className="me-3" />
                {item.label}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>

      <Container fluid>
        <Row>
          {/* Desktop Sidebar */}
          <Col lg={2} className="d-none d-lg-block p-0">
            <div
              className="vh-100 position-sticky"
              style={{
                top: "76px",
                backgroundColor: "white",
                borderRight: "1px solid #dee2e6",
                height: "calc(100vh - 76px)",
              }}
            >
              <ListGroup variant="flush" className="h-100">
                {menuItems.map((item) => (
                  <ListGroup.Item
                    key={item.path}
                    as={Link}
                    to={item.path}
                    action
                    className={`border-0 py-3 ${
                      location.pathname === item.path
                        ? "bg-light text-primary fw-semibold"
                        : ""
                    }`}
                  >
                    <item.icon className="me-3" />
                    {item.label}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Col>

          {/* Main Content */}
          <Col lg={10} className="p-0">
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Layout;
