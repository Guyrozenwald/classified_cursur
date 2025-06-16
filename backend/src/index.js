const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./models');
require('./models/associations');

const listingsRouter = require('./routes/listings');
const servicesRouter = require('./routes/services');

dotenv.config();

const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.use('/listings', listingsRouter);
app.use('/services', servicesRouter);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}); 