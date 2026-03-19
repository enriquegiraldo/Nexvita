# PROJECT_CONTEXT.md - Kevin Leandro Fitness

> **Guía de contexto permanente para agentes de IA**  
> Última actualización: 2026-03-17

---

## 📋 Visión General del Proyecto

### Objetivo
**Kevin Leandro Fitness** (anteriormente FitDrolean / Drolean) es una plataforma web de entrenamiento personal. Permite a usuarios interesados en planes de entrenamiento enviar sus datos mediante un formulario de anamnesis de 7 pasos para recibir asesoría personalizada en calistenia, entrenamiento híbrido y gym tradicional.

### Alcance
- Landing page profesional con secciones: Hero, Mi Historia (About), Servicios, Resultados, Anamnesis, Contacto
- Formulario de anamnesis de 7 pasos con ~40 campos
- Integración con WhatsApp (+57 310 755 3317) para contacto directo
- Backend API para almacenamiento y gestión de datos
- Notificación por email al recibir una anamnesis (nodemailer)

### Propósito
Facilitar la captación de clientes para servicios de entrenamiento personalizado (Calistenia Pura, Calistenia Híbrida, Gym Tradicional) mediante una landing page atractiva y un formulario de anamnesis completo.

---

## 🛠 Stack Tecnológico

### Frontend (Client)
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 19.x | Biblioteca UI |
| **Vite** | 7.x | Build tool y dev server |
| **Tailwind CSS** | 4.x | Framework CSS utility-first (con `@theme` custom) |
| **Framer Motion** | 12.x | Animaciones y transiciones |
| **Lucide React** | 0.555+ | Iconos |
| **React Icons** | 5.x | Iconos adicionales |
| **CLSX + tailwind-merge** | - | Utilidades CSS |

### Backend (Server)
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Node.js** | ≥18 | Runtime |
| **Express** | 4.x | Framework web |
| **PostgreSQL (pg)** | 8.x | Base de datos |
| **Nodemailer** | 6.x | Envío de emails de notificación |
| **CORS** | 2.x | Cross-origin |
| **Dotenv** | 16.x | Variables de entorno |

### Deployment
- **Frontend**: Vercel
- **Backend**: Render.com (Node.js)
- **Base de datos**: PostgreSQL en Neon.tech

---

## 📁 Estructura de Carpetas

```
Nexvita/
├── PROJECT_CONTEXT.md          # Este archivo
├── PROJECT_STRUCTURE.md        # Estructura detallada
├── package.json                # Root dependencies
│
├── client/                     # Frontend React + Vite
│   ├── src/
│   │   ├── main.jsx           # Entry point React
│   │   ├── App.jsx            # Componente raíz + layout
│   │   ├── index.css          # Paleta de colores (@theme) + estilos globales
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   ├── sections/
│   │   │   │   ├── Hero.jsx
│   │   │   │   ├── About.jsx
│   │   │   │   ├── Services.jsx
│   │   │   │   ├── Results.jsx
│   │   │   │   ├── Anamnesis.jsx    # Formulario 7 pasos
│   │   │   │   └── Contact.jsx
│   │   │   └── ui/
│   │   │       └── WhatsAppButton.jsx
│   │   └── assets/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── vercel.json             # Config SPA routing
│
└── server/                     # Backend Express
    ├── schema.sql              # DDL PostgreSQL (CREATE + ALTER TABLE)
    ├── src/
    │   ├── index.js            # Dev server entry
    │   ├── app.js              # Express app config
    │   ├── db.js               # Pool conexión PostgreSQL
    │   ├── routes/
    │   │   └── anamnesis.js
    │   └── controllers/
    │       └── anamnesisController.js  # 64-field INSERT + email
    └── .env.example
```

---

## 🏗 Arquitectura y Componentes Clave

### Arquitectura General
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   React Client  │────▶│  Express API    │────▶│   PostgreSQL    │
│   (Vercel)      │     │  (Render.com)   │     │   (Neon.tech)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │
        ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│   WhatsApp API  │     │   Email (SMTP)  │
