import type { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const metadata: Metadata = {
  title: "Historia",
};

export default function HistoriaPage() {
  return <CategoryPage slug="historia" />;
}
