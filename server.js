// Arquivo de inicializacao para hospedagem Node.js (cPanel / Passenger).
// O painel executa este arquivo; ele sobe o Next.js em modo producao.
// Pre-requisito: ter rodado `npm install` e `npm run build` no servidor.
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const port = process.env.PORT || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res, parse(req.url, true));
  }).listen(port, () => {
    console.log(`> Pronto na porta ${port}`);
  });
});
