# Frontend Mapa Clientes

Una aplicación frontend moderna para gestión de clientes construida con React, Vite y Bootstrap, con sistema de autenticación completo y dashboard interactivo.

## 🚀 Tecnologías

- **React 19** - Biblioteca de JavaScript para construir interfaces de usuario
- **Vite 7** - Herramienta de construcción rápida y moderna
- **Bootstrap 5** - Framework CSS para diseño responsive y componentes modernos
- **React Bootstrap** - Componentes Bootstrap optimizados para React
- **React Icons** - Biblioteca de iconos escalables y consistentes
- **React Router** - Enrutamiento y navegación para aplicaciones React
- **ESLint** - Linter para mantener calidad de código

## ✨ Características

- 🔐 **Sistema de Autenticación Completo** - Login y registro con validación robusta
- 👤 **Gestión de Usuarios** - Registro, autenticación JWT y sesiones persistentes
- 🎨 **Diseño Bootstrap Moderno** - Interfaz limpia con componentes responsive
- 📊 **Dashboard Interactivo** - Panel principal con información del usuario
- 📱 **Diseño Responsive** - Optimizado para móviles, tablets y escritorio
- 🚀 **Animaciones Fluidas** - Transiciones CSS y efectos glassmorphism
- 🔒 **Rutas Protegidas** - Control de acceso y redirección automática
- ⚡ **Hot Module Replacement** - Desarrollo en tiempo real con Vite

## 🔑 Sistema de Autenticación

La aplicación incluye un sistema de autenticación JWT completamente funcional:

### 🚪 **Login**

- **Validación de formularios** en tiempo real con Bootstrap
- **Diseño glassmorphism** con gradientes modernos
- **Estados de carga** y manejo de errores
- **Toggle de visibilidad** de contraseña con React Icons
- **Redirección inteligente** después del login exitoso

### 👤 **Registro**

- **Formulario completo** con validación de campos
- **Confirmación de contraseña** con verificación en tiempo real
- **Validación de email** con expresiones regulares
- **Manejo de errores** del backend y frontend
- **Diseño responsive** con React Bootstrap

### 🔐 **Características de Seguridad**

- **JWT Tokens** para autenticación
- **Sesiones persistentes** con localStorage
- **Rutas protegidas** con ProtectedRoute component
- **Logout automático** en caso de tokens expirados

### 🌐 **Backend Integration**

- **API REST** con endpoint: `https://managerial-teresa-pablo-sarasua-df7cefa1.koyeb.app/`
- **Registro de usuarios** con validación de duplicados
- **Login seguro** con hash de contraseñas
- **Manejo de errores** HTTP y de red

## 📦 Instalación

1. Instala las dependencias:

```bash
npm install
```

## 🎯 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la aplicación construida
- `npm run lint` - Ejecuta el linter

## 🏗️ Estructura del Proyecto

```
frontend_mapaClientes/
├── public/              # Archivos estáticos
├── src/
│   ├── components/      # Componentes reutilizables
│   │   ├── Login.jsx        # Componente de login con Bootstrap
│   │   ├── Registro.jsx     # Componente de registro de usuarios
│   │   ├── Dashboard.jsx    # Panel principal del usuario
│   │   └── ProtectedRoute.jsx # Componente para rutas protegidas
│   ├── contexts/        # Context providers
│   │   └── AuthContext.jsx  # Contexto de autenticación global
│   ├── services/        # Servicios y utilidades
│   │   ├── apiService.js    # Cliente HTTP para API calls
│   │   └── authService.js   # Servicios de autenticación
│   ├── assets/          # Recursos (imágenes, iconos, etc.)
│   ├── App.jsx          # Componente principal con rutas
│   ├── App.css          # Estilos específicos del App
│   ├── index.css        # Estilos globales
│   └── main.jsx         # Punto de entrada con Bootstrap CSS
├── index.html           # Template HTML base
├── package.json         # Dependencias y scripts npm
└── vite.config.js       # Configuración de Vite
```

## 🎨 Diseño y Estilos

### 🎨 **Bootstrap 5 Theme**

La aplicación utiliza Bootstrap 5 con personalización CSS:

