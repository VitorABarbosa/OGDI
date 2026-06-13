import { notFound } from "next/navigation";

// Catch-all: qualquer rota desconhecida sob um locale cai no not-found
// estilizado (com <html lang> correto), em vez do 404 padrão do Next.
export default function CatchAllNotFound() {
  notFound();
}
