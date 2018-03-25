'use strict';
const databaseService = require('./databaseService');
const ordersService = require('./ordersService');

const getAll = async function () {
    await integrateWithOrders();
    const sql = `SELECT * FROM companies`;
    return databaseService.query(sql, []);
};

const getCompanyByName = async function (companyName) {
    await integrateWithOrders();
    let companies = await getAll();
    companies = companies.filter( (company) => {
        return company.companyName.toUpperCase() === companyName.toUpperCase();
    })
    return companies;
};

const getCompanyById = async function (companyId) {
    await integrateWithOrders();
    const sql = `SELECT * FROM companies
                 WHERE company_id = ?`;
    const params = [companyId];
    return databaseService.query(sql, params);
};

const insertCompany = async function (company) {
    const sql = `INSERT INTO companies 
                        (company_id, company_name, company_address, company_register, company_country)
                    VALUES
                    (?, ?, ?, ?, ?)`;
    const params =  [
                        company.companyId,
                        company.companyName,
                        company.companyAddress,
                        company.companyRegister,
                        company.companyCountry
                    ]
    //TODO Refactor this return, because it can be done on the insert sql
        await databaseService.query(sql, params);
        const insertedId = await databaseService.query(`SELECT last_insert_rowid()as lastId`, []);
        return await getCompanyById(insertedId[0].lastId);
};

const updateCompany = async function (company) {
    const oldCompany = await getCompanyById(company.companyId);
    const sql = `UPDATE companies 
                    SET company_name = ?,
                        company_address = ?,
                        company_register = ?,
                        company_country = ?
                WHERE company_id = ?`;
    const params = [
        company.companyName,
        company.companyAddress,
        company.companyRegister,
        company.companyCountry,
        company.companyId
    ]
    await databaseService.query(sql, params);
    let ordersCompanies = await ordersService.getAll();
    ordersCompanies.forEach(async order => {
        if (oldCompany[0].companyName.toUpperCase() === order.companyName.toUpperCase()) {
            await ordersService.updateOrderCompany(order.orderId, company.companyName);
        };
    });

    return getCompanyById(company.companyId);
}

const integrateWithOrders = async function () {
    let ordersCompanies = await ordersService.getCompanies();
    let companies = await databaseService.query(`SELECT * FROM companies`, []);
    if (companies.length > 0) {
        for (let company of companies)
            ordersCompanies = ordersCompanies.filter( (saved) => {
                return saved.companyName.toUpperCase() !== company.companyName.toUpperCase();
        });
    }
    ordersCompanies.forEach(order => {
       let company = {
            companyName : order.companyName
        }
        insertCompany(company);
    });
};


module.exports = {
    getAll,
    getCompanyById,
    getCompanyByName,
    insertCompany,
    updateCompany
}