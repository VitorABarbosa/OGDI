import { useEffect, useState } from "react";

export function useMobileMenu() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);
  return { open, toggle: () => setOpen(v => !v), close: () => setOpen(false) };
}
