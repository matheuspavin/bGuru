var config = {};

config.database = process.env.DATABASE_ADDRESS || './database/borderGuru.sqlite';

module.exports = config;