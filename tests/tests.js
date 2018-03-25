const ordersService = require('../services/ordersService');
const testOrders = require('../utils/orders');
const expect = require('chai').expect
const databaseService = require('../services/databaseService');

before(async function () {

    var create = `CREATE TABLE IF NOT EXISTS orders 
            (order_id integer PRIMARY KEY,
            company_name text NOT NULL, 
            customer_address text NOT NULL, 
            ordered_item text NOT NULL, 
            price integer NOT NULL, 
            currency integer NOT NULL)`;
    await databaseService.execute(create, []);
    
    await testOrders.orders.forEach(async order =>  {
        await ordersService.insertOrder(order);
    });
});

describe('Orders tests',  function () {
    
    it('Add new order', async function () {
        let orderToAdd = { 
                "orderId": 099,
                "companyName": "TestTrader",
                "customerAdress": "Abbey road",
                "orderedItem":  "Disc Album",
                "price":  5,
                "currency": "EUR"
        }
        let orderAdded = await ordersService.insertOrder(orderToAdd);
        expect(orderAdded[0].order_id).to.be.equal(99);
        expect(orderAdded[0].customer_address).to.be.equal('Abbey road');
    });
    it('Show all orders from a particular company', async function () {
        let ordersFromCompany = await ordersService.getOrdersByCompany('MegaCorp');
        expect(ordersFromCompany.length).to.be.equal(2);
        expect(ordersFromCompany[0].order_id).to.be.equal(3);
        expect(ordersFromCompany[0].customer_address).to.be.equal('Steindamm 80');
    });
    it('Show all orders to a particular address', async function () {
        let ordersFromAddress = await ordersService.getOrdersByAddress('Reeperbahn 153');
        expect(ordersFromAddress.length).to.be.equal(3);
        expect(ordersFromAddress[0].order_id).to.be.equal(2);
        expect(ordersFromAddress[0].company_name).to.be.equal('Cheapskates');
    });
    it('Delete a particular order given an OrderId', async function () {
        let deleteOrder = await ordersService.deleteOrderById(99);
        expect(deleteOrder).to.be.equal('Order 99 deleted with sucess!');
    });
    it('Display how often each item has been ordered, in descending order', async function () {
        let orderedItens = await ordersService.getOrderedItens();
        expect(orderedItens[1].ordered_item).to.be.equal('Macbook');
        expect(orderedItens[1].quantity).to.be.equal(2);
    });
    it('** Extra test ** Get all companies', async function () {
        let companies = await ordersService.getCompanies();
        expect(companies.length).to.be.equal(3);
        expect(companies[0].company_name).to.be.equal('Cheapskates');
    });

});

after(async function () {
    const del = 'DROP TABLE IF EXISTS orders';
    await databaseService.execute(del, []);
});