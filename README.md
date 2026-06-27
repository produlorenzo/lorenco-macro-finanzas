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
3. Elegir una portada en `public/images/covers/[categoria]/`.
4. Si `cover` queda vacío, se puede completar con `npm run assign:covers`.
5. Hacer commit y push.
6. Vercel publica automáticamente.

El slug sale automáticamente del nombre del archivo. No agregar `slug` al frontmatter.

## Frontmatter obligatorio

```mdx
---
title: "Título de la nota"
description: "Bajada breve"
date: "YYYY-MM-DD"
author: "Admin Lorenço"
status: "published"
category: "Recursos"
tags: ["recursos", "datos"]
cover: ""
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
- Admin Lorenço

## Estructura

```text
content/notas/              Notas publicadas o borradores
content/site/               Textos generales editables del sitio
public/images/covers/       Imágenes reutilizables de portada
public/images/notas/        Imágenes opcionales dentro de notas
public/images/              Logo y otros assets generales
app/notas/[slug]/           Página de nota
app/buscar/                 Búsqueda local
app/macro/                  Categoría Macro
app/finanzas/               Categoría Finanzas
app/normativas/             Categoría Normativas
app/historia/               Categoría Historia
app/reflexiones/            Categoría Reflexiones
app/recursos/               Categoría Recursos
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

## Imágenes de portada

El campo único para la portada de una nota es `cover`.

```mdx
cover: "/images/covers/[categoria]/[archivo].png"
```

La biblioteca de portadas usa solo categorías principales del sitio:

```text
public/images/covers/macro/
public/images/covers/finanzas/
public/images/covers/normativas/
public/images/covers/historia/
public/images/covers/reflexiones/
public/images/covers/recursos/
public/images/covers/default/
```

Imagen default:

```text
public/images/covers/default/lorenco-default-cover.png
```

Para asignar portadas automáticamente a notas que tengan `cover` vacío:

```bash
npm run assign:covers
```

La asignación respeta cualquier `cover` ya escrito en el frontmatter. Para cada categoría, usa todas las imágenes disponibles antes de repetir la primera del ciclo. Si una nota no tiene `cover` y la categoría no tiene imágenes propias, usa `/images/covers/default/lorenco-default-cover.png`.

Ejemplo:

```mdx
cover: "/images/covers/finanzas/finanzas-01.png"
```

## Otras imágenes

Logo:

```text
public/images/lorenco-logo.png
```

Imágenes internas de notas:

```text
public/images/notas/
```

## Vercel

Configurar:

```env
NEXT_PUBLIC_SITE_URL=https://lorenco-magazine.vercel.app
```

También está documentado en `.env.example`.
