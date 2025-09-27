// Configuración base de la API
const API_BASE_URL = import.meta.env.DEV
  ? "" // En desarrollo usar proxy local configurado en vite.config.js
  : import.meta.env.VITE_API_URL ||
    "https://managerial-teresa-pablo-sarasua-df7cefa1.koyeb.app";

// Clase para manejar las peticiones HTTP
class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem("auth_token");
  }

  // Método privado para hacer peticiones HTTP
  async _request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    // Agregar token de autorización si existe
    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    console.log("🚀 Request URL:", url); // Debug
    console.log("🚀 Request config:", config); // Debug

    try {
      const response = await fetch(url, config);

      console.log("📡 Response status:", response.status); // Debug
      console.log("📡 Response headers:", [...response.headers.entries()]); // Debug

      // Si la respuesta no es exitosa, obtener más detalles del error
      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Error response body:", errorText); // Debug

        let errorData = {};
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          // Si no se puede parsear como JSON, usar el texto directamente
          errorData = { error: errorText };
        }

        throw new Error(
          errorData.error ||
            errorData.message ||
            errorText ||
            `HTTP Error: ${response.status} ${response.statusText}`
        );
      }

      // Intentar parsear como JSON
      const data = await response.json();
      console.log("✅ Response data:", data); // Debug
      return data;
    } catch (error) {
      console.error("💥 Request failed:", error); // Debug
      throw error;
    }
  }

  // Métodos HTTP básicos
  async get(endpoint) {
    return this._request(endpoint, { method: "GET" });
  }

  async post(endpoint, data) {
    return this._request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data) {
    return this._request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint) {
    return this._request(endpoint, { method: "DELETE" });
  }

  // Método para establecer el token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem("auth_token", token);
    } else {
      localStorage.removeItem("auth_token");
    }
  }

  // Método para verificar conectividad con el backend
  async checkHealth() {
    try {
      const data = await this.get("/");
      return {
        status: "connected",
        message: data.message || "Backend conectado",
        timestamp: data.timestamp,
        environment: data.environment,
      };
    } catch (error) {
      return {
        status: "error",
        message: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }
}

// Crear instancia singleton
const apiService = new ApiService();

export default apiService;
