import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = { title: "Institucional" };

export default function Page() {
  return <PagePlaceholder kicker="Institucional" title="Quem é a Open Group." />;
}
