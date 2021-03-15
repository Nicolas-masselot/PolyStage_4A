const path = require('path');
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const config = require('./config');
const port = config.app.port;
const mysql = require('mysql');

app.use(express.static('.'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const db = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    port: config.db.port,
    password: config.db.password,
    database: config.db.database
});


// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

global.db = db;


app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html")
})

var routes = require('./api/routes/route'); //importing route
routes(app); //register the route

app.listen(port, function () {
    console.log('Serveur up on http://localhost:' + port)
})