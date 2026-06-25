import type { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const metadata: Metadata = {
  title: "Macro",
};

export default function MacroPage() {
  return <CategoryPage slug="macro" />;
}
