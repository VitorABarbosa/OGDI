import { getTranslations } from "next-intl/server";
import { Kicker } from "@/components/ui/Kicker";
import { institucional } from "./institucional.data";
import { FitScale } from "./FitScale";

// ───────────────────────────────────────────────────────────────
// Retângulo ajustável — altere os números abaixo (tudo em px).
//   width / height ...... tamanho do retângulo
//   radius .............. raio das bordas arredondadas
//   top / left .......... posição a partir do canto superior-esquerdo do bloco
//   bg .................. cor de preenchimento (use "transparent" p/ vazio)
//   blur ................ desfoque do que está atrás, vidro fosco (px); 0 = sem blur
//   borderWidth ......... espessura da borda (0 = sem borda)
//   borderColor ......... cor da borda
// ───────────────────────────────────────────────────────────────
const RECT = {
  width: 1160,
  height: 470,
  radius: 62,
  top: 0,
  left: 0,
  bg: "transparent",      // transparente; combine com `blur` p/ vidro fosco
  blur: 8,                // desfoque do fundo (px)
  borderWidth: 1.5,       // espessura da linha do contorno (px)
  borderColor: "#83AD6F", // cor da linha
};

// ───────────────────────────────────────────────────────────────
// Foto ajustável — altere os números abaixo (tudo em px, exceto focus).
//   width / height ...... tamanho da foto
//   radius .............. raio das bordas arredondadas
//   top / left .......... posição a partir do canto superior-esquerdo do bloco
//   fit ................. "cover" preenche cortando | "contain" cabe inteira
//   focusX / focusY ..... enquadramento em % (0–100). X: 0=esq 100=dir | Y: 0=topo 100=base
//   cutBottomRight ...... px que o canto inferior-direito é puxado p/ a esquerda
//                         (0 = retângulo normal). Os cantos seguem arredondados
//                         pelo `radius`, inclusive o canto cortado.
// ───────────────────────────────────────────────────────────────
const PHOTO = {
  width: 520,
  height: 510,
  radius: 28,
  top: -42,
  left: 900,
  fit: "cover",
  focusX: 50,
  focusY: 35,
  cutBottomRight: 130,
};

// ───────────────────────────────────────────────────────────────
// Grupo de bolinhas (padrão de pontos) — altere os números abaixo.
//   rows / cols ......... nº de fileiras e colunas
//   size ................ diâmetro de cada bolinha (px)
//   gap ................. espaço entre bolinhas (px)
//   color ............... cor das bolinhas
//   top / left .......... posição a partir do canto superior-esquerdo do bloco
// ───────────────────────────────────────────────────────────────
const DOTS = {
  rows: 5,
  cols: 12,
  size: 4,
  gap: 14,
  color: "#AFD1A1",
  top: 45,
  left: 720,
};

// ───────────────────────────────────────────────────────────────
// Conteúdo dentro do retângulo (badge de aspas, frase, parágrafos, nome/cargo).
//   top / left .......... posição do bloco a partir do canto superior-esquerdo
//   width / height ...... tamanho da área do conteúdo
//   padTop/padLeft/padRight/padBottom ... recuos internos (px)
// O badge fica no topo-esquerda; o nome/cargo é empurrado para o rodapé à direita.
// ───────────────────────────────────────────────────────────────
const CONTENT = {
  top: -30,
  left: 50,
  width: 820,
  height: 470,
  padTop: 58,
  padLeft: 64,
  padRight: 44,
  padBottom: 48,
};

// ───────────────────────────────────────────────────────────────
// Assinatura: uma barra vertical | + nome (cima) e cargo (baixo) empilhados.
//   top / left .......... posição do conjunto (px) a partir do canto sup-esq
//   barWidth ............ espessura da barra (px)
//   barHeight ........... comprimento/altura da barra (px)
//   barColor ............ cor da barra
//   barGap .............. espaço entre a barra e o texto (px)
//   nameSize ............ tamanho da fonte do nome (px)
//   roleSize ............ tamanho da fonte do cargo (px)
//   rowGap .............. espaço vertical entre nome e cargo (px)
// ───────────────────────────────────────────────────────────────
const SIGNATURE = {
  top: 240,
  left: 580,
  barWidth: 2,
  barHeight: 140,
  barColor: "#83AD6F",
  barGap: 40,
  nameSize: 28,
  roleSize: 13,
  rowGap: 14,
};

