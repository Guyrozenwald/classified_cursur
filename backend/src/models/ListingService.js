const sequelize = require('./index');

const ListingService = sequelize.define('ListingService', {}, { timestamps: false });

module.exports = ListingService; 