var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('borderGuru.db')

db.serialize(function () {
    db.run('CREATE TABLE [IF NOT EXISTS] borderGuru.order (
        order_id integer PRIMARY KEY,
        company_name text NOT NULL, 
        customer_address text NOT NULL, 
        ordered_item text NOT NULL, 
        price integer NOT NULL, 
        currency integer NOT NULL) 
        table_constraint
        )'
    );
})

db.close()
