"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

type GalleryImageData = {
  id: string;
  src: string;
  alt?: string;
};

type GalleryContextType = {
  selectedImage: GalleryImageData | null;
  setSelectedImage: (image: GalleryImageData | null) => void;
};

const GalleryContext = React.createContext<GalleryContextType | null>(null);

const spring = {
  type: "spring" as const,
  stiffness: 350,
  damping: 35,
  mass: 1,
};

export function Gallery({ children }: { children: React.ReactNode }) {
  const [selectedImage, setSelectedImage] = React.useState<GalleryImageData | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  React.useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (selectedImage) document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedImage]);

  return (
    <GalleryContext.Provider value={{ selectedImage, setSelectedImage }}>
      {children}
      <GalleryModal />
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
  children,
}: {
  src: string;
  alt?: string;
  id: string;
  className?: string;
  imageClassName?: string;
  children?: React.ReactNode;
}) {
  const context = React.useContext(GalleryContext);
  if (!context) throw new Error("GalleryImage must be used within a Gallery");

  return (
    <motion.button
      type="button"
      whileHover="hover"
      whileTap="tap"
      onClick={() => context.setSelectedImage({ id, src, alt })}
      aria-label={`Abrir imagem ${alt ?? id}`}
      className={cn(
        "relative overflow-hidden bg-dark text-left cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal",
        className,
      )}
    >
      <motion.img
        layoutId={`gallery-image-${id}`}
        src={src}
        alt={alt ?? "Imagem da galeria"}
        className={cn("h-full w-full object-cover", imageClassName)}
        variants={{
          hover: { scale: 0.985 },
          tap: { scale: 0.955 },
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

function GalleryModal() {
  const context = React.useContext(GalleryContext);
  if (!context) return null;

  const { selectedImage, setSelectedImage } = context;

  return (
    <AnimatePresence>
      {selectedImage && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center" role="dialog" aria-modal="true" aria-label={selectedImage.alt}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-[rgba(8,12,13,.86)] backdrop-blur-2xl"
            onClick={() => setSelectedImage(null)}
          />

          <motion.div
            className="relative z-[2] flex h-full w-full cursor-zoom-out items-center justify-center px-[clamp(18px,4vw,64px)] py-[clamp(24px,5vw,72px)]"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.72}
            onDragEnd={(_, info) => {
              if (Math.abs(info.offset.y) > 100 || Math.abs(info.velocity.y) > 300) setSelectedImage(null);
            }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              layoutId={`gallery-image-${selectedImage.id}`}
              src={selectedImage.src}
              alt={selectedImage.alt ?? "Imagem selecionada da galeria"}
              className="max-h-[90vh] max-w-[95vw] object-contain shadow-[0_32px_96px_rgba(0,0,0,.48)] will-change-transform"
              draggable={false}
              transition={spring}
            />
          </motion.div>

          <motion.button
            type="button"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ delay: 0.08, duration: 0.2 }}
            className="absolute right-[clamp(18px,3vw,42px)] top-[clamp(18px,3vw,42px)] z-[3] grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/18"
            onClick={() => setSelectedImage(null)}
            aria-label="Fechar imagem"
          >
            <X className="h-5 w-5" />
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
