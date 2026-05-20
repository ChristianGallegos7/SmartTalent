# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SmartTalent is a job board (bolsa de empleo) with two sub-projects:
- `backend/` — Node.js + Express + Sequelize (PostgreSQL), CommonJS
- `fronted/` — React 19 + TypeScript + Vite, ESM

## Commands

### Backend
```bash
cd backend
npm install
npm run dev      # nodemon src/server.js (hot reload)
npm start        # node src/server.js (production)
```

### Frontend
```bash
cd fronted
npm install
npm run dev      # vite dev server
npm run build    # tsc -b && vite build
npm run lint     # eslint
npm run preview  # preview production build
```

## Database

PostgreSQL. Credentials hardcoded in `backend/src/Infraestructura/database/Postgres.js`:
- DB: `bolsa_empleo`, user: `postgres`, password: `1234`, host: `localhost`

Schema lives in `scripts/db.sql`. Sequelize uses `sync({ alter: true })` on startup — models auto-migrate on every boot.

Tables: `usuarios`, `vacantes`, `habilidades`, `postulaciones`, `candidato_habilidades`

## Backend Architecture

Hexagonal architecture (Ports & Adapters), one vertical slice per domain entity:

```
backend/src/lib/<Entity>/
  Aplicacion/          # Use cases (CrearX, ListarX, ActualizarX, EliminarX)
  Dominio/
    Entidades/         # Domain class with validation in constructor
    Ports/             # IXRepositorio interface (defined but not enforced in JS)
  Infraestructura/
    Orm/               # Sequelize model + repository implementing the port
    http/
      XControlador.js  # Express handler
      XRutas.js        # Express router
      index.js         # DI wiring: instantiates repo, controller; mounts routes on app
```

Dependency injection happens in each `Infraestructura/http/index.js` — the repo is instantiated there and passed to use cases via the controller. `app.js` calls each module's `register*Module(app)` function. `server.js` connects DB, syncs models, builds app, starts listening.

**Note:** `backend/src/Infraestructura/database/Mongo.js` exists but MongoDB is commented out — only PostgreSQL is active.

## Adding a New Domain Entity

1. Create the vertical slice under `backend/src/lib/<NewEntity>/` following the same folder pattern as `Usuario` or `Vacante`.
2. Add the Sequelize model to `backend/src/models/index.js` (imported and included in `syncModels`).
3. Register the module in `backend/src/app.js`.
4. Add SQL DDL to `scripts/db.sql` for reference.

## Key Patterns

- Domain classes validate required fields in the constructor and throw `Error` on violation.
- Repositories map raw Sequelize results back to domain objects before returning.
- Routes follow `/api/<entity-plural>` convention.
- No auth middleware is currently wired in.
