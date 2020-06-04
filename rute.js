

const express = require('express');
var router = express.Router();
const db = require('./modules/core/server/database/db');
const bcrypt = require("bcrypt");
const jwtAuth = require("./modules/core/server/jwt.auth");
const config = require('config');
const userService = require('./modules/users/server/service/user.service')

const baseCategoriesRoute = '/categories';
const baseProductsRoute = '/products';
const baseUsersRoute = '/users';
const baseOrdersRoute = '/orders';
const baseEmployeesRoute = '/employees';
const baseRolesRoute = '/roles';
const basePosRoute = '/pos';
const basePaymentTypesRoute = '/paymentTypes';
const baseUserRolesRoute = '/userRoles';
const baseProductOrdersRoute = '/productOrders';

const baseRouterFn = (method, route, callback) => {
    router[method](route, jwtAuth.authenticateToken, callback);
}

const getIdRoute = (route) => {
    return route + '/:id';
}

const getUsersExcludedFieldsQuery = (baseQuery) => {
    return {...baseQuery, attributes: { exclude: ['password'] }}
}


baseRouterFn('get', baseCategoriesRoute, (req, res) => db.category.findAll().then(category => res.json(category)));
baseRouterFn('get', baseEmployeesRoute, (req, res) => db.employee.findAll().then(employee => res.json(employee)));
baseRouterFn('get', baseOrdersRoute, (req, res) => db.order.findAll().then(order => res.json(order)));
baseRouterFn('get', basePaymentTypesRoute, (req, res) => db.paymentType.findAll().then(paymentType => res.json(paymentType)));
baseRouterFn('get', basePosRoute, (req, res) => db.pos.findAll().then(pos => res.json(pos)));
baseRouterFn('get', baseProductsRoute, (req, res) => db.product.findAll().then(product => res.json(product)));
baseRouterFn('get', baseProductOrdersRoute, (req, res) => db.productOrder.findAll().then(productOrder => res.json(productOrder)));
baseRouterFn('get', baseRolesRoute, (req, res) => db.role.findAll().then(role => res.json(role)));
baseRouterFn('get', baseUsersRoute, (req, res) =>
    db.user.findAll(getUsersExcludedFieldsQuery({})).then(user => res.json(user)));
baseRouterFn('get', baseUserRolesRoute, (req, res) => db.userRole.findAll().then(userRole => res.json(userRole)));

//                              GET ZAHTJEVI

//dohvaća subtotale, tj  - sve narudžbe proizvoda i njihove količine koji odgovaraju narudžbi sa prosljeđenim id-em
baseRouterFn('get', '/subTotals/:orderId', (req, res) =>  db.productOrder.findAll({
    where: { orderId: req.params.orderId }}).then( data => { res.send(data)})
);

//                              GET /:id ZAHTJEVI
baseRouterFn('get', getIdRoute(baseUsersRoute), (req, res) => {
    db.user.findOne(getUsersExcludedFieldsQuery({
            where: { id: req.params.id } })).then( data => { res.send(data)})
    }
);

baseRouterFn('get', baseUsersRoute + 'for/:username', (req, res) =>
    db.user.findOne(getUsersExcludedFieldsQuery({
    where: {   username: req.params.username }})).then( data => { res.send(data)})
);

baseRouterFn('get', getIdRoute(baseEmployeesRoute), (req, res) =>  db.employee.findOne({
    where: { id: req.params.id }}).then( data => { res.send(data)})
);

baseRouterFn('get', getIdRoute(baseProductsRoute), (req, res) =>  db.product.findOne({
    where: { id: req.params.id }}).then( data => { res.send(data)})
);

baseRouterFn('get', getIdRoute(baseCategoriesRoute), (req, res) =>  db.category.findOne({
    where: { id: req.params.id }}).then( data => { res.send(data)})
);

baseRouterFn('get', baseCategoriesRoute + 'for/:name', (req, res) =>  db.category.findOne({
    where: { name: req.params.name }}).then( data => { res.send(data)})
);

baseRouterFn('get', getIdRoute(basePaymentTypesRoute), (req, res) =>  db.paymentType.findOne({
    where: { id: req.params.id }}).then( data => { res.send(data)})
);

baseRouterFn('get', getIdRoute(baseOrdersRoute), (req, res) =>  db.order.findOne({
    where: { id: req.params.id }}).then( data => { res.send(data)})
);

//GET role for specific user
//select * from role, user where role.id = user.id and user.username = ?

baseRouterFn('get', baseUserRolesRoute + 'for/:username/' , async function(req, res) {
        try {
            //SELECT role.* FROM role, "userRole" as localrole, user as localuser WHERE localrole."roleId" = role.id AND localrole."userId" = localuser.id AND localuser.username = 'dmuharemov1'
            const data = await db.sequelize
                .query('SELECT role.* FROM role, "userRole" as localrole, "user" as localuser WHERE localrole."roleId" = role.id AND localrole."userId" = localuser.id AND localuser.username = ?', {
                    replacements: [req.params.username], type: db.sequelize.QueryTypes.SELECT
                });
            res.send(data);
        } catch (err) {
            console.error("User roles error: ", err);
            res.sendStatus(500);
        }
    }
);

//Dohvati sve produkte određene kategorije
baseRouterFn('get', baseProductsRoute + 'for/:categoryName' , async function(req, res) {
    try {
        const data = await db.sequelize.query('SELECT product.* FROM product, category WHERE product."categoryId" = category.id AND category.name = ?', {
            replacements: [req.params.categoryName], type: db.sequelize.QueryTypes.SELECT
        });
        res.send(data);
    } catch (err) {
        console.error('Products category error: ', err);
        res.sendStatus(500);
    }
});

//pretraga po imenu

