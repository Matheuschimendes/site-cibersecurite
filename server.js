import express from "express";
import next from "next";

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Servir apenas arquivos estáticos _next (para fallback)
  server.use("/_next/static", express.static(".next/static"));

  // Todas as rotas do Next.js
  server.all("*", (req, res) => handle(req, res));

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
