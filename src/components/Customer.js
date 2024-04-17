import React, { useEffect, useState } from 'react';
const staticCustomers = [
    {
        id: 1,
        name: 'John Doe',
        role: 'Owner',
        joined: '02-04-2024',
        phone: '1234567890',
        email: 'john@example.com',
        property: 'BELDON'
    },
    {
        id: 2,
        name: 'Jane Smith',
        role: 'Owner',
        joined: '02-04-2024',
        phone: '9876543210',
        email: 'jane@example.com',
        property: 'BELDON'
    },
    // Add more static customer data as needed
];
const Customer = () => {
    // State for customer data
    const [customers, setCustomers] = useState([]);

    // Fetch customer data from API
    useEffect(() => {
        // Define function to fetch data
        const fetchData = async () => {
            try {
                // Fetch data from API
                // const response = await fetch('https://api.example.com/customers');
                // const data = await response.json();
                // Update state with fetched data
                setCustomers(staticCustomers);
            } catch (error) {
                console.error('Error fetching customer data:', error);
            }
        };

        // Call fetchData function
        fetchData();
    }, []); // Run only once on component mount

    // Function to sort customer data
    const sortCustomers = (key) => {
        // Implement sorting logic here
    };

    // Function to handle delete action
    const handleDelete = (customerId) => {
        // Implement delete action logic here
    };

    return (
        <div className="customer-container">
            <h2>Customer List</h2>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => sortCustomers('name')}>Name</th>
                        <th onClick={() => sortCustomers('role')}>Role</th>
                        <th onClick={() => sortCustomers('joined')}>Joined</th>
                        <th onClick={() => sortCustomers('phone')}>Phone</th>
                        <th onClick={() => sortCustomers('email')}>Email</th>
                        <th onClick={() => sortCustomers('property')}>Property</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer, index) => (
                        <tr key={index}>
                            <td>{customer.name}</td>
                            <td>{customer.role}</td>
                            <td>{customer.joined}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.email}</td>
                            <td>{customer.property}</td>
                            <td>
                                <i class="fa fa-trash" aria-hidden="true" onClick={() => handleDelete(customer.id)}></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Add pagination component here */}
        </div>
    );
};

export default Customer;
