const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./models');
require('./models/associations');

const listingsRouter = require('./routes/listings');
const servicesRouter = require('./routes/services');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/listings', listingsRouter);
app.use('/services', servicesRouter);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}); 