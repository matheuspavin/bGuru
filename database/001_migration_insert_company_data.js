'use strict';
var sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./database/borderGuru.sqlite');
console.log("Running the migration");
	
db.serialize( () => {
  db.run(`CREATE TABLE IF NOT EXISTS companies 
            (company_id integer PRIMARY KEY,
            company_name text NOT NULL, 
            company_address text, 
            company_register text,
            company_country text,
            active integer DEFAULT 1)`);
});

db.serialize( () => {
    db.run(`CREATE TABLE IF NOT EXISTS migrations 
              (migration_id integer PRIMARY KEY,
              migration_name text NOT NULL)`);
});
  
db.serialize( () => {
    db.run(`INSERT INTO migrations
                (migration_name)
            VALUES
                (?)`, ['001_migration_insert_company_data']);
});

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
});