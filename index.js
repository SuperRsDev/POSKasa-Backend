
const express = require('express'),
bodyParser = require('body-parser'),
path = require('path'),
dbSetup = require('./modules/core/server/database/dbSetup'),
app = express();

const pos = require('./rute');
app.use('/pos', pos);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'public')));


const port = 8080;
app.listen(port, () => {
    dbSetup.sinhronizacija();
    console.log(`Aplikacija pokrenuta na ${port}!`)
});

module.exports = app;