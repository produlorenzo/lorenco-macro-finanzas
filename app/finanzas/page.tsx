import type { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const metadata: Metadata = {
  title: "Finanzas",
};

export default function FinanzasPage() {
  return <CategoryPage slug="finanzas" />;
}
