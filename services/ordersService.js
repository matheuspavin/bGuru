const databaseService = require('./databaseService');

const insertOrder = function (order) {
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
    databaseService.query(sql, params);
}


const getAll = function () {
    const sql = `SELECT * FROM orders`;
    return databaseService.query(sql, []);
} 


module.exports = {
    insertOrder,
    getAll
}