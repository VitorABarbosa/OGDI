const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=5511985131748&text&type=phone_number&app_absent=0";

export function FloatingWhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Open Group pelo WhatsApp"
      className="fixed bottom-[clamp(18px,3vw,34px)] right-[clamp(18px,3vw,34px)] z-[85] grid h-[58px] w-[58px] place-items-center rounded-full bg-[#25D366] text-white shadow-[0_18px_42px_rgba(0,0,0,.26)] transition-[transform,box-shadow,background-color] duration-300 ease-brand hover:-translate-y-1 hover:bg-[#20bd5a] hover:shadow-[0_22px_48px_rgba(0,0,0,.34)] focus:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-white"
    >
      <svg viewBox="0 0 32 32" aria-hidden className="h-7 w-7" fill="currentColor">
        <path d="M16.02 4C9.4 4 4.02 9.34 4.02 15.9c0 2.1.56 4.15 1.62 5.96L4 28l6.32-1.64a12.1 12.1 0 0 0 5.7 1.45c6.62 0 12-5.34 12-11.91C28.02 9.34 22.64 4 16.02 4Zm0 21.72c-1.78 0-3.52-.48-5.04-1.4l-.36-.22-3.75.97 1-3.63-.24-.37a9.72 9.72 0 0 1-1.5-5.17c0-5.41 4.44-9.82 9.9-9.82 5.45 0 9.89 4.4 9.89 9.82 0 5.41-4.44 9.82-9.9 9.82Zm5.43-7.36c-.3-.15-1.76-.86-2.03-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.95 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.46-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.49s1.08 2.9 1.23 3.1c.15.2 2.12 3.22 5.14 4.52.72.31 1.28.5 1.72.63.72.23 1.38.2 1.9.12.58-.09 1.76-.72 2-1.41.25-.7.25-1.3.18-1.42-.08-.13-.27-.2-.57-.35Z" />
      </svg>
    </a>
  );
}
