// Importações
const express = require("express");
const server = express();
const bodyParser = require("body-parser");

// Servidor para deploy
const host = "0.0.0.0";
const port = process.env.PORT || 3000;

// Body Parser
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// Banco de dados
const mongodb = require('mongodb');
const uri = "mongodb+srv://fulano-resolve:freelancer182@cluster0.3nljq.mongodb.net/pre_cadastro?retryWrites=true&w=majority";
const MongoClient = mongodb.MongoClient;

// Configurando a engine de visualização
server.set('views', './views');
server.set('view engine', 'ejs');

// Declarando as pastas como estáticas
server.use(express.static('public'));
server.use('/css', express.static(__dirname + 'public/css'));

// GET de todas as páginas
server.get("/", (req, res) => {
    res.render("homepage");
});

server.get("/clientes", (req, res) => {
    res.render('clientes');
});

server.get("/prestadores-de-servico", (req, res) => {
    res.render('prestadores');
});

// POST de todas as páginas
server.post("/add-client", (req, res) => {
    MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("LandingPage");
        var myobj = { 
            nomeCompleto: req.body.nome, 
            nascimento: req.body.nascimento,
            email: req.body.email,
            telefone: req.body.telefone,
            atividade: req.body.atividade 
        };
        dbo.collection("clientes").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("Dado inserido com sucesso");
            db.close();
        });
    });
    res.redirect("/");
});

server.post("/add-service", (req, res) => {
    MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("LandingPage");
        var myobj = { 
            nomeCompleto: req.body.nome, 
            nascimento: req.body.nascimento,
            email: req.body.email,
            telefone: req.body.telefone,
            atividade: req.body.atividade 
        };
        dbo.collection("prestadores").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("Dado inserido com sucesso");
            db.close();
        });
    });
    res.redirect("/");
});

// Liga o servidor
server.listen(port, host, () => { 
    console.log("Servidor rodando com sucesso");
});
