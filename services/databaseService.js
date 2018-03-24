'use strict';
const db = require('sqlite');

db.open('.//database/borderGuru.sqlite', { Promise }).then(function () {
    console.log('connected to sqlite');
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
    execute: execute,
    get: get,
    query: query
};
