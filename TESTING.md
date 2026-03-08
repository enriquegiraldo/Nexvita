# Estrategia de Pruebas - Drolean

Documentación completa de la estrategia de testing siguiendo métodos formales.

## Pirámide de Pruebas

\`\`\`
        /\
       /  \      E2E (10%)
      /____\     
     /      \    Integración (30%)
    /________\   
   /          \  Unitarias (60%)
  /__________\
\`\`\`

## 1. Pruebas Unitarias (60%)

### Objetivo
Verificar que cada función, componente y módulo individual funciona correctamente de forma aislada.

### Herramientas
- **Jest**: Framework de testing
- **React Testing Library**: Testing de componentes
- **@testing-library/user-event**: Simulación de interacciones

### Áreas Cubiertas

#### Validaciones (`lib/validations/__tests__`)
- Validación de email
- Validación de teléfono
- Validación de cada paso del formulario
- Casos edge: valores vacíos, nulos, extremos

\`\`\`bash
npm test lib/validations
\`\`\`

#### Almacenamiento (`lib/storage/__tests__`)
- Guardado en localStorage
- Recuperación de datos
- Manejo de errores
- IDs únicos

\`\`\`bash
npm test lib/storage
\`\`\`

#### Componentes (`components/**/__tests__`)
- Renderizado correcto
- Interacciones de usuario
- Estados del formulario
- Navegación entre pasos

\`\`\`bash
npm test components/
\`\`\`

### Cobertura Objetivo
- **Mínimo**: 70% de cobertura en lines, functions, branches, statements
- **Objetivo**: 80%+

\`\`\`bash
npm run test:coverage
\`\`\`

## 2. Pruebas de Integración (30%)

### Objetivo
Verificar que los componentes funcionan correctamente cuando interactúan entre sí.

### Casos de Prueba

#### Flujo Completo de Anamnesis
1. Usuario llena todos los pasos
2. Validaciones pasan correctamente
3. Datos se guardan en storage
4. Pantalla de éxito se muestra
5. ID de submission se genera

#### Integración con Supabase (cuando está configurado)
1. Conexión exitosa
2. INSERT correcto en tabla
3. RLS policies funcionan
4. Fallback a localStorage si falla

### Ejecutar
\`\`\`bash
npm test -- --testPathPattern=integration
\`\`\`

## 3. Pruebas E2E (10%)

### Objetivo
Simular flujos completos de usuario en un navegador real.

### Herramientas
- **Playwright** (recomendado para futuro)
- **Cypress** (alternativa)

### Casos de Prueba Planificados (Fase 2)
1. Usuario completa anamnesis exitosamente
2. Usuario abandona y retoma formulario
3. Usuario intenta enviar datos inválidos
4. Instalación de PWA
5. Funcionalidad offline

## 4. Pruebas de Propiedades (Property-Based Testing)

### Concepto
En lugar de probar casos específicos, definir propiedades que SIEMPRE deben cumplirse.

### Ejemplo con Fast-Check (futuro)
\`\`\`typescript
// Para cualquier entrada válida, el sistema debe:
it('siempre debe guardar datos válidos sin error', () => {
  fc.assert(
    fc.property(validAnamnesisDataArbitrary, async (data) => {
      const result = await anamnesisStorage.save(data)
      expect(result.success).toBe(true)
      expect(result.id).toBeDefined()
    })
  )
})
\`\`\`

## 5. Pruebas de Seguridad

### Validación de Entrada
- Inyección SQL: Verificar que inputs no ejecuten SQL
- XSS: Verificar que scripts no se ejecuten
- CSRF: Tokens en formularios (futuro)

### RLS Policies
\`\`\`sql
-- Probar que un usuario no autenticado NO puede:
SELECT * FROM anamnesis; -- Debe fallar

-- Probar que solo admin puede:
UPDATE anamnesis SET nombre = 'Hacked'; -- Debe fallar para no-admin
\`\`\`

### Ejecutar
\`\`\`bash
npm run test:security
\`\`\`

## 6. Pruebas de Rendimiento

### Métricas Objetivo
- **Lighthouse Score**: 90+ en todas las categorías
- **First Contentful Paint (FCP)**: < 1.5s
- **Time to Interactive (TTI)**: < 3.5s
- **Cumulative Layout Shift (CLS)**: < 0.1

### Herramientas
\`\`\`bash
# Lighthouse CI
npx lighthouse https://drolean.com --view

# Web Vitals
npm run build && npm start
# Abrir en navegador y verificar métricas
\`\`\`

## Comandos de Testing

### Desarrollo
\`\`\`bash
# Ejecutar todos los tests
npm test

# Modo watch (re-ejecuta al guardar)
npm run test:watch

# Tests específicos
npm test -- anamnesis

# Con cobertura
npm run test:coverage
\`\`\`

### CI/CD
\`\`\`bash
# Tests en pipeline (optimizado)
npm run test:ci

# Validación completa
npm run validate
\`\`\`

### Debugging Tests
\`\`\`bash
# Ver output detallado
npm test -- --verbose

# Ejecutar un solo test
npm test -- -t "debe validar email correcto"

# Debug con Node inspector
node --inspect-brk node_modules/.bin/jest --runInBand
\`\`\`

## Convenciones

### Estructura de Archivos
\`\`\`
lib/
├── validations/
│   ├── anamnesis.ts
│   └── __tests__/
│       └── anamnesis.test.ts
\`\`\`

### Nomenclatura de Tests
\`\`\`typescript
describe('NombreDelModulo', () => {
  describe('nombreDeLaFuncion', () => {
    it('debe comportarse de X manera cuando Y condición', () => {
      // Test
    })
  })
})
\`\`\`

### AAA Pattern
\`\`\`typescript
it('debe guardar datos correctamente', async () => {
  // Arrange (Preparar)
  const data = { nombre: 'Juan' }
  
  // Act (Actuar)
  const result = await storage.save(data)
  
  // Assert (Verificar)
  expect(result.success).toBe(true)
})
\`\`\`

## Integración Continua

### GitHub Actions
- Ejecuta automáticamente en cada push/PR
- Verifica:
  1. Tipos TypeScript
  2. Linting
  3. Tests unitarios + cobertura
  4. Build de producción
  5. Auditoría de seguridad

### Badges de Estado
Agregar al README:
\`\`\`markdown
![Tests](https://github.com/usuario/drolean/workflows/CI/badge.svg)
![Coverage](https://codecov.io/gh/usuario/drolean/branch/main/graph/badge.svg)
\`\`\`

## Checklist de Testing

Antes de cada release:

- [ ] Cobertura de tests > 70%
- [ ] Todos los tests pasan en CI/CD
- [ ] Lighthouse score > 90
- [ ] Auditoría de seguridad sin issues críticos
- [ ] Tests E2E ejecutados manualmente
- [ ] Pruebas en múltiples navegadores
- [ ] Pruebas en dispositivos móviles
- [ ] Validación de RLS policies en Supabase

## Recursos

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Supabase RLS Testing](https://supabase.com/docs/guides/auth/row-level-security)

---

Última actualización: 2024-01-15
