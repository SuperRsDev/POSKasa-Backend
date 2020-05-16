const express = require('express');
var router = express.Router();
const db = require('./modules/core/server/database/db');


//GET ZAHTJEVI
router.get('/category', (req, res) => db.category.findAll().then(category => res.json(category)));
router.get('/employee', (req, res) => db.employee.findAll().then(employee => res.json(employee)));
router.get('/order', (req, res) => db.order.findAll().then(order => res.json(order)));
router.get('/paymentType', (req, res) => db.paymentType.findAll().then(paymentType => res.json(paymentType)));
router.get('/pos', (req, res) => db.pos.findAll().then(pos => res.json(pos)));
router.get('/product', (req, res) => db.product.findAll().then(product => res.json(product)));
router.get('/productOrder', (req, res) => db.productOrder.findAll().then(productOrder => res.json(productOrder)));
router.get('/role', (req, res) => db.role.findAll().then(role => res.json(role)));
router.get('/user', (req, res) => db.user.findAll().then(user => res.json(user)));
router.get('/userRole', (req, res) => db.userRole.findAll().then(userRole => res.json(userRole)));

router.get('/user/:id' , (req, res) =>  db.user.findOne({
    where: { id: req.params.id }}).then( data => { res.send(data)})
);

router.get('/product/:id' , (req, res) =>  db.product.findOne({
    where: { id: req.params.id }}).then( data => { res.send(data)})
);

module.exports = router;