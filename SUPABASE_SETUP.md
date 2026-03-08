# Configuración de Supabase para Drolean

Este documento explica cómo configurar Supabase para el proyecto Drolean siguiendo los métodos formales especificados.

## 1. Crear Proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto:
   - **Nombre**: Drolean
   - **Database Password**: (guarda esta contraseña de forma segura)
   - **Region**: Selecciona la más cercana a tu ubicación

## 2. Configurar Variables de Entorno

Una vez creado el proyecto, obtén tus credenciales:

1. Ve a **Project Settings** → **API**
2. Copia los siguientes valores:
   - `Project URL` → será tu `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → será tu `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. Agrega estas variables a tu proyecto:
   - En Vercel: **Project Settings** → **Environment Variables**
   - En desarrollo local: crea un archivo `.env.local` en la raíz:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
\`\`\`

## 3. Ejecutar Scripts SQL

En el **SQL Editor** de Supabase, ejecuta los siguientes scripts en orden:

### Script 1: Crear tabla de anamnesis

\`\`\`sql
-- Copia y pega el contenido de scripts/001-create-anamnesis-table.sql
\`\`\`

### Script 2: Configurar Row Level Security (RLS)

\`\`\`sql
-- Copia y pega el contenido de scripts/002-create-rls-policies.sql
-- IMPORTANTE: Reemplaza 'ADMIN_EMAIL_AQUI' con tu email real
\`\`\`

## 4. Verificar Configuración

1. Ve a **Table Editor** en Supabase
2. Deberías ver la tabla `anamnesis` con todas las columnas
3. Ve a **Authentication** → **Policies**
4. Verifica que las 4 políticas RLS estén activas

## 5. Probar la Integración

1. Completa el formulario de anamnesis en tu aplicación
2. Ve a **Table Editor** → `anamnesis` en Supabase
3. Deberías ver el nuevo registro guardado

## Arquitectura de Seguridad (Métodos Formales)

### Row Level Security (RLS)

La configuración RLS sigue el modelo STRIDE de seguridad:

- **Spoofing**: Solo INSERT público permitido
- **Tampering**: Solo admin puede UPDATE/DELETE
- **Information Disclosure**: Solo admin puede SELECT
- **Elevation of Privilege**: Políticas basadas en JWT authentication

### Validaciones en Múltiples Capas

1. **Frontend**: Validación de formulario con TypeScript types
2. **API**: Validación en la capa de storage
3. **Database**: Constraints y RLS en PostgreSQL

## Troubleshooting

### Error: "relation 'anamnesis' does not exist"
- Solución: Ejecuta el script `001-create-anamnesis-table.sql`

### Error: "new row violates row-level security policy"
- Solución: Verifica que las políticas RLS estén configuradas correctamente
- Asegúrate de estar autenticado si intentas leer/actualizar datos

### Los datos no aparecen en Supabase
- Verifica que las variables de entorno estén configuradas
- Revisa la consola del navegador para errores
- Los datos se guardan en localStorage como fallback si Supabase no está configurado

## Siguiente Fase: Autenticación Admin

Para la Fase 2, cuando necesites acceso admin:

1. Ve a **Authentication** → **Users**
2. Crea un usuario con tu email
3. Actualiza las políticas RLS con tu email real
4. Implementa login admin en la aplicación

## Contacto

Si tienes problemas con la configuración, revisa la documentación oficial:
- [Supabase Docs](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
