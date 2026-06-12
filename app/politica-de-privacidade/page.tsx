import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a Open Group coleta, utiliza, armazena e protege dados pessoais, em conformidade com a LGPD (Lei nº 13.709/2018).",
};

const ATUALIZACAO = "Junho de 2026";

// Página densa, em estilo de documento: sem efeitos visuais, sem
// animações — apenas tipografia e hierarquia.
type Secao = { title: string; paras?: string[]; list?: string[]; parasAfter?: string[] };

const secoes: Secao[] = [
  {
    title: "Objetivo e abrangência",
    paras: [
      "Esta Política de Privacidade descreve como a Open Group — Desenvolvimento Imobiliário (“Open Group”) coleta, utiliza, armazena, compartilha e protege dados pessoais de visitantes deste site e de pessoas que entram em contato com a equipe, em conformidade com a Lei Geral de Proteção de Dados Pessoais — LGPD (Lei nº 13.709/2018).",
      "Ela se aplica exclusivamente a este site institucional e aos canais de contato aqui disponibilizados. Sites de terceiros eventualmente vinculados (como páginas de parceiros e plataformas de mapas) possuem políticas próprias, que recomendamos consultar.",
    ],
  },
  {
    title: "Dados que coletamos",
    paras: ["Tratamos duas categorias de dados pessoais:"],
    list: [
      "Dados fornecidos por você — ao utilizar o formulário de contato ou os canais diretos (e-mail e telefone), coletamos as informações que você decide compartilhar: nome, empresa ou fundo, e-mail, WhatsApp/telefone, tipo de contato e o conteúdo da mensagem, que pode incluir informações sobre ativos, terrenos ou projetos.",
      "Dados coletados automaticamente — informações técnicas de navegação, como endereço IP, tipo de navegador, dispositivo, páginas visitadas e tempo de permanência, coletadas por meio de cookies e tecnologias semelhantes.",
    ],
    parasAfter: [
      "Não coletamos, neste site, dados pessoais sensíveis (como dados de saúde, biometria ou convicções), e nossos serviços não se destinam a menores de 18 anos.",
    ],
  },
  {
    title: "Finalidades e bases legais",
    paras: ["Utilizamos os dados pessoais para as seguintes finalidades, sempre amparadas em uma base legal da LGPD:"],
    list: [
      "Responder ao seu contato e conduzir a primeira leitura da oportunidade apresentada — base legal: procedimentos preliminares a contrato (art. 7º, V) e legítimo interesse (art. 7º, IX);",
      "Manter o relacionamento institucional e comercial decorrente do contato — base legal: legítimo interesse;",
      "Cumprir obrigações legais ou regulatórias e exercer direitos em processos — base legal: cumprimento de obrigação legal (art. 7º, II) e exercício regular de direitos (art. 7º, VI);",
      "Analisar o uso do site e aprimorar a experiência de navegação — base legal: consentimento (art. 7º, I) e legítimo interesse.",
    ],
  },
  {
    title: "Cookies e tecnologias de navegação",
    paras: [
      "Cookies são pequenos arquivos armazenados no seu navegador. Utilizamos cookies estritamente necessários ao funcionamento do site e, quando aplicável, cookies analíticos para entender como o site é utilizado.",
      "Você pode gerenciar ou desativar cookies nas configurações do seu navegador. A desativação de cookies necessários pode afetar o funcionamento de partes do site.",
    ],
  },
  {
    title: "Compartilhamento de dados",
    paras: ["A Open Group não vende dados pessoais. O compartilhamento ocorre apenas nas seguintes hipóteses:"],
    list: [
      "Com prestadores de serviço que operam o site e os canais de comunicação (hospedagem, e-mail, ferramentas de análise), limitado ao necessário para a prestação do serviço;",
      "Com parceiros da operação imobiliária, quando o seu contato tiver por objetivo uma oportunidade que demande essa articulação — sempre no contexto da finalidade original;",
      "Com autoridades públicas, mediante obrigação legal, regulatória ou ordem judicial;",
      "Em operações societárias (como fusão ou aquisição), caso em que o titular será informado sobre a mudança de controlador.",
    ],
  },
  {
    title: "Armazenamento e prazo de retenção",
    paras: [
      "Os dados são armazenados em ambientes controlados, podendo estar hospedados em servidores localizados fora do Brasil — nesse caso, a transferência internacional observa o disposto nos arts. 33 e seguintes da LGPD.",
      "Mantemos os dados pelo tempo necessário ao cumprimento das finalidades desta política: dados de contato são retidos enquanto durar o relacionamento ou a tratativa, e após isso pelo prazo necessário ao cumprimento de obrigações legais e ao exercício regular de direitos. Encerrados os prazos, os dados são eliminados ou anonimizados.",
    ],
  },
  {
    title: "Segurança das informações",
    paras: [
      "Adotamos medidas técnicas e administrativas razoáveis para proteger os dados pessoais contra acessos não autorizados, perda, alteração ou divulgação indevida — incluindo criptografia em trânsito (HTTPS), controle de acesso e minimização de coleta.",
      "Nenhum sistema é absolutamente seguro. Caso identifiquemos incidente de segurança que possa acarretar risco ou dano relevante aos titulares, comunicaremos os afetados e a Autoridade Nacional de Proteção de Dados (ANPD), na forma da lei.",
    ],
  },
  {
    title: "Direitos dos titulares",
    paras: ["Nos termos do art. 18 da LGPD, você pode solicitar, a qualquer momento:"],
    list: [
      "Confirmação da existência de tratamento dos seus dados;",
      "Acesso aos dados que mantemos sobre você;",
      "Correção de dados incompletos, inexatos ou desatualizados;",
      "Anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a lei;",
      "Portabilidade dos dados a outro fornecedor, observados os regulamentos da ANPD;",
      "Eliminação dos dados tratados com base no seu consentimento;",
      "Informação sobre as entidades com as quais compartilhamos seus dados;",
      "Revogação do consentimento, quando esta for a base legal do tratamento.",
    ],
    parasAfter: [
      "As solicitações são gratuitas e serão respondidas nos prazos previstos na legislação. Para exercê-las, utilize o canal indicado na seção seguinte.",
    ],
  },
  {
    title: "Encarregado e canal de contato",
    paras: [
      `As solicitações relativas a dados pessoais devem ser encaminhadas ao encarregado pelo tratamento de dados pessoais da Open Group pelo e-mail ${site.email}, com o assunto “Privacidade de dados”. Se preferir, utilize a página de contato deste site.`,
    ],
  },
  {
    title: "Legislação aplicável",
    paras: [
      "Esta política é regida pelas leis da República Federativa do Brasil, em especial a Lei nº 13.709/2018 (LGPD) e o Marco Civil da Internet (Lei nº 12.965/2014). Fica eleito o foro da comarca de São Paulo/SP para dirimir eventuais controvérsias.",
    ],
  },
  {
    title: "Atualizações desta política",
    paras: [
      "Esta política pode ser atualizada a qualquer momento para refletir mudanças legais, regulatórias ou operacionais. A versão vigente estará sempre disponível nesta página, com a data de atualização indicada no topo. Alterações relevantes poderão ser comunicadas pelos canais de contato informados.",
    ],
  },
];

