# Flujo mini medio

La web puede publicar notas simples desde:

```text
content/notas/
```

Cada archivo `.md` o `.mdx` dentro de esa carpeta se publica automaticamente y crea una URL propia en `/notas/slug-del-archivo`, salvo que el frontmatter indique:

```md
status: "draft"
```

Ejemplo:

```text
content/notas/
  2026-06-15-nota.md
  2026-06-16-otra-nota.md
```

Las imagenes usadas dentro del Markdown van en:

```text
public/images/notas/
  2026-06-15-grafico.png
```

Y se insertan asi:

```md
![Descripcion del grafico](/images/notas/2026-06-15-grafico.png)
```

Frontmatter minimo recomendado:

```md
---
title: "Titulo de la nota"
description: "Bajada breve de la nota"
date: "YYYY-MM-DD"
category: "Macro"
tags: ["Argentina", "BCRA"]
sources:
  - title: "Fuente oficial"
    url: "https://..."
---

Contenido de la nota.
```

Si falta `coverImage`, el sitio usa una portada editorial por defecto.

Si falta `date`, el sitio intenta tomarla del nombre del archivo. Por ejemplo, `2026-06-15-nota.md` usa `2026-06-15`.

El cuerpo soporta Markdown/MDX: imagenes, negritas, tablas, links, subtitulos y notas al pie.

Para control editorial completo, usar `content/publicaciones/` con `status: "draft"` hasta la revision humana.
