import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = { title: "Atuação" };

export default function Page() {
  return <PagePlaceholder kicker="Atuação" title="O que a Open Group faz." />;
}