│  (Link externo) │     │  (Nodemailer)   │
└─────────────────┘     └─────────────────┘
```

### Componentes Frontend

| Componente | Ubicación | Responsabilidad |
|------------|-----------|-----------------|
| `App.jsx` | `src/` | Layout principal, estado global, scroll tracking |
| `Navbar.jsx` | `layout/` | "Kevin Leandro Fitness", navegación responsive, redes sociales |
| `Footer.jsx` | `layout/` | © 2025 Kevin Leandro Fitness, links rápidos, redes sociales |
| `Hero.jsx` | `sections/` | "TRANSFORMA TU CUERPO con Kevin Leandro", CTA WhatsApp |
| `About.jsx` | `sections/` | "Quién soy / Mi Historia", galería de fotos, badges |
| `Services.jsx` | `sections/` | 3 bloques: Valoración Inicial, Tipos de Entrenamiento, Paquetes y Precios |
| `Results.jsx` | `sections/` | Before/after grid, videos placeholder, testimonios |
| `Anamnesis.jsx` | `sections/` | Formulario 7 pasos (~40 campos) con validación por paso |
| `Contact.jsx` | `sections/` | WhatsApp, teléfono, horarios, redes sociales |
| `WhatsAppButton.jsx` | `ui/` | Botón flotante WhatsApp |

### Anamnesis — 7 Pasos

| Paso | Título | Campos Clave |
|------|--------|-------------|
| 1 | Datos Personales | name*, nickname, age*, gender, city*, height*, weight*, desiredWeight |
| 2 | Contacto | email, phone*, instagram, howFound |
| 3 | Salud | injuries*, injuryDetail, surgeries, chronicDiseases, medications, anxietyDepression, sleepQuality |
| 4 | Entreno | trainingDuration, experience*, previousTraining, currentlyTraining, homeEquipment, currentSkills |
| 5 | Objetivos | packageInterest*, trainingType*, modality, mainGoals, goal3months, goal6months |
| 6 | Hábitos | dietType, disciplineLevel, limitingHabits, desiredHabits, commitmentLevel |
| 7 | Envío | whyKevin, desiredStartDate, consentData* |

### Módulos Backend

| Módulo | Archivo | Responsabilidad |
|--------|---------|-----------------|
| **App Config** | `app.js` | Middleware, rutas, static files |
| **DB Connection** | `db.js` | Pool PostgreSQL con SSL |
| **Anamnesis Route** | `routes/anamnesis.js` | Endpoints GET/POST |
| **Anamnesis Controller** | `controllers/anamnesisController.js` | 64-field INSERT, validación, email |

### Flujo de Datos (Anamnesis)
```
1. Usuario completa formulario de 7 pasos en Anamnesis.jsx
2. POST /api/anamnesis → Express router
3. anamnesisController.submitAnamnesis()
   ├── Validación de campos requeridos (name, phone, age, weight, height, packageInterest, trainingType)
   ├── Validación de rangos numéricos
   ├── BEGIN transaction
   ├── INSERT INTO anamnesis (64 campos)
   ├── COMMIT
   ├── sendNotificationEmail() ← try/catch independiente, no falla el guardado
   └── Response JSON { success, data }
4. UI muestra pantalla de éxito animada
```

---

## 🚪 Puntos de Entrada

### Frontend
- **Desarrollo**: `client/src/main.jsx` → Renderiza `<App />` en `#root`
- **Build**: `client/index.html` → Vite bundle

### Backend
- **Desarrollo local**: `server/src/index.js` → Puerto 3000

### Comandos de Inicio
```bash
# Frontend (desde client/)
npm run dev        # Servidor desarrollo Vite
npm run build      # Build producción
npm run preview    # Preview del build

# Backend (desde server/)
npm run dev        # Nodemon desarrollo (puerto 3000)
npm start          # Producción
npm run db:init    # Inicializar DB
npm run db:reset   # Resetear DB
```

---

## ⚙️ Variables de Entorno

**Server (.env)**
```
DATABASE_URL=postgresql://user:pass@host:5432/dbname
# O individualmente:
PGHOST=localhost
PGPORT=5432
PGDATABASE=anamnesis
PGUSER=postgres
PGPASSWORD=password
PORT=3000
NODE_ENV=production

# Email (nodemailer)
MAIL_USER=correo_remitente@gmail.com
MAIL_PASS=app_password_de_gmail
MAIL_TO=correo_de_kevin@gmail.com
```

**Client (.env.development)**
```
VITE_API_BASE_URL=http://localhost:3000/api
```

---

## 📝 Convenciones de Código

### Estructura de Componentes React
- **Functional Components** con arrow functions
- **Props destructuring** en parámetros
- **Custom hooks** para lógica reutilizable
- **Framer Motion** para animaciones (`import { motion } from 'framer-motion'`)

### Naming Conventions
| Tipo | Convención | Ejemplo |
|------|------------|---------|
| Componentes | PascalCase | `Navbar.jsx`, `Hero.jsx` |
| Funciones | camelCase | `handleWhatsAppClick` |
| Constantes | SCREAMING_SNAKE | `API_BASE_URL` |
| Archivos | PascalCase para componentes | `Anamnesis.jsx` |

### Estilos (Tailwind CSS v4)
- Paleta de colores en `index.css` con `@theme`:
  - `brand-purple-*` → escala de Deep Purple (#4B0082)
  - `brand-neon-green-*` → escala de Neon Green (#39FF14)
  - `brand-silver-*` → escala de neutros
- Responsive: `mobile-first` con prefijos `md:`, `lg:`
- `tailwind.config.js` define colores adicionales (`fit-purple`, `fit-neon`, etc.)

### Backend Patterns
- **CommonJS** (`require`/`module.exports`)
- **Async/await** para operaciones asíncronas
- **Transactions** con `BEGIN`/`COMMIT`/`ROLLBACK`
- **Error handling** con try/catch y códigos HTTP apropiados
- **Email en try/catch separado** — nunca falla el guardado en DB

---

## 📊 Schema de Base de Datos

### Tabla: `anamnesis` (64+ columnas)

**Columnas originales:**
| Columna | Tipo | Restricciones |
|---------|------|---------------|
| `id` | uuid | PK, DEFAULT gen_random_uuid() |
| `name` | text | NOT NULL |
| `phone` | text | NOT NULL |
| `email` | text | - |
| `age` | smallint | NOT NULL, CHECK (16-100) |
| `weight` | numeric(6,2) | NOT NULL, CHECK (30-300) |
| `height` | smallint | NOT NULL, CHECK (100-250) |
| `experience` | text | NOT NULL |
| `goal` | text | NOT NULL |
| `injuries` | text | NOT NULL |
| `sport`, `position`, `level`, `dominance` | text | - |
| `pain_location`, `pain_level`, `pain_type` | text/smallint | - |
| `training_frequency`, `training_hours`, `recent_changes` | smallint/numeric/boolean | - |
| `sleep_hours`, `stress_level` | numeric/text | - |
| `package_interest`, `training_type` | text | - |
| `submitted_at`, `ip_address`, `user_agent` | timestamptz/text | - |
| `created_at` | timestamptz | NOT NULL, DEFAULT now() |

**Columnas expandidas (7-step form):**
| Columna | Tipo | Descripción |
|---------|------|-------------|
| `nickname`, `gender`, `city` | text | Datos personales |
| `desired_weight` | numeric(6,2) | Peso objetivo |
| `how_found`, `how_found_other`, `instagram` | text | Contacto |
| `injury_detail`, `surgeries`, `surgery_detail` | text | Salud |
| `chronic_diseases`, `previous_training`, `home_equipment`, `current_skills`, `main_goals` | text[] | Arrays PostgreSQL |
| `medications`, `substances`, `anxiety_depression` | text | Salud |
| `anxiety_level`, `sleep_quality` | smallint | Niveles 1-10 |
| `training_duration`, `currently_training` | text | Entrenamiento |
| `modality`, `goal_3months`, `goal_6months` | text | Objetivos |
| `available_days` | smallint | Días disponibles |
| `preferred_schedule` | text | Horario preferido |
| `diet_type`, `protein_consumption` | text | Estilo de vida |
| `discipline_level`, `commitment_level` | smallint | Niveles 1-10 |
| `limiting_habits`, `desired_habits` | text | Hábitos |
| `why_kevin` | text | Motivación |
| `desired_start_date` | date | Fecha inicio |
| `consent_data`, `consent_content`, `consent_progress` | boolean | Consentimientos |

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

## 🚧 Elementos Pendientes del Cliente

- Email exacto de Kevin para recibir formularios (`MAIL_TO`)
- Nombres exactos de los tests desde el software de Kevin
- Texto biográfico de Kevin
- Fotos personales y de clientes
- Videos de transformación (links YouTube/Vimeo)
- Decisión final sobre el logo
- Confirmación de variación de precios por zona geográfica

---

## 🚧 Deuda Técnica

### Prioridad Alta
- [ ] **Tests**: No hay tests unitarios ni de integración

### Prioridad Media
- [ ] **TypeScript**: Migrar a TypeScript para type safety
- [ ] **Logging**: Sistema de logs estructurados
- [ ] **Autenticación**: Panel admin para ver anamnesis

### Prioridad Baja
- [ ] **i18n**: Internacionalización (español/inglés)
- [ ] **PWA**: Convertir a Progressive Web App
- [ ] **SEO**: Optimización para buscadores
- [ ] **Analytics**: Integración con Google Analytics

---

## 📌 Notas para Agentes de IA

1. **Contexto**: Este archivo debe ser leído al inicio de cada sesión.
2. **Modificaciones**: Al realizar cambios significativos, actualizar este archivo.
3. **Preferencias de código**:
   - Usar español para comentarios y mensajes de usuario
   - Mantener consistencia con el estilo existente
   - Priorizar código legible sobre código compacto
4. **API endpoints**:
   - `GET /api/anamnesis` - Lista registros
   - `POST /api/anamnesis` - Crea nuevo registro (64 campos)
5. **Paleta de colores (NO modificar)**:
   - Primario: `#4B0082` (Deep Purple)
   - Secundario: `#39FF14` (Neon Green)
   - Fondo oscuro: `#0d1117`
6. **Secciones futuras (TODO)**:
   - Yoga, Meditación, Otros servicios wellness

---

*Última actualización: 2026-03-17*