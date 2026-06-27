import type { Metadata } from "next";
import { ResourceSectionPage } from "@/components/resource-section-page";

export const metadata: Metadata = {
  title: "Fuentes consultadas",
};

export default function FuentesConsultadasPage() {
  return <ResourceSectionPage href="/recursos/fuentes-consultadas" />;
}
