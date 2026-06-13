import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = { title: "Atuação" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PagePlaceholder kicker="Atuação" title="O que a Open Group faz." />;
}
