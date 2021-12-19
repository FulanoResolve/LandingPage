const express = require("express");
const server = express();

server.set('views', './views');
server.set('view engine', 'ejs');

server.use(express.static('public'));
server.use('/css', express.static(__dirname + 'public/css'));

server.get("/clientes", (req, res) => {
    res.render('clientes');
});

server.get("/prestadores-de-servico", (req, res) => {
    res.render('prestadores');
});

server.listen(3000, () => { 
    console.log("Servidor rodando com sucesso");
});
