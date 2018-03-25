var config = {};

config.database = process.env.DATABASE_ADDRESS || './database/borderGuru.sqlite';
config.migration = '/borderGuru.sqlite';

module.exports = config;