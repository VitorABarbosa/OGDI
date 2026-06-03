import type { Metadata } from "next";
import { serif, sans, news } from "@/lib/fonts";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Open Group — Desenvolvimento Imobiliário",
  description: "Estruturação e desenvolvimento de empreendimentos imobiliários. O valor nasce antes da obra.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${serif.variable} ${sans.variable} ${news.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
