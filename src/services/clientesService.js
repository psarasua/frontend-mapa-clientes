import apiService from "./apiService.js";

// Endpoint base para clientes
const CLIENTES_ENDPOINT = "/api/clientes";

// Obtener todos los clientes
export const getClientes = async () => {
  try {
    const response = await apiService.get(CLIENTES_ENDPOINT);

    // La API devuelve { success: true, data: [...] }
    // Extraer solo el array de datos
    const clientesData = response.data || response;

    return {
      success: true,
      data: clientesData,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      error: error.message || "Error al obtener clientes",
    };
  }
};

// Obtener cliente por ID
export const getClienteById = async (id) => {
  try {
    const response = await apiService.get(`${CLIENTES_ENDPOINT}/${id}`);
    return {
      success: true,
      data: response,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error.message || "Error al obtener cliente",
    };
  }
};

// Crear nuevo cliente
export const createCliente = async (clienteData) => {
  try {
    // Validar campos requeridos según BD (NOT NULL)
    const requiredFields = [
      "razonsocial", // VARCHAR(255) NOT NULL
      "nombre", // VARCHAR(255) NOT NULL
      "direccion", // TEXT NOT NULL
    ];
    const missingFields = requiredFields.filter((field) => !clienteData[field]);

    if (missingFields.length > 0) {
      throw new Error(
        `Campos requeridos faltantes: ${missingFields.join(", ")}`
      );
    }

    // Validar longitudes máximas
    if (clienteData.razonsocial && clienteData.razonsocial.length > 255) {
      throw new Error("Razón social no puede exceder 255 caracteres");
    }
    if (clienteData.nombre && clienteData.nombre.length > 255) {
      throw new Error("Nombre no puede exceder 255 caracteres");
    }
    if (clienteData.codigoalte && clienteData.codigoalte.length > 50) {
      throw new Error("Código alternativo no puede exceder 50 caracteres");
    }
    if (clienteData.telefono && clienteData.telefono.length > 20) {
      throw new Error("Teléfono no puede exceder 20 caracteres");
    }
    if (clienteData.rut && clienteData.rut.length > 20) {
      throw new Error("RUT no puede exceder 20 caracteres");
    }
    if (clienteData.estado && clienteData.estado.length > 20) {
      throw new Error("Estado no puede exceder 20 caracteres");
    }

    const response = await apiService.post(CLIENTES_ENDPOINT, clienteData);
    return {
      success: true,
      data: response,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error.message || "Error al crear cliente",
    };
  }
};

// Actualizar cliente
export const updateCliente = async (id, clienteData) => {
  try {
    const response = await apiService.put(
      `${CLIENTES_ENDPOINT}/${id}`,
      clienteData
    );
    return {
      success: true,
      data: response,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error.message || "Error al actualizar cliente",
    };
  }
};

// Eliminar cliente
export const deleteCliente = async (id) => {
  try {
    const response = await apiService.delete(`${CLIENTES_ENDPOINT}/${id}`);
    return {
      success: true,
      data: response,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error.message || "Error al eliminar cliente",
    };
  }
};

// Formatear datos del cliente para la tabla
export const formatClienteForTable = (cliente) => {
  return {
    id: cliente.id, // SERIAL PRIMARY KEY
    codigoalte: cliente.codigoalte || "", // VARCHAR(50) UNIQUE
    razonsocial: cliente.razonsocial, // VARCHAR(255) NOT NULL
    nombre: cliente.nombre, // VARCHAR(255) NOT NULL
    direccion: cliente.direccion, // TEXT NOT NULL
    telefono: cliente.telefono || "", // VARCHAR(20)
    rut: cliente.rut || "", // VARCHAR(20) UNIQUE
    estado: cliente.estado || "Activo", // VARCHAR(20) DEFAULT 'Activo'
    longitud: cliente.longitud ? parseFloat(cliente.longitud) : null, // NUMERIC(11,8) - Convertir string a number
    latitud: cliente.latitud ? parseFloat(cliente.latitud) : null, // NUMERIC(10,7) - Convertir string a number

    // Campos adicionales para la UI
    empresa: cliente.razonsocial, // Alias para mostrar en tabla
    email: "No especificado", // No existe en BD, placeholder para UI
  };
};

// Formatear datos de la tabla para enviar a la API
export const formatTableDataForAPI = (tableData) => {
  const apiData = {
    // Campos requeridos (NOT NULL)
    razonsocial: tableData.razonsocial || tableData.empresa, // VARCHAR(255) NOT NULL
    nombre: tableData.nombre, // VARCHAR(255) NOT NULL
    direccion: tableData.direccion, // TEXT NOT NULL
  };

  // Campos opcionales - solo enviar si tienen valor
  if (tableData.codigoalte) {
    apiData.codigoalte = tableData.codigoalte.substring(0, 50); // VARCHAR(50) UNIQUE
  }
  if (tableData.telefono) {
    apiData.telefono = tableData.telefono.substring(0, 20); // VARCHAR(20)
  }
  if (tableData.rut) {
    apiData.rut = tableData.rut.substring(0, 20); // VARCHAR(20) UNIQUE
  }
  if (tableData.estado) {
    apiData.estado = tableData.estado.substring(0, 20); // VARCHAR(20) DEFAULT 'Activo'
  }
  if (tableData.longitud !== null && tableData.longitud !== undefined) {
    apiData.longitud = parseFloat(tableData.longitud); // NUMERIC(11,8)
  }
  if (tableData.latitud !== null && tableData.latitud !== undefined) {
    apiData.latitud = parseFloat(tableData.latitud); // NUMERIC(10,7)
  }

  return apiData;
};

