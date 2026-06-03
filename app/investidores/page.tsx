import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = { title: "Investidores" };

export default function Page() {
  return <PagePlaceholder kicker="Investidores" title="Oportunidades estruturadas." />;
}
