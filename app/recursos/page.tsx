import type { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const metadata: Metadata = {
  title: "Recursos",
};

export default function RecursosPage() {
  return <CategoryPage slug="recursos" />;
}
