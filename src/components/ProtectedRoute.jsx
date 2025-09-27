import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Container, Row, Col, Spinner } from "react-bootstrap";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={6} className="text-center">
              <Spinner
                animation="border"
                role="status"
                style={{
                  width: '4rem',
                  height: '4rem',
                  color: 'white',
                  marginBottom: '1rem'
                }}
              >
                <span className="visually-hidden">Cargando...</span>
              </Spinner>
              <h5 className="text-white fw-normal">
                Verificando autenticación...
              </h5>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  // Si no está autenticado, redirigir a login
  // Guardar la ubicación actual para redirigir después del login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si está autenticado, mostrar el componente
  return children;
};

export default ProtectedRoute;