// Validar RUT chileno (opcional)
export const validateRUT = (rut) => {
  // Remover puntos y guión
  const cleanRUT = rut.replace(/[.-]/g, "");

  // Verificar formato básico
  if (!/^\d{7,8}[\dkK]$/.test(cleanRUT)) {
    return false;
  }

  // Algoritmo de validación del dígito verificador
  const body = cleanRUT.slice(0, -1);
  const dv = cleanRUT.slice(-1).toLowerCase();

  let sum = 0;
  let multiplier = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body.charAt(i)) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const expectedDV = 11 - (sum % 11);
  const finalDV =
    expectedDV === 11 ? "0" : expectedDV === 10 ? "k" : expectedDV.toString();

  return dv === finalDV;
};

// Formatear RUT con puntos y guión
export const formatRUT = (rut) => {
  const cleanRUT = rut.replace(/[.-]/g, "");
  if (cleanRUT.length < 2) return cleanRUT;

  const body = cleanRUT.slice(0, -1);
  const dv = cleanRUT.slice(-1);

  // Agregar puntos cada 3 dígitos desde la derecha
  const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${formattedBody}-${dv}`;
};

// Validar coordenadas geográficas
export const validateCoordinates = (latitud, longitud) => {
  const errors = [];

  if (latitud !== null && latitud !== undefined) {
    const lat = parseFloat(latitud);
    if (isNaN(lat) || lat < -90 || lat > 90) {
      errors.push("Latitud debe estar entre -90 y 90 grados");
    }
    // Verificar precisión máxima para NUMERIC(10,7)
    const latStr = lat.toString();
    const [, decimal] = latStr.split(".");
    if (decimal && decimal.length > 7) {
      errors.push("Latitud no puede tener más de 7 decimales");
    }
  }

  if (longitud !== null && longitud !== undefined) {
    const lng = parseFloat(longitud);
    if (isNaN(lng) || lng < -180 || lng > 180) {
      errors.push("Longitud debe estar entre -180 y 180 grados");
    }
    // Verificar precisión máxima para NUMERIC(11,8)
    const lngStr = lng.toString();
    const [, decimal] = lngStr.split(".");
    if (decimal && decimal.length > 8) {
      errors.push("Longitud no puede tener más de 8 decimales");
    }
  }

  return errors;
};

// Validar formato de teléfono
export const validateTelefono = (telefono) => {
  if (!telefono) return true; // Campo opcional

  // Permitir formatos comunes: +56912345678, +56 9 1234 5678, (56) 9 1234 5678, etc.
  const phoneRegex = /^[+]?[0-9\s\-()]{7,20}$/;
  return phoneRegex.test(telefono);
};

// Validar que el estado sea válido
export const validateEstado = (estado) => {
  const estadosValidos = ["Activo", "Inactivo", "Pendiente", "Suspendido"];
  return !estado || estadosValidos.includes(estado);
};

// Función de validación completa para un cliente
export const validateCliente = (clienteData) => {
  const errors = [];

  // Validar campos requeridos
  if (!clienteData.razonsocial?.trim()) {
    errors.push("Razón social es requerida");
  }
  if (!clienteData.nombre?.trim()) {
    errors.push("Nombre es requerido");
  }
  if (!clienteData.direccion?.trim()) {
    errors.push("Dirección es requerida");
  }

  // Validar longitudes
  if (clienteData.razonsocial && clienteData.razonsocial.length > 255) {
    errors.push("Razón social no puede exceder 255 caracteres");
  }
  if (clienteData.nombre && clienteData.nombre.length > 255) {
    errors.push("Nombre no puede exceder 255 caracteres");
  }
  if (clienteData.codigoalte && clienteData.codigoalte.length > 50) {
    errors.push("Código alternativo no puede exceder 50 caracteres");
  }
  if (clienteData.telefono && clienteData.telefono.length > 20) {
    errors.push("Teléfono no puede exceder 20 caracteres");
  }
  if (clienteData.rut && clienteData.rut.length > 20) {
    errors.push("RUT no puede exceder 20 caracteres");
  }
  if (clienteData.estado && clienteData.estado.length > 20) {
    errors.push("Estado no puede exceder 20 caracteres");
  }

  // Validaciones específicas
  if (clienteData.rut && !validateRUT(clienteData.rut)) {
    errors.push("RUT inválido");
  }

  if (clienteData.telefono && !validateTelefono(clienteData.telefono)) {
    errors.push("Formato de teléfono inválido");
  }

  if (!validateEstado(clienteData.estado)) {
    errors.push(
      "Estado inválido. Debe ser: Activo, Inactivo, Pendiente o Suspendido"
    );
  }

  // Validar coordenadas
  const coordErrors = validateCoordinates(
    clienteData.latitud,
    clienteData.longitud
  );
  errors.push(...coordErrors);

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Objeto con todas las funciones (para compatibilidad)
const clientesService = {
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
  formatClienteForTable,
  formatTableDataForAPI,
  validateRUT,
  formatRUT,
  validateCoordinates,
  validateTelefono,
  validateEstado,
  validateCliente,
};

export default clientesService;
