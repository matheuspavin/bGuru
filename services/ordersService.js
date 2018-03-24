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
        await databaseService.query(sql, params);
        const insertedId = await databaseService.query(`SELECT last_insert_rowid()as lastId`, []);
        return getOrderById(insertedId[0].lastId);
};

const getAll = async function () {
    const sql = `SELECT * FROM orders`;
    return databaseService.query(sql, []);
};

const getOrderById = function (orderId) {
    const sql = `SELECT * FROM orders
                 WHERE order_id = ?`;
    const params = [orderId];
    return databaseService.query(sql, params);
};

//TODO allways sending the deleted with sucess message, when do not exists, throw error
const deleteOrderById = function (orderId) {
    const sql = `DELETE FROM orders
                 WHERE order_id = ?`;
    const params = [orderId];
    databaseService.query(sql, params);
    return ('Order ' + orderId + ' deleted with sucess!');
};

const getOrdersByCompany = async function (companyName) {
    let orders = await getAll();
    orders = orders.filter( (order) => {
        return order.company_name.toUpperCase() === companyName.toUpperCase();
    })
    return orders;
};

const getOrdersByAddress = async function (customerAddress) {
    let orders = await getAll();
    orders = orders.filter( (order) => {
        return (order.customer_address).toUpperCase() === customerAddress.toUpperCase();
    })
    return orders;
};

module.exports = {
    insertOrder,
    getAll,
    getOrderById,
    deleteOrderById,
    getOrdersByCompany,
    getOrdersByAddress
}