import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  ProgressBar,
} from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaUser,
  FaTachometerAlt,
  FaUsers,
  FaFileAlt,
  FaCalendarAlt,
} from "react-icons/fa";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const stats = [
    {
      title: "Clientes Activos",
      value: "1,234",
      icon: FaUsers,
      color: "primary",
      change: "+12%",
    },
    {
      title: "Ubicaciones",
      value: "567",
      icon: FaMapMarkerAlt,
      color: "success",
      change: "+8%",
    },
    {
      title: "Reportes",
      value: "89",
      icon: FaFileAlt,
      color: "warning",
      change: "+23%",
    },
    {
      title: "Eventos",
      value: "45",
      icon: FaCalendarAlt,
      color: "info",
      change: "+5%",
    },
  ];

  return (
    <Layout>
      <Container className="py-4">
        {/* Header */}
        <div className="mb-4">
          <h2 className="fw-bold text-dark mb-2">
            Bienvenido, {user?.nombre_completo || user?.username}
          </h2>
          <p className="text-muted mb-0">
            Aquí tienes un resumen de tu actividad y estadísticas principales
          </p>
        </div>

        {/* Stats Cards */}
        <Row className="g-4 mb-4">
          {stats.map((stat, index) => (
            <Col xs={12} sm={6} lg={3} key={index}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <p className="text-muted mb-1 small">{stat.title}</p>
                      <h4 className="fw-bold mb-0">{stat.value}</h4>
                    </div>
                    <div
                      className={`rounded-circle d-flex align-items-center justify-content-center text-${stat.color}`}
                      style={{
                        width: "48px",
                        height: "48px",
                        backgroundColor: `var(--bs-${stat.color})`,
                        opacity: 0.1,
                      }}
                    >
                      <stat.icon size={20} />
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <Badge bg={stat.color} className="me-2">
                      {stat.change}
                    </Badge>
                    <small className="text-muted">vs mes anterior</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Main Dashboard Content */}
        <Row className="g-4">
          {/* User Profile Card */}
          <Col lg={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Header className="bg-white border-bottom">
                <h6 className="mb-0 fw-bold">Información del Usuario</h6>
              </Card.Header>
              <Card.Body className="text-center">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold mb-3"
                  style={{
                    width: "80px",
                    height: "80px",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    fontSize: "1.5rem",
                  }}
                >
                  {user?.nombre_completo?.charAt(0)?.toUpperCase() ||
                    user?.username?.charAt(0)?.toUpperCase()}
                </div>

                <h5 className="fw-bold mb-1">
                  {user?.nombre_completo || user?.username}
                </h5>
                <p className="text-muted mb-3">{user?.email}</p>

                <Badge bg="primary" className="mb-3">
                  ID: #{user?.id}
                </Badge>

                <div className="d-grid gap-2">
                  <Button variant="outline-primary" size="sm">
                    <FaUser className="me-2" />
                    Editar Perfil
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="me-2" />
                    Cerrar Sesión
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Activity Chart */}
          <Col lg={8}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Header className="bg-white border-bottom">
                <h6 className="mb-0 fw-bold">Actividad Reciente</h6>
              </Card.Header>
              <Card.Body>
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="small">Progreso mensual</span>
                    <span className="small fw-bold">75%</span>
                  </div>
                  <ProgressBar
                    now={75}
                    variant="primary"
                    style={{ height: "8px" }}
                  />
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="small">Clientes procesados</span>
                    <span className="small fw-bold">60%</span>
                  </div>
                  <ProgressBar
                    now={60}
                    variant="success"
                    style={{ height: "8px" }}
                  />
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="small">Reportes generados</span>
                    <span className="small fw-bold">90%</span>
                  </div>
                  <ProgressBar
                    now={90}
                    variant="warning"
                    style={{ height: "8px" }}
                  />
                </div>

                <div className="text-center pt-3">
                  <p className="text-muted mb-3">
                    Sistema funcionando correctamente
                  </p>
                  <Button variant="primary">
                    <FaTachometerAlt className="me-2" />
                    Ver Detalles
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Dashboard;
