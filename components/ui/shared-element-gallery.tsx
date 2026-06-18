"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

type GalleryImageData = {
  id: string;
  src: string;
  alt?: string;
};

type GalleryContextType = {
  open: (id: string) => void;
};

const GalleryContext = React.createContext<GalleryContextType | null>(null);

const spring = {
  type: "spring" as const,
  stiffness: 350,
  damping: 35,
  mass: 1,
};

const ease = [0.22, 1, 0.36, 1] as const;

// Slide horizontal conforme a direção da navegação (próxima/anterior).
const slide = {
  enter: (dir: number) => ({ x: dir > 0 ? 64 : dir < 0 ? -64 : 0, opacity: 0, scale: 0.98 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -64 : dir < 0 ? 64 : 0, opacity: 0, scale: 0.98 }),
};

export function Gallery({
  children,
  images,
  caption,
}: {
  children: React.ReactNode;
  // Lista navegável (na ordem exibida). Habilita as setas ‹ › e o contador.
  images?: GalleryImageData[];
  // Aviso legal exibido na legenda (ex.: "Perspectiva meramente ilustrativa").
  caption?: string;
}) {
  const list = React.useMemo(() => images ?? [], [images]);
  const [index, setIndex] = React.useState<number | null>(null);
  const [direction, setDirection] = React.useState(0);

  const open = React.useCallback(
    (id: string) => {
      const i = list.findIndex((img) => img.id === id);
      setDirection(0);
      setIndex(i >= 0 ? i : null);
    },
    [list],
  );

  const close = React.useCallback(() => setIndex(null), []);
  const go = React.useCallback(
    (dir: number) => {
      if (!list.length) return;
      setDirection(dir);
      setIndex((cur) => (cur === null ? null : (cur + dir + list.length) % list.length));
    },
    [list.length],
  );

  React.useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowRight") go(1);
      else if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, close, go]);

  React.useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (index !== null) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [index]);

  return (
    <GalleryContext.Provider value={{ open }}>
      {children}
      <GalleryModal
        image={index === null ? null : list[index] ?? null}
        direction={direction}
        caption={caption}
        count={list.length}
        position={index === null ? 0 : index + 1}
        onClose={close}
        onPrev={() => go(-1)}
        onNext={() => go(1)}
      />
    </GalleryContext.Provider>
  );
}

export function GalleryGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("grid grid-cols-12 gap-[clamp(14px,1.6vw,24px)]", className)}>{children}</div>;
}

export function GalleryImage({
  src,
  alt,
  id,
  className,
  imageClassName,
  fit = "cover",
  naturalSize = false,
  children,
}: {
  src: string;
  alt?: string;
  id: string;
  className?: string;
  imageClassName?: string;
  // "contain" p/ documentos (plantas/implantação) — mostra a peça inteira.
  fit?: "cover" | "contain";
  // Altura automática (proporção natural da imagem) — p/ masonry de documentos.
  naturalSize?: boolean;
  children?: React.ReactNode;
}) {
  const context = React.useContext(GalleryContext);
  if (!context) throw new Error("GalleryImage must be used within a Gallery");

  return (
    <motion.button
      type="button"
      whileHover="hover"
      whileTap="tap"
      onClick={() => context.open(id)}
      aria-label={`Abrir imagem ${alt ?? id}`}
      className={cn(
        "relative overflow-hidden bg-dark text-left cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal",
        className,
      )}
    >
      <motion.img
        src={src}
        alt={alt ?? "Imagem da galeria"}
        className={cn(
          "w-full",
          naturalSize ? "block h-auto" : "h-full",
          !naturalSize && (fit === "contain" ? "object-contain" : "object-cover"),
          imageClassName,
        )}
        variants={{
          hover: { scale: 1.04 },
          tap: { scale: 1.015 },
        }}
        transition={spring}
        draggable={false}
      />
      <motion.span
        aria-hidden
        initial={{ opacity: 0 }}
        variants={{
          hover: { opacity: 1 },
          tap: { opacity: 1 },
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 z-[2] bg-dark/16 pointer-events-none"
      />
      {children}
    </motion.button>
  );
}

function GalleryModal({
  image,
  direction,
  caption,
  count,
  position,
  onClose,
  onPrev,
  onNext,
}: {
  image: GalleryImageData | null;
  direction: number;
  caption?: string;
  count: number;
  position: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const hasNav = count > 1;

  return createPortal(
    <AnimatePresence>
      {image && (
        <div
          className="fixed inset-0 z-[400] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-[rgba(8,12,13,.9)] backdrop-blur-2xl"
            onClick={onClose}
          />

          {/* Palco da imagem — clique fora da imagem fecha; arraste vertical dispensa. */}
          <motion.div
            className="relative z-[2] flex h-full w-full cursor-zoom-out items-center justify-center px-[clamp(56px,9vw,120px)] py-[clamp(72px,11vh,128px)]"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.6}
            onClick={onClose}
            onDragEnd={(_, info) => {
              if (Math.abs(info.offset.y) > 120 || Math.abs(info.velocity.y) > 380) onClose();
            }}
          >
            <AnimatePresence custom={direction} mode="popLayout" initial={false}>
              <motion.img
                key={image.id}
                src={image.src}
                alt={image.alt ?? "Imagem selecionada da galeria"}
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.32, ease }}
                onClick={(event) => event.stopPropagation()}
                className="max-h-full max-w-full cursor-default select-none object-contain shadow-[0_32px_96px_rgba(0,0,0,.48)]"
                draggable={false}
              />
            </AnimatePresence>
          </motion.div>

          {/* Setas */}
          {hasNav && (
            <>
              <NavButton side="left" onClick={onPrev} label="Imagem anterior">
                <ChevronLeft className="h-6 w-6" />
              </NavButton>
              <NavButton side="right" onClick={onNext} label="Próxima imagem">
                <ChevronRight className="h-6 w-6" />
              </NavButton>
            </>
          )}

          {/* Legenda: aviso + ambiente + contador */}
          <div className="pointer-events-none absolute inset-x-0 bottom-[clamp(20px,4vh,40px)] z-[3] flex flex-col items-center gap-1 px-6 text-center">
            <span className="text-[11px] uppercase tracking-[.2em] text-white/85">
              {caption ? `${caption} · ` : ""}
              {image.alt && <span className="text-white">{image.alt}</span>}
            </span>
            {hasNav && (
              <span className="text-[11px] tabular-nums tracking-[.18em] text-white/45">
                {position} / {count}
              </span>
            )}
          </div>

          {/* Fechar */}
          <motion.button
            type="button"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ delay: 0.08, duration: 0.2 }}
            className="absolute right-[clamp(18px,3vw,42px)] top-[clamp(18px,3vw,42px)] z-[4] grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/18"
            onClick={onClose}
            aria-label="Fechar imagem"
          >
            <X className="h-5 w-5" />
          </motion.button>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function NavButton({
  side,
  onClick,
  label,
  children,
}: {
  side: "left" | "right";
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "absolute top-1/2 z-[4] grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20",
        side === "left" ? "left-[clamp(12px,3vw,40px)]" : "right-[clamp(12px,3vw,40px)]",
      )}
    >
      {children}
    </button>
  );
}
