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
            lastName: 'Pozegija',
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

    var categoryPromise = [
        db.category.create({
            description: 'kategorija 1',
            name: 'Hrana'}),
        db.category.create({
            description: 'kategorija 2',
            name: 'Pice'})

    ];

    var productPromise = [
        db.product.create({
            name: 'Cips Chipsy classic',
            stockQuantity: 200,
            status: 'dostupan',
            description: 'cips slani',
            unitPrice: 1,
            sellingPrice: 2,
            categoryId: 1
        }),
        db.product.create({
            name: 'Ledeni caj',
            stockQuantity: 100,
            status: 'dostupan',
            description: 'okus sumsko voce',
            unitPrice: 1,
            sellingPrice: 2,
            categoryId: 2
        })
    ];

    var paymentTypePromise = [
        db.paymentType.create({
            paymentTypeProvider: 'gotovina',
            description: ''
        })
    ];

    var employeePromise = [
        db.employee.create({
            userId: 1,
            managerId: 1,
            hireDate: '1.1.2019',
            jobTitle: 'konobar'
        })
    ];

    var orderPromise = [
        db.order.create({
            employeeId: 1,
            paymentTypeId: 1,
            date: '19.5.2020',
            status: '',
            orderType: ''
        })
    ];

    var productOrderPromise = [
        db.productOrder.create({
            orderId: 1,
            productId: 1,
            quantity: 3,
        }),
        db.productOrder.create({
            orderId: 1,
            productId: 2,
            quantity: 2,
        })
            .then(function(user) {
            // you can now access the newly created user
            console.log('success', user.toJSON());
            })
            .catch(function(err) {
                // print the error details
                console.log(err, request.body);
            })
    ];


    var posPromise = [
        db.pos.create({
            orderId: 1,
            totalSum: 5,
            fiscalNumber: 123,
        }),
    ];

    return new Promise((resolve, reject) => {
        Promise.all(userPromise)
            .then(() => Promise.all(rolePromise).then(all => resolve(all)))
            .then(() => Promise.all(userRolePromise).then(all => resolve(all)))
            .then(() => Promise.all(categoryPromise).then(all => resolve(all)))
            .then(() => Promise.all(productPromise).then(all => resolve(all)))
            .then(() => Promise.all(paymentTypePromise).then(all => resolve(all)))
            .then(() => Promise.all(employeePromise).then(all => resolve(all)))
            .then(() => Promise.all(orderPromise).then(all => resolve(all)))
            .then(() => Promise.all(productOrderPromise).then(all => resolve(all)))
            .then(() => Promise.all(posPromise).then(all => resolve(all)))
            .catch(reason => reject(reason));
    });
}

exports.sinhronizacija = sinhronizacija;
exports.inicializacija = inicializacija;
exports.sinhronizacijaBezInicijalizacije = sinhronizacijaBezInicijalizacije;