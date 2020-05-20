const express = require('express');
var router = express.Router();
const db = require('./modules/core/server/database/db');


//GET ZAHTJEVI
router.get('/categories', (req, res) => db.category.findAll().then(category => res.json(category)));
router.get('/employees', (req, res) => db.employee.findAll().then(employee => res.json(employee)));
router.get('/orders', (req, res) => db.order.findAll().then(order => res.json(order)));
router.get('/paymentTypes', (req, res) => db.paymentType.findAll().then(paymentType => res.json(paymentType)));
router.get('/pos', (req, res) => db.pos.findAll().then(pos => res.json(pos)));
router.get('/products', (req, res) => db.product.findAll().then(product => res.json(product)));
router.get('/productOrders', (req, res) => db.productOrder.findAll().then(productOrder => res.json(productOrder)));
router.get('/roles', (req, res) => db.role.findAll().then(role => res.json(role)));
router.get('/users', (req, res) => db.user.findAll().then(user => res.json(user)));
router.get('/userRoles', (req, res) => db.userRole.findAll().then(userRole => res.json(userRole)));

//dohvaća subtotale, tj  - sve narudžbe proizvoda i njihove količine koji odgovaraju narudžbi sa prosljeđenim id-em
router.get('/subTotals/:orderId', (req, res) =>  db.productOrder.findAll({
    where: { orderId: req.params.orderId }}).then( data => { res.send(data)})
);

router.get('/user/:id' , (req, res) =>  db.user.findOne({
    where: { id: req.params.id }}).then( data => { res.send(data)})
);

router.get('/employee/:id' , (req, res) =>  db.employee.findOne({
    where: { id: req.params.id }}).then( data => { res.send(data)})
);

router.get('/product/:id' , (req, res) =>  db.product.findOne({
    where: { id: req.params.id }}).then( data => { res.send(data)})
);

router.get('/category/:id' , (req, res) =>  db.category.findOne({
    where: { id: req.params.id }}).then( data => { res.send(data)})
);


router.get('/paymentType/:id' , (req, res) =>  db.paymentType.findOne({
    where: { id: req.params.id }}).then( data => { res.send(data)})
);

//DELETE ZAHTJEVI

router.delete('/user/:id' , (req, res) => db.user.destroy({
        where: {   id: req.params.id     }
    }).then( () => { res.json({ status : 'User deleted!'}) })
);

router.delete('/product/:id' , (req, res) => db.product.destroy({
        where: {   id: req.params.id     }
    }).then( () => { res.json({ status : 'Product deleted!'}) })
);

router.delete('/category/:id' , (req, res) => db.category.destroy({
        where: {   id: req.params.id     }
    }).then( () => { res.json({ status : 'Category deleted!'}) })
);

//POST ZAHTJEVI

router.post('/user' , function(req, res)  {
    if ( !req.body.username || !req.body.password )
        res.json({ error: 'Bad Data' })

    db.user.create(req.body)
        .then( data => { res.send(data) })
        .catch( function (err) {
            res.sendStatus(500)});
});

router.post('/product' , function(req, res)  {
    if ( !req.body.name || !req.body.stockQuantity || !req.body.unitPrice || !req.body.sellingPrice)
        res.json({ error: 'Bad Data' })

    db.user.create(req.body)
        .then( data => { res.send(data) })
        .catch( function (err) {
            res.sendStatus(500)});
});

router.post('/pos' , function(req, res)  {

    db.pos.create(req.body)
        .then( data => { res.send(data) })
        .catch( function (err) {
            res.sendStatus(500)});
});

router.post('/category' , function(req, res)  {
    if ( !req.body.name )
        res.json({ error: 'Bad Data' })

    db.category.create(req.body)
        .then( data => { res.send(data) })
        .catch( function (err) {
            res.sendStatus(500)});
});

//PUT ZAHTJEVI

router.put('/user/:id' , function(req, res)  {
    if ( !req.body.username || !req.body.password )
        res.json({ error: 'Bad Data' })

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
});


router.put('/product/:id' , function(req, res)  {
    if ( !req.body.name || !req.body.stockQuantity || !req.body.unitPrice || !req.body.sellingPrice)
        res.json({ error: 'Bad Data' })

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
});



module.exports = router;