# PROJECT_CONTEXT.md - Drolean Fitness Platform

> **Guía de contexto permanente para agentes de IA**  
> Última actualización: Auto-generado

---

## 📋 Visión General del Proyecto

### Objetivo
**Drolean (FitDrolean)** es una plataforma web de entrenamiento personal y coaching fitness. Permite a usuarios interesados en planes de entrenamiento enviar sus datos mediante un formulario de anamnesis para recibir asesoría personalizada.

### Alcance
- Landing page profesional con múltiples secciones informativas
- Sistema de anamnesis para recopilación de datos de clientes
- Integración con WhatsApp para contacto directo
- Backend API para almacenamiento y gestión de datos

### Propósito
Facilitar la captación de clientes para servicios de entrenamiento personalizado mediante una landing page atractiva y un formulario de anamnesis completo.

---

## 🛠 Stack Tecnológico

### Frontend (Client)
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 19.2.0 | Biblioteca UI |
| **Vite** | 7.2.4 | Build tool y dev server |
| **Tailwind CSS** | 4.1.17 | Framework CSS utility-first |
| **Framer Motion** | 12.23.25 | Animaciones |
| **Lucide React** | 0.555.0 | Iconos |
| **React Icons** | 5.5.0 | Iconos adicionales |
| **CLSX + tailwind-merge** | - | Utilidades CSS |

### Backend (Server)
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Node.js** | ≥18 | Runtime |
| **Express** | 4.21.2 | Framework web |
| **PostgreSQL (pg)** | 8.16.3 | Base de datos |
| **CORS** | 2.8.5 | Cross-origin |
| **Dotenv** | 16.4.5 | Variables de entorno |
| **Firebase Functions** | 4.8.0 | Deployment serverless |

### Deployment
- **Frontend**: Vercel
- **Backend**: Firebase Functions (Node.js 18)
- **Base de datos**: PostgreSQL (externo)

---

## 📁 Estructura de Carpetas

```
Drolean/
├── firebase.json              # Config Firebase Functions
├── .firebaserc               # Proyecto Firebase
├── package.json              # Root dependencies
│
├── client/                   # Frontend React + Vite
│   ├── src/
│   │   ├── main.jsx         # Entry point React
│   │   ├── App.jsx          # Componente raíz
│   │   ├── index.css        # Estilos globales
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   ├── sections/
│   │   │   │   ├── Hero.jsx
│   │   │   │   ├── About.jsx
│   │   │   │   ├── Services.jsx
│   │   │   │   ├── Results.jsx
│   │   │   │   ├── Anamnesis.jsx    # Formulario principal
│   │   │   │   └── Contact.jsx
│   │   │   └── ui/
│   │   │       └── WhatsAppButton.jsx
│   │   └── assets/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── vercel.json          # Config SPA routing
│
└── server/                   # Backend Express
    ├── index.js             # Firebase Functions entry
    ├── schema.sql           # DDL PostgreSQL
    ├── src/
    │   ├── index.js         # Dev server entry
    │   ├── app.js           # Express app config
    │   ├── db.js            # Pool conexión PostgreSQL
    │   ├── routes/
    │   │   └── anamnesis.js
    │   └── controllers/
    │       └── anamnesisController.js
    └── .env.example
```

---

## 🏗 Arquitectura y Componentes Clave

### Arquitectura General
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   React Client  │────▶│  Express API    │────▶│   PostgreSQL    │
│   (Vercel)      │     │ (Firebase Func) │     │   (Externo)     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │
        ▼
