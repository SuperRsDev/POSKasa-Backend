
const express = require('express'),
bodyParser = require('body-parser'),
path = require('path'),
dbSetup = require('./modules/core/server/database/dbSetup'),
rute = require('./rute'),
app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'public')));


app.get(rute.proizvod.bazna, function(req,res){

});

const port = 8080;
app.listen(port, () => {
    dbSetup.sinhronizacija();
    console.log(`Aplikacija pokrenuta na ${port}!`)
});

module.exports = app;