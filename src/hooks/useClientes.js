import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
  formatClienteForTable,
} from "../services/clientesService";

// Query Keys - Constantes para las claves de cache
export const QUERY_KEYS = {
  CLIENTES: "clientes",
  CLIENTE: "cliente",
};

/**
 * Hook para obtener la lista de clientes con cache y refetch automático
 */
export const useClientes = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CLIENTES],
    queryFn: async () => {
      const result = await getClientes();

      if (result.success) {
        // Formatear datos para la tabla
        return result.data.map((cliente) => formatClienteForTable(cliente));
      } else {
        throw new Error(result.error || "Error al cargar clientes");
      }
    },
    staleTime: 1000 * 60 * 5, // Los datos son "frescos" por 5 minutos
    cacheTime: 1000 * 60 * 10, // Mantener en cache por 10 minutos
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

/**
 * Hook para obtener un cliente específico por ID
 */
export const useCliente = (clienteId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CLIENTE, clienteId],
    queryFn: async () => {
      const result = await getClienteById(clienteId);
      if (result.success) {
        return formatClienteForTable(result.data);
      }
      throw new Error(result.error || "Cliente no encontrado");
    },
    enabled: !!clienteId, // Solo ejecutar si clienteId existe
  });
};

/**
 * Hook para eliminar un cliente
 */
export const useDeleteCliente = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (clienteId) => {
      const result = await deleteCliente(clienteId);
      if (!result.success) {
        throw new Error(result.error || "Error al eliminar cliente");
      }
      return result;
    },
    onSuccess: (data, variables) => {
      // Invalidar y refetch la lista de clientes
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CLIENTES] });

      // Opcional: Remover el cliente específico del cache
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.CLIENTE, variables] });

      // Mostrar notificación de éxito (puedes usar toast aquí)
      console.log("Cliente eliminado exitosamente");
    },
    onError: (error) => {
      // Manejar errores
      console.error("Error al eliminar cliente:", error);
    },
  });
};

/**
 * Hook para crear un nuevo cliente
 */
export const useCreateCliente = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (nuevoCliente) => {
      const result = await createCliente(nuevoCliente);
      if (!result.success) {
        throw new Error(result.error || "Error al crear cliente");
      }
      return result;
    },
    onSuccess: () => {
      // Invalidar la lista de clientes para refetch
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CLIENTES] });
    },
    onError: (error) => {
      console.error("Error al crear cliente:", error);
    },
  });
};

/**
 * Hook para actualizar un cliente existente
 */
export const useUpdateCliente = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ clienteId, datosActualizados }) => {
      const result = await updateCliente(clienteId, datosActualizados);
      if (!result.success) {
        throw new Error(result.error || "Error al actualizar cliente");
      }
      return result;
    },
    onSuccess: (data, variables) => {
      // Invalidar la lista de clientes
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CLIENTES] });

      // Invalidar el cliente específico
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CLIENTE, variables.clienteId],
      });
    },
    onError: (error) => {
      console.error("Error al actualizar cliente:", error);
    },
  });
};

/**
 * Hook para refetch manual de clientes
 */
export const useRefetchClientes = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CLIENTES] });
  };
};

/**
 * Hook para obtener datos de ejemplo cuando la API falla
 */
export const useSampleClientes = () => {
  return [
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
      empresa: "Global Services",
      email: "No especificado",
      fechaRegistro: "2024-01-20",
      ultimaActividad: "2024-02-15",
    },
  ];
};

/**
 * Hook para obtener el estado de loading global de clientes
 */
export const useClientesStatus = () => {
  const queryClient = useQueryClient();
  const queries = queryClient.getQueriesData({
    queryKey: [QUERY_KEYS.CLIENTES],
  });

  return {
    isFetching: queryClient.isFetching({ queryKey: [QUERY_KEYS.CLIENTES] }) > 0,
    hasData: queries.length > 0 && queries[0][1] !== undefined,
  };
};
