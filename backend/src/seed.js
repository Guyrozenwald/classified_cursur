const { Listing, Service } = require('./models/associations');
const sequelize = require('./models');

const seedData = async () => {
  try {
    // Create services
    const services = await Promise.all([
      Service.create({ name: 'Parking', type: 'amenity' }),
      Service.create({ name: 'Security', type: 'amenity' }),
      Service.create({ name: 'Pool', type: 'amenity' }),
      Service.create({ name: 'Gym', type: 'amenity' }),
      Service.create({ name: 'Warranty', type: 'vehicle' }),
      Service.create({ name: 'Maintenance', type: 'vehicle' }),
      Service.create({ name: 'Insurance', type: 'vehicle' })
    ]);

    // Create real estate listings
    const realEstateListings = await Promise.all([
      Listing.create({
        title: 'Modern Downtown Apartment',
        category: 'real_estate',
        price: 450000,
        location: 'Downtown',
        description: 'Beautiful 2-bedroom apartment with city views. Recently renovated with modern appliances.'
      }),
      Listing.create({
        title: 'Suburban Family Home',
        category: 'real_estate',
        price: 750000,
        location: 'Suburbs',
        description: 'Spacious 4-bedroom family home with large backyard. Great neighborhood with excellent schools.'
      }),
      Listing.create({
        title: 'Luxury Penthouse',
        category: 'real_estate',
        price: 1200000,
        location: 'City Center',
        description: 'Stunning penthouse with panoramic views. Features high-end finishes and premium amenities.'
      })
    ]);

    // Create vehicle listings
    const vehicleListings = await Promise.all([
      Listing.create({
        title: '2023 Tesla Model 3',
        category: 'vehicle',
        price: 45000,
        location: 'Downtown',
        description: 'Electric sedan in perfect condition. Low mileage, autopilot enabled.'
      }),
      Listing.create({
        title: '2022 Toyota RAV4',
        category: 'vehicle',
        price: 35000,
        location: 'Suburbs',
        description: 'Reliable SUV with excellent fuel efficiency. One owner, regular maintenance.'
      }),
      Listing.create({
        title: '2021 BMW X5',
        category: 'vehicle',
        price: 65000,
        location: 'City Center',
        description: 'Luxury SUV with premium features. Leather interior, navigation system.'
      })
    ]);

    // Associate services with listings
    await realEstateListings[0].setServices([services[0].id, services[1].id, services[2].id]); // Apartment with parking, security, pool
    await realEstateListings[1].setServices([services[0].id, services[3].id]); // House with parking and gym
    await realEstateListings[2].setServices([services[0].id, services[1].id, services[2].id, services[3].id]); // Penthouse with all amenities

    await vehicleListings[0].setServices([services[4].id, services[5].id, services[6].id]); // Tesla with warranty, maintenance, insurance
    await vehicleListings[1].setServices([services[4].id, services[6].id]); // Toyota with warranty and insurance
    await vehicleListings[2].setServices([services[4].id, services[5].id, services[6].id]); // BMW with all services

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
};

// Run the seed function
seedData(); 