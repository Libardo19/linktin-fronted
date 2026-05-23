# LinkTin - Contexto para Agentes de IA

## 1. Descripción General

LinkTin es una **plataforma web de networking profesional** con sistema de emparejamiento inteligente (matching) entre candidatos y empresas, inspirada en mecanismos de swipe/match. Desarrollada como proyecto de Ingeniería de Software I - Universidad Popular del Cesar (2026).

**Equipo:** Libardo Acosta, Sergio Saucedo, Andrea Sierra, Daniel Florez  
**Docente:** Jhon Patiño

### Propuesta de Valor
- Matching inteligente basado en habilidades y compatibilidad
- Comunicación directa post-match (chat en tiempo real)
- Sistema de reputación y reseñas
- Modelo Freemium (funcionalidades básicas gratis, premium para empresas)

---

## 2. Arquitectura

### Stack Tecnológico
| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 16 + React 19 + Tailwind CSS 4 |
| Backend | Node.js + Express 5 |
| Base de Datos | PostgreSQL + Prisma ORM |
| Autenticación | JWT (jsonwebtoken) |
| Seguridad | bcryptjs, cors, joi validation |
| Tiempo Real | WebSockets (Socket.IO - por implementar) |
| Container | Docker (planeado) |

### Estructura de Carpetas
```
linktin-fronted/          # Frontend Next.js
├── src/
│   ├── app/               # Rutas App Router (Next.js 13+)
│   │   ├── auth/
│   │   │   ├── login/page.js
│   │   │   └── register/page.js
│   │   └── page.js        # Landing page
│   ├── components/
│   │   └── landing/       # Componentes landing page
│   │       ├── Hero.js
│   │       ├── Navbar.js
│   │       ├── ValuePropositions.js
│   │       ├── PlatformPreview.js
│   │       ├── CTA.js
│   │       └── Footer.js
│   ├── context/
│   │   └── AuthContext.js  # Contexto de autenticación
│   ├── services/
│   │   └── auth.service.js # Servicios de auth
│   └── lib/
│       └── axios.js        # Config axios
├── .env.local              # NEXT_PUBLIC_API_URL
└── package.json

linktin-backend/           # Backend Express
├── src/
│   ├── server.js           # Entry point
│   ├── app.js              # Config Express + rutas
│   ├── config/
│   │   ├── env.config.js   # Validación variables entorno
│   │   └── db.config.js    # Config Prisma
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── candidato.routes.js
│   │   ├── empresa.routes.js
│   │   ├── oferta.routes.js
│   │   ├── matching.routes.js
│   │   ├── habilidad.routes.js
│   │   ├── sector.routes.js
│   │   ├── notificaciones.routes.js
│   │   └── admin.routes.js
│   ├── controllers/
│   ├── services/
│   ├── models/             # Acceso a datos vía Prisma
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── validate.middleware.js
│   └── utils/
├── prisma/
│   ├── schema.prisma       # Schema completo BD
│   └── migrations/         # Migraciones existentes
├── .env                    # Variables de entorno
└── package.json
```

---

## 3. Configuración de Entorno

### Backend (.env)
```
PORT=3001
DATABASE_URL=postgresql://postgres:1234@localhost:5432/linktin_db
JWT_SECRET=linktin_secret_key_muy_larga_y_segura_2024
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_DEMO_MODE=true  # Activar mock mode (sin backend)
```

### Variables Requeridas (Backend)
El backend valida al iniciar que existan: `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `PORT`

---

## 4. Modelo de Datos (Prisma)

### Enums
- `TipoUsuario`: candidato | empresa | admin
- `NivelCandidato`: basico | intermedio | avanzado
- `EstadoOferta`: activa | cerrada | pausada
- `EstadoMatch`: pendiente | aceptado | rechazado
- `TipoNotificacion`: nuevo_match | match_aceptado | match_rechazado | match_retirado | oferta_cerrada | resena_recibida | mensaje_recibido

### Entidades Principales
| Modelo | Descripción | Clave |
|--------|-------------|-------|
| **Usuario** | Credenciales y tipo | id_usuarios (VARCHAR 10) |
| **PerfilCandidato** | Datos personales y profesionales | id_candidato (VARCHAR 10) |
| **PerfilEmpresa** | Datos corporativos | id_empresas (AutoIncrement) |
| **Ofertas** | Vacantes laborales | id_ofertas (AutoIncrement) |
| **Matches** | Coincidencias candidato-oferta | id_match (AutoIncrement) |
| **Mensajes** | Chat entre matched users | id_mensajes (AutoIncrement) |
| **Habilidades** | Catálogo de skills | id_habilidades (AutoIncrement) |
| **Resenas** | Calificaciones y comentarios | id_resena (AutoIncrement) |
| **Notificaciones** | Alertas del sistema | id_notificaciones (AutoIncrement) |
| **Sectores** | Industrias/sectores | id_sector (AutoIncrement) |

### Relaciones Clave
- `Usuario` 1:1 `PerfilCandidato` (si tipo=candidato)
- `Usuario` 1:1 `PerfilEmpresa` (si tipo=empresa)
- `PerfilCandidato` 1:N `ExperienciaCandidato`
- `PerfilCandidato` 1:N `EducacionCandidato`
- `PerfilCandidato` 1:N `HabilidadEmpleado` → `Habilidades`
- `PerfilEmpresa` 1:N `Ofertas`
- `Ofertas` 1:N `HabilidadesOfertas` → `Habilidades`
- `Usuario` 1:N `Matches` → `Ofertas`
- `Matches` 1:N `Mensajes`
- `Matches` 1:N `Resenas`

---

## 5. API Endpoints

### Auth (`/api/auth`)
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/register` | Registro (candidato/empresa) |
| POST | `/login` | Login con JWT |
| GET | `/me` | Obtener usuario actual (protegido) |

