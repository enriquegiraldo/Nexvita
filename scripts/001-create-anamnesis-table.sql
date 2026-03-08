-- Script SQL para crear la tabla de anamnesis en Supabase
-- Para ejecutar: ve a Supabase Dashboard > SQL Editor > pega este script

CREATE TABLE IF NOT EXISTS anamnesis (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- Datos personales
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(50) NOT NULL,
  edad INTEGER NOT NULL,
  genero VARCHAR(50) NOT NULL,
  
  -- Datos físicos
  peso DECIMAL(5,2) NOT NULL,
  altura DECIMAL(5,2) NOT NULL,
  nivel_actividad VARCHAR(50) NOT NULL,
  experiencia_ejercicio VARCHAR(50) NOT NULL,
  
  -- Objetivos
  objetivo_principal VARCHAR(100) NOT NULL,
  objetivos_especificos TEXT[] NOT NULL,
  tiempo_disponible VARCHAR(50) NOT NULL,
  
  -- Datos médicos
  condiciones_medicas TEXT[],
  lesiones_previas TEXT[],
  medicamentos_actuales TEXT[],
  restricciones_fisicas TEXT,
  
  -- Preferencias
  lugares_entrenamiento TEXT[] NOT NULL,
  equipamiento_disponible TEXT[],
  dias_preferidos TEXT[] NOT NULL,
  horarios_preferidos TEXT[] NOT NULL,
  notas_adicionales TEXT,
  
  -- Estado
  status VARCHAR(50) DEFAULT 'pendiente' NOT NULL
);

-- Índices para mejorar rendimiento de consultas
CREATE INDEX IF NOT EXISTS idx_anamnesis_email ON anamnesis(email);
CREATE INDEX IF NOT EXISTS idx_anamnesis_created_at ON anamnesis(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_anamnesis_status ON anamnesis(status);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_anamnesis_updated_at BEFORE UPDATE ON anamnesis
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Comentarios para documentación
COMMENT ON TABLE anamnesis IS 'Almacena los datos de la anamnesis interactiva de los clientes';
COMMENT ON COLUMN anamnesis.status IS 'Estados: pendiente, revisado, contactado, activo';
