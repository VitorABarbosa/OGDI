import Image from "next/image";
import { cn } from "@/lib/cn";

type Tone = "t1" | "t2" | "t3";
const tones: Record<Tone, string> = {
  t1: "[background:radial-gradient(130%_100%_at_72%_8%,rgba(95,168,60,.10),transparent_52%),linear-gradient(180deg,#1d3940_0%,#122327_60%,#0c1719_100%)]",
  t2: "[background:radial-gradient(120%_100%_at_30%_6%,rgba(31,90,99,.5),transparent_55%),linear-gradient(180deg,#16303a_0%,#0e1f24_100%)]",
  t3: "[background:radial-gradient(120%_100%_at_50%_0%,rgba(242,241,237,.07),transparent_55%),linear-gradient(180deg,#101d20_0%,#0b1416_100%)]",
};

export function MediaPlaceholder({ tone = "t1", src, alt = "", className }:
  { tone?: Tone; src?: string; alt?: string; className?: string }) {
  if (src) {
    return <Image src={src} alt={alt} fill className={cn("object-cover", className)} />;
  }
  return <div aria-hidden className={cn("absolute inset-0 flex items-end", tones[tone], className)} />;
}
