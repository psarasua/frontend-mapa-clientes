import { useEffect } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const ClientMapModal = ({ show, onHide, client }) => {
  // Configuración de íconos de Leaflet
  useEffect(() => {
    // Fix para los íconos de Leaflet en React
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
  }, []);

  const hasValidCoordinates = client && client.latitud && client.longitud;

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Ubicación del Cliente: {client?.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {hasValidCoordinates ? (
          <div style={{ height: "400px", width: "100%" }}>
            <MapContainer
              center={[parseFloat(client.latitud), parseFloat(client.longitud)]}
              zoom={15}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker
                position={[
                  parseFloat(client.latitud),
                  parseFloat(client.longitud),
                ]}
              >
                <Popup>
                  <div>
                    <strong>{client.nombre}</strong>
                    <br />
                    {client.razonsocial}
                    <br />
                    {client.direccion}
                    <br />
                    <small>
                      Lat: {parseFloat(client.latitud).toFixed(6)}
                      <br />
                      Lng: {parseFloat(client.longitud).toFixed(6)}
                    </small>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        ) : (
          <Alert variant="warning">
            No hay coordenadas disponibles para este cliente.
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClientMapModal;
