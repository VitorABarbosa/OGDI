import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { serif, sans, news } from "@/lib/fonts";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { LenisProvider } from "@/components/Lenis/LenisProvider";
import { routing } from "@/i18n/routing";
import "@/app/globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const ogLocale: Record<string, string> = { pt: "pt_BR", en: "en_US", es: "es_ES" };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    metadataBase: new URL("https://opengroup.com.br"),
    title: {
      default: "Open Group — Desenvolvimento Imobiliário",
      template: "%s · Open Group",
    },
    description:
      "Estruturação e desenvolvimento de empreendimentos imobiliários. O valor nasce antes da obra.",
    openGraph: {
      type: "website",
      locale: ogLocale[locale] ?? "pt_BR",
      siteName: "Open Group",
      title: "Open Group — Desenvolvimento Imobiliário",
      description: "Estruturação e desenvolvimento de empreendimentos imobiliários.",
      images: [{ url: "/assets/logos/og-logo.png", width: 1200, height: 630, alt: "Open Group" }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${serif.variable} ${sans.variable} ${news.variable}`}>
      <body>
        <NextIntlClientProvider>
          <LenisProvider>
            <Header />
            {children}
            <Footer />
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
