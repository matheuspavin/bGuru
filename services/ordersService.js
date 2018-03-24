'use strict';
const databaseService = require('./databaseService');

const insertOrder = async function (order) {
    const sql = `INSERT INTO orders 
                        (order_id, company_name, customer_address, ordered_item, price, currency)
                    VALUES
                    (?, ?, ?, ?, ?, ?)`;
    const params =  [
                        order.orderId,
                        order.companyName,
                        order.customerAdress,
                        order.orderedItem,
                        order.price,
                        order.currency
                    ]
    //TODO Refactor this return, because it can be done on the insert sql
    try {
        await databaseService.query(sql, params);
        const insertedId = await databaseService.query(`SELECT last_insert_rowid()as lastId`, []);
        return getOrderById(insertedId[0].lastId);
    } catch (error) {
        return error;
    }
};

const getAll = async function () {
    const sql = `SELECT * FROM orders`;
    let ret;
    try {
        ret = await databaseService.query(sql, []);
    } catch (error) {
        return error
    }
    return ret;
};

const getOrderById = function (orderId) {
    const sql = `SELECT * FROM ORDERS
                 WHERE order_id = ?`;
    const params = [orderId];
    return databaseService.query(sql, params);
}

module.exports = {
    insertOrder,
    getAll
}