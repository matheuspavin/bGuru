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
        return company.company_name.toUpperCase() === companyName.toUpperCase();
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

const integrateWithOrders = async function () {
    let ordersCompanies = await ordersService.getCompanies();
    let companies = await databaseService.query(`SELECT * FROM companies`, []);
    if (companies.length > 0) {
        for (let company of companies)
            ordersCompanies = ordersCompanies.filter( (saved) => {
                return saved.company_name.toUpperCase() !== company.company_name.toUpperCase();
        });
    }
    ordersCompanies.forEach(order => {
       let company = {
            companyName : order.company_name
        }
        insertCompany(company);
    });
};


module.exports = {
    getAll,
    getCompanyById,
    getCompanyByName,
    insertCompany
}