┌─────────────────┐
│   WhatsApp API  │ (Link externo)
└─────────────────┘
```

### Componentes Frontend

| Componente | Ubicación | Responsabilidad |
|------------|-----------|-----------------|
| `App.jsx` | `src/` | Layout principal, estado global, scroll tracking |
| `Navbar.jsx` | `layout/` | Navegación, menú responsive, redes sociales |
| `Footer.jsx` | `layout/` | Pie de página con links |
| `Hero.jsx` | `sections/` | Sección principal CTA |
| `About.jsx` | `sections/` | Información del entrenador |
| `Services.jsx` | `sections/` | Planes de entrenamiento |
| `Results.jsx` | `sections/` | Testimonios/transformaciones |
| `Anamnesis.jsx` | `sections/` | Formulario de inscripción |
| `Contact.jsx` | `sections/` | Formulario de contacto |
| `WhatsAppButton.jsx` | `ui/` | Botón flotante WhatsApp |

### Módulos Backend

| Módulo | Archivo | Responsabilidad |
|--------|---------|-----------------|
| **App Config** | `app.js` | Middleware, rutas, static files |
| **DB Connection** | `db.js` | Pool PostgreSQL con SSL |
| **Anamnesis Route** | `routes/anamnesis.js` | Endpoints GET/POST |
| **Anamnesis Controller** | `controllers/anamnesisController.js` | Lógica de negocio y validación |

### Flujo de Datos (Anamnesis)
```
1. Usuario completa formulario en Anamnesis.jsx
2. POST /api/anamnesis → Express router
3. anamnesisController.submitAnamnesis()
   ├── Validación de campos requeridos
   ├── Validación de rangos numéricos
   ├── BEGIN transaction
   ├── INSERT INTO anamnesis (...)
   ├── COMMIT
   └── Response JSON { success, data }
4. UI muestra confirmación al usuario
```

---

## 🚪 Puntos de Entrada

### Frontend
- **Desarrollo**: `client/src/main.jsx` → Renderiza `<App />` en `#root`
- **Build**: `client/index.html` → Vite bundle

### Backend
- **Desarrollo local**: `server/src/index.js` → Puerto 3000
- **Producción (Firebase)**: `server/index.js` → exports.api

### Comandos de Inicio
```bash
# Frontend (desde client/)
npm run dev        # Servidor desarrollo Vite (puerto 5173)
npm run build      # Build producción
npm run preview    # Preview del build

# Backend (desde server/)
npm run dev        # Nodemon desarrollo (puerto 3000)
npm start          # Producción
npm run db:init    # Inicializar DB
npm run db:reset   # Resetear DB
```

---

## ⚙️ Instrucciones de Instalación y Ejecución

### Prerrequisitos
- Node.js ≥ 18
- PostgreSQL (local o remoto)
- npm o yarn

### Setup Completo

```bash
# 1. Clonar repositorio
git clone <repo-url>
cd Drolean

# 2. Instalar dependencias root (si aplica)
npm install

# 3. Configurar Backend
cd server
npm install
cp .env.example .env
# Editar .env con credenciales de PostgreSQL

# 4. Inicializar base de datos
npm run db:init

# 5. Iniciar backend (desarrollo)
npm run dev

# 6. En otra terminal, configurar Frontend
cd ../client
npm install
cp .env.example .env.development
# Configurar VITE_API_BASE_URL si es necesario

# 7. Iniciar frontend
npm run dev
```

### Variables de Entorno

**Server (.env)**
```
DATABASE_URL=postgresql://user:pass@host:5432/dbname
# O individualmente:
PGHOST=localhost
PGPORT=5432
PGDATABASE=drolean
PGUSER=postgres
PGPASSWORD=password
PGSSLMODE=require
PORT=3000
NODE_ENV=production
```

**Client (.env.development)**
```
VITE_API_BASE_URL=http://localhost:3000/api
```

---

## 📝 Convenciones de Código y Mejores Prácticas

### Estructura de Componentes React
- **Functional Components** con arrow functions
- **Props destructuring** en parámetros
- **Custom hooks** para lógica reutilizable
- **Framer Motion** para animaciones (`import { motion as Motion }`)

### Naming Conventions
| Tipo | Convención | Ejemplo |
|------|------------|---------|
| Componentes | PascalCase | `Navbar.jsx`, `Hero.jsx` |
| Funciones | camelCase | `handleWhatsAppClick` |
| Constantes | SCREAMING_SNAKE | `API_BASE_URL` |
| Archivos | PascalCase para componentes | `Anamnesis.jsx` |

### Estilos (Tailwind)
- Paleta de colores personalizada en `tailwind.config.js`:
  - `fit-purple` / `fit-purple-dark` (principal)
  - `fit-neon` (acento verde neón)
  - `fit-gray` / `fit-charcoal` (neutros)
- Uso de clases utilitarias con `clsx` y `tailwind-merge`
- Responsive: `mobile-first` con prefijos `md:`, `lg:`

### Backend Patterns
- **CommonJS** (`require`/`module.exports`)
- **Async/await** para operaciones asíncronas
- **Transactions** con `BEGIN`/`COMMIT`/`ROLLBACK`
- **Error handling** con try/catch y códigos HTTP apropiados
- **Validation** antes de persistir datos

---

## 🔧 Decisiones Técnicas Importantes

