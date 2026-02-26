# Plan: Módulo de Transporte, Google Maps, Rol "Conductor" y Panel "Familiar"

## Objetivos del Hito
Basado en las decisiones del usuario:
1. Implementar funcionalidad real de Google Maps usando su API key.
2. Añadir el rol "conductor" para permitir a usuarios específicos tomar viajes.
3. Crear un panel para "familiar", que permita ver el estado y notificaciones de los viajes en curso.
4. Conectar el flujo completo de "Pedir Viaje", "Buscando", "En Curso" y "Completado".

## Tareas a Realizar

### Fase 1: Base de Datos y Tipos (Supabase & TypeScript)
- [ ] Modificar `src/types/index.ts` para agregar `"conductor"` al `UserRole`.
- [ ] Actualizar el componente de registro (`src/app/(auth)/register/page.tsx`) para incluir la opción visual de registrarse como "Conductor".
- [ ] Opcional: Escribir instrucciones SQL / notas si necesitamos tablas en Supabase como `transport_requests`. Supabase asume tablas basadas en los tipos que vemos en el código.

### Fase 2: Módulo Transporte Senior + Google Maps
- [ ] Instalar `@react-google-maps/api` vía NPM.
- [ ] Crear el componente `GoogleMapWrapper` reutilizable en `src/components/maps/`.
- [ ] Modificar `src/app/transport/new/page.tsx` para usar mapas reales y un flujo de autocompletado si es posible.
- [ ] Modificar `src/app/transport/active/page.tsx` (o ruta equivalente) que simule/muestre el estado `searching`, `in_transit` escuchando actualizaciones en Supabase Mocks o Realtime.

### Fase 3: Dashboard Conductor (Driver Module)
- [ ] Crear la página `src/app/(driver)/driver-dashboard/page.tsx` para que los conductores vean viajes pendientes.
- [ ] Funcionalidad de aceptar viaje y pasar el status a `in_transit`.
- [ ] Configurar redireccionamiento automático tras login si el usuario es `conductor` (o en el onboarding).

### Fase 4: Dashboard Familiar (Family Module)
- [ ] Crear la página `src/app/(family)/family-dashboard/page.tsx` para la cuenta de familiares.
- [ ] Mostrar en tarjeta grande el estado actual del familiar vinculado (Ej: "Tu madre María está viajando a Farmacia Chávez - En Ruta").

## Dependencias
- `@react-google-maps/api`
