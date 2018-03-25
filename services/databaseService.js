'use strict';
const db = require('sqlite');
const config = require('../config/config');

db.open(config.database, { Promise }).then(function () {
    console.log('connected to sqlite' + ' on database '+ config.database);
}).catch(function (error) {
    console.error(error);
});

const execute = async function (sql, params) {
    let raw = await db.run(sql, params);
    let response = [];
    if (raw.length > 0) {
        raw.forEach(element => {
            response.push(convertObjectToCamelCase(element));
        });
    }
    return response;
};

const query = async function (sql, params) {
    let raw = await db.all(sql, params);
    let response = [];
    if (raw.length > 0) {
        raw.forEach(element => {
            response.push(convertObjectToCamelCase(element));
        });
    }
    return response;
};

const convertObjectToCamelCase = function (obj) {
    const keysToBeModified = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (key.indexOf("_") > -1) keysToBeModified.push(key);
        }
    }
    keysToBeModified.forEach(function (key) {
        obj[toCamelCase(key)] = obj[key];
        delete obj[key];
    });

    for (let key in obj){
        if (obj.hasOwnProperty(key) && typeof obj[key] === 'object' && obj[key] && Object.keys(obj[key]).length > 0) {
            obj[key] = convertObjectToCamelCase(obj[key]);
        }
    }
    return obj;
};

const toCamelCase = function (text) {
    if (!text) return text;
    return text.split("_").map(function (word, index) {
        if (index === 0) return word.toLowerCase();
        return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
    }).join("");
};

module.exports = {
    execute,
    query
};
