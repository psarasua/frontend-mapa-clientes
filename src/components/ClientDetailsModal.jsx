import { Modal, Button, Row, Col, Badge } from "react-bootstrap";

const ClientDetailsModal = ({ show, onHide, client, onEdit }) => {
  const getEstadoBadgeVariant = (estado) => {
    switch (estado?.toLowerCase()) {
      case "activo":
        return "success";
      case "inactivo":
        return "danger";
      case "pendiente":
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {client && (
          <Row>
            <Col md={6}>
              <h6 className="text-muted">Información de Contacto</h6>
              <div className="mb-3">
                <strong>Nombre del Contacto:</strong> {client.nombre}
              </div>
              <div className="mb-3">
                <strong>Teléfono:</strong> {client.telefono}
              </div>
              <div className="mb-3">
                <strong>RUT:</strong> {client.rut}
              </div>
              {client.codigoalte && (
                <div className="mb-3">
                  <strong>Código Alternativo:</strong> {client.codigoalte}
                </div>
              )}
              <div className="mb-3">
                <strong>Estado:</strong>{" "}
                <Badge bg={getEstadoBadgeVariant(client.estado)}>
                  {client.estado?.toUpperCase()}
                </Badge>
              </div>
            </Col>
            <Col md={6}>
              <h6 className="text-muted">Información Empresarial</h6>
              <div className="mb-3">
                <strong>Razón Social:</strong>{" "}
                {client.razonsocial || client.empresa}
              </div>
              <div className="mb-3">
                <strong>Dirección:</strong> {client.direccion}
              </div>
              {client.fechaRegistro &&
                client.fechaRegistro !== "No disponible" && (
                  <div className="mb-3">
                    <strong>Fecha de Registro:</strong>{" "}
                    {new Date(client.fechaRegistro).toLocaleDateString("es-ES")}
                  </div>
                )}
              {client.latitud && client.longitud && (
                <div className="mb-3">
                  <strong>Coordenadas GPS:</strong>
                  <br />
                  <small className="text-muted">
                    Lat: {parseFloat(client.latitud).toFixed(6)}
                    <br />
                    Lng: {parseFloat(client.longitud).toFixed(6)}
                  </small>
                </div>
              )}
            </Col>
          </Row>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Cerrar
        </Button>
        {onEdit && (
          <Button variant="primary" onClick={() => onEdit(client)}>
            Editar Cliente
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ClientDetailsModal;
