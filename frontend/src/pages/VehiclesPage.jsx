import React, { useEffect, useState } from 'react';
import axios from 'axios';

function VehiclesPage() {
  const [listings, setListings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/listings?category=vehicle')
      .then(res => {
        setListings(res.data);
        setFiltered(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    let data = listings;
    if (search) {
      data = data.filter(l => l.title.toLowerCase().includes(search.toLowerCase()));
    }
    if (minPrice) {
      data = data.filter(l => l.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      data = data.filter(l => l.price <= parseFloat(maxPrice));
    }
    if (location) {
      data = data.filter(l => l.location.toLowerCase().includes(location.toLowerCase()));
    }
    setFiltered(data);
  }, [search, minPrice, maxPrice, location, listings]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Vehicles</h1>
      <div className="flex gap-2 mb-4">
        <input className="border p-2" placeholder="Search title..." value={search} onChange={e => setSearch(e.target.value)} />
        <input className="border p-2" placeholder="Min Price" type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
        <input className="border p-2" placeholder="Max Price" type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
        <input className="border p-2" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(listing => (
          <div key={listing.id} className="border rounded p-4 shadow">
            <h2 className="text-xl font-semibold">{listing.title}</h2>
            <p className="text-gray-600">{listing.location}</p>
            <p className="text-gray-800 font-bold">${listing.price}</p>
            <p className="mb-2">{listing.description}</p>
            <div>
              <span className="font-semibold">Services:</span>
              <ul className="list-disc ml-5">
                {listing.Services && listing.Services.length > 0 ? (
                  listing.Services.map(service => (
                    <li key={service.id}>{service.name} ({service.type})</li>
                  ))
                ) : (
                  <li>No services</li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VehiclesPage; 