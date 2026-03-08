-- Row Level Security (RLS) para proteger datos de anamnesis
-- Este script configura las políticas de seguridad según métodos formales

-- Habilitar RLS en la tabla
ALTER TABLE anamnesis ENABLE ROW LEVEL SECURITY;

-- Política 1: Permitir INSERT público (para que el formulario funcione)
-- Los usuarios pueden crear nuevas anamnesis sin autenticación
CREATE POLICY "Permitir INSERT público en anamnesis"
ON anamnesis
FOR INSERT
TO public
WITH CHECK (true);

-- Política 2: Solo admins pueden leer datos (SELECT)
-- Nota: Reemplaza 'ADMIN_EMAIL_AQUI' con tu email real cuando configures Supabase
CREATE POLICY "Solo admin puede leer anamnesis"
ON anamnesis
FOR SELECT
TO authenticated
USING (
  auth.jwt() ->> 'email' = 'ADMIN_EMAIL_AQUI'
);

-- Política 3: Solo admins pueden actualizar (UPDATE)
CREATE POLICY "Solo admin puede actualizar anamnesis"
ON anamnesis
FOR UPDATE
TO authenticated
USING (
  auth.jwt() ->> 'email' = 'ADMIN_EMAIL_AQUI'
)
WITH CHECK (
  auth.jwt() ->> 'email' = 'ADMIN_EMAIL_AQUI'
);

-- Política 4: Solo admins pueden eliminar (DELETE)
CREATE POLICY "Solo admin puede eliminar anamnesis"
ON anamnesis
FOR DELETE
TO authenticated
USING (
  auth.jwt() ->> 'email' = 'ADMIN_EMAIL_AQUI'
);

-- Comentarios de seguridad
COMMENT ON POLICY "Permitir INSERT público en anamnesis" ON anamnesis IS 
  'Permite a cualquier usuario enviar el formulario de anamnesis';
COMMENT ON POLICY "Solo admin puede leer anamnesis" ON anamnesis IS 
  'Protege la privacidad de los datos médicos - solo el admin puede verlos';