// ───────────────────────────────────────────────────────────────
// Barra avulsa | — elemento independente, só para posicionar/ajustar.
//   top / left .......... posição a partir do canto superior-esquerdo do bloco
//   width ............... espessura da barra (px)
//   height .............. comprimento/altura da barra (px)
//   color ............... cor da barra
//   radius .............. arredondamento das pontas (px)
// ───────────────────────────────────────────────────────────────
const BAR = {
  top: 60,
  left: -2,
  width: 6,
  height: 340,
  color: "#3B6634",
  radius: 8,
};

// Gera um path de quadrilátero com TODOS os cantos arredondados (raio r),
// usado no clip-path da foto. Cantos: sup-esq, sup-dir, inf-dir (puxado por
// cutBR), inf-esq. Assim o corte mantém a borda arredondada em todos os cantos.
function roundedShapePath(w: number, h: number, r: number, cutBR: number) {
  const pts = [
    { x: 0, y: 0 },
    { x: w, y: 0 },
    { x: w - cutBR, y: h },
    { x: 0, y: h },
  ];
  const sub = (a: typeof pts[0], b: typeof pts[0]) => ({ x: a.x - b.x, y: a.y - b.y });
  const add = (a: typeof pts[0], b: typeof pts[0]) => ({ x: a.x + b.x, y: a.y + b.y });
  const len = (a: typeof pts[0]) => Math.hypot(a.x, a.y) || 1;
  const unit = (a: typeof pts[0]) => ({ x: a.x / len(a), y: a.y / len(a) });
  const scale = (a: typeof pts[0], s: number) => ({ x: a.x * s, y: a.y * s });
  const n = pts.length;
  let d = "";
  for (let i = 0; i < n; i++) {
    const cur = pts[i];
    const toPrev = sub(pts[(i - 1 + n) % n], cur);
    const toNext = sub(pts[(i + 1) % n], cur);
    const rr = Math.min(r, len(toPrev) / 2, len(toNext) / 2);
    const A = add(cur, scale(unit(toPrev), rr));
    const B = add(cur, scale(unit(toNext), rr));
    d += `${i === 0 ? "M" : "L"} ${A.x.toFixed(2)} ${A.y.toFixed(2)} Q ${cur.x.toFixed(2)} ${cur.y.toFixed(2)} ${B.x.toFixed(2)} ${B.y.toFixed(2)} `;
  }
  return d + "Z";
}

