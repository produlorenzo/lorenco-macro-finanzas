import fs from "node:fs";
import path from "node:path";

const postsDir = path.join(process.cwd(), "content", "notas");
const coversDir = path.join(process.cwd(), "public", "images", "covers");
const defaultCover = "/images/covers/default/lorenco-default-cover.png";
const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);

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

function parseFrontmatter(fileName, raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

  if (!match) {
    throw new Error(`La nota ${fileName} no tiene frontmatter YAML delimitado con ---.`);
  }

  return {
    frontmatter: match[1],
    body: raw.slice(match[0].length),
    lineEnding: raw.includes("\r\n") ? "\r\n" : "\n",
  };
}

function getFrontmatterField(frontmatter, key) {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = frontmatter.match(new RegExp(`^${escapedKey}:\\s*(.*)$`, "m"));

  if (!match) return undefined;

  const rawValue = match[1].trim();
  const quoted = rawValue.match(/^["'](.*)["']$/);
  return quoted ? quoted[1].trim() : rawValue.trim();
}

function setFrontmatterField(frontmatter, key, value) {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const line = `${key}: "${value}"`;
  const matcher = new RegExp(`^${escapedKey}:\\s*.*$`, "m");

  if (matcher.test(frontmatter)) {
    return frontmatter.replace(matcher, line);
  }

  return `${frontmatter}\n${line}`;
}

function listCategoryCovers(categorySlug) {
  const categoryDir = path.join(coversDir, categorySlug);

  if (!fs.existsSync(categoryDir)) return [];

  return fs
    .readdirSync(categoryDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => `/images/covers/${categorySlug}/${entry.name}`)
    .sort((a, b) => a.localeCompare(b, "es"));
}

function readNotes() {
  if (!fs.existsSync(postsDir)) return [];

  return fs
    .readdirSync(postsDir)
    .filter((fileName) => /\.mdx?$/.test(fileName))
    .map((fileName) => {
      const filePath = path.join(postsDir, fileName);
      const raw = fs.readFileSync(filePath, "utf8");
      const parsed = parseFrontmatter(fileName, raw);
      const category = getFrontmatterField(parsed.frontmatter, "category");
      const date = getFrontmatterField(parsed.frontmatter, "date") || "0000-00-00";
      const cover = getFrontmatterField(parsed.frontmatter, "cover");

      if (!category) {
        throw new Error(`La nota ${fileName} no tiene category en el frontmatter.`);
      }

      return {
        fileName,
        filePath,
        raw,
        ...parsed,
        category,
        categorySlug: slugify(category),
        date,
        existingCover: cover,
        hasCover: cover !== undefined,
      };
    });
}

function chooseNextCover(availableCovers, usedInCurrentCycle) {
  const nextCover = availableCovers.find((cover) => !usedInCurrentCycle.has(cover));

  if (nextCover) return nextCover;

  usedInCurrentCycle.clear();
  return availableCovers[0];
}

export function assignCoversToNotes(notes) {
  const notesByCategory = new Map();

  for (const note of notes) {
    const categoryNotes = notesByCategory.get(note.categorySlug) ?? [];
    categoryNotes.push(note);
    notesByCategory.set(note.categorySlug, categoryNotes);
  }

  const updates = [];

  for (const [categorySlug, categoryNotes] of notesByCategory) {
    const availableCovers = listCategoryCovers(categorySlug);
    const validCategoryCover = new Set(availableCovers);
    const usedInCurrentCycle = new Set();

    categoryNotes.sort((a, b) => {
      const byDate = a.date.localeCompare(b.date);
      return byDate || a.fileName.localeCompare(b.fileName, "es");
    });

    for (const note of categoryNotes) {
      if (note.existingCover) {
        if (validCategoryCover.has(note.existingCover)) {
          if (usedInCurrentCycle.has(note.existingCover)) {
            usedInCurrentCycle.clear();
          }
          usedInCurrentCycle.add(note.existingCover);
        }
        continue;
      }

      const assignedCover = availableCovers.length > 0
        ? chooseNextCover(availableCovers, usedInCurrentCycle)
        : defaultCover;

      if (availableCovers.length > 0) {
        usedInCurrentCycle.add(assignedCover);
      }

      updates.push({ note, assignedCover });
    }
  }

  return updates;
}

function writeUpdates(updates) {
  for (const { note, assignedCover } of updates) {
    const updatedFrontmatter = setFrontmatterField(note.frontmatter, "cover", assignedCover);
    const updatedRaw = `---${note.lineEnding}${updatedFrontmatter}${note.lineEnding}---${note.lineEnding}${note.body}`;
    fs.writeFileSync(note.filePath, updatedRaw, "utf8");
    console.log(`${note.fileName}: ${assignedCover}`);
  }
}

const notes = readNotes();
const updates = assignCoversToNotes(notes);

if (updates.length === 0) {
  console.log("No hay notas pendientes de asignación de portada.");
} else {
  writeUpdates(updates);
  console.log(`Portadas asignadas: ${updates.length}`);
}
