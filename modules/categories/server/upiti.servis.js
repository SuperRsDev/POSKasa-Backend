const db = require('../../core/server/database/db');

exports.dajOsoblje = () => {
    return db.proizvod.findAll({raw: true});
}