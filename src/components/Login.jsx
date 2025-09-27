import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaMapMarkerAlt } from 'react-icons/fa';
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
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

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError("Por favor ingresa tu usuario");
      return false;
    }

    if (!formData.password.trim()) {
      setError("Por favor ingresa tu contraseña");
      return false;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      const result = await login(formData);
      
      if (result.success) {
        // Redirigir a la página que el usuario intentaba acceder o al dashboard
        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
      } else {
        setError(result.error || "Error al iniciar sesión");
      }
    } catch (error) {
      setError(error.message || "Error al iniciar sesión. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-vh-100 d-flex align-items-center"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Elementos decorativos de fondo */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          animation: "float 6s ease-in-out infinite"
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "60%",
          right: "15%",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.05)",
          animation: "float 8s ease-in-out infinite reverse"
        }}
      />

      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <Card 
              className="shadow-lg border-0"
              style={{
                backdropFilter: "blur(20px)",
                background: "rgba(255, 255, 255, 0.15)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "20px"
              }}
            >
              <Card.Body className="p-5">
                {/* Header */}
                <div className="text-center mb-4">
                  <FaMapMarkerAlt 
                    size={60} 
                    className="text-white mb-3"
                    style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}
                  />
                  <h1 className="text-white fw-bold mb-3" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                    Iniciar Sesión
                  </h1>
                  <p className="text-white-50 fs-5">
                    Accede a tu cuenta para continuar
                  </p>
                </div>

                {/* Error Alert */}
                {error && (
                  <Alert variant="danger" className="mb-4">
                    {error}
                  </Alert>
                )}

                {/* Form */}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-white">Usuario</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FaUser className="text-secondary" />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        disabled={loading}
                        autoComplete="username"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          border: "none"
                        }}
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="text-white">Contraseña</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FaLock className="text-secondary" />
                      </InputGroup.Text>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={loading}
                        autoComplete="current-password"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          border: "none"
                        }}
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={handleTogglePassword}
                        disabled={loading}
                        style={{ 
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          border: "none"
                        }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-100 py-3 fw-bold"
                    disabled={loading}
                    style={{
                      background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
                      border: "none",
                      fontSize: "1rem"
                    }}
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Iniciando sesión...
                      </>
                    ) : (
                      "Iniciar Sesión"
                    )}
                  </Button>

                  {/* Link al registro */}
                  <div className="text-center mt-3">
                    <p className="text-white-50 mb-0">
                      ¿No tienes una cuenta?{" "}
                      <Link
                        to="/registro"
                        className="text-white text-decoration-none fw-bold"
                      >
                        Crear Usuario
                      </Link>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default Login;