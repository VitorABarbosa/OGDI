import type { Metadata } from "next";
import { serif, sans, news } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Open Group — Desenvolvimento Imobiliário",
  description: "Estruturação e desenvolvimento de empreendimentos imobiliários. O valor nasce antes da obra.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${serif.variable} ${sans.variable} ${news.variable}`}>
      <body>{children}</body>
    </html>
  );
}
