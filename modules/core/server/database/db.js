const Sequelize = require("sequelize"),
path = require('path'),
veze = require('./relationship'),
config = require('config');

const baseFolderOffsetPath = '../../../../';
function getBaseModuleOffsetPath(path) {
    return baseFolderOffsetPath + path;
}

const sequelize = new Sequelize(config.db.name, config.db.username,  config.db.password, {
    host: config.db.host,
    dialect: 'mysql',
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
db.proizvod = sequelize.import(path.join(__dirname, getBaseModuleOffsetPath('models/proizvod.js')));

veze.inicializacijaVeza(db);

module.exports=db;