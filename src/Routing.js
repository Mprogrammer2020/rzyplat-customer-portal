import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Customer from './components/Customer'; // Import your Customer component
// Import other components as needed

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Customer />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default Routing;
