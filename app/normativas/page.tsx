import type { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const metadata: Metadata = {
  title: "Normativas",
};

export default function NormativasPage() {
  return <CategoryPage slug="normativas" />;
}
