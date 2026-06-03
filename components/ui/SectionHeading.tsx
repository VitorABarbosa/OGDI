import { cn } from "@/lib/cn";

const sizes = {
  1: "text-[clamp(30px,4vw,56px)]",
  2: "text-[clamp(26px,3vw,42px)]",
  3: "text-[clamp(22px,2.2vw,30px)]",
} as const;

export function SectionHeading({ level = 2, as: Tag = "h2", children, className }:
  { level?: 1 | 2 | 3; as?: "h1" | "h2" | "h3"; children: React.ReactNode; className?: string }) {
  return (
    <Tag className={cn("font-sans font-semibold leading-[1.08] tracking-[-.025em] m-0", sizes[level], className)}>
      {children}
    </Tag>
  );
}
