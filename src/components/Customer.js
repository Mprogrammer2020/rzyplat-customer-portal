import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
        <section className='customer-section'>
            {/* header section statr */}
            <header>
                <Row className='align-items-center'>
                    <Col md={6}>
                        <div className='header-left-box'>
                            <h5 className='heading-main'><img src={require("../assets/images/ci_building-04.svg").default} className="me-2" alt="icons" /> Customers</h5>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className='header-right-box'>
                            <Form>
                                <Form.Group className="position-relative w-50" controlId="exampleForm.ControlInput1">
                                    <img src={require("../assets/images/iconamoon_search.svg").default} className="search-icon" alt="icons" /> 
                                    <Form.Control type="email" placeholder="Search" />
                                    <span className='cutomer-text'>CUSTOMERS</span>
                                    <img src={require("../assets/images/mi_filter.svg").default} className="filter-icon" alt="icons" /> 
                                </Form.Group>
                                <Link>
                                    <img src={require("../assets/images/mdi_message-badge.svg").default} className="" alt="icons" /> 
                                </Link>
                                <Link>
                                    <img src={require("../assets/images/streamline_notification-alarm-2-solid.svg").default} className="" alt="icons" /> 
                                </Link>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </header>
            {/* header section ends */}
            <div className='customer-outer-section'>
                <div className='customer-list-header d-flex align-items-center justify-content-between'>
                    <h5 className='heading-main'><img src={require("../assets/images/ci_building-04 (1).svg").default} className="me-2" alt="icons" /> Customers List</h5>
                    <div className='sort-box d-flex align-items-center'>
                        <h5>SORT BY <img src={require("../assets/images/mi_filter-blue.svg").default} className="ms-2" alt="icons" /> </h5>
                        <p>405</p>
                    </div>
                </div>
                <div className="customer-container-body">
                    <table className='table'>
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
                                    <td><p className='d-flex align-items-center'><span className='customer-name'>C</span>{customer.name}</p></td>
                                    <td><p className='role'>{customer.role}</p></td>
                                    <td>{customer.joined}</td>
                                    <td>{customer.phone}</td>
                                    <td>{customer.email}</td>
                                    <td><p className='property'><img src={require("../assets/images/ph_door-light.svg").default} className="me-2" alt="icons" />{customer.property}  |  <img src={require("../assets/images/ph_door-light (1).svg").default} className="me-2" alt="icons" /> UNIT <span className='number'>02</span> </p></td>
                                    <td>
                                    <img src={require("../assets/images/ic_round-delete.svg").default} className="cursor-pointer" alt="icons" onClick={() => handleDelete(customer.id)} />
                                    </td>
                                </tr>
                            ))} 
                        </tbody>
                    </table>
                    {/* Add pagination component here */}
                </div>
            </div>
        </section>
    );
};

export default Customer;
