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
  
  submitted_at timestamptz,
  ip_address text,
  user_agent text,

  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT anamnesis_age_check CHECK (age BETWEEN 16 AND 100),
  CONSTRAINT anamnesis_weight_check CHECK (weight BETWEEN 30 AND 300),
  CONSTRAINT anamnesis_height_check CHECK (height BETWEEN 100 AND 250),
  CONSTRAINT anamnesis_experience_check CHECK (experience IN ('beginner', 'intermediate', 'advanced'))
);

CREATE INDEX IF NOT EXISTS idx_anamnesis_created_at ON anamnesis (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_anamnesis_phone ON anamnesis (phone);
