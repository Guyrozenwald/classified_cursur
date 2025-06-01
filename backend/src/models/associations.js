const Listing = require('./Listing');
const Service = require('./Service');
const ListingService = require('./ListingService');

Listing.belongsToMany(Service, { through: ListingService, foreignKey: 'listingId' });
Service.belongsToMany(Listing, { through: ListingService, foreignKey: 'serviceId' });

module.exports = { Listing, Service, ListingService }; 