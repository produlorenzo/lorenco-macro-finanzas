import fs from "node:fs";
import path from "node:path";

type NavItem = {
  label: string;
  href: string;
};

type SettingsContent = {
  siteName: string;
  siteUrl: string;
  seoTitle: string;
  seoDescription: string;
  contactEmail: string;
  defaultCoverImage: string;
  logoImage: string;
  heroBackgroundImage: string;
};

type HomeContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  mainSectionTitle: string;
  searchLinkLabel: string;
  emptyMainText: string;
  latestSectionTitle: string;
  categoryBlocksTitle: string;
  categoryViewLabel: string;
  emptyCategoryText: string;
  showHero: boolean;
  showMainNote: boolean;
  showLatestNotes: boolean;
  showCategoryBlocks: boolean;
  latestNotesLimit: number;
  categoryNotesLimit: number;
};

type NavigationContent = {
  primary: NavItem[];
  secondary: NavItem[];
  brandSuffix: string;
  tagline: string;
};

type FooterContent = {
  title: string;
  description: string;
  fictionalAuthorsNote: string;
  disclaimer: string;
};

type PagesContent = {
  about: {
    title: string;
    eyebrow: string;
    seoDescription: string;
    body: string[];
  };
  contact: {
    title: string;
    eyebrow: string;
    seoDescription: string;
    body: string;
    email: string;
  };
  search: {
    title: string;
    eyebrow: string;
    seoDescription: string;
    inputLabel: string;
    inputPlaceholder: string;
    resultsSuffix: string;
    emptyText: string;
  };
  category: {
    eyebrow: string;
    emptyText: string;
  };
  article: {
    sourcesTitle: string;
  };
};

const siteContentDir = path.join(process.cwd(), "content", "site");

function readJsonFile<T>(fileName: string): T {
  const filePath = path.join(siteContentDir, fileName);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Falta el archivo de configuración content/site/${fileName}.`);
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`No se pudo leer content/site/${fileName}: ${message}`);
  }
}

function assertPlainObject(value: unknown, fileName: string): asserts value is Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`content/site/${fileName} debe contener un objeto JSON.`);
  }
}

function requireString(source: Record<string, unknown>, key: string, fileName: string) {
  const value = source[key];

  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Falta el campo de texto obligatorio "${key}" en content/site/${fileName}.`);
  }

  return value;
}

function requireBoolean(source: Record<string, unknown>, key: string, fileName: string) {
  const value = source[key];

  if (typeof value !== "boolean") {
    throw new Error(`Falta el campo booleano obligatorio "${key}" en content/site/${fileName}.`);
  }

  return value;
}

function requirePositiveInteger(source: Record<string, unknown>, key: string, fileName: string) {
  const value = source[key];

  if (!Number.isInteger(value) || (value as number) < 1) {
    throw new Error(`El campo "${key}" en content/site/${fileName} debe ser un número entero mayor a 0.`);
  }

  return value as number;
}

function requireObject(source: Record<string, unknown>, key: string, fileName: string) {
  const value = source[key];

  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`Falta el objeto obligatorio "${key}" en content/site/${fileName}.`);
  }

  return value as Record<string, unknown>;
}

function requireStringArray(source: Record<string, unknown>, key: string, fileName: string) {
  const value = source[key];

  if (!Array.isArray(value) || value.some((item) => typeof item !== "string" || !item.trim())) {
    throw new Error(`El campo "${key}" en content/site/${fileName} debe ser una lista de textos.`);
  }

  return value as string[];
}

function requireNavItems(source: Record<string, unknown>, key: string, fileName: string) {
  const value = source[key];

  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`El campo "${key}" en content/site/${fileName} debe contener al menos un enlace.`);
  }

  return value.map((item, index) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      throw new Error(`El enlace ${index + 1} de "${key}" en content/site/${fileName} debe ser un objeto.`);
    }

    const navItem = item as Record<string, unknown>;
    const label = requireString(navItem, "label", fileName);
    const href = requireString(navItem, "href", fileName);

    if (!href.startsWith("/")) {
      throw new Error(`El enlace "${label}" en content/site/${fileName} debe usar un href interno que empiece con "/".`);
    }

    return { label, href };
  });
}

function validateSettings(): SettingsContent {
  const fileName = "settings.json";
  const raw = readJsonFile<unknown>(fileName);
  assertPlainObject(raw, fileName);

  return {
    siteName: requireString(raw, "siteName", fileName),
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || requireString(raw, "siteUrl", fileName),
    seoTitle: requireString(raw, "seoTitle", fileName),
    seoDescription: requireString(raw, "seoDescription", fileName),
    contactEmail: requireString(raw, "contactEmail", fileName),
    defaultCoverImage: requireString(raw, "defaultCoverImage", fileName),
    logoImage: requireString(raw, "logoImage", fileName),
    heroBackgroundImage: requireString(raw, "heroBackgroundImage", fileName),
  };
}

