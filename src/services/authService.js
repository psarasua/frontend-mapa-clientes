import apiService from "./apiService";

class AuthService {
  constructor() {
    this.user = null;
    this.isAuthenticated = false;

    // Verificar si hay datos guardados al inicializar
    const userData = localStorage.getItem("user_data");
    const token = localStorage.getItem("auth_token");

    if (userData && token) {
      try {
        this.user = JSON.parse(userData);
        this.isAuthenticated = true;
        apiService.setToken(token);
      } catch (error) {
        // Si hay error parseando, limpiar datos corruptos
        this.logout();
      }
    }
  }

  async login(credentials) {
    try {
      const response = await apiService.post("/api/usuarios/login", {
        username: credentials.username,
        password: credentials.password,
      });

      console.log("Respuesta login del servidor:", response); // Debug temporal

      // Si la respuesta indica error explícitamente
      if (response.success === false) {
        return {
          success: false,
          error: response.error || "Error en el login",
        };
      }

      // Buscar token y usuario en la estructura correcta según tu backend
      const token = response.data?.token || response.token; // Por si login tiene estructura diferente
      const user = response.data?.usuario || response.usuario || response.user;

      if (token && user) {
        this.user = user;
        this.isAuthenticated = true;

        localStorage.setItem("user_data", JSON.stringify(user));
        localStorage.setItem("auth_token", token);
        apiService.setToken(token);

        return {
          success: true,
          user: user,
          token: token,
          usuario: user, // Para compatibilidad
          message: response.message || "Login exitoso",
        };
      } else {
        console.error("Estructura de respuesta login inesperada:", response);
        return {
          success: false,
          error: "Respuesta inválida del servidor",
        };
      }
    } catch (error) {
      console.error("Error completo en login:", error);

      if (error.message && error.message.includes("401")) {
        return {
          success: false,
          error: "Usuario o contraseña incorrectos",
        };
      }

      return {
        success: false,
        error: error.message || "Error de conexión con el servidor",
      };
    }
  }

  async register(userData) {
    try {
      const response = await apiService.post(
        "/api/usuarios/registro",
        userData
      );

      console.log("Respuesta completa del servidor:", response); // Debug temporal

      // Si la respuesta indica error explícitamente, devolver error sin lanzar excepción
      if (response.success === false) {
        return {
          success: false,
          error: response.error || "Error en el registro",
        };
      }

      // Buscar token y usuario en la estructura correcta según tu backend
      const token = response.data?.token;
      const user = response.data?.usuario;

      console.log("Token encontrado:", !!token);
      console.log("Usuario encontrado:", !!user);

      if (token && user) {
        this.user = user;
        this.isAuthenticated = true;

        localStorage.setItem("user_data", JSON.stringify(user));
        localStorage.setItem("auth_token", token);
        apiService.setToken(token);

        return {
          success: true,
          user: user,
          token: token,
          usuario: user, // Para compatibilidad con AuthContext
          message: response.message || "Registro exitoso",
        };
      } else {
        console.error("Estructura de respuesta inesperada:", response);
        return {
          success: false,
          error: "Los datos devueltos por el servidor no son válidos",
        };
      }
    } catch (error) {
      console.error("Error completo en registro:", error);
      return {
        success: false,
        error: error.message || "Error de conexión con el servidor",
      };
    }
  }

  logout() {
    this.user = null;
    this.isAuthenticated = false;
    localStorage.removeItem("user_data");
    localStorage.removeItem("auth_token");
    apiService.setToken(null);
  }

  getCurrentUser() {
    return this.user;
  }

  isUserAuthenticated() {
    return this.isAuthenticated;
  }

  async verifyToken() {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) return false;

      // Aquí podrías hacer una llamada al backend para verificar el token
      // Por ahora, solo verificamos que exista
      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  async refreshToken() {
    try {
      const response = await apiService.post("/api/auth/refresh");
      if (response.token) {
        localStorage.setItem("auth_token", response.token);
        apiService.setToken(response.token);
        return response.token;
      }
      throw new Error("No se pudo refrescar el token");
    } catch (error) {
      this.logout();
      throw error;
    }
  }
}

export default new AuthService();
