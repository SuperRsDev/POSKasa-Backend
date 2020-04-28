const db = require('./db.js');

function sinhronizacijaBezInicijalizacije() {
    return db.sequelize.sync({force: true});
}

function sinhronizacija(){ 
    sinhronizacijaBezInicijalizacije()
        .then(function(){
        inicializacija()
            .then(function(){
                console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");
        });
    });
}

function inicializacija(){
    var prozvodiPromisea=[];
    return new Promise(function(resolve,reject){
        resolve();
    });
}

exports.sinhronizacija = sinhronizacija;
exports.inicializacija = inicializacija;
exports.sinhronizacijaBezInicijalizacije = sinhronizacijaBezInicijalizacije;