# Lorenço Macro & Finanzas

Web editorial para publicar análisis macroeconómico y financiero en formato MDX.

## Instalación

```bash
npm install
npm run dev
```

El sitio local queda disponible en `http://localhost:3000`.

## Crear una publicación

```bash
npm run new:post "titulo de la publicacion"
```

El comando crea un borrador en `content/publicaciones/` con `status: "draft"`. Los borradores no aparecen en listados, archivo, buscador ni sitemap.

## Frontmatter

Cada publicación debe usar este formato:

```mdx
---
title: ""
description: ""
date: "YYYY-MM-DD"
author: "Lorenço Macro & Finanzas"
status: "draft"
tags: []
coverImage: "/images/publicaciones/nombre-de-la-publicacion.jpg"
sources: []
---
```

Campos principales:

- `title`: título visible de la publicación.
- `description`: bajada o resumen.
- `date`: fecha en formato `YYYY-MM-DD`.
- `author`: usar `Lorenço Macro & Finanzas`.
- `status`: `draft` o `published`.
- `tags`: lista de tags visibles, por ejemplo `["Argentina", "BCRA"]`.
- `coverImage`: imagen destacada obligatoria.
- `sources`: fuentes opcionales.

## Imágenes destacadas

Las imágenes van en `public/images/publicaciones/`.

Ejemplo:

```mdx
coverImage: "/images/publicaciones/titulo-de-la-publicacion.jpg"
```

## Fuentes

Si una publicación incluye fuentes, agregarlas en `sources`:

```mdx
sources:
  - title: "Banco Central de la República Argentina"
    url: "https://www.bcra.gob.ar/"
```

Si `sources` queda vacío, la sección “Fuentes consultadas” no se muestra.

## Publicar

Para publicar una nota:

1. Completar el MDX.
2. Agregar la imagen destacada.
3. Cambiar `status: "draft"` por `status: "published"`.
4. Subir los cambios al repositorio.

## Contacto

El formulario está preparado para variables de entorno:

```env
CONTACT_TO_EMAIL="produ.lorenzo@gmail.com"
CONTACT_PROVIDER=""
```

Si no hay proveedor configurado, la web no se rompe y muestra un error controlado. La integración concreta puede conectarse luego con Resend, SendGrid, una función propia u otro servicio.

## SEO

El proyecto incluye metadata general, metadata por publicación, Open Graph, `robots.txt` y `sitemap.xml`. Las publicaciones en draft no entran al sitemap.

Configurar la URL pública en producción si querés fijar una URL canónica o usar un dominio propio. Si esta variable no existe, Vercel usa automáticamente `VERCEL_URL`.

```env
NEXT_PUBLIC_SITE_URL="https://tu-dominio.com"
```

## Deploy en Vercel

1. Crear un repositorio privado llamado `lorenco-macro-finanzas`.
2. Subir este proyecto.
3. Importar el repositorio en Vercel.
4. Configurar `NEXT_PUBLIC_SITE_URL` solo cuando exista una URL final o dominio propio.
5. Configurar variables del formulario cuando se elija proveedor.

## Analytics

Analytics queda desactivado por defecto:

```env
NEXT_PUBLIC_ANALYTICS_ENABLED="false"
```

Cuando se defina la herramienta, se puede activar agregando el componente correspondiente en `app/layout.tsx` y cambiando la variable a `true`.
