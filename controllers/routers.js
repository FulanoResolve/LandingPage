// Importações
const express = require("express");
const app = express();
const Cliente = require("../model/cliente");
require("dotenv/config");

// Configurando a engine de visualização
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', './views');
app.set('view engine', 'ejs');

// Banco de dados
const mongodb = require('mongodb');
const uri = process.env.URI;
const MongoClient = mongodb.MongoClient;

// Declarando as pastas como estáticas
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));

// GET
app.get("/", (req, res) => {
    res.render("homepage");
});

app.get("/clientes", (req, res) => {
    res.render('clientes');
});

app.get("/prestadores-de-servico", (req, res) => {
    res.render('prestadores');
});

// POST
app.post("/add-client", (req, res) => {
    MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db(process.env.DB);
        var cliente = new Cliente(
            req.body.nome, 
            req.body.nascimento, 
            req.body.email, 
            req.body.telefone, 
            req.body.atividade
        );
        dbo.collection(process.env.CLIENT).insertOne(cliente, function(err, res) {
            if (err) throw err;
            console.log("Dado inserido com sucesso");
            db.close();
        });
    });
    res.redirect("/");
});

app.post("/add-service", (req, res) => {
    MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db(process.env.DB);
        var cliente = new Cliente(
            req.body.nome, 
            req.body.nascimento, 
            req.body.email, 
            req.body.telefone, 
            req.body.atividade
        );
        dbo.collection(process.env.SERVICE).insertOne(cliente, function(err, res) {
            if (err) throw err;
            console.log("Dado inserido com sucesso");
            db.close();
        });
    });
    res.redirect("/");
});

module.exports = app;
