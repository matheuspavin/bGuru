const expect = require('chai').expect
const databaseService = require('../services/databaseService');
const ordersService = require('../services/ordersService');
const companiesService = require('../services/companiesService');
const testOrders = require('../utils/orders');

before(async function () {

    let createOrders = `CREATE TABLE IF NOT EXISTS orders 
            (order_id integer PRIMARY KEY,
            company_name text NOT NULL, 
            customer_address text NOT NULL, 
            ordered_item text NOT NULL, 
            price integer NOT NULL, 
            currency integer NOT NULL)`;
    await databaseService.execute(createOrders, []);

    let creatCompanies = `CREATE TABLE IF NOT EXISTS companies 
            (company_id integer PRIMARY KEY,
            company_name text NOT NULL, 
            company_address text, 
            company_register text,
            company_country text,
            active integer DEFAULT 1)`;
    await databaseService.execute(creatCompanies, []);
    
    await testOrders.orders.forEach(async order =>  {
        await ordersService.insertOrder(order);
    });

    await companiesService.getAll();
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
        expect(orderAdded[0].orderId).to.be.equal(99);
        expect(orderAdded[0].customerAddress).to.be.equal('Abbey road');
    });
    it('Show all orders from a particular company', async function () {
        let ordersFromCompany = await ordersService.getOrdersByCompany('MegaCorp');
        expect(ordersFromCompany.length).to.be.equal(2);
        expect(ordersFromCompany[0].orderId).to.be.equal(3);
        expect(ordersFromCompany[0].customerAddress).to.be.equal('Steindamm 80');
    });
    it('Show all orders to a particular address', async function () {
        let ordersFromAddress = await ordersService.getOrdersByAddress('Reeperbahn 153');
        expect(ordersFromAddress.length).to.be.equal(3);
        expect(ordersFromAddress[0].orderId).to.be.equal(2);
        expect(ordersFromAddress[0].companyName).to.be.equal('Cheapskates');
    });
    it('Delete a particular order given an OrderId', async function () {
        let deleteOrder = await ordersService.deleteOrderById(99);
        expect(deleteOrder).to.be.equal('Order 99 deleted with sucess!');
    });
    it('Display how often each item has been ordered, in descending order', async function () {
        let orderedItens = await ordersService.getOrderedItens();
        expect(orderedItens[1].orderedItem).to.be.equal('Macbook');
        expect(orderedItens[1].quantity).to.be.equal(2);
    });
    it('** Extra test ** Get all companies', async function () {
        let companies = await ordersService.getCompanies();
        expect(companies.length).to.be.equal(3);
        expect(companies[0].companyName).to.be.equal('Cheapskates');
    });

});

describe('Companies tests',  function () {
    
    it('Get company info (id)', async function () {
        let companyInfo = await companiesService.getCompanyById(1);
        expect(companyInfo[0].companyName).to.be.equal('Cheapskates');
    });

    it('Get company info (name)', async function () {
        let companyInfo = await companiesService.getCompanyByName('Cheapskates');
        expect(companyInfo[0].companyId).to.be.equal(1);
    });

    it('Update company info', async function () {
        let companyInfo = await companiesService.getCompanyById(1);
        companyInfo[0].companyName = 'ExpensiveSkates';
        let newCompanyInfo = await companiesService.updateCompany(1, companyInfo[0]);
        expect(newCompanyInfo[0].companyId).to.be.equal(1);
        expect(newCompanyInfo[0].companyName).to.be.equal('ExpensiveSkates');
    });

    it('Delete company(id)', async function () {
        let deleted = await companiesService.deleteCompanyById(1);
        let companies = await companiesService.getAll();
        expect(deleted).to.be.equal('Company deleted successfully');
    });

    it('** Extra test ** Adding company', async function () {
        let companyToAdd = { 
                "companyId": 099,
                "companyName": "TestBestTrader",
                "companyAddress": "Abbey road",
        }
        let companyAdded = await companiesService.insertCompany(companyToAdd);
        expect(companyAdded[0].companyId).to.be.equal(99);
        expect(companyAdded[0].companyAddress).to.be.equal('Abbey road');
    });

    it('Get all order bought by one company(id)', async function () {
        let orders = await companiesService.getAllOrdersFromCompany(2);
        expect(orders[1].orderedItem).to.be.equal('Playstation 4');
    });

    it('Get the amount of money paid by a company(id)', async function () {
        let companyInfo = await companiesService.getAmountOfMoneyByCompany(2);
        expect(companyInfo).to.be.equal(290);
    });

    it('Get all companies that bought a certain orderItem', async function () {
        let orders = await companiesService.getOrdersByItem('Macbook');
        expect(orders[1].companyName).to.be.equal('SuperTrader');
    });
    
});

after(async function () {
    const delOrders = 'DROP TABLE IF EXISTS orders';
    await databaseService.execute(delOrders, []);

    const delCompanies = 'DROP TABLE IF EXISTS companies';
    await databaseService.execute(delCompanies, []);
});