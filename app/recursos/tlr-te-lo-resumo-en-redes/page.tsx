import type { Metadata } from "next";
import { ResourceSectionPage } from "@/components/resource-section-page";

export const metadata: Metadata = {
  title: "TLR: Te lo resumo en redes",
};

export default function TlrTeLoResumoEnRedesPage() {
  return <ResourceSectionPage href="/recursos/tlr-te-lo-resumo-en-redes" />;
}
