import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Navbar, 
  Nav, 
  NavDropdown,
  Badge
} from 'react-bootstrap';
import {
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaUser,
  FaTachometerAlt,
  FaUsers
} from 'react-icons/fa';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Navigation Bar */}
      <Navbar 
        expand="lg" 
        className="shadow-sm"
        style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
        variant="dark"
      >
        <Container>
          <Navbar.Brand href="#" className="fw-bold d-flex align-items-center">
            <FaMapMarkerAlt className="me-2" size={28} />
            Mapa de Clientes
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavDropdown
                title={
                  <span className="d-flex align-items-center">
                    <FaUser className="me-1" />
                    {user?.nombre_completo || user?.username}
                  </span>
                }
                id="user-nav-dropdown"
                align="end"
              >
                <NavDropdown.Item href="#">
                  <FaUser className="me-2" />
                  Mi Perfil
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="text-danger">
                  <FaSignOutAlt className="me-2" />
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="py-4">
        {/* Welcome Section */}
        <Card 
          className="mb-4 border-0 shadow-sm text-white"
          style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          <Card.Body className="p-4">
            <Row className="align-items-center">
              <Col xs={12} md={2} className="text-center text-md-start mb-3 mb-md-0">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold"
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    fontSize: '2rem'
                  }}
                >
                  {user?.nombre_completo ? user.nombre_completo.charAt(0).toUpperCase() : user?.username?.charAt(0).toUpperCase()}
                </div>
              </Col>
              <Col xs={12} md={10}>
                <h2 className="fw-bold mb-2">
                  ¡Bienvenido, {user?.nombre_completo || user?.username}!
                </h2>
                <p className="mb-2 opacity-75 fs-5">{user?.email}</p>
                <Badge 
                  bg="light" 
                  text="dark" 
                  className="px-3 py-2"
                >
                  <FaUser className="me-1" />
                  @{user?.username}
                </Badge>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Dashboard Stats */}
        <Row className="g-4 mb-4">
          <Col xs={12} md={4}>
            <Card className="h-100 border-0 shadow-sm text-center">
              <Card.Body className="p-4">
                <FaTachometerAlt 
                  size={48} 
                  className="text-primary mb-3" 
                />
                <Card.Title>Panel Principal</Card.Title>
                <Card.Text className="text-muted">
                  Accede a todas las funciones del sistema
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={4}>
            <Card className="h-100 border-0 shadow-sm text-center">
              <Card.Body className="p-4">
                <FaMapMarkerAlt 
                  size={48} 
                  className="text-success mb-3" 
                />
                <Card.Title>Mapa de Clientes</Card.Title>
                <Card.Text className="text-muted">
                  Visualiza y gestiona la ubicación de tus clientes
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={4}>
            <Card className="h-100 border-0 shadow-sm text-center">
              <Card.Body className="p-4">
                <FaUsers 
                  size={48} 
                  className="text-info mb-3" 
                />
                <Card.Title>Gestión de Usuarios</Card.Title>
                <Card.Text className="text-muted">
                  Administra usuarios y permisos del sistema
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* User Information Card */}
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-white py-3">
            <h5 className="mb-0 fw-bold">Información de la Cuenta</h5>
          </Card.Header>
          <Card.Body className="p-4">
            <Row>
              <Col xs={12} md={6}>
                <div className="mb-3">
                  <strong className="text-muted d-block">Nombre Completo</strong>
                  <span className="fs-5">
                    {user?.nombre_completo || 'No especificado'}
                  </span>
                </div>

                <div className="mb-3">
                  <strong className="text-muted d-block">Usuario</strong>
                  <span className="fs-5">{user?.username}</span>
                </div>
              </Col>

              <Col xs={12} md={6}>
                <div className="mb-3">
                  <strong className="text-muted d-block">Correo Electrónico</strong>
                  <span className="fs-5">{user?.email}</span>
                </div>

                <div className="mb-3">
                  <strong className="text-muted d-block">ID de Usuario</strong>
                  <span className="fs-5">#{user?.id}</span>
                </div>
              </Col>
            </Row>

            <hr className="my-4" />

            <div className="d-flex flex-wrap gap-2">
              <Button 
                variant="outline-primary" 
                onClick={() => alert('Función próximamente disponible')}
              >
                <FaUser className="me-1" />
                Editar Perfil
              </Button>
              <Button 
                variant="outline-danger" 
                onClick={handleLogout}
              >
                <FaSignOutAlt className="me-1" />
                Cerrar Sesión
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Dashboard;