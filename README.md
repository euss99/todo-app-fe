# Todo App - Aplicación de Gestión de Tareas

## 📝 Descripción
Todo App es una aplicación web moderna para la gestión de tareas personales. La aplicación cuenta con un sistema de autenticación completo, gestión de tareas, y soporte para temas claro y oscuro, ofreciendo una experiencia de usuario intuitiva y personalizable.

## 🏗 Arquitectura
La aplicación sigue los principios de la Arquitectura Hexagonal, lo que permite:
- Separación clara de responsabilidades
- Independencia de frameworks
- Facilidad para realizar pruebas
- Adaptabilidad a diferentes tecnologías
- Mantenibilidad del código
- Flexibilidad para migrar a otros frameworks o plataformas
- Capacidad de intercambiar implementaciones sin afectar la lógica de negocio

### App Router
La aplicación utiliza el nuevo App Router de Next.js, que proporciona:
- Enrutamiento basado en el sistema de archivos
- Layouts anidados
- Carga de datos optimizada
- Streaming y Suspense
- Manejo de errores mejorado
- Soporte para Server Components

## ✨ Características Principales
- 🔐 Sistema de autenticación (login y registro de usuarios)
- ✅ Gestión completa de tareas (crear, leer, actualizar, eliminar)
- 🌓 Soporte para tema claro y oscuro
- 📱 Diseño responsive
- 🔄 Estado global con Zustand
- 🎨 UI moderna con Tailwind CSS
- 🔔 Notificaciones con React Toastify

## 🛠 Tecnologías Utilizadas
- **Frontend Framework**: Next.js
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Estado Global**: Zustand
- **Cliente GraphQL**: Apollo Client
- **Iconos**: Heroicons
- **Notificaciones**: React Toastify
- **HTTP Client**: Axios

## 📁 Estructura del Proyecto
```
src/
├── app/              # Rutas y páginas de la aplicación (App Router)
├── components/       # Componentes reutilizables
├── contexts/         # Contextos de React
│   ├── auth/           # Contexto de autenticación (REST con Axios)
│   ├── user/           # Contexto de gestión de usuarios (GraphQL)
│   └── todo/           # Contexto de gestión de tareas (GraphQL)
├── hooks/            # Custom hooks
├── providers/        # Proveedores de contexto
├── store/            # Estado global (Zustand)
└── utils/            # Utilidades y helpers
```

## 🔄 Contextos de la Aplicación

### Auth Context
- Maneja toda la lógica de autenticación
- Implementado usando Axios para comunicación REST
- Gestiona:
  - Login de usuarios
  - Manejo de tokens JWT
  - Estado de autenticación
  - Protección de rutas

### User Context
- Gestiona las operaciones relacionadas con usuarios
- Implementado usando GraphQL con Apollo Client
- Funcionalidades:
  - Registro de nuevos usuarios
  - Actualización de perfiles
  - Gestión de información del usuario

### Todo Context
- Controla todas las operaciones relacionadas con las tareas
- Implementado usando GraphQL con Apollo Client
- Características:
  - CRUD completo de tareas
  - Filtrado y búsqueda
  - Estado de las tareas
  - Categorización

## 🚀 Scripts Disponibles
- `yarn dev`: Inicia el servidor de desarrollo con Turbopack
- `yarn build`: Construye la aplicación para producción
- `yarn start`: Inicia la aplicación en modo producción
- `yarn lint`: Ejecuta el linter
- `yarn format`: Formatea el código

## 🛠 Requisitos Previos
- Node.js (versión recomendada: 18 o superior)
- Yarn o npm

## 🚀 Instalación
1. Clona el repositorio
```bash
git clone https://github.com/euss99/todo-app-fe.git
```

2. Instala las dependencias
```bash
yarn install
```

3. Inicia el servidor de desarrollo
```bash
yarn dev
```

## 🌟 Características Técnicas
- **Arquitectura**:
  - Arquitectura Hexagonal
  - Separación clara de capas
  - Independencia de frameworks
  - Facilidad para migrar a otros frameworks
  - Capacidad de intercambiar implementaciones
- **Estado**: Gestión de estado global con Zustand
- **Estilos**: Utilización de Tailwind CSS para un diseño moderno y responsive
- **TypeScript**: Tipado estático para mejor mantenibilidad
- **ESLint**: Configuración personalizada para mantener la calidad del código
- **APIs**:
  - REST (Axios) para autenticación
  - GraphQL (Apollo Client) para usuarios y tareas
- **Routing**: App Router de Next.js para enrutamiento moderno

## 🔒 Seguridad
- Implementación de autenticación segura
- Manejo seguro de tokens
- Protección de rutas
- Validación de datos en cliente y servidor

## 🎨 UI/UX
- Diseño moderno y minimalista
- Soporte para temas claro y oscuro
- Interfaz intuitiva y fácil de usar
- Feedback visual para acciones del usuario
- Diseño responsive para todos los dispositivos
