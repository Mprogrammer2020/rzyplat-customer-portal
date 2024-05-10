import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Customer from './components/Customer'; // Import your Customer component
import Inventory from './components/Inventory';
import InventoryDetail from './components/InventoryDetail/InventoryDetail';
// Import other components as needed

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Customer />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/inventory-details" element={<InventoryDetail />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default Routing;
