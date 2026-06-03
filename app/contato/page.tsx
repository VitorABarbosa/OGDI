import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = { title: "Contato" };

export default function Page() {
  return <PagePlaceholder kicker="Contato" title="Apresente sua oportunidade." />;
}
