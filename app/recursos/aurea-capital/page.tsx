import type { Metadata } from "next";
import { ResourceSectionPage } from "@/components/resource-section-page";

export const metadata: Metadata = {
  title: "Aurea Capital",
};

export default function AureaCapitalPage() {
  return <ResourceSectionPage href="/recursos/aurea-capital" />;
}
