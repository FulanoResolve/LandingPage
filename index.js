// Importações
const express = require("express");
const server = express();
const mainRoutes = require("./controllers/routers");

// Servidor para deploy
const host = "0.0.0.0";
const port = process.env.PORT || 3000;

// Puxando as rotas para o servidor
server.use(mainRoutes);

// Liga o servidor
server.listen(port, host, () => { 
    console.log("Servidor rodando com sucesso");
});
