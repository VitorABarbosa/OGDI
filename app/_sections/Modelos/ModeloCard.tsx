import type { Modelo } from "./modelos.data";
import { ModeloRing } from "./ModeloRing";

export function ModeloCard({ m }: { m: Modelo }) {
  return (
    <article className="relative overflow-hidden border border-[color:var(--line)] rounded-[14px] px-[34px] py-10 bg-white transition-[transform,box-shadow,border-color] duration-300 ease-brand hover:-translate-y-[3px] hover:shadow-[0_30px_55px_-38px_rgba(23,26,27,.4)] reveal">
      <span className="font-serif italic text-[1.15rem] text-green font-medium">{m.idx}</span>
      <ModeloRing kind={m.ring} className="block w-[58px] h-[58px] mt-[10px] mb-[26px]" />
      <h3 className="font-sans font-semibold text-[1.34rem] leading-[1.15] tracking-[-.02em] m-0 mb-3 text-ink">{m.title}</h3>
      <p className="text-[15px] leading-[1.6] text-ink-2 m-0">{m.desc}</p>
    </article>
  );
}
