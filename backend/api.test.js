const request = require('supertest');

const API_URL = 'http://localhost:3000';

describe('Listings API regression tests', () => {
  let createdListingId;

  // Create a listing to use for get/delete/search
  it('should create a new listing', async () => {
    const res = await request(API_URL)
      .post('/listings')
      .send({
        title: 'Test Car',
        category: 'vehicle',
        price: 10000,
        location: 'Test City',
        description: 'A test car listing',
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdListingId = res.body.id;
  });

  // Search (get all)
  it('should search (get all) listings', async () => {
    const res = await request(API_URL).get('/listings');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some(l => l.id === createdListingId)).toBe(true);
  });

  // Get by ID
  it('should get a listing by id', async () => {
    const res = await request(API_URL).get(`/listings/${createdListingId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', createdListingId);
  });

  // Delete
  it('should delete a listing by id', async () => {
    const res = await request(API_URL).delete(`/listings/${createdListingId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Listing deleted');
  });

  // Confirm deletion
  it('should return 404 for deleted listing', async () => {
    const res = await request(API_URL).get(`/listings/${createdListingId}`);
    expect(res.statusCode).toBe(404);
  });
}); 