import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Customer from './components/Customer'; // Import your Customer component
import Inventory from './components/Inventory';
import InventoryDetail from './components/InventoryDetail/InventoryDetail';
import InventoryNewConnection from './components/InventoryNewConnection/InventoryNewConnection';
import ContactList from "./components/contactList/ContactList.tsx"
import WeatherDetail from "./components/Weather/Weather.tsx"
// Import other components as needed

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Customer />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/inventory-details" element={<InventoryDetail />} />
        <Route path="/inventory-new-connection" element={<InventoryNewConnection />} />
        <Route path="/weather" element={<WeatherDetail />} />
        <Route path="/contact" element={<ContactList />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default Routing;