### Frontend
1. **Vite** sobre Create React App por mejor performance
2. **Tailwind CSS v4** para estilos utility-first
3. **Framer Motion** para animaciones fluidas
4. **React 19** con hooks modernos

### Backend
1. **Express** minimalista con middleware esencial
2. **PostgreSQL** con Pool de conexiones para escalabilidad
3. **pg** driver nativo (sin ORM) para control total
4. **Firebase Functions** para deployment serverless

### Base de Datos
1. **UUID** como primary key con `gen_random_uuid()`
2. **Constraints** para validación de datos a nivel DB
3. **Índices** en `created_at` y `phone` para queries frecuentes

### Deployment
1. **Vercel** para frontend (SPA hosting optimizado)
2. **Firebase Functions** para backend serverless
3. **Proxy** en Vite para desarrollo local

---

## 🚧 Áreas de Mejora y Deuda Técnica

### Prioridad Alta
- [ ] **Tests**: No hay tests unitarios ni de integración
- [ ] **Validación frontend**: El formulario de anamnesis necesita validación más robusta
- [ ] **Error handling frontend**: Manejo de errores de API en UI

### Prioridad Media
- [ ] **TypeScript**: Migrar a TypeScript para type safety
- [ ] **Envío de emails**: Notificaciones al enviar anamnesis
- [ ] **Autenticación**: Panel admin para ver anamnesis
- [ ] **Logging**: Sistema de logs estructurados

### Prioridad Baja
- [ ] **i18n**: Internacionalización (español/inglés)
- [ ] **PWA**: Convertir a Progressive Web App
- [ ] **SEO**: Optimización para buscadores
- [ ] **Analytics**: Integración con Google Analytics

### Código Legado
- `client/old_app.jsx` parece ser versión anterior (revisar para eliminar)

---

## 📊 Schema de Base de Datos

### Tabla: `anamnesis`

| Columna | Tipo | Restricciones |
|---------|------|---------------|
| `id` | uuid | PK, DEFAULT gen_random_uuid() |
| `name` | text | NOT NULL |
| `phone` | text | NOT NULL |
| `email` | text | - |
| `age` | smallint | NOT NULL, CHECK (16-100) |
| `weight` | numeric(6,2) | NOT NULL, CHECK (30-300) |
| `height` | smallint | NOT NULL, CHECK (100-250) |
| `experience` | text | NOT NULL, CHECK (beginner/intermediate/advanced) |
| `goal` | text | NOT NULL |
| `injuries` | text | NOT NULL |
| `sport` | text | - |
| `position` | text | - |
| `level` | text | - |
| `dominance` | text | - |
| `pain_location` | text | - |
| `pain_level` | smallint | - |
| `pain_type` | text | - |
| `training_frequency` | smallint | - |
| `training_hours` | numeric(4,1) | - |
| `recent_changes` | boolean | - |
| `sleep_hours` | numeric(3,1) | - |
| `stress_level` | text | - |
| `submitted_at` | timestamptz | - |
| `ip_address` | text | - |
| `user_agent` | text | - |
| `created_at` | timestamptz | NOT NULL, DEFAULT now() |

### Índices
- `idx_anamnesis_created_at` on `created_at DESC`
- `idx_anamnesis_phone` on `phone`

---

## 🔗 Enlaces y Recursos

- **WhatsApp Business**: +57 310 755 3317
- **Redes Sociales**:
  - Instagram: @FitDrolean
  - Facebook: FitDrolean
  - YouTube: @FitDrolean
  - Twitter: @FitDrolean

---

## 📌 Notas para Agentes de IA

1. **Contexto**: Este archivo debe ser leído al inicio de cada sesión para mantener contexto del proyecto.

2. **Modificaciones**: Al realizar cambios significativos, actualizar este archivo.

3. **Preferencias de código**:
   - Usar español para comentarios y mensajes de usuario
   - Mantener consistencia con el estilo existente
   - Priorizar código legible sobre código compacto

4. **API endpoints**:
   - `GET /api/anamnesis` - Lista registros
   - `POST /api/anamnesis` - Crea nuevo registro

5. **Paleta de colores**:
   - Primario: `#4B0082` (Deep Purple)
   - Secundario: `#39FF14` (Neon Green)
   - Fondo oscuro: `#0d1117`

---

*Este archivo es generado automáticamente. Para actualizar, ejecutar el análisis del proyecto.*