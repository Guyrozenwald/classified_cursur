import { Routes, Route, Link } from 'react-router-dom';
import RealEstatePage from './pages/RealEstatePage';
import VehiclesPage from './pages/VehiclesPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex gap-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/real-estate" className="hover:text-gray-300">Real Estate</Link>
          <Link to="/vehicles" className="hover:text-gray-300">Vehicles</Link>
        </div>
      </nav>

      <main className="container mx-auto py-4">
        <Routes>
          <Route path="/" element={<div className="text-center p-8">
            <h1 className="text-3xl font-bold mb-4">Welcome to Classified Ads</h1>
            <p className="text-lg">Browse our listings for real estate and vehicles.</p>
          </div>} />
          <Route path="/real-estate" element={<RealEstatePage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
