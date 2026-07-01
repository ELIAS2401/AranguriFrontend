# InstrumentHub 🎸

**Marketplace de instrumentos musicales usados**

🌐 **Live:** [https://elias2401.github.io/AranguriFrontend](https://elias2401.github.io/AranguriFrontend)

Plataforma web moderna para publicar, descubrir y conectar con compradores y vendedores de instrumentos musicales. Consume una API REST desarrollada en Node.js + Express + TypeScript + Supabase, deployada en Render.

---

## 📋 Sobre este proyecto

Este proyecto fue desarrollado como parte de un **desafío técnico para Software Engineer Web en AranguriApps**.

La particularidad: lo desarrollé en un día mientras cursaba la semana de parciales. Gracias a una combinación inteligente de herramientas de IA pude entregar un producto completo, bien diseñado y con código limpio en tiempo récord.

### Stack tecnológico

| Capa | Tecnología |
|---|---|
| **Frontend** | Angular 21.2 · TypeScript 5.9 · RxJS 7.8 |
| **Backend** | Node.js · Express 5 · TypeScript 6 |
| **Base de datos** | Supabase (PostgreSQL) |
| **Estilos** | CSS moderno · Glassmorphism · Dark theme |
| **Build** | @angular/build (Vite) |
| **Deploy frontend** | GitHub Pages |
| **Deploy backend** | Render (gratuito) |

### Principios de desarrollo

- **Clean Code**: Código legible, nombrado semántico, funciones pequeñas y responsabilidad única
- **SOLID**: Componentes standalone con inyección de dependencias, servicios desacoplados, interfaces limpias
- **Componentes reutilizables**: `InstrumentCard`, `InstrumentForm`, `SkeletonCard`, `Layout`
- **Estados cubiertos**: Loading · Empty · Error · Success en cada pantalla
- **Mobile-first**: Diseño responsive en grid y layouts

### Cómo se construyó

1. **Ideación con ChatGPT**: Definí la arquitectura, el diseño visual (inspirado en Reverb + MercadoLibre + Spotify) y planifiqué los componentes
2. **Desarrollo con OpenCode (IA)**: Generé el código completo del frontend y backend, con commits atómicos y mensajes profesionales, aplicando clean code y principios SOLID
3. **Refinamiento manual**: Ajusté detalles de UI, corregí bugs y verifiqué la integración end-to-end
4. **Deploy**: Frontend en GitHub Pages con GitHub Actions, backend en Render, DB en Supabase (todo gratis)

---

## 🚀 Deploy

### Backend (Render)

```
https://render.com → New Web Service → conectá el repo

Build: npm install && npm run build
Start: npm start
Health: /api/health

Variables de entorno:
  SUPABASE_URL, SUPABASE_KEY, PORT=3000
```

### Frontend (GitHub Pages)

El deploy es automático via GitHub Actions. Cada vez que hacés push a `main`:

1. El Action build el proyecto con `--base-href /AranguriFrontend/`
2. Crea el archivo `404.html` para soporte de SPA routing
3. Pushea a la branch `gh-pages`

Para deploy manual:
```bash
npm run deploy:ghpages
```

---

## 🧪 Desarrollo local

```bash
# Backend
cd ../AranguriBackend
cp .env.example .env   # Completá SUPABASE_URL y SUPABASE_KEY
npm install && npm run dev

# Frontend (nueva terminal)
cd ../AranguriFrontend
npm install && npm start
# Abrí http://localhost:4200
```

El proxy de Angular redirige `/api/*` a `http://localhost:3000`.

---

## 📁 Estructura del frontend

```
src/
├── app/
│   ├── components/
│   │   ├── layout/              # Navbar glassmorphism + router-outlet
│   │   ├── instrument-card/     # Card con hover, zoom, badges
│   │   ├── instrument-form/     # Formulario crear/editar
│   │   └── skeleton-card/       # Skeleton loader animado
│   ├── pages/
│   │   ├── home/                # Landing page con hero
│   │   ├── listado/             # Grid de instrumentos
│   │   └── detalle/             # Vista detalle del instrumento
│   ├── services/
│   │   └── instrumentos.service.ts  # CRUD vía HttpClient
│   ├── models/
│   │   └── instrumento.ts       # Interfaces del dominio
│   ├── app.routes.ts            # Definición de rutas
│   └── app.config.ts            # Providers globales
├── environments/                # Config por entorno
└── styles.css                   # Estilos globales dark
```

---

## 🎨 Diseño visual

- **Tema**: Dark premium con fondo #0a0a0c
- **Acento**: Verde neón #00e676
- **Precios**: Dorado #ffd700
- **Navbar**: Glassmorphism con backdrop-filter
- **Cards**: Elevación en hover con sombra + blur
- **Categorías**: Colores dinámicos (guitarras → naranja, teclados → azul, percusión → rojo)
- **Tipografía**: Inter (Google Fonts)
- **Responsive**: Mobile-first, grid adaptativo

---

## 📬 Contacto

**Desarrollado por Elias Tucci**

---

> *"Hecho por músicos para músicos. Una plataforma simple, rápida y diseñada para que los instrumentos sigan sonando."*
