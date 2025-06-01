const express = require('express');
const { Service } = require('../models/associations');

const router = express.Router();

// Create a new service
router.post('/', async (req, res) => {
  try {
    const { name, type } = req.body;
    const service = await Service.create({ name, type });
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single service
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a service
router.put('/:id', async (req, res) => {
  try {
    const { name, type } = req.body;
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    await service.update({ name, type });
    res.json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a service
router.delete('/:id', async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    await service.destroy();
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 