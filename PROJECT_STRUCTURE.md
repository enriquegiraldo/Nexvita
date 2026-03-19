# Kevin Leandro Fitness – Project Structure & Architecture

## 1) Repository overview
This repository contains:
- A **React + Vite** frontend under `client/`
- A **Node.js (Express)** backend under `server/`
- A **PostgreSQL** schema used by the backend (`server/schema.sql`)

**Brand**: Kevin Leandro Fitness (formerly FitDrolean / Drolean)  
**Deployment**: Frontend on Vercel, Backend on Render.com, Database on Neon.tech

## 2) High-level directory tree

```
Nexvita/
├─ PROJECT_CONTEXT.md            # Project context for AI agents
├─ PROJECT_STRUCTURE.md          # This file
├─ package.json                  # Root dependencies
│
├─ client/
│  ├─ index.html                 # HTML shell with #root mount
│  ├─ vite.config.js             # Vite configuration
│  ├─ tailwind.config.js         # Tailwind custom colors (fit-purple, fit-neon)
│  ├─ eslint.config.js           # ESLint config
│  ├─ vercel.json                # Vercel SPA routing config
│  ├─ public/
│  │  └─ vite.svg
│  ├─ src/
│  │  ├─ main.jsx                # React entrypoint
│  │  ├─ App.jsx                 # App composition + section layout + scroll tracking
│  │  ├─ index.css               # @theme color palette + global styles
│  │  ├─ assets/
│  │  │  └─ react.svg
│  │  └─ components/
│  │     ├─ layout/
│  │     │  ├─ Navbar.jsx        # "Kevin Leandro Fitness", responsive nav, social links
│  │     │  └─ Footer.jsx        # © 2025 Kevin Leandro Fitness, links
│  │     ├─ sections/
│  │     │  ├─ Hero.jsx          # "TRANSFORMA TU CUERPO con Kevin Leandro", WhatsApp CTA
│  │     │  ├─ About.jsx         # "Quién soy / Mi Historia", photo gallery, badges
│  │     │  ├─ Services.jsx      # Valoración Inicial + Training Types + Packages
│  │     │  ├─ Results.jsx       # Before/after grid, video placeholders, testimonials
│  │     │  ├─ Anamnesis.jsx     # 7-step form (~40 fields) with per-step validation
│  │     │  └─ Contact.jsx       # WhatsApp, phone, schedule, social media
│  │     └─ ui/
│  │        └─ WhatsAppButton.jsx # Floating WhatsApp button
│  └─ dist/                      # Vite build output
│
└─ server/
   ├─ schema.sql                 # PostgreSQL DDL (CREATE TABLE + ALTER TABLE for new columns)
   ├─ package.json
   ├─ .env.example               # Environment variables template (includes MAIL_* vars)
   └─ src/
      ├─ index.js                # Local dev entry (starts Express on PORT)
      ├─ app.js                  # Express app wiring (cors, json, routes, static)
      ├─ db.js                   # PostgreSQL connection pool (pg)
      ├─ routes/
      │  └─ anamnesis.js         # GET + POST /api/anamnesis
      └─ controllers/
         └─ anamnesisController.js # 64-field INSERT, validation, email notification
```

## 3) Frontend architecture (React + Vite)

### 3.1 Entry points
- **`client/index.html`**: HTML shell containing the `#root` mount.
- **`client/src/main.jsx`**: Bootstraps React and renders `<App />`.
- **`client/src/App.jsx`**:
  - Assembles the landing page sections: `Hero`, `About`, `Services`, `Results`, `Anamnesis`, `Contact`.
  - Provides the `handleWhatsAppClick` handler and `scrollToSection` utility shared across components.

### 3.2 Color palette (defined in `index.css` via `@theme`)
- **Deep Purple** (`brand-purple-*`): 50–900 scale + primary `#4B0082`
- **Neon Green** (`brand-neon-green-*`): 50–900 scale + neon `#39FF14`
- **Silver/Neutral** (`brand-silver-*`): 50–900 scale
- Body background: `#0d1117`
- Additional aliases in `tailwind.config.js`: `fit-purple`, `fit-neon`, `fit-gray`, `fit-charcoal`

### 3.3 Components organization
- **`client/src/components/layout/`**: Page-level layout.
  - `Navbar.jsx`: "Kevin Leandro Fitness" brand, responsive hamburger menu, social links. Nav order: Inicio → Mi Historia → Servicios → Resultados → Anamnesis → Contacto.
  - `Footer.jsx`: © 2025 copyright, quick links, social media.
- **`client/src/components/sections/`**: The landing page sections.
  - `Hero.jsx`: Title "TRANSFORMA TU CUERPO con Kevin Leandro", primary CTA "¡Quiero empezar!" (WhatsApp), secondary CTA "Ver resultados" (scroll).
  - `About.jsx`: "Quién soy / Mi Historia", placeholder photo, bio placeholder, photo gallery grid, specialty badges (Calistenia, Gym Híbrido, Nutrición Deportiva).
  - `Services.jsx`: 3 blocks — Block A (Valoración Inicial: 5 tests), Block B (3 training type cards), Block C (Packages & Prices with footnote).
  - `Results.jsx`: Before/after photo grid (placeholders), video embeds (placeholders), testimonials.
  - `Anamnesis.jsx`: **7-step multi-step form** with ~40 fields, per-step validation, animated transitions, success screen.
  - `Contact.jsx`: WhatsApp, phone, schedule, location, social media links.
