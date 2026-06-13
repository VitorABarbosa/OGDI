import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = { title: "Parceiros" };

export default function Page() {
  return <PagePlaceholder kicker="Parceiros" title="Ecossistema de parceiros." />;
}
