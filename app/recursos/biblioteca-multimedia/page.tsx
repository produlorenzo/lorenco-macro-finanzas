import type { Metadata } from "next";
import { ResourceSectionPage } from "@/components/resource-section-page";

export const metadata: Metadata = {
  title: "Biblioteca Multimedia",
};

export default function BibliotecaMultimediaPage() {
  return <ResourceSectionPage href="/recursos/biblioteca-multimedia" />;
}