### Candidatos (`/api/candidatos`)
CRUD de perfiles candidato y gestión de habilidades.

### Empresas (`/api/empresas`)
CRUD de perfiles empresa.

### Ofertas (`/api/ofertas`)
Publicación y gestión de vacantes laborales.

### Matches (`/api/matches`)
Sistema de matching y compatibilidad.

### Habilidades (`/api/habilidades`)
Catálogo de skills.

### Sectores (`/api/sectores`)
Gestión de industrias.

### Notificaciones (`/api/notificaciones`)
Sistema de alertas.

### Admin (`/api/admin`)
Funciones administrativas.

### Health Check
| Método | Ruta | Respuesta |
|--------|------|-----------|
| GET | `/health` | `{ status: "ok", timestamp }` |

---

## 6. Requerimientos Funcionales (RF)

### RF-01: Gestión de Usuarios y Empresas
- Registro candidato con email y contraseña
- Registro empresa con datos corporativos
- Actualización de datos de cuenta

### RF-02: Autenticación JWT
- Login con email/contraseña → retorna access token
- Restablecimiento de contraseña por email (por implementar)
- Bloqueo temporal tras múltiples intentos fallidos (por implementar)

### RF-03: Perfiles y Habilidades
- Perfil candidato: HV, foto, título, ubicación, resumen
- Gestión de habilidades técnicas y blandas
- Experiencia laboral y educación
- Perfil empresa: logo, industria, descripción, links
- Indicador de completitud del perfil
- Configuración de visibilidad (público/solo empresas/privado)

### RF-04: Ofertas Laborales
- Crear/editar/eliminar ofertas
- Ver postulantes con filtros
- Cambiar estado de postulación (visto, en proceso, rechazado, aceptado)

### RF-05: Matching Inteligente
- Cálculo de score de compatibilidad
- Feed de ofertas recomendadas (candidato)
- Feed de candidatos recomendados (empresa)
- Swipe: aplicar o descartar oferta
- Match confirmado cuando hay interés mutuo

### RF-06: Reputación y Reseñas
- Reseñas mutuas post-proceso (1-5 estrellas + comentario)
- Promedio visible en perfil público
- Reportar reseña inapropiada
- Una reseña por proceso

### RF-07: Mensajería en Tiempo Real
- Chat post-match vía WebSockets
- Mensajes instantáneos
- Indicador de leído/no leído
- Indicador "escribiendo..."
- Historial paginado

### RF-08: Dashboard por Rol
- **Candidato:** matches activos, postulaciones, mensajes
- **Empresa:** ofertas activas, postulantes, matches
- **Admin:** usuarios activos, reportes, métricas

### RF-09: Notificaciones
- Match nuevo, mensaje nuevo, cambio postulación, nueva reseña
- Preferencias configurables

### RF-10: RBAC (Control de Acceso)
- Roles: candidato, empresa, administrador
- Restricción de endpoints por rol
- Admin: suspender/reactivar cuentas, moderar contenido
- Empresa solo accede a datos privados con match previo

### RF-11: Búsqueda Avanzada
- Filtros por palabra clave, ubicación, modalidad, salario
- Paginación (cursor-based u offset)
- Ordenamiento por fecha, relevancia, score

---

## 7. Historias de Usuario (Resumen)

| ID | Historia | Prioridad | Puntos |
|----|----------|-----------|--------|
| HU-01 | Gestión de usuarios y empresas (Admin) | Alta | 8 |
| HU-02 | Autenticación JWT | Alta | 8 |
| HU-03 | Gestión avanzada de perfiles y habilidades | Alta | 8-13 |
| HU-04 | Publicación de ofertas laborales | Alta | 5 |
| HU-05 | Sistema de matching inteligente | Alta | 13 |
| HU-06 | Sistema de reputación y reseñas | Media | 13 |
| HU-07 | Mensajería en tiempo real (WebSockets) | Alta | 13-21 |
| HU-08 | Dashboard personalizado por rol | Alta | 13 |
| HU-09 | Sistema de notificaciones | Media | 5 |
| HU-10 | Gestión de roles y permisos (RBAC) | Alta | 13 |
| HU-11 | Filtros, paginación y búsqueda avanzada | Alta | 8-16 |

