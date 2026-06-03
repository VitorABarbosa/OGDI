import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = { title: "Projetos" };

export default function Page() {
  return <PagePlaceholder kicker="Projetos" title="Projetos estruturados antes da obra." />;
}