- **Primary**: Gradiente azul-púrpura (#667eea → #764ba2)
- **Success**: Verde moderno (#22c55e)
- **Danger**: Rojo Bootstrap (#dc3545)
- **Warning**: Amarillo Bootstrap (#ffc107)
- **Info**: Azul Bootstrap (#0dcaf0)

### 🖼️ **Efectos Visuales**

- **Glassmorphism**: Cards con backdrop-filter y transparencias
- **Gradientes**: Fondos modernos con transiciones suaves
- **Animaciones CSS**: Efectos flotantes y transiciones
- **Shadows**: Sombras sutiles con Bootstrap utilities
- **Responsive Grid**: Sistema de columnas Bootstrap responsive

### 🔤 **Iconografía**

- **React Icons**: Biblioteca consistente y escalable
- **Font Awesome**: Iconos de interfaz (FaEye, FaUser, FaLock, etc.)
- **Tamaños**: Iconos adaptativos según el contexto
- **Colores**: Integrados con la paleta de Bootstrap

## 🚀 Desarrollo

1. Inicia el servidor de desarrollo:

```bash
npm run dev
```

2. Abre [http://localhost:5173](http://localhost:5173) en tu navegador
   (Si el puerto está ocupado, Vite usará automáticamente el siguiente disponible)

3. Los cambios se reflejarán automáticamente en el navegador

## 📊 **Dashboard Features**

- **Perfil de Usuario**: Información completa del usuario autenticado
- **Navegación**: Navbar responsive con menú desplegable
- **Cards Informativas**: Estadísticas con iconos de React Icons
- **Logout**: Funcionalidad de cierre de sesión segura
- **Diseño Responsive**: Adaptable a móviles y escritorio
- **Estado del Sistema**: Indicadores visuales del estado de conexión

## 🛠️ Personalización

### **Modificar Componentes Bootstrap**

Los componentes utilizan React Bootstrap. Para personalizar:

```jsx
import { Button, Card, Form } from "react-bootstrap";

// Personalizar con props y className
<Button
  variant="primary"
  size="lg"
  className="custom-class"
  style={{ background: "linear-gradient(...)" }}
>
  Mi Botón
</Button>;
```

### **Agregar Nuevos Componentes**

1. Crea archivos `.jsx` en `src/components/`
2. Importa React Bootstrap components necesarios:

```jsx
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaIcon } from "react-icons/fa";
```

3. Mantén consistencia con el diseño Bootstrap establecido

### **Customizar Autenticación**

Los componentes de auth están en `src/components/`:

- **Login.jsx**: Formulario de inicio de sesión
- **Registro.jsx**: Formulario de registro de usuarios
- **AuthContext.jsx**: Lógica de autenticación global
- **authService.js**: Servicios de API para auth

### **Integrar con Nueva API**

Modifica `src/services/apiService.js`:

```javascript
const API_BASE_URL = "https://tu-api-backend.com";
// Actualiza endpoints según tu API
```

## 🔧 Próximas Funcionalidades

- 🗺️ **Integración con mapas** - Mapbox o Google Maps para visualización
- 👥 **CRUD de Clientes** - Gestión completa con formularios Bootstrap
- 📈 **Dashboard Analytics** - Gráficos con React Chart.js
- 🔄 **WebSocket Integration** - Actualizaciones en tiempo real
- 📱 **PWA Support** - Aplicación web progresiva
- 🌐 **Internacionalización** - Soporte multi-idioma con react-i18next
- 🔔 **Notificaciones** - Sistema de alertas con React Toastify
- 📄 **Exportar Reportes** - PDF y Excel con jsPDF y xlsx

## 💾 **Migración de Material UI**

Este proyecto fue migrado exitosamente de Material UI a Bootstrap:

- ✅ **Componentes migrados**: Login, Registro, Dashboard, ProtectedRoute
- ✅ **Funcionalidad preservada**: Autenticación, validación, responsive design
- ✅ **Archivos respaldados**: Versiones Material UI guardadas con sufijo `-mui-backup.jsx`
- ✅ **Zero breaking changes**: Toda la funcionalidad mantenida

## 📱 Responsive Design

La aplicación está optimizada para:

- 📱 **Mobile**: 320px - 768px
- 💻 **Tablet**: 768px - 1024px
- 🖥️ **Desktop**: 1024px+

¡Feliz desarrollo! 🎉