### Sprints Planeados
| Sprint | Semanas | Historias | Entregable |
|--------|---------|-----------|------------|
| 1 | 1-2 | HU-01, HU-02, HU-10 | Auth + Gestión usuarios + RBAC |
| 2 | 3-4 | HU-03, HU-08 | Perfiles + Dashboard |
| 3 | 5-6 | HU-04, HU-11 | Ofertas + Búsqueda |
| 4 | 7-8 | HU-05, HU-09 | Matching + Notificaciones |
| 5 | 9-10 | HU-07, HU-06 | Chat + Reseñas |

---

## 8. Flujo de Autenticación

### Registro
1. Usuario selecciona rol (candidato/empresa)
2. Completa formulario con datos básicos
3. Backend valida email único → hashea password con bcrypt (10 rounds)
4. Genera JWT con payload: `{ id, email, tipo }`
5. Retorna `{ token, usuario }`

### Login
1. Usuario envía email + password
2. Backend busca usuario → compara con bcrypt.compare
3. Si válido → genera JWT → retorna token + datos usuario
4. Frontend guarda token en cookie `linktin_token`

### Middleware Auth
- Valida JWT en header `Authorization: Bearer <token>`
- Decodifica y adjunta `req.usuario`
- Rechaza si token inválido/expirado

---

## 9. Mock Mode (Desarrollo sin Backend)

Cuando `NEXT_PUBLIC_DEMO_MODE=true`, el frontend simula el backend:

### Funcionalidad
- **Registro:** Guarda usuario en `localStorage` con ID único generado
- **Login:** Busca en `localStorage` por email + compara password (texto plano en demo)
- **Token:** Genera JWT dummy firmado con clave local
- **Persistencia:** Datos solo en navegador local
- **Logout:** Limpia cookies y localStorage

### Implementación
Archivos a modificar:
- `src/services/auth.service.js` - Añadir lógica mock
- `.env.local` - Flag `NEXT_PUBLIC_DEMO_MODE`

---

## 10. Convenciones de Código

### Frontend
- **Framework:** Next.js App Router (no Pages Router)
- **Estilos:** Tailwind CSS con clases utilitarias
- **Componentes:** Funcionales con hooks
- **Iconos:** Lucide React (NO emojis en producción)
- **Tipografía:** Google Fonts (Sora, DM Sans)
- **Cliente:** `'use client'` para componentes interactivos
- **Contexto:** AuthContext para estado global de autenticación

### Backend
- **Patrón:** MVC (Models, Views como controllers, Services)
- **Async/Await:** Obligatorio para operaciones DB
- **Errores:** Centralizados en `error.middleware.js`
- **Validación:** Joi en `validate.middleware.js`
- **Nombres:** camelCase variables, PascalCase clases

### Git
- **Rama principal:** `main`
- **Feature branches:** `feature/nombre-descriptivo`
- **Commits:** `tipo(alcance): descripción`
  - Tipos: `feat`, `fix`, `refactor`, `style`, `docs`, `test`
  - Ejemplo: `refactor(frontend): reemplaza emojis por iconos lucide-react`

---

## 11. Notas Importantes para Desarrolladores

### ⚠️ Limitaciones Actuales
- PostgreSQL debe estar corriendo localmente (no hay Docker aún)
- Prisma Client debe regenerarse tras cambios en schema
- WebSockets (chat) no implementado aún
- Sistema de notificaciones no implementado
- Pasarelas de pago NO incluidas (Freemium solo conceptual)
- Sin verificación de identidad oficial
- Sin app móvil nativa (solo web responsive)

### 🔧 Comandos Útiles
```bash
# Backend
npm install                    # Instalar dependencias
npx prisma generate            # Generar Prisma Client
npx prisma migrate deploy      # Ejecutar migraciones
npx prisma studio              # UI para explorar BD
npm run dev                    # Iniciar en desarrollo (nodemon)
npm start                      # Iniciar en producción

# Frontend
npm install                    # Instalar dependencias
npm run dev                    # Iniciar Next.js dev server
npm run lint                   # Ejecutar ESLint
```

### 🚨 Errores Conocidos
- **Footer.js:** Lucide React NO incluye iconos de marca (LinkedIn, Twitter, GitHub, Instagram). Usar SVGs inline.
- **Hero.js:** Se mantiene emoji ⚡ intencionalmente (según instrucciones previas)

### 📋 Checklist antes de commits
- [ ] No hay emojis en componentes nuevos (usar Lucide)
- [ ] Variables de entorno `.env` NO commiteadas
- [ ] Código pasa ESLint (`npm run lint`)
- [ ] Console logs eliminados
- [ ] Componentes innecesarios removidos

---

## 12. Recursos Externos

- **Prisma Docs:** https://www.prisma.io/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Lucide Icons:** https://lucide.dev/icons
- **Manifiesto Ágil:** https://agilemanifesto.org

---

*Última actualización: Mayo 2026*  
*Rama activa: feature/refactor-frontend*
