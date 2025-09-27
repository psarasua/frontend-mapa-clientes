import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaEnvelope, FaUserPlus, FaMapMarkerAlt } from 'react-icons/fa';
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
      return false;
    }

    // Validar username
    if (!formData.username.trim()) {
      setError("El usuario es requerido");
      return false;
    }

    if (formData.username.length < 3) {
      setError("El usuario debe tener al menos 3 caracteres");
      return false;
    }

    // Validar email
    if (!formData.email.trim()) {
      setError("El email es requerido");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Por favor ingresa un email válido");
      return false;
    }

    // Validar contraseña
    if (!formData.password.trim()) {
      setError("La contraseña es requerida");
      return false;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }

    // Validar confirmación de contraseña
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
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
      }
    } catch (error) {
      setError(error.message || "Error al crear usuario. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-vh-100 d-flex align-items-center py-4"
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
          top: "5%",
          left: "5%",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          animation: "float 6s ease-in-out infinite"
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "70%",
          right: "10%",
          width: "120px",
          height: "120px",
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
                  <FaUserPlus 
                    size={60} 
                    className="text-white mb-3"
                    style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}
                  />
                  <h1 className="text-white fw-bold mb-3" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                    Crear Usuario
                  </h1>
                  <p className="text-white-50 fs-5">
                    Completa los datos para crear tu cuenta
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
                    <Form.Label className="text-white">Nombre Completo</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FaUser className="text-secondary" />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        name="nombre_completo"
                        value={formData.nombre_completo}
                        onChange={handleChange}
                        disabled={loading}
                        autoComplete="name"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          border: "none"
                        }}
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="text-white">Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FaEnvelope className="text-secondary" />
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={loading}
                        autoComplete="email"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          border: "none"
                        }}
                      />
                    </InputGroup>
                  </Form.Group>

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
                    <Form.Text className="text-white-50">
                      Mínimo 3 caracteres
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
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
                        autoComplete="new-password"
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
                    <Form.Text className="text-white-50">
                      Mínimo 6 caracteres
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="text-white">Confirmar Contraseña</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FaLock className="text-secondary" />
                      </InputGroup.Text>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        disabled={loading}
                        autoComplete="new-password"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          border: "none"
                        }}
                      />
                    </InputGroup>
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="success"
                    size="lg"
                    className="w-100 py-3 fw-bold"
                    disabled={loading}
                    style={{
                      background: "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
                      border: "none",
                      fontSize: "1rem"
                    }}
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Creando usuario...
                      </>
                    ) : (
                      "Crear Usuario"
                    )}
                  </Button>

                  {/* Link al login */}
                  <div className="text-center mt-3">
                    <p className="text-white-50 mb-0">
                      ¿Ya tienes una cuenta?{" "}
                      <Link
                        to="/login"
                        className="text-white text-decoration-none fw-bold"
                      >
                        Iniciar Sesión
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

export default Registro;