- **`client/src/components/ui/`**: Reusable UI widgets.
  - `WhatsAppButton.jsx`: floating WhatsApp CTA button.

### 3.4 Anamnesis form — 7 steps

| Step | Title | Key Required Fields |
|------|-------|-------------------|
| 1 | Datos Personales | name, age, city, height, weight |
| 2 | Contacto | phone |
| 3 | Salud e Historial Médico | injuries (checkbox group) |
| 4 | Nivel Actual de Entrenamiento | experience |
| 5 | Objetivos | packageInterest, trainingType |
| 6 | Hábitos y Estilo de Vida | (no required fields) |
| 7 | Consentimiento y Envío | consentData |

Helper components inside `Anamnesis.jsx`:
- `ValidatedInput`, `ValidatedSelect`, `ValidatedTextarea` — form inputs with error display
- `RangeInput` — slider with visual value display
- `CheckboxGroup` — multi-select pill buttons with exclusive "Ninguna" option

### 3.5 Network calls / API usage
- The anamnesis form posts JSON to:
  - `POST {VITE_API_BASE_URL}/anamnesis`
  - Default base: `/api` (production) or `http://localhost:3000/api` (dev)

## 4) Backend architecture (Node.js + Express)

### 4.1 Entrypoints
- **Local run**: `server/src/index.js`
  - Starts Express listening on `PORT` (default `3000`).

### 4.2 Express app wiring
- **`server/src/app.js`**
  - Loads environment variables via `dotenv`.
  - Middleware: `cors`, `express.json()`.
  - Routes mounted under `/api`.
  - Serves client `dist/` as static files in production.

### 4.3 Routes & controllers
- **Route**: `server/src/routes/anamnesis.js`
  - `GET /api/anamnesis` → `anamnesisController.listAnamnesis`
  - `POST /api/anamnesis` → `anamnesisController.submitAnamnesis`
- **Controller**: `server/src/controllers/anamnesisController.js`
  - Validates required fields: `name`, `phone`, `age`, `weight`, `height`, `packageInterest`, `trainingType`
  - Validates numeric ranges
  - Maps experience values (Spanish → English for DB constraint)
  - Executes 64-field INSERT within a transaction
  - After COMMIT, sends email notification via `sendNotificationEmail()` (independent try/catch — never fails the DB save)
  - `listAnamnesis()` returns all columns with LIMIT 100

### 4.4 Email notification (nodemailer)
- Sends HTML summary email to Kevin on each new anamnesis
- Requires env vars: `MAIL_USER`, `MAIL_PASS`, `MAIL_TO`
- Uses Gmail SMTP transport
- If env vars are missing or email fails, logs warning but does NOT fail the request

## 5) Database layer (PostgreSQL)

### 5.1 Connection
- **`server/src/db.js`** creates a `pg.Pool`.
- Env vars supported:
  - `DATABASE_URL` (recommended)
  - Or: `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`

### 5.2 Schema
- **`server/schema.sql`** contains:
  - `CREATE TABLE IF NOT EXISTS anamnesis` with original columns
  - `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` for all expanded columns (non-destructive)
  - Constraints: age (16-100), weight (30-300), height (100-250)
  - Indexes on `created_at DESC` and `phone`

### 5.3 Total columns: 64+
Including: personal info, contact, health history, training level, goals, lifestyle habits, consent flags, and metadata (submitted_at, ip_address, user_agent).

## 6) Runtime data flow (end-to-end)

1. User fills the 7-step form in **`Anamnesis.jsx`** with per-step validation.
2. Frontend sends `POST /api/anamnesis` with JSON payload (64 fields).
3. Express receives the request in **`app.js`** and dispatches to:
   - `server/src/routes/anamnesis.js`
   - `server/src/controllers/anamnesisController.js`
4. Controller validates, executes transaction in **PostgreSQL**, and responds with success JSON.
5. Controller sends email notification to Kevin (independent of DB save).
6. UI shows animated success screen with "Kevin te contactará pronto por WhatsApp".

## 7) Deployment notes
- **Frontend**: Vercel (SPA routing via `vercel.json` rewrite rules)
- **Backend**: Render.com (Node.js)
- **Database**: PostgreSQL on Neon.tech
- **Build output**: `client/dist/` generated by Vite

## 8) TODO / Pending items

### Client-pending (awaiting Kevin):
- `MAIL_TO` email address
- Test names from Kevin's software
- Biographical text and personal photos
- Client transformation photos and videos
- Final logo
- Geographic pricing confirmation

### Future sections:
- `// TODO: Agregar sección Yoga`
- `// TODO: Agregar sección Meditación`
- `// TODO: Otros servicios wellness`
