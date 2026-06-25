import type { Metadata } from "next";
import "./globals.css";
import { defaultCoverImage } from "@/lib/content-config";
import { site } from "@/lib/site";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Analytics } from "@/components/analytics";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    siteName: site.name,
    type: "website",
    locale: "es_AR",
    images: [defaultCoverImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen font-sans antialiased">
        <div className="min-h-screen">
          <Header />
          <main>{children}</main>
          <Footer />
          <Analytics />
        </div>
      </body>
    </html>
  );
}
