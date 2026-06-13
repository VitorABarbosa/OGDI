import { getTranslations } from "next-intl/server";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";

export async function PagePlaceholder({ kicker, title }: { kicker: string; title: string }) {
  const t = await getTranslations("common.placeholder");
  return (
    <main className="wrap pt-[160px] pb-section min-h-[70vh]">
      <Kicker>{kicker}</Kicker>
      <SectionHeading level={1} as="h1" className="mt-4 mb-6">{title}</SectionHeading>
      <p className="text-[clamp(15px,1.15vw,18px)] text-ink-2 max-w-[560px]">{t("body")}</p>
      <div className="mt-8"><TextLink href="/">{t("back")}</TextLink></div>
    </main>
  );
}
