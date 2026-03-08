# Políticas de Seguridad - Drolean

Este documento detalla las políticas de seguridad implementadas siguiendo el modelo STRIDE de análisis de amenazas.

## Modelo STRIDE Aplicado

### 1. Spoofing (Suplantación de Identidad)

**Amenaza**: Un atacante podría suplantar la identidad de un usuario legítimo.

**Mitigaciones**:
- Supabase Auth con verificación de email (Fase 2)
- Tokens JWT firmados criptográficamente
- Políticas RLS que verifican identidad antes de cada operación
- HTTPS obligatorio en todas las comunicaciones

**Estado**: Parcialmente implementado (preparado para autenticación futura)

### 2. Tampering (Manipulación de Datos)

**Amenaza**: Un atacante podría modificar datos en tránsito o en reposo.

**Mitigaciones**:
- HTTPS/TLS para encriptación en tránsito (provisto por Vercel)
- Row Level Security (RLS) en Supabase
- Validación de entrada en múltiples capas:
  - Frontend: TypeScript + validaciones inmediatas
  - API: Re-validación en servidor
  - Database: Constraints y triggers
- Datos sensibles encriptados en reposo (Supabase)

**Estado**: Implementado

**Código RLS**:
\`\`\`sql
-- Solo admins pueden modificar datos
CREATE POLICY "Solo admin puede actualizar anamnesis"
ON anamnesis FOR UPDATE
TO authenticated
USING (auth.jwt() ->> 'email' = 'ADMIN_EMAIL_AQUI');
\`\`\`

### 3. Repudiation (Repudio)

**Amenaza**: Un usuario podría negar haber realizado una acción.

**Mitigaciones**:
- Timestamps automáticos en todas las operaciones (created_at, updated_at)
- Logs de auditoría en Supabase
- IDs únicos para rastrear cada submission

**Estado**: Implementado

**Implementación**:
\`\`\`sql
created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
\`\`\`

### 4. Information Disclosure (Filtración de Información)

**Amenaza**: Datos sensibles médicos podrían ser expuestos.

**Mitigaciones**:
- RLS impide acceso no autorizado a datos
- Solo INSERT público permitido (para formulario)
- SELECT/UPDATE/DELETE solo para admin autenticado
- Sin exposición de datos en URLs o logs del cliente
- Headers de seguridad configurados

**Estado**: Implementado

**Políticas RLS**:
\`\`\`sql
-- Datos médicos solo accesibles por admin
CREATE POLICY "Solo admin puede leer anamnesis"
ON anamnesis FOR SELECT
TO authenticated
USING (auth.jwt() ->> 'email' = 'ADMIN_EMAIL_AQUI');
\`\`\`

### 5. Denial of Service (Denegación de Servicio)

**Amenaza**: Ataques que sobrecarguen el sistema.

**Mitigaciones**:
- Rate limiting en Vercel (configuración predeterminada)
- Supabase limita conexiones por proyecto
- Validación temprana para rechazar requests inválidos
- Service Worker cachea assets para reducir carga

**Estado**: Parcialmente implementado

**Futuras mejoras**:
- Rate limiting personalizado con Vercel Edge Middleware
- CAPTCHA en formulario (si se detecta abuso)

### 6. Elevation of Privilege (Elevación de Privilegios)

**Amenaza**: Un usuario normal podría obtener permisos de admin.

**Mitigaciones**:
- RLS policies estrictas basadas en JWT
- Sin lógica de autorización en frontend (solo UI)
- Verificación de permisos en cada query
- Roles definidos en Supabase Auth

**Estado**: Implementado

## Checklist de Seguridad

- [x] HTTPS habilitado (Vercel)
- [x] Row Level Security (RLS) configurado
- [x] Validación de entrada en múltiples capas
- [x] Tipos TypeScript estrictos
- [x] Sin exposición de secretos en código
- [x] Environment variables correctamente configuradas
- [x] Timestamps de auditoría
- [ ] Rate limiting personalizado (Fase 2)
- [ ] CAPTCHA (si necesario)
- [ ] Autenticación de dos factores (Fase 3)

## Reportar Vulnerabilidades

Si encuentras una vulnerabilidad de seguridad, por favor:

1. **NO** abras un issue público
2. Envía un email a: security@drolean.com
3. Incluye:
   - Descripción detallada de la vulnerabilidad
   - Pasos para reproducir
   - Impacto potencial
   - Sugerencias de mitigación (opcional)

## Actualizaciones de Seguridad

Este proyecto sigue las mejores prácticas de:
- OWASP Top 10
- CWE/SANS Top 25
- Supabase Security Best Practices
- Next.js Security Guidelines

Última revisión: 2024-01-15
\`\`\`

```json file="" isHidden
