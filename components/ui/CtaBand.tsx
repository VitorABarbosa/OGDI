import { Button } from "@/components/ui/Button";

export function CtaBand({
  title,
  text,
  ctaLabel,
  href,
}: {
  title: string;
  text: string;
  ctaLabel: string;
  href: string;
}) {
  return (
    <section className="bg-dark text-white">
      <div className="wrap py-[clamp(64px,9vw,128px)] flex items-center justify-between gap-10 flex-wrap">
        <div>
          <h2 className="font-sans font-semibold text-[clamp(28px,3.4vw,50px)] leading-[1.06] tracking-[-0.03em] text-white max-w-[18ch] m-0">
            {title}
          </h2>
          <p className="text-[15px] text-[rgba(242,241,237,.7)] mt-4 max-w-[40ch] leading-[1.6] mb-0">
            {text}
          </p>
        </div>

        <Button href={href} variant="light" arrow>
          {ctaLabel}
        </Button>
      </div>
    </section>
  );
}
