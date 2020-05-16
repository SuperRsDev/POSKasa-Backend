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
    var userPromise=[ db.user.create(
        {
            firstName: 'Amra',
            lastName: 'Pozeijga',
            username: 'apozegija1',
            password: 'amraamra',
            email: 'apozegija1@etf.unsa.ba',
            phone: '061111111',
            address: 'Zmaja od Bosne bb',
            picture: 'user.png',
            birthDate: '2.3.1997',
            loginProvider: 'login'
        })
    ];

    var rolePromise = [
        db.role.create({
            description: 'ima sve privilegije za brisanje i dodavanje',
            name: 'admin'}),
        db.role.create({
            description: 'ima sve privilegije osim za brisanje i dodavanje korisnika',
            name: 'menadzer'}),
        db.role.create({
            description: 'radnik, bez privilegija brisanja i dodavanja',
            name: 'radnik'})
    ];
    var userRolePromise = [ db.userRole.create(
        {
            roleId: 1,
            userId: 1
        }
    )];


    return new Promise((resolve, reject) => {
        Promise.all(userPromise)
            .then(() => Promise.all(rolePromise).then(all => resolve(all)))
            .then(() => Promise.all(userRolePromise).then(all => resolve(all)))
            .catch(reason => reject(reason));
    });
}

exports.sinhronizacija = sinhronizacija;
exports.inicializacija = inicializacija;
exports.sinhronizacijaBezInicijalizacije = sinhronizacijaBezInicijalizacije;