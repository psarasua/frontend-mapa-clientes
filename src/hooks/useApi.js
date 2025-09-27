import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const API_BASE_URL =
  "https://managerial-teresa-pablo-sarasua-df7cefa1.koyeb.app/api";

export const useApi = () => {
  const { token, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = async (endpoint, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      };

      // Agregar token si existe y no es un endpoint público
      if (token && !isPublicEndpoint(endpoint)) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(url, config);

      // Manejar error 401 - Token expirado o inválido
      if (response.status === 401) {
        logout();
        throw new Error("Sesión expirada. Por favor inicia sesión nuevamente.");
      }

      // Manejar otros errores HTTP
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || errorData.message || `Error ${response.status}`
        );
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err.message || "Error en la conexión";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Determinar si un endpoint es público (no requiere autenticación)
  const isPublicEndpoint = (endpoint) => {
    const publicEndpoints = ["/usuarios/login", "/usuarios/registro"];
    return publicEndpoints.some((publicEndpoint) =>
      endpoint.includes(publicEndpoint)
    );
  };

  // Métodos de conveniencia
  const get = (endpoint, options = {}) => {
    return makeRequest(endpoint, { ...options, method: "GET" });
  };

  const post = (endpoint, data, options = {}) => {
    return makeRequest(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  const put = (endpoint, data, options = {}) => {
    return makeRequest(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });
  };

  const del = (endpoint, options = {}) => {
    return makeRequest(endpoint, { ...options, method: "DELETE" });
  };

  const patch = (endpoint, data, options = {}) => {
    return makeRequest(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(data),
    });
  };

  return {
    loading,
    error,
    makeRequest,
    get,
    post,
    put,
    delete: del,
    patch,
  };
};

export default useApi;
