
const express = require('express'),
bodyParser = require('body-parser'),
path = require('path'),
dbSetup = require('./modules/core/server/database/dbSetup'),
app = express(),
config = require('config'),
pos = require('./rute');
const cors = require('cors');

var corsOptions = {
    origin: config.host.corsOrigin,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/api', pos);

const port = 8080;
app.listen(port, () => {
    dbSetup.sinhronizacija();
    console.log(`Aplikacija pokrenuta na ${port}!`)
});

module.exports = app;
