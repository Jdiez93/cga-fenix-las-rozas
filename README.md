# 🤸‍♀️✨ CGA Fénix Las Rozas — Plataforma Web Oficial

<p align="center">
  <img src="public/images/logo-fenix.jpeg" alt="CGA Fénix Las Rozas Logo" width="160" style="border-radius: 50%;">
</p>

<p align="center">
  <b>Club de Gimnasia Artística en Las Rozas de Madrid</b><br>
  <i>Formando gimnastas desde la base hasta la alta competición con pasión, disciplina y excelencia.</i>
</p>

<p align="center">
  <a href="https://cga-fenix-las-rozas.vercel.app/"><img src="https://img.shields.io/badge/🌐_Sitio_Web-cga--fenix--las--rozas.vercel.app-2ea44f?style=for-the-badge" alt="Web"></a>
  <img src="https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
  <img src="https://img.shields.io/badge/Framework-Next.js_14-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
</p>

---

## 📖 Tabla de Contenidos

- [🌐 Sobre el Proyecto](#-sobre-el-proyecto)
- [✨ Características y Módulos](#-características-y-módulos)
- [🏗️ Arquitectura y Estructura](#️-arquitectura-y-estructura)
- [🛠️ Stack Tecnológico](#️-stack-tecnológico)
- [🚀 Instalación y Despliegue](#-instalación-y-despliegue)
- [🛡️ Panel de Administración](#️-panel-de-administración)
- [📍 Ubicación y Horarios](#-ubicación-y-horarios)
- [🤝 Patrocinadores y Colaboradores](#-patrocinadores-y-colaboradores)
- [📲 Contacto y Redes Sociales](#-contacto-y-redes-sociales)

---

## 🌐 Sobre el Proyecto

Esta aplicación web es el portal digital central del **Club Gimnasia Artística (CGA) Fénix Las Rozas**. Diseñada con una arquitectura moderna y orientada a la experiencia de usuario, cumple una doble función:

1. **Canal Público:** Servir de escaparate institucional para dar a conocer la historia, cuerpo técnico, instalaciones, logros deportivos y permitir la preinscripción digital de nuevos atletas.
2. **Plataforma de Gestión:** Proporcionar un área administrativa privada para coordinar solicitudes, gestionar grupos de entrenamiento y mantener actualizada la información de eventos y contenidos multimedia.

---

## ✨ Características y Módulos

### 🏠 1. Landing Page e Identidad
* **Hero Carousel:** Muestra dinámica e interactiva con imágenes en alta resolución de entrenamientos y campeonatos.
* **Propuesta de Valor:** Sección institucional con la misión del club centrada en el desarrollo técnico y valor humano.

### 📝 2. Sistema de Preinscripción en Línea (`/preinscripcion`)
* Formulario digital intuitivo para la captación de nuevos alumnos.
* Validación de datos en tiempo real para agilizar el proceso de incorporación a los grupos de gimnasia.

### 🏆 3. Historia y Medallero (`/conocenos/historia` y `/conocenos/logros`)
* Cronología del club desde su fundación.
* Palmarés completo con resultados destacados en Campeonatos de España, torneos regionales y trofeos.

### 🤸‍♂️ 4. Equipos y Fichas de Atletas (`/equipos` y `/quienes-somos/equipo-tecnico`)
* Perfiles detallados del equipo técnico (entrenadores, preparadores físicos, fisioterapeutas).
* Presentación de las distintas categorías deportivas (base, vía olímpica, escolar).

### 📸 5. Galería Multimedia (`/galeria/fotos` y `/galeria/videos`)
* Álbumes fotográficos categorizados por temporada y competición.
* Videoteca interactiva con rutinas, exhibiciones y momentos clave.

### 📰 6. Medios y Prensa (`/medios`)
* Recopilatorio de noticias, entrevistas y menciones en medios locales y nacionales.

---

## 🏗️ Arquitectura y Estructura

El proyecto utiliza la estructura de carpetas estándar del **App Router de Next.js**:

```text
cga-fenix-las-rozas/
├── 📁 public/                    # Archivos estáticos
│   ├── 📁 images/                # Logos, banners y fotografías de gimnastas
│   └── 📄 favicon-fenix.ico      # Icono del sitio
│
├── 📁 src/
│   ├── 📁 app/                   # Enrutamiento basado en archivos (Next.js App Router)
│   │   ├── 📄 layout.tsx         # Root layout con Navbar y Footer integrados
│   │   ├── 📄 page.tsx           # Página principal (Landing Page)
│   │   ├── 📁 admin/             # Panel privado (/admin/login)
│   │   ├── 📁 conocenos/         # Subrutas: /historia y /logros
│   │   ├── 📁 contacto/          # Formulario e información de contacto
│   │   ├── 📁 equipos/           # Secciones por categoría deportiva
│   │   ├── 📁 galeria/           # Subrutas: /fotos y /videos
│   │   ├── 📁 medios/            # Cobertura de prensa
│   │   ├── 📁 preinscripcion/    # Formulario de alta e inscripción
│   │   └── 📁 quienes-somos/     # Subruta: /equipo-tecnico
│   │
│   ├── 📁 components/            # Componentes reutilizables (Navbar, Footer, Carro, Cards)
│   └── 📁 styles/                # Hojas de estilo globales y módulos CSS
│
├── 📄 next.config.js             # Configuración de Next.js
├── 📄 package.json               # Dependencias y scripts
└── 📄 tsconfig.json              # Configuración de TypeScript
