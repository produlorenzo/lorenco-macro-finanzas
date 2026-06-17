# Lorenço Macro & Finanzas

Web editorial para publicar análisis macroeconómico y financiero en formato MDX.

## Instalación local

```bash
npm install
npm run dev
```

El sitio local queda disponible en `http://localhost:3000`.

## Cómo publicar una nota nueva

El flujo principal usa una sola carpeta:

```text
content/publicaciones/
```

Cada nota es un archivo `.mdx` o `.md`. Solo aparece públicamente si tiene:

```mdx
status: "published"
```

Los borradores deben quedar como:

```mdx
status: "draft"
```

Flujo ideal:

1. Crear o pegar el archivo MDX en `content/publicaciones/`.
2. Agregar una imagen en `public/images/publicaciones/` solo si corresponde.
3. Revisar el frontmatter.
4. Cambiar `status: "draft"` a `status: "published"`.
5. Hacer commit en GitHub.
6. Vercel despliega automáticamente.

## Publicar desde GitHub web o celular

Desde GitHub web:

1. Entrar al repositorio.
2. Abrir `content/publicaciones/`.
3. Tocar **Add file**.
4. Crear o subir el archivo `.mdx`.
5. Revisar que el frontmatter tenga `status: "draft"` o `status: "published"`.
6. Hacer commit.

Si la nota lleva gráficos:

1. Ir a `public/images/publicaciones/`.
2. Subir la imagen.
3. Referenciarla dentro del MDX:

```mdx
![Descripción del gráfico](/images/publicaciones/nombre-del-grafico.png)
```

Después del commit, Vercel detecta el cambio y publica el sitio automáticamente.

## Frontmatter recomendado

```mdx
---
title: "Título de la publicación"
description: "Bajada breve de la nota"
date: "YYYY-MM-DD"
author: "Lorenço Macro & Finanzas"
status: "draft"
category: "Macro"
tags: ["Argentina", "BCRA"]
coverImage: ""
sources:
  - title: "Fuente oficial"
    url: "https://..."
---
```

Campos principales:

- `title`: título visible.
- `description`: bajada o resumen.
- `date`: fecha en formato `YYYY-MM-DD`.
- `author`: usar `Lorenço Macro & Finanzas`.
- `status`: `draft` o `published`.
- `category`: categoría editorial visible.
- `tags`: tags visibles.
- `coverImage`: opcional. Si queda vacío, la web usa automáticamente `/images/lorenco-default-cover.png`.
- `sources`: fuentes consultadas opcionales.

## Imágenes

La imagen destacada es opcional.

Si no indicás `coverImage`, se usa automáticamente:

```text
/images/lorenco-default-cover.png
```

Si se usa, debe ir en:

```text
public/images/publicaciones/
```

Y referenciarse así:

```mdx
coverImage: "/images/publicaciones/nombre-de-la-imagen.png"
```

Las imágenes y gráficos dentro del cuerpo de la nota también van en `public/images/publicaciones/` y se insertan con Markdown:

```mdx
![Descripción del gráfico](/images/publicaciones/nombre-del-grafico.png)

*Fuente: fuente oficial o elaboración propia sobre datos públicos.*
```

Una nota puede publicarse solo con texto.

## Fuentes consultadas

Si `sources` tiene elementos, la publicación muestra una sección “Fuentes consultadas”.

```mdx
sources:
  - title: "Banco Central de la República Argentina"
    url: "https://www.bcra.gob.ar/"
```

Si `sources` está vacío, esa sección no aparece.

## Crear un borrador desde consola

```bash
npm run new:post "titulo de la publicacion"
```

El comando crea un archivo en `content/publicaciones/` con `status: "draft"`.

## Templates

Usar este archivo como modelo editorial completo:

```text
templates/publicacion-modelo.mdx
```

También hay una plantilla mínima:

```text
templates/publicacion.mdx
```

## SEO

El proyecto incluye metadata general, metadata por publicación, Open Graph, `robots.txt` y `sitemap.xml`. Las publicaciones en draft no entran al sitemap.

Configurar la URL pública si se usa dominio propio:

```env
NEXT_PUBLIC_SITE_URL="https://tu-dominio.com"
```

Si esta variable no existe, Vercel usa automáticamente `VERCEL_URL`.

## Contacto

El formulario está preparado para variables de entorno:

```env
CONTACT_TO_EMAIL="produ.lorenzo@gmail.com"
CONTACT_PROVIDER=""
```

Si no hay proveedor configurado, la web muestra un error controlado.

## Deploy en Vercel

1. Subir cambios a GitHub.
2. Vercel detecta el commit.
3. Ejecuta el build.
4. Publica la nueva versión.

## Analytics

Analytics queda desactivado por defecto:

```env
NEXT_PUBLIC_ANALYTICS_ENABLED="false"
```
