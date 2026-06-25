import type { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const metadata: Metadata = {
  title: "Reflexiones",
};

export default function ReflexionesPage() {
  return <CategoryPage slug="reflexiones" />;
}