//pretraga po cijeni

//pretraga po kategoriji

//                              DELETE ZAHTJEVI

baseRouterFn('delete', getIdRoute(baseUsersRoute), (req, res) => db.user.destroy({
        where: {   id: req.params.id     }
    }).then( () => { res.json({ status : 'User deleted!'}) })
);

baseRouterFn('delete', getIdRoute(baseProductsRoute), (req, res) => db.product.destroy({
        where: {   id: req.params.id     }
    }).then( () => { res.json({ status : 'Product deleted!'}) })
);

baseRouterFn('delete', getIdRoute(baseCategoriesRoute), (req, res) => db.category.destroy({
        where: {   id: req.params.id     }
    }).then( () => { res.json({ status : 'Category deleted!'}) })
);

//                              POST ZAHTJEVI

router.post(baseUsersRoute , function(req, res)  {
    if ( !req.body.username || !req.body.password ){
        res.json({ error: 'Bad Data' })
        return;
    }
    const user = req.body;
    user.loginProvider = 'local';

    db.user.create(req.body)
        .then( data => {
            const normalizedUser = userService.mapUserToDto(data);
            db.employee.create({
                userId: data.id,
                managerId: null,
                hireDate: new Date(),
                jobTitle: 'Radnik'
            })
                .then((employeeCreated) => {
                    res.send(normalizedUser) })
            }).catch((err) => {
                console.error('Employee create error: ', err);
                res.sendStatus(500)
            })

        .catch( function (err) {
            console.error('User create error: ', err);
            res.sendStatus(500)
        });
});

baseRouterFn('post', baseCategoriesRoute , function(req, res)  {
    if ( !req.body.name ){
        res.json({ error: 'Bad Data' })
        return;
    }

    db.category.create(req.body)
        .then( data => { res.send(data) })
        .catch( function (err) {
            res.sendStatus(500)});
});

baseRouterFn('post', baseOrdersRoute, function(req, res)  {
    if ( !req.body.employeeId || !req.body.date ){
        res.json({ error: 'Bad Data' })
        return;
    }

    db.order.create(req.body)
        .then( data => { res.send(data) })
        .catch( function (err) {
            console.error(err);
            res.sendStatus(500)});
});
//paymentType - definisano prije - nije podložno izmjenama od strane korisnika

baseRouterFn('post', basePosRoute, function(req, res)  {
    db.pos.create(req.body)
        .then( data => { res.send(data) })
        .catch( function (err) {
            res.sendStatus(500)});
});

baseRouterFn('post', baseProductsRoute , function(req, res)  {
    if ( !req.body.name || !req.body.stockQuantity ||
        !req.body.unitPrice || !req.body.sellingPrice){
        res.json({ error: 'Bad Data' })
        return;
    }

    db.product.create(req.body)
        .then( data => { res.send(data) })
        .catch( function (err) {
            res.sendStatus(500)});
});

baseRouterFn('post', baseProductOrdersRoute, function(req, res)  {
    if ( !req.body.productId || !req.body.orderId || !req.body.quantity) {
        res.json({ error: 'Bad Data' })
        return;
    }


    db.productOrder.create({
        productId: req.body.productId,
        orderId: req.body.orderId,
        quantity: req.body.quantity
    })
        .then( data => { res.send(data) })
        .catch( function (err) {
            console.info(err);
            res.sendStatus(500);
        });
});

//role - definisano prije - nije podložno izmjenama od strane korisnika

baseRouterFn('post', baseUserRolesRoute, function(req, res)  {
    if ( !req.body.roleId || !req.body.userId ){
        res.json({ error: 'Bad Data' })
        return;
    }

    db.userRole.create(req.body)
        .then( data => { res.send(data) })
        .catch( function (err) {
            console.error(err);
            res.sendStatus(500)});
});

//                              PUT ZAHTJEVI
const postUserCbk = function(req, res)  {
    var data = req.body;
    db.user.update( {
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            password: data.password,
            email: data.email,
            phone: data.phone,
            address: data.address,
            picture: data.picture,
            birthDate: data.birthDate,
            loginProvider: data.loginProvider,
        }, { where: { id: req.params.id } }
    ).then( () => { res.json({ status : 'User updated!'}) });
}
baseRouterFn('put', getIdRoute(baseUsersRoute), postUserCbk);

const postProductCbk = function(req, res)  {
    var data = req.body;
    db.product.update( {
            name: data.name,
            stockQuantity: data.stockQuantity,
            status: data.status,
            description: data.description,
            unitPrice: data.unitPrice,
            sellingPrice: data.sellingPrice,
            categoryId: data.categoryId,
        }, { where: { id: req.params.id } }
    ).then( () => { res.json({ status : 'Product updated!'}) });
}
baseRouterFn('put', getIdRoute(baseProductsRoute), postProductCbk);

const postTokenCbk = (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.json({ error: 'Bad Data' })
        return;
    }

    db.user.findOne({
        where: {
            username: req.body.username
        }
    })
    .then( user => {
        if (!user) {
            res.status(400).send({ error: "Bad request, one or more fields has incorrect value" });
            return;
        }

        const samePassword = bcrypt.compareSync(req.body.password, user.password);
        if(samePassword) {
            // Passwords match
            const token = jwtAuth.generateAccessToken({ username: req.body.username });
            res.json({
                token,
                expiresIn: config.jwt.expiresIn,
                username: req.body.username,
                userId: user.id
            });
        } else {
            // Passwords don't match
            res.status(400).send({ error: "Bad request, one or more fields has incorrect value" });
        }
    })
    .catch( function (err) {
        console.error(err);
        res.sendStatus(500)
    });
}
router.post('/token', postTokenCbk);

module.exports = router;
