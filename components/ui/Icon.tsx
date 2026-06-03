type IconName = "chevron-left" | "chevron-right" | "linkedin" | "instagram" | "check";

export function Icon({ name, className }: { name: IconName; className?: string }) {
  switch (name) {
    case "chevron-left":
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className={className}><path d="M15 5l-7 7 7 7" /></svg>;
    case "chevron-right":
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className={className}><path d="M9 5l7 7-7 7" /></svg>;
    case "linkedin":
      return <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.83v2.18h.06c.53-1 1.84-2.18 3.78-2.18 4.04 0 4.79 2.66 4.79 6.12V24h-4v-7.06c0-1.68-.03-3.85-2.35-3.85-2.35 0-2.71 1.83-2.71 3.72V24h-4V8z" /></svg>;
    case "instagram":
      return <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}><rect x={3} y={3} width={18} height={18} rx={5} /><circle cx={12} cy={12} r={4} /><circle cx={17.5} cy={6.5} r={1} fill="currentColor" /></svg>;
    case "check":
      return <svg width={34} height={34} viewBox="0 0 36 36" fill="none" stroke="#5FA83C" strokeWidth={2} className={className}><circle cx={18} cy={18} r={16} /><path d="M11 18 L16 23 L25 13" /></svg>;
  }
}
