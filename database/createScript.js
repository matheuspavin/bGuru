'use strict';
var sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./database/borderGuru.sqlite');
console.log("Running the creation script");
	
db.serialize( () => {
  db.run(`CREATE TABLE IF NOT EXISTS orders 
            (order_id integer PRIMARY KEY,
            company_name text NOT NULL, 
            customer_address text NOT NULL, 
            ordered_item text NOT NULL, 
            price integer NOT NULL, 
            currency integer NOT NULL)`);
});

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
});
