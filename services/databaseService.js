'use strict';
const db = require('sqlite');
const config = require('../config/config');

db.open(config.database, { Promise }).then(function () {
    console.log('connected to sqlite' + ' on database '+ config.database);
}).catch(function (error) {
    console.error(error);
});

const execute = function (sql, params) {
    return db.run(sql, params);
};

const get = function (sql, params) {
    return db.get(sql, params);
};

const query = function (sql, params) {
    return db.all(sql, params);
};

module.exports = {
    execute,
    get,
    query
};
