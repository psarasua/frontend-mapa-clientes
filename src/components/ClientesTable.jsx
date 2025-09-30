import { useState, useMemo, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import Layout from "./Layout";
import ClientMapModal from "./ClientMapModal";
import ClientDetailsModal from "./ClientDetailsModal";
import { useClientes, useDeleteCliente } from "../hooks/useClientes";
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
  Spinner,
  Alert,
} from "react-bootstrap";
import { FaSort, FaSortUp, FaSortDown, FaMapMarkerAlt } from "react-icons/fa";

const ClientesTable = () => {
  // React Query hooks
  const {
    data: clientesData = [],
    isLoading,
    isError,
    error: queryError,
    refetch,
  } = useClientes();

  const deleteClienteMutation = useDeleteCliente();

  // Estados para modales y filtros
  const [globalFilter, setGlobalFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedClientForMap, setSelectedClientForMap] = useState(null);

  // Función para recargar clientes manualmente (para botón de retry)
  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

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
        try {
          await deleteClienteMutation.mutateAsync(client.id);
          alert(`Cliente ${client.nombre} eliminado exitosamente`);
        } catch (error) {
          alert(`Error al eliminar cliente: ${error.message}`);
        }
      }
    },
    [deleteClienteMutation]
  );

  const handleAddClient = useCallback(() => {
    // TODO: Implementar modal de creación
    alert("Función de agregar cliente próximamente");
  }, []);

  const handleShowLocation = useCallback((client) => {
    setSelectedClientForMap(client);
    setShowMapModal(true);
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
              variant="outline-info"
              size="sm"
              onClick={(e) => {
                e.stopPropagation(); // Evitar que se active el click de la fila
                handleShowLocation(row.original);
              }}
              title="Ver ubicación"
              disabled={!row.original.latitud || !row.original.longitud}
            >
              <FaMapMarkerAlt />
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
    [handleEditClient, handleDeleteClient, handleShowLocation] // Dependencias correctas
  );

  // Configuración de la tabla
  const table = useReactTable({
    data: clientesData, // Usar datos de React Query
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
            {isError && (
              <Alert variant="danger" className="mx-3 mt-3 mb-0">
                <strong>Error:</strong>{" "}
                {queryError?.message || "Error al cargar clientes"}
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="ms-2"
                  onClick={handleRetry}
                >
                  Reintentar
                </Button>
              </Alert>
            )}
            {/* Loading Spinner */}
            {(isLoading || deleteClienteMutation.isPending) && (
              <div className="d-flex justify-content-center align-items-center p-4">
                <Spinner
                  animation="border"
                  variant="primary"
                  className="me-2"
                />
                <span>
                  {deleteClienteMutation.isPending
                    ? "Eliminando cliente..."
                    : "Cargando clientes..."}
                </span>
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

        {/* Modal de Mapa */}
        <ClientMapModal
          show={showMapModal}
          onHide={() => setShowMapModal(false)}
          client={selectedClientForMap}
        />

        {/* Modal de Detalles */}
        <ClientDetailsModal
          show={showModal}
          onHide={() => setShowModal(false)}
          client={selectedClient}
          onEdit={handleEditClient}
        />
      </Container>
    </Layout>
  );
};

export default ClientesTable;