export async function InstitucionalLideranca() {
  const t = await getTranslations("institucional.lideranca");
  const { lideranca } = institucional;
  const leader = lideranca.leaders[0];
  const lk = `leaders.${leader.key}`;

  return (
    <section id="institucional-lideranca" className="pt-section pb-[clamp(32px,4vw,56px)] text-ink">
      <div className="wrap">
        <div className="reveal mb-[clamp(40px,5vw,68px)] max-w-[660px]">
          <Kicker>{t("kicker")}</Kicker>
          <h2 className="my-4 ml-[clamp(20px,3vw,48px)] font-sans font-semibold text-[clamp(1.8rem,3.2vw,2.8rem)] leading-[1.1] tracking-[-.03em] text-ink">
            {t.rich("heading", {
              em: (c) => <span className="font-news font-normal italic text-teal">{c}</span>,
            })}
          </h2>
          <p className="ml-[clamp(20px,3vw,48px)] max-w-[54ch] text-[clamp(15px,1.2vw,17px)] leading-[1.65] text-ink-2">
            {t("intro")}
          </p>
        </div>

        {/* Composição em px fixos → escala p/ caber em telas menores (FitScale). */}
        <article className="reveal">
          <FitScale width={1420} height={470}>
          {/* Retângulo ajustável (parâmetros no topo do arquivo: RECT) */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: RECT.top,
              left: RECT.left,
              width: RECT.width,
              height: RECT.height,
              borderRadius: RECT.radius,
              background: RECT.bg,
              backdropFilter: RECT.blur ? `blur(${RECT.blur}px)` : undefined,
              WebkitBackdropFilter: RECT.blur ? `blur(${RECT.blur}px)` : undefined,
              border: RECT.borderWidth ? `${RECT.borderWidth}px solid ${RECT.borderColor}` : undefined,
            }}
          />

          {/* Grupo de bolinhas (parâmetros no topo do arquivo: DOTS) */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: DOTS.top,
              left: DOTS.left,
              display: "grid",
              gridTemplateColumns: `repeat(${DOTS.cols}, ${DOTS.size}px)`,
              gap: DOTS.gap,
            }}
          >
            {Array.from({ length: DOTS.rows * DOTS.cols }).map((_, i) => (
              <span
                key={i}
                style={{
                  width: DOTS.size,
                  height: DOTS.size,
                  borderRadius: "50%",
                  background: DOTS.color,
                }}
              />
            ))}
          </div>

          {/* Foto ajustável (parâmetros no topo do arquivo: PHOTO) */}
          <div
            role="img"
            aria-label={leader.name}
            style={{
              position: "absolute",
              zIndex: 20,
              top: PHOTO.top,
              left: PHOTO.left,
              width: PHOTO.width,
              height: PHOTO.height,
              backgroundImage: `url(${leader.image})`,
              backgroundSize: PHOTO.fit,
              backgroundPosition: `${PHOTO.focusX}% ${PHOTO.focusY}%`,
              backgroundRepeat: "no-repeat",
              clipPath: `path('${roundedShapePath(PHOTO.width, PHOTO.height, PHOTO.radius, PHOTO.cutBottomRight)}')`,
            }}
          />

          <div
            className="z-10 flex flex-col text-ink"
            style={{
              position: "absolute",
              top: CONTENT.top,
              left: CONTENT.left,
              width: CONTENT.width,
              height: CONTENT.height,
              paddingTop: CONTENT.padTop,
              paddingLeft: CONTENT.padLeft,
              paddingRight: CONTENT.padRight,
              paddingBottom: CONTENT.padBottom,
            }}
          >
            {/* badge de aspas */}
            <span aria-hidden className="inline-flex h-[clamp(44px,3.6vw,52px)] w-[clamp(44px,3.6vw,52px)] items-center justify-center rounded-[14px] bg-teal text-white">
              <svg viewBox="0 0 24 24" className="h-[23px] w-[23px]" fill="currentColor">
                <path d="M10 7.2C7.1 7.2 4.8 9.5 4.8 12.4V17h5.4v-4.8H7.6c0-1.3 1.07-2.4 2.4-2.4V7.2H10zm8.4 0c-2.9 0-5.2 2.3-5.2 5.2V17h5.4v-4.8H16c0-1.3 1.07-2.4 2.4-2.4V7.2z" />
              </svg>
            </span>

            <p className="mt-[clamp(22px,2.6vw,32px)] font-sans font-semibold text-[clamp(1.25rem,1.85vw,1.65rem)] leading-[1.2] tracking-[-.02em] text-ink">
              {t.rich(`${lk}.statement`, {
                em: (c) => <span className="text-teal">{c}</span>,
              })}
            </p>

            <div className="mt-[clamp(18px,2.2vw,26px)] max-w-[42ch] space-y-[0.9em] text-[clamp(12px,0.92vw,13.5px)] font-medium leading-[1.62] text-ink-2">
              <p>{t(`${lk}.quote1`)}</p>
              <p>{t(`${lk}.quote2`)}</p>
            </div>

          </div>

          {/* Assinatura: barra | nome (cima) + cargo (baixo) — parâmetros: SIGNATURE */}
          <div
            style={{
              position: "absolute",
              zIndex: 10,
              top: SIGNATURE.top,
              left: SIGNATURE.left,
              display: "flex",
              alignItems: "center",
              gap: SIGNATURE.barGap,
            }}
          >
            {/* barra vertical */}
            <span
              aria-hidden
              style={{
                width: SIGNATURE.barWidth,
                height: SIGNATURE.barHeight,
                background: SIGNATURE.barColor,
                borderRadius: SIGNATURE.barWidth,
                flex: "none",
              }}
            />
            {/* nome (cima) + cargo (baixo) */}
            <span style={{ display: "flex", flexDirection: "column", gap: SIGNATURE.rowGap }}>
              <span
                className="font-sans font-semibold leading-[1.2] tracking-[-.01em] text-ink"
                style={{ fontSize: SIGNATURE.nameSize }}
              >
                {leader.name}
              </span>
              <span
                className="font-sans leading-[1.2] text-teal"
                style={{ fontSize: SIGNATURE.roleSize }}
              >
                {t(`${lk}.role`)}
              </span>
            </span>
          </div>

          {/* Barra avulsa | (parâmetros no topo do arquivo: BAR) */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              zIndex: 10,
              top: BAR.top,
              left: BAR.left,
              width: BAR.width,
              height: BAR.height,
              background: BAR.color,
              borderRadius: BAR.radius,
            }}
          />
          </FitScale>
        </article>
      </div>
    </section>
  );
}
