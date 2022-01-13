// Importações
const express = require("express");
const app = express();
const Cliente = require("../model/cliente");

// Configurando a engine de visualização
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', './views');
app.set('view engine', 'ejs');

// Banco de dados
const mongodb = require('mongodb');
const Mensagem = require("../model/mensagem");
const uri = process.env.URI;
const MongoClient = mongodb.MongoClient;

// Declarando as pastas como estáticas
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));

app.use('/Imagens', express.static(__dirname + "public/Imagens"))

// GET
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render('about');
});

app.get("/contact", (req, res) => {
    res.render('contact');
});

app.get("/clients", (req, res) => {
    res.render('clients');
});

app.get("/workers", (req, res) => {
    res.render('workers');
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

app.post("/send-message", (req, res) => {
    MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db(process.env.DB);
        var cliente = new Mensagem(
            req.body.nome, 
            req.body.email, 
            req.body.assunto, 
            req.body.mensagem
        );
        dbo.collection(process.env.MESSAGE).insertOne(cliente, function(err, res) {
            if (err) throw err;
            console.log("Dado inserido com sucesso");
            db.close();
        });
    });
    res.redirect("/");
});

module.exports = app;
