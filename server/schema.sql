CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS anamnesis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  age smallint NOT NULL,
  weight numeric(6,2) NOT NULL,
  height smallint NOT NULL,
  experience text NOT NULL,
  goal text NOT NULL,
  injuries text NOT NULL,
  -- Contexto Deportivo
  sport text,
  position text,
  level text,
  dominance text,
  -- Dolor (ALICIA)
  pain_location text,
  pain_level smallint,
  pain_type text,
  -- Entrenamiento
  training_frequency smallint,
  training_hours numeric(4,1),
  recent_changes boolean,
  -- Estilo de Vida
  sleep_hours numeric(3,1),
  stress_level text,
  -- Paquete y Tipo de Entrenamiento
  package_interest text,
  training_type text,
  
  submitted_at timestamptz,
  ip_address text,
  user_agent text,

  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT anamnesis_age_check CHECK (age BETWEEN 16 AND 100),
  CONSTRAINT anamnesis_weight_check CHECK (weight BETWEEN 30 AND 300),
  CONSTRAINT anamnesis_height_check CHECK (height BETWEEN 100 AND 250)
);

CREATE INDEX IF NOT EXISTS idx_anamnesis_created_at ON anamnesis (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_anamnesis_phone ON anamnesis (phone);

-- ============================================================
-- Nuevas columnas para formulario expandido (7 pasos)
-- NON-DESTRUCTIVE: usa ADD COLUMN IF NOT EXISTS
-- ============================================================

ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS nickname text;
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS gender text;
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS city text;
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS desired_weight numeric(6,2);
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS how_found text;
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS how_found_other text;
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS instagram text;
-- Salud
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS injury_detail text;
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS surgeries text;
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS surgery_detail text;
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS chronic_diseases text[];
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS medications text;
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS substances text;
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS anxiety_depression text;
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS anxiety_level smallint;
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS sleep_quality smallint;
-- Entrenamiento
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS training_duration text;
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS previous_training text[];
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS currently_training text;
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS home_equipment text[];
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS current_skills text[];
-- Objetivos
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS modality text;
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS main_goals text[];
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS goal_3months text;
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS goal_6months text;
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS available_days smallint;
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS preferred_schedule text;
-- Estilo de Vida
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS diet_type text;
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS protein_consumption text;
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS discipline_level smallint;
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS limiting_habits text;
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS desired_habits text;
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS commitment_level smallint;
-- Consentimiento
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS why_kevin text;
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS desired_start_date date;
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS consent_data boolean;
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS consent_content boolean;
ALTER TABLE anamnesis ADD COLUMN IF NOT EXISTS consent_progress boolean;

-- Cambiar columna injuries de text NOT NULL a text (para soportar arrays desde frontend)
-- NOTA: Si injuries ya es NOT NULL, esta columna existente seguirá con su constraint.
-- Las nuevas columnas injuries[] se manejan como un array JSON serializado en el controller.
