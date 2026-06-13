import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { Button } from "@/components/ui/Button";
import { projetoHref, type Projeto } from "./projetos.data";
import { cn } from "@/lib/cn";

export function ProjetoCard({ p, active, status, tag, ctaLabel }: { p: Projeto; active: boolean; status: string; tag: string; ctaLabel: string }) {
  return (
    <div className={cn("relative h-full overflow-hidden bg-dark shrink-0 basis-[78%] max-md:basis-[86%] origin-center transition-transform duration-700 ease-brand-2 cursor-grab",
      active ? "scale-100" : "scale-[.92] max-md:scale-[.95]")}>
      <MediaPlaceholder tone={p.tone} src={p.image} alt={p.image ? p.name : ""} />
      <div className="absolute inset-0 [background:linear-gradient(90deg,rgba(10,14,15,.72)_0%,rgba(10,14,15,.25)_42%,rgba(10,14,15,0)_70%),linear-gradient(0deg,rgba(10,14,15,.55),rgba(10,14,15,0)_50%)]" />
      <div className={cn("absolute inset-0 z-[3] bg-[rgba(10,14,15,.52)] transition-opacity duration-[600ms] ease-brand pointer-events-none", active ? "opacity-0" : "opacity-100")} />
      <div className="absolute left-0 bottom-0 z-[2] p-[clamp(28px,4vw,56px)] text-white max-w-[560px]">
        <span className="text-[11px] tracking-[.2em] uppercase text-green">{status}</span>
        <h3 className="font-serif text-[clamp(28px,3.4vw,46px)] leading-[1.04] mt-[12px] mb-[8px]">{p.name}</h3>
        <p className="text-[clamp(14px,1.05vw,16px)] text-white/82 mt-[2px] mb-6 max-w-[440px] leading-[1.5]">{tag}</p>
        <Button href={projetoHref(p.slug)} variant="light" sm arrow>{ctaLabel}</Button>
      </div>
    </div>
  );
}
