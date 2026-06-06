"use client";

// Sinaliza o fim da abertura (IntroVideo) para o resto do site — ex.: a hero só
// começa a passar os projetos depois que o site "inicia". Usa evento + flag global
// para cobrir a corrida em que a abertura termina antes do ouvinte montar.

const EVENT = "intro:done";

declare global {
  interface Window { __introDone?: boolean }
}

export function signalIntroDone() {
  if (typeof window === "undefined" || window.__introDone) return;
  window.__introDone = true;
  window.dispatchEvent(new Event(EVENT));
}

// Chama cb quando a abertura terminar. Se já terminou, chama no próximo tick.
// Retorna função de cleanup.
export function onIntroDone(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  if (window.__introDone) {
    cb();
    return () => {};
  }
  window.addEventListener(EVENT, cb, { once: true });
  return () => window.removeEventListener(EVENT, cb);
}
