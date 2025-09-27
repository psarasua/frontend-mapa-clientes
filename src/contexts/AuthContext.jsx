import { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Cargar datos del usuario al inicializar la app
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error al cargar datos de autenticación:", error);
        // Limpiar datos corruptos
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Función de login
  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await authService.login(credentials);

      if (response.success && response.token && response.usuario) {
        // Guardar en localStorage
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.usuario));

        // Actualizar estado
        setToken(response.token);
        setUser(response.usuario);
        setIsAuthenticated(true);

        return { success: true, message: "Login exitoso" };
      } else {
        throw new Error(response.error || "Error en el login");
      }
    } catch (error) {
      console.error("Error en login:", error);
      return {
        success: false,
        error: error.message || "Error al iniciar sesión",
      };
    } finally {
      setLoading(false);
    }
  };

  // Función de registro
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authService.register(userData);

      console.log("Response from authService:", response); // Debug temporal

      if (
        response.success &&
        response.token &&
        (response.user || response.usuario)
      ) {
        const userData = response.user || response.usuario;

        // Guardar en localStorage
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(userData));

        // Actualizar estado
        setToken(response.token);
        setUser(userData);
        setIsAuthenticated(true);

        return { success: true, message: "Usuario creado exitosamente" };
      } else {
        console.error("Respuesta inválida:", response);
        return {
          success: false,
          error: response.error || "Error en el registro",
        };
      }
    } catch (error) {
      console.error("Error en registro:", error);
      return {
        success: false,
        error: error.message || "Error al crear usuario",
      };
    } finally {
      setLoading(false);
    }
  };

  // Función de logout
  const logout = () => {
    try {
      // Limpiar localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Resetear estado
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);

      return { success: true, message: "Sesión cerrada correctamente" };
    } catch (error) {
      console.error("Error en logout:", error);
      return { success: false, error: "Error al cerrar sesión" };
    }
  };

  // Verificar si el token sigue siendo válido
  const verifyToken = async () => {
    if (!token) return false;

    try {
      // Aquí podrías hacer una llamada al backend para verificar el token
      // Por ahora, solo verificamos que exista
      return true;
    } catch (error) {
      console.error("Token inválido:", error);
      logout();
      return false;
    }
  };

  const value = {
    // Estado
    user,
    token,
    loading,
    isAuthenticated,

    // Funciones
    login,
    register,
    logout,
    verifyToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
