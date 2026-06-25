# Lorenço Magazine

Web tipo magazine/blog financiero para publicar notas económicas y financieras con archivos locales `.md` o `.mdx`.

No requiere CMS para compilar o desplegar.

## Desarrollo local

```bash
npm install
npm run dev
npm run build
```

## Publicar una nota

1. Crear un archivo `.md` o `.mdx` en `content/notas/`.
2. Completar el frontmatter estándar.
3. Guardar una imagen opcional en `public/images/notas/`.
4. Si `coverImage` queda vacío, se usa `/images/lorenco-default-cover.png`.
5. Hacer commit y push.
6. Vercel publica automáticamente.

El slug sale automáticamente del nombre del archivo. No agregar `slug` al frontmatter.

## Frontmatter obligatorio

```mdx
---
title: "Título de la nota"
description: "Bajada breve"
date: "YYYY-MM-DD"
author: "Martín Ferrer"
status: "published"
category: "Macro"
tags: ["macro", "datos"]
coverImage: ""
sources:
  - title: "Fuente consultada"
    url: "https://..."
---
```

Si falta un campo obligatorio, el build falla con un mensaje claro.

## Categorías válidas

Las categorías se editan desde `content/site/navigation.json`, dentro de la lista `primary`.

## Autores válidos

- Martín Ferrer
- Clara Montes
- Julián Rivas
- Emilia Duarte
- Tomás Alvarado

## Estructura

```text
content/notas/              Notas publicadas o borradores
content/site/               Textos generales editables del sitio
public/images/notas/        Imágenes opcionales de notas
public/images/              Logo e imagen default
app/notas/[slug]/           Página de nota
app/buscar/                 Búsqueda local
app/macro/                  Categoría Macro
app/finanzas/               Categoría Finanzas
app/normativas/             Categoría Normativas
app/historia/               Categoría Historia
app/reflexiones/            Categoría Reflexiones
```

## Cómo editar textos generales del sitio

Las notas y artículos se editan en `content/notas/` como archivos `.md` o `.mdx`.

Los textos generales del sitio se editan en `content/site/`:

- `settings.json`: nombre del sitio, SEO general, email, URL e imágenes base.
- `home.json`: textos, títulos, límites y bloques visibles de la home.
- `navigation.json`: labels y enlaces de navegación.
- `footer.json`: textos del footer, disclaimer y aclaración de autores ficticios.
- `pages.json`: textos de Sobre el proyecto, Contacto, Buscar, categorías y artículos.

Las imágenes van en `public/images/`. Después de editar y hacer commit/push, Vercel republica automáticamente.

Si falta un archivo de `content/site/` o un campo obligatorio, el build falla con un mensaje claro.

## Imágenes

Imagen default:

```text
public/images/lorenco-default-cover.png
```

Logo:

```text
public/images/lorenco-logo.png
```

Imágenes de notas:

```text
public/images/notas/
```

Ejemplo:

```mdx
coverImage: "/images/notas/nombre-de-la-imagen.png"
```

## Vercel

Configurar:

```env
NEXT_PUBLIC_SITE_URL=https://lorenco-magazine.vercel.app
```

También está documentado en `.env.example`.
