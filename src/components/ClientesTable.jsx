import { useState, useMemo, useEffect, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import Layout from "./Layout";
import {
  getClientes,
  deleteCliente,
  formatClienteForTable,
} from "../services/clientesService.js";
import {
  Container,
  Card,
  Table,
  Form,
  Button,
  Row,
  Col,
  Badge,
  InputGroup,
  Pagination,
  Dropdown,
  Modal,
  Spinner,
  Alert,
} from "react-bootstrap";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const ClientesTable = () => {
  // Estados para la tabla
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  // Datos de ejemplo (simulando clientes según estructura BD)
  const sampleData = useMemo(
    () => [
      {
        id: 1,
        codigoalte: "CLI001",
        razonsocial: "Tech Solutions S.L.",
        nombre: "Juan Pérez",
        direccion: "Calle Mayor 123, Madrid",
        telefono: "+56 9 1234 5678",
        rut: "12.345.678-9",
        estado: "Activo",
        longitud: -70.6483,
        latitud: -33.4489,
        // Campos adicionales para UI
        empresa: "Tech Solutions S.L.",
        email: "No especificado",
        fechaRegistro: "2024-01-15",
        ultimaActividad: "2024-03-20",
      },
      {
        id: 2,
        codigoalte: "CLI002",
        razonsocial: "Innovate Corp",
        nombre: "María García",
        direccion: "Avenida Libertad 456, Barcelona",
        telefono: "+56 9 8765 4321",
        rut: "98.765.432-1",
        estado: "Activo",
        longitud: -70.5045,
        latitud: -33.4372,
        // Campos adicionales para UI
        empresa: "Innovate Corp",
        email: "No especificado",
        fechaRegistro: "2024-02-10",
        ultimaActividad: "2024-03-18",
      },
      {
        id: 3,
        codigoalte: "CLI003",
        razonsocial: "Global Services",
        nombre: "Carlos López",
        direccion: "Plaza Central 789, Valencia",
        telefono: "+56 9 5555 1234",
        rut: "11.222.333-4",
        estado: "Inactivo",
        longitud: -70.6692,
        latitud: -33.4734,
        // Campos adicionales para UI
        empresa: "Global Services",
        email: "No especificado",
        fechaRegistro: "2024-01-20",
        ultimaActividad: "2024-02-15",
      },
      {
        id: 4,
        codigoalte: "CLI004",
        razonsocial: "Digital Agency",
        nombre: "Ana Martínez",
        direccion: "Calle Innovación 321, Sevilla",
        telefono: "+56 9 7777 8888",
        rut: "44.555.666-7",
        estado: "Activo",
        longitud: -70.6506,
        latitud: -33.4378,
        // Campos adicionales para UI
        empresa: "Digital Agency",
        email: "No especificado",
        fechaRegistro: "2024-03-01",
        ultimaActividad: "2024-03-19",
      },
      {
        id: 5,
        codigoalte: "CLI005",
        razonsocial: "StartUp Hub",
        nombre: "Roberto Silva",
        direccion: "Paseo Tecnológico 654, Bilbao",
        telefono: "+56 9 4444 5555",
        rut: "77.888.999-0",
        estado: "Pendiente",
        longitud: -70.6344,
        latitud: -33.456,
        // Campos adicionales para UI
        empresa: "StartUp Hub",
        email: "No especificado",
        fechaRegistro: "2024-03-15",
        ultimaActividad: "2024-03-21",
      },
    ],
    []
  );

  // Cargar clientes al montar el componente
  useEffect(() => {
    loadClientes();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Función para cargar clientes desde la API
  const loadClientes = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getClientes();

      if (result.success) {
        // Formatear datos para la tabla
        const formattedData = result.data.map((cliente) =>
          formatClienteForTable(cliente)
        );
        setData(formattedData);
      } else {
        setError(result.error || "Error al cargar clientes");
        // Usar datos de ejemplo en caso de error
        setData(sampleData);
      }
    } catch {
      setError("Error de conexión con el servidor");
      // Usar datos de ejemplo en caso de error
      setData(sampleData);
    } finally {
      setLoading(false);
    }
  }, [sampleData]);

  // Handlers para acciones CRUD
  const handleViewClient = useCallback((client) => {
    setSelectedClient(client);
    setShowModal(true);
  }, []);

  const handleEditClient = useCallback(async (client) => {
    // TODO: Implementar modal de edición
    alert(`Editar cliente: ${client.nombre}`);
  }, []);

  const handleDeleteClient = useCallback(
    async (client) => {
      if (window.confirm(`¿Estás seguro de eliminar a ${client.nombre}?`)) {
        setLoading(true);
        try {
          const result = await deleteCliente(client.id);

          if (result.success) {
            // Recargar datos después de eliminar
            await loadClientes();
            alert(`Cliente ${client.nombre} eliminado exitosamente`);
          } else {
            setError(result.error || "Error al eliminar cliente");
          }
        } catch {
          setError("Error de conexión al eliminar cliente");
        } finally {
          setLoading(false);
        }
      }
    },
    [loadClientes]
  );

  const handleAddClient = useCallback(() => {
    // TODO: Implementar modal de creación
    alert("Función de agregar cliente próximamente");
  }, []);

  // Definición de columnas
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 60,
        cell: ({ getValue }) => <Badge bg="secondary">#{getValue()}</Badge>,
      },
      {
        accessorKey: "codigoalte",
        header: "Código Alt.",
        cell: ({ getValue }) => (
          <Badge bg="info" className="font-monospace">
            {getValue() || "N/A"}
          </Badge>
        ),
      },
      {
        accessorKey: "nombre",
        header: "Nombre",
        cell: ({ getValue }) => <div className="fw-semibold">{getValue()}</div>,
      },
      {
        accessorKey: "razonsocial",
        header: "Razón Social",
        cell: ({ getValue }) => getValue(),
      },
      {
        accessorKey: "direccion",
        header: "Dirección",
        cell: ({ getValue }) => (
          <span className="text-truncate" style={{ maxWidth: "200px" }}>
            {getValue()}
          </span>
        ),
      },
      {
        accessorKey: "telefono",
        header: "Teléfono",
        cell: ({ getValue }) => (
          <span className="font-monospace">{getValue()}</span>
        ),
      },
      {
        accessorKey: "rut",
        header: "RUT",
        cell: ({ getValue }) => (
          <span className="font-monospace text-primary">{getValue()}</span>
        ),
      },
      {
        accessorKey: "estado",
        header: "Estado",
        cell: ({ getValue }) => {
          const estado = getValue()?.toLowerCase();
          const variant =
            {
              activo: "success",
              inactivo: "danger",
              pendiente: "warning",
            }[estado] || "secondary";

          return <Badge bg={variant}>{getValue()?.toUpperCase()}</Badge>;
        },
      },
      {
        id: "acciones",
        header: "Acciones",
        cell: ({ row }) => (
          <div className="d-flex gap-1">
            <Button
              variant="outline-warning"
              size="sm"
              onClick={(e) => {
                e.stopPropagation(); // Evitar que se active el click de la fila
                handleEditClient(row.original);
              }}
              title="Editar"
            >
              Editar
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={(e) => {
                e.stopPropagation(); // Evitar que se active el click de la fila
                handleDeleteClient(row.original);
              }}
              title="Eliminar"
            >
              Eliminar
            </Button>
          </div>
        ),
      },
    ],
    [handleEditClient, handleDeleteClient] // Dependencias correctas
  );

  // Configuración de la tabla
  const table = useReactTable({
    data: data, // Usar datos reales en lugar de sampleData
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
  });

  return (
    <Layout>
      <Container fluid className="py-4">
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-white border-bottom">
            <Row className="align-items-center">
              <Col>
                <h5 className="mb-0 fw-bold">Gestión de Clientes</h5>
                <small className="text-muted">
                  Total: {table.getFilteredRowModel().rows.length} clientes
                </small>
              </Col>
              <Col xs="auto">
                <Button variant="primary" onClick={handleAddClient}>
                  Nuevo Cliente
                </Button>
              </Col>
            </Row>
          </Card.Header>

          <Card.Body className="p-0">
            {/* Filtros y Búsqueda */}
            <div className="p-3 border-bottom bg-light">
              <Row className="g-3 align-items-center">
                <Col md={6}>
                  <InputGroup>
                    <InputGroup.Text>Buscar</InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Buscar clientes por nombre, email, empresa..."
                      value={globalFilter ?? ""}
                      onChange={(e) => setGlobalFilter(e.target.value)}
                    />
                  </InputGroup>
                </Col>
                <Col md={3}>
                  <Form.Select>
                    <option value="">Todos los estados</option>
                    <option value="activo">Activos</option>
                    <option value="inactivo">Inactivos</option>
                    <option value="pendiente">Pendientes</option>
                  </Form.Select>
                </Col>
                <Col md={3}>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-secondary"
                      className="w-100"
                    >
                      Filtros
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>Por fecha</Dropdown.Item>
                      <Dropdown.Item>Por empresa</Dropdown.Item>
                      <Dropdown.Item>Por ubicación</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
            </div>
            {/* Error Alert */}
            {error && (
              <Alert variant="danger" className="mx-3 mt-3 mb-0">
                <strong>Error:</strong> {error}
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="ms-2"
                  onClick={loadClientes}
                >
                  Reintentar
                </Button>
              </Alert>
            )}
            {/* Loading Spinner */}
            {loading && (
              <div className="d-flex justify-content-center align-items-center p-4">
                <Spinner
                  animation="border"
                  variant="primary"
                  className="me-2"
                />
                <span>Cargando clientes...</span>
              </div>
            )}{" "}
            {/* Tabla */}
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead className="bg-light">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="border-0 py-3 px-3"
                          style={{
                            cursor: header.column.getCanSort()
                              ? "pointer"
                              : "default",
                          }}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <div className="d-flex align-items-center justify-content-between">
                            <span className="fw-semibold text-muted">
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </span>
                            {header.column.getCanSort() && (
                              <span className="ms-2">
                                {header.column.getIsSorted() === "asc" ? (
                                  <FaSortUp className="text-primary" />
                                ) : header.column.getIsSorted() === "desc" ? (
                                  <FaSortDown className="text-primary" />
                                ) : (
                                  <FaSort className="text-muted" />
                                )}
                              </span>
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-bottom"
                      onClick={() => handleViewClient(row.original)}
                      style={{ cursor: "pointer" }}
                      title="Hacer clic para ver detalles"
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#f8f9fa")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "transparent")
                      }
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="py-3 px-3">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            {/* Paginación */}
            <div className="p-3 border-top bg-light">
              <Row className="align-items-center">
                <Col md={6}>
                  <div className="d-flex align-items-center gap-2">
                    <span className="text-muted">Mostrar:</span>
                    <Form.Select
                      style={{ width: "auto" }}
                      value={table.getState().pagination.pageSize}
                      onChange={(e) =>
                        table.setPageSize(Number(e.target.value))
                      }
                    >
                      {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                          {pageSize}
                        </option>
                      ))}
                    </Form.Select>
                    <span className="text-muted">
                      Página {table.getState().pagination.pageIndex + 1} de{" "}
                      {table.getPageCount()}
                    </span>
                  </div>
                </Col>
                <Col md={6}>
                  <Pagination className="justify-content-end mb-0">
                    <Pagination.First
                      onClick={() => table.setPageIndex(0)}
                      disabled={!table.getCanPreviousPage()}
                    />
                    <Pagination.Prev
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    />
                    <Pagination.Next
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    />
                    <Pagination.Last
                      onClick={() =>
                        table.setPageIndex(table.getPageCount() - 1)
                      }
                      disabled={!table.getCanNextPage()}
                    />
                  </Pagination>
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>

        {/* Modal de Detalles */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Detalles del Cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedClient && (
              <Row>
                <Col md={6}>
                  <h6 className="text-muted">Información de Contacto</h6>
                  <div className="mb-3">
                    <strong>Nombre del Contacto:</strong>{" "}
                    {selectedClient.nombre}
                  </div>
                  <div className="mb-3">
                    <strong>Teléfono:</strong> {selectedClient.telefono}
                  </div>
                  <div className="mb-3">
                    <strong>RUT:</strong> {selectedClient.rut}
                  </div>
                  {selectedClient.codigoalte && (
                    <div className="mb-3">
                      <strong>Código Alternativo:</strong>{" "}
                      {selectedClient.codigoalte}
                    </div>
                  )}
                  <div className="mb-3">
                    <strong>Estado:</strong>{" "}
                    <Badge
                      bg={
                        selectedClient.estado === "Activo"
                          ? "success"
                          : selectedClient.estado === "Inactivo"
                          ? "danger"
                          : "warning"
                      }
                    >
                      {selectedClient.estado.toUpperCase()}
                    </Badge>
                  </div>
                </Col>
                <Col md={6}>
                  <h6 className="text-muted">Información Empresarial</h6>
                  <div className="mb-3">
                    <strong>Razón Social:</strong> {selectedClient.empresa}
                  </div>
                  <div className="mb-3">
                    <strong>Dirección:</strong> {selectedClient.direccion}
                  </div>
                  {selectedClient.fechaRegistro && (
                    <div className="mb-3">
                      <strong>Fecha de Registro:</strong>{" "}
                      {new Date(
                        selectedClient.fechaRegistro
                      ).toLocaleDateString("es-ES")}
                    </div>
                  )}
                  {selectedClient.latitud && selectedClient.longitud && (
                    <div className="mb-3">
                      <strong>Coordenadas GPS:</strong>
                      <br />
                      <small className="text-muted">
                        Lat: {selectedClient.latitud}
                        <br />
                        Lng: {selectedClient.longitud}
                      </small>
                    </div>
                  )}
                </Col>
              </Row>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-secondary"
              onClick={() => setShowModal(false)}
            >
              Cerrar
            </Button>
            <Button
              variant="primary"
              onClick={() => handleEditClient(selectedClient)}
            >
              Editar Cliente
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Layout>
  );
};

export default ClientesTable;
