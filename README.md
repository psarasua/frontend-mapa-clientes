# Frontend Mapa Clientes

Una aplicación frontend moderna para gestión de clientes construida con React, Vite y Material UI, con sistema de autenticación y dashboard interactivo.

## 🚀 Tecnologías

- **React 19** - Biblioteca de JavaScript para construir interfaces de usuario
- **Vite 7** - Herramienta de construcción rápida y moderna
- **Material UI 7** - Biblioteca de componentes React con Material Design
- **Emotion** - Biblioteca CSS-in-JS para estilos dinámicos
- **ESLint** - Linter para mantener calidad de código

## ✨ Características

- 🔐 **Sistema de Login** - Autenticación con diseño moderno y minimalista
- 🎨 **Tema Profesional** - Paleta de colores cuidadosamente seleccionada
- 📊 **Dashboard Interactivo** - Métricas y estadísticas en tiempo real
- 📱 **Diseño Responsive** - Optimizado para todos los dispositivos
- 🚀 **Animaciones Fluidas** - Transiciones y efectos visuales modernos
- ⚡ **Hot Module Replacement** - Desarrollo en tiempo real

## 🔑 Sistema de Autenticación

La aplicación incluye un sistema de login completamente funcional:

- **Validación de formularios** en tiempo real
- **Diseño glassmorphism** con efectos visuales modernos
- **Estados de carga** y manejo de errores
- **Toggle de visibilidad** de contraseña
- **Animaciones suaves** con Fade transitions

### Credenciales de prueba:

- **Usuario**: Cualquier texto no vacío
- **Contraseña**: Cualquier texto no vacío

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
│   │   └── Login.jsx    # Componente de autenticación
│   ├── assets/          # Recursos (imágenes, iconos, etc.)
│   ├── App.jsx          # Componente principal con dashboard
│   ├── App.css          # Estilos específicos del App
│   ├── index.css        # Estilos globales
│   └── main.jsx         # Punto de entrada con tema configurado
├── index.html           # Template HTML base
├── package.json         # Dependencias y scripts npm
└── vite.config.js       # Configuración de Vite
```

## 🎨 Tema y Diseño

### Paleta de Colores

- **Primario**: Azul moderno (#2563eb)
- **Secundario**: Gris elegante (#64748b)
- **Éxito**: Verde (#10b981)
- **Advertencia**: Ámbar (#f59e0b)
- **Error**: Rojo (#ef4444)
- **Información**: Azul (#3b82f6)

### Tipografía

- **Fuente Principal**: Inter (Google Fonts)
- **Fallbacks**: Roboto, Helvetica, Arial, sans-serif
- **Pesos**: 400, 500, 600, 700

## 🚀 Desarrollo

1. Inicia el servidor de desarrollo:

```bash
npm run dev
```

2. Abre [http://localhost:5173](http://localhost:5173) en tu navegador
   (Si el puerto está ocupado, Vite usará automáticamente el siguiente disponible)

3. Los cambios se reflejarán automáticamente en el navegador

## � Dashboard Features

- **Métricas en tiempo real**: Clientes activos, rutas, conversiones
- **Tarjetas informativas**: Estadísticas visuales con iconos
- **Acciones rápidas**: Botones para funciones principales
- **Estado del sistema**: Indicadores de conexión y servicios
- **Perfil de usuario**: Menú desplegable con opciones de cuenta

## 🛠️ Personalización

### Modificar el Tema

Edita el archivo `src/main.jsx` para personalizar colores, tipografía y componentes:

```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: "#tu-color-primario",
    },
    // ... más configuraciones
  },
});
```

### Agregar Nuevos Componentes

1. Crea archivos `.jsx` en `src/components/`
2. Importa Material UI components según necesites
3. Mantén la consistencia con el tema establecido

### Customizar el Login

El componente Login está en `src/components/Login.jsx` y puedes:

- Cambiar los campos del formulario
- Modificar la validación
- Integrar con APIs reales
- Personalizar el diseño visual

## 🔧 Próximas Funcionalidades

- 🗺️ Integración con mapas interactivos
- 👥 Gestión completa de clientes
- 📈 Reportes y analytics avanzados
- 🔄 Sincronización en tiempo real
- 📱 Aplicación PWA
- 🌐 Internacionalización (i18n)

## 📱 Responsive Design

La aplicación está optimizada para:

- 📱 **Mobile**: 320px - 768px
- 💻 **Tablet**: 768px - 1024px
- 🖥️ **Desktop**: 1024px+

¡Feliz desarrollo! 🎉
