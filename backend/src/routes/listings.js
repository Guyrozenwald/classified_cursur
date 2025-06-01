const express = require('express');
const { Listing, Service } = require('../models/associations');

const router = express.Router();

// Create a new listing
router.post('/', async (req, res) => {
  try {
    const { title, category, price, location, description, serviceIds } = req.body;
    const listing = await Listing.create({ title, category, price, location, description });
    if (serviceIds && Array.isArray(serviceIds)) {
      await listing.setServices(serviceIds);
    }
    res.status(201).json(listing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all listings
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.findAll({ include: Service });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single listing
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findByPk(req.params.id, { include: Service });
    if (!listing) return res.status(404).json({ error: 'Listing not found' });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a listing
router.put('/:id', async (req, res) => {
  try {
    const { title, category, price, location, description, serviceIds } = req.body;
    const listing = await Listing.findByPk(req.params.id);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });
    await listing.update({ title, category, price, location, description });
    if (serviceIds && Array.isArray(serviceIds)) {
      await listing.setServices(serviceIds);
    }
    res.json(listing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a listing
router.delete('/:id', async (req, res) => {
  try {
    const listing = await Listing.findByPk(req.params.id);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });
    await listing.destroy();
    res.json({ message: 'Listing deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 