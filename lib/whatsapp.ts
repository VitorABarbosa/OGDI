// Monta a URL do WhatsApp da Open Group, opcionalmente com uma mensagem
// pré-preenchida (saudação). Centraliza o número para um único ponto de verdade.
export const WHATSAPP_PHONE = "5511985131748";

export function whatsappUrl(message?: string) {
  const base = `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&type=phone_number&app_absent=0`;
  return message ? `${base}&text=${encodeURIComponent(message)}` : base;
}