function validateHome(): HomeContent {
  const fileName = "home.json";
  const raw = readJsonFile<unknown>(fileName);
  assertPlainObject(raw, fileName);

  return {
    heroEyebrow: requireString(raw, "heroEyebrow", fileName),
    heroTitle: requireString(raw, "heroTitle", fileName),
    heroDescription: requireString(raw, "heroDescription", fileName),
    mainSectionTitle: requireString(raw, "mainSectionTitle", fileName),
    searchLinkLabel: requireString(raw, "searchLinkLabel", fileName),
    emptyMainText: requireString(raw, "emptyMainText", fileName),
    latestSectionTitle: requireString(raw, "latestSectionTitle", fileName),
    categoryBlocksTitle: requireString(raw, "categoryBlocksTitle", fileName),
    categoryViewLabel: requireString(raw, "categoryViewLabel", fileName),
    emptyCategoryText: requireString(raw, "emptyCategoryText", fileName),
    showHero: requireBoolean(raw, "showHero", fileName),
    showMainNote: requireBoolean(raw, "showMainNote", fileName),
    showLatestNotes: requireBoolean(raw, "showLatestNotes", fileName),
    showCategoryBlocks: requireBoolean(raw, "showCategoryBlocks", fileName),
    latestNotesLimit: requirePositiveInteger(raw, "latestNotesLimit", fileName),
    categoryNotesLimit: requirePositiveInteger(raw, "categoryNotesLimit", fileName),
  };
}

function validateNavigation(): NavigationContent {
  const fileName = "navigation.json";
  const raw = readJsonFile<unknown>(fileName);
  assertPlainObject(raw, fileName);

  return {
    primary: requireNavItems(raw, "primary", fileName),
    secondary: requireNavItems(raw, "secondary", fileName),
    brandSuffix: requireString(raw, "brandSuffix", fileName),
    tagline: requireString(raw, "tagline", fileName),
  };
}

function validateFooter(): FooterContent {
  const fileName = "footer.json";
  const raw = readJsonFile<unknown>(fileName);
  assertPlainObject(raw, fileName);

  return {
    title: requireString(raw, "title", fileName),
    description: requireString(raw, "description", fileName),
    fictionalAuthorsNote: requireString(raw, "fictionalAuthorsNote", fileName),
    disclaimer: requireString(raw, "disclaimer", fileName),
  };
}

function validatePages(): PagesContent {
  const fileName = "pages.json";
  const raw = readJsonFile<unknown>(fileName);
  assertPlainObject(raw, fileName);

  const about = requireObject(raw, "about", fileName);
  const contact = requireObject(raw, "contact", fileName);
  const search = requireObject(raw, "search", fileName);
  const category = requireObject(raw, "category", fileName);
  const article = requireObject(raw, "article", fileName);

  return {
    about: {
      title: requireString(about, "title", fileName),
      eyebrow: requireString(about, "eyebrow", fileName),
      seoDescription: requireString(about, "seoDescription", fileName),
      body: requireStringArray(about, "body", fileName),
    },
    contact: {
      title: requireString(contact, "title", fileName),
      eyebrow: requireString(contact, "eyebrow", fileName),
      seoDescription: requireString(contact, "seoDescription", fileName),
      body: requireString(contact, "body", fileName),
      email: requireString(contact, "email", fileName),
    },
    search: {
      title: requireString(search, "title", fileName),
      eyebrow: requireString(search, "eyebrow", fileName),
      seoDescription: requireString(search, "seoDescription", fileName),
      inputLabel: requireString(search, "inputLabel", fileName),
      inputPlaceholder: requireString(search, "inputPlaceholder", fileName),
      resultsSuffix: requireString(search, "resultsSuffix", fileName),
      emptyText: requireString(search, "emptyText", fileName),
    },
    category: {
      eyebrow: requireString(category, "eyebrow", fileName),
      emptyText: requireString(category, "emptyText", fileName),
    },
    article: {
      sourcesTitle: requireString(article, "sourcesTitle", fileName),
    },
  };
}

export const siteSettings = validateSettings();
export const homeContent = validateHome();
export const navigationContent = validateNavigation();
export const footerContent = validateFooter();
export const pagesContent = validatePages();
