import fs from "node:fs";
import path from "node:path";

const title = process.argv.slice(2).join(" ").trim();

if (!title) {
  console.error('Uso: npm run new:post "titulo de la publicacion"');
  process.exit(1);
}

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/ñ/g, "n")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function titleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const slug = slugify(title);
const today = new Date().toISOString().slice(0, 10);
const postsDir = path.join(process.cwd(), "content", "publicaciones");
const target = path.join(postsDir, `${slug}.mdx`);

if (!slug) {
  console.error("No se pudo generar un slug válido.");
  process.exit(1);
}

if (fs.existsSync(target)) {
  console.error(`Ya existe una publicación en ${target}`);
  process.exit(1);
}

fs.mkdirSync(postsDir, { recursive: true });

const content = `---
title: "${titleCase(title)}"
description: ""
date: "${today}"
author: "Lorenço Macro & Finanzas"
status: "draft"
tags: []
coverImage: "/images/publicaciones/${slug}.jpg"
sources: []
---

Contenido pendiente.
`;

fs.writeFileSync(target, content, "utf8");

console.log(`Borrador creado: ${target}`);
console.log(`Imagen destacada esperada: public/images/publicaciones/${slug}.jpg`);
console.log('Para publicar, completá el contenido y cambiá status a "published".');
