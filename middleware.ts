import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Roda em todas as rotas exceto APIs, internos do Next, e arquivos com extensao
  // (assets, favicon, robots, sitemap, etc.)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
