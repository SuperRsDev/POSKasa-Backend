const Sequelize = require("sequelize"),
path = require('path'),
veze = require('./relationship'),
config = require('config');

const baseFolderOffsetPath = '../../../../';
function getBaseModuleOffsetPath(path) {
    return baseFolderOffsetPath + path;
}

const sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, {
host: config.db.host,
    dialect: config.db.dialect,
    port: config.db.port,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false
 });

const db={};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//import modela
db.category = sequelize.import(path.join(__dirname, getBaseModuleOffsetPath('models/category.js')));
db.employee = sequelize.import(path.join(__dirname, getBaseModuleOffsetPath('models/employee.js')));
db.order = sequelize.import(path.join(__dirname, getBaseModuleOffsetPath('models/order.js')));
db.paymentType = sequelize.import(path.join(__dirname, getBaseModuleOffsetPath('models/paymentType.js')));
db.pos = sequelize.import(path.join(__dirname, getBaseModuleOffsetPath('models/pos.js')));
db.product = sequelize.import(path.join(__dirname, getBaseModuleOffsetPath('models/product.js')));
db.productOrder = sequelize.import(path.join(__dirname, getBaseModuleOffsetPath('models/productOrder.js')));
db.role = sequelize.import(path.join(__dirname, getBaseModuleOffsetPath('models/role.js')));
db.user = sequelize.import(path.join(__dirname, getBaseModuleOffsetPath('models/user.js')));
db.userRole = sequelize.import(path.join(__dirname, getBaseModuleOffsetPath('models/userRole.js')));


veze.inicializacijaVeza(db);

module.exports=db;