export default function PoliticaDePrivacidadePage() {
  return (
    <main className="bg-paper">
      <div className="wrap pt-[clamp(140px,18vh,200px)] pb-[clamp(80px,10vw,140px)]">
        <div className="mx-auto max-w-[760px]">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[.22em] text-ink-3">
            Documento institucional
          </p>
          <h1 className="mt-4 font-sans font-semibold text-[clamp(28px,3.6vw,44px)] leading-[1.1] tracking-[-.025em] text-ink">
            Política de Privacidade
          </h1>
          <p className="mt-3 text-[13px] text-ink-3">Última atualização: {ATUALIZACAO}</p>
          <p className="mt-7 text-[15.5px] leading-[1.75] text-ink-2">
            A privacidade e a proteção de dados pessoais fazem parte do
            compromisso de condução responsável da Open Group. Este documento
            explica, de forma transparente, como tratamos os dados de quem
            navega neste site e de quem se relaciona com a nossa equipe.
          </p>

          <ol className="mt-[clamp(40px,5vw,64px)] flex list-none flex-col gap-[clamp(36px,4vw,52px)] p-0">
            {secoes.map((s, i) => (
              <li key={s.title} className="border-t border-[color:var(--line)] pt-[clamp(24px,3vw,36px)]">
                <h2 className="font-sans font-semibold text-[clamp(19px,1.7vw,24px)] leading-[1.25] tracking-[-.015em] text-ink">
                  <span className="mr-3 text-green tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                {s.paras?.map((p) => (
                  <p key={p.slice(0, 40)} className="mt-4 text-[15px] leading-[1.75] text-ink-2">{p}</p>
                ))}
                {s.list && (
                  <ul className="mt-4 flex list-none flex-col gap-3 p-0">
                    {s.list.map((item) => (
                      <li key={item.slice(0, 40)} className="flex items-baseline gap-3 text-[15px] leading-[1.7] text-ink-2">
                        <span aria-hidden className="h-[5px] w-[5px] shrink-0 translate-y-[-2px] rounded-full bg-green" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {s.parasAfter?.map((p) => (
                  <p key={p.slice(0, 40)} className="mt-4 text-[15px] leading-[1.75] text-ink-2">{p}</p>
                ))}
              </li>
            ))}
          </ol>

          <p className="mt-[clamp(40px,5vw,64px)] border-t border-[color:var(--line)] pt-8 text-[14px] leading-[1.7] text-ink-3">
            Dúvidas sobre esta política? Escreva para{" "}
            <a href={`mailto:${site.email}`} className="text-teal underline decoration-teal/30 underline-offset-4 hover:text-green">
              {site.email}
            </a>{" "}
            ou acesse a <Link href="/contato" className="text-teal underline decoration-teal/30 underline-offset-4 hover:text-green">página de contato</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
