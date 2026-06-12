import type { Metadata } from "next";
import { serif, sans, news } from "@/lib/fonts";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { LenisProvider } from "@/components/Lenis/LenisProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://opengroup.com.br"),
  title: { default: "Open Group — Desenvolvimento Imobiliário", template: "%s · Open Group" },
  description: "Estruturação e desenvolvimento de empreendimentos imobiliários. O valor nasce antes da obra.",
  openGraph: {
    type: "website", locale: "pt_BR", siteName: "Open Group",
    title: "Open Group — Desenvolvimento Imobiliário",
    description: "Estruturação e desenvolvimento de empreendimentos imobiliários.",
    images: [{ url: "/assets/logos/og-logo.png", width: 1200, height: 630, alt: "Open Group" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${serif.variable} ${sans.variable} ${news.variable}`}>
      <body>
        <LenisProvider>
          <Header />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
