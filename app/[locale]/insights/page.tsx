import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = { title: "Insights" };

export default function Page() {
  return <PagePlaceholder kicker="Insights" title="Análises e inteligência de mercado." />;
}
