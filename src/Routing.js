import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Customer from './components/Customer'; // Import your Customer component
import Inventory from './components/Inventory';
import InventoryDetail from './components/InventoryDetail/InventoryDetail';
import InventoryNewConnection from './components/InventoryNewConnection/InventoryNewConnection';
import ContactList from "./components/contactList/ContactList.tsx"
import WeatherDetail from "./components/Weather/Weather.tsx"
import Alert from './components/Alert/Alert.tsx';
import Fire from './components/Fire/Fire.tsx';
import SystemDevice from './components/Fire/SystemDevice.tsx';
import Mold from './components/Mold/Mold.tsx';
import Security from './components/Security/Security.tsx';
import Insurance from './components/Insurance/Insurance.tsx';
import SystemMonitoring from './components/SystemMonitoring/SystemMonitoring.tsx';
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
        <Route path ="/alert" element={<Alert />} />
        <Route path ="/fire" element={<Fire />} />
        <Route path ="/system-device" element={<SystemDevice />} />
        <Route path ="/mold" element={<Mold />} />
        <Route path ="/security" element={<Security />} />
        <Route path ="/insurance" element={<Insurance />} />
        <Route path ="/system-monitoring" element={<SystemMonitoring />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default Routing;
