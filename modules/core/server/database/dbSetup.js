const db = require('./db.js');
const bcrypt = require('bcrypt');


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

function inicializacija() {

    var userPromise=[ db.user.create(
        {
            firstName: 'Amra',
            lastName: 'Pozegija',
            username: 'apozegija1',
            password: 'amraamra',
            email: 'apozegija1@etf.unsa.ba',
            phone: '061111111',
            address: 'Zmaja od Bosne bb',
            picture: 'file:./resources/img/user.png',
            birthDate: '1997-02-03',
            loginProvider: 'local'
        })
    ];

    return new Promise((resolve, reject) => {
        const promises = Promise.all(userPromise).then(() => {
            db.user.findAll().then(elements => {
                const user = elements.find((el) => el.username === 'apozegija1')
                promises.then(() => {
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
                    return Promise.all(rolePromise)
                })
                    .then(() => {
                        var userRolePromise = [ db.userRole.create(
                            {
                                roleId: 1,
                                userId: user.id
                            }
                        )];
                        return Promise.all(userRolePromise)
                    }).then(() => {
                        var categoryPromise = [
                            db.category.create({
                                description: 'kategorija 1',
                                name: 'Hrana'}),
                            db.category.create({
                                description: 'kategorija 2',
                                name: 'Pice'})

                        ];
                        return Promise.all(categoryPromise)
                    })
                    .then((categories)=> {
                        db.category.findAll().then(() => {
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
                                return Promise.all(productPromise)
                            })
                                .then(() => {
                                    var paymentTypePromise = [
                                        db.paymentType.create({
                                            paymentTypeProvider: 'gotovina',
                                            description: ''
                                        })
                                    ];
                                    return Promise.all(paymentTypePromise)
                                })
                                .then(() => {
                                    var employeePromise = [
                                        db.employee.create({
                                            userId: user.id,
                                            managerId: null,
                                            hireDate: '2019-02-03',
                                            jobTitle: 'konobar'
                                        })
                                    ];
                                    return Promise.all(employeePromise)
                                })
                                .then(() => {
                                    var orderPromise = [
                                        db.order.create({
                                            employeeId: 1,
                                            paymentTypeId: 1,
                                            date: '2020-05-19',
                                            status: '',
                                            orderType: ''
                                        }),
                                        db.order.create({
                                            employeeId: 1,
                                            paymentTypeId: 1,
                                            date: '2020-05-19',
                                            status: '',
                                            orderType: ''
                                        }),

                                    ];
                                    return Promise.all(orderPromise)
                                })
                                .then(() => {
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
                                        }),
                                        db.productOrder.create({
                                            orderId: 2,
                                            productId: 2,
                                            quantity: 2,
                                        })
                                    ];
                                    return Promise.all(productOrderPromise)
                                })
                                .then(() => {
                                    var posPromise = [
                                        db.pos.create({
                                            orderId: 1,
                                            totalSum: 5,
                                            fiscalNumber: 123,
                                        }),
                                    ];
                                    return Promise.all(posPromise).then(all => resolve(all))
                                })
                        })

                    .catch(reason => reject(reason));
            })
        });
    });
}

exports.sinhronizacija = sinhronizacija;
exports.inicializacija = inicializacija;
//exports.sinhronizacijaBezInicijalizacije = sinhronizacijaBezInicijalizacije;
