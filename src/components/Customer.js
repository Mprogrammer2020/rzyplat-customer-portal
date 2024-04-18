import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { APIServices } from '../services/APIServices';
import { exceptionHandling } from '../Common/CommonComponents';

const Customer = () => {
    // State for customer data
    const [customers, setCustomers] = useState([]);
    const [filter, setFilter] = useState({page:0,size:10,sortBy:"name",orderBy:"ASC"});




    // Fetch customer data from API
    useEffect(() => {

        // Call getCustomers function
        getCustomers(filter);
    }, []);

// Define function to fetch Customers

    async function getCustomers(params) {
        try {
            const response = await APIServices.getCustomers(params);
            if (response.status === 200) {
                console.log("response.data.data",response.data.data);
                setCustomers(response.data.data);
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            exceptionHandling(error);
            console.error('Error fetching data:', error);
        }
    }

    // Function to sort customer data
    const sortCustomers = () => {
        // Implement sorting logic here
        let filterTemp ={...filter}; 
        if (filter.sortBy =="name") {
            filterTemp.sortBy ="email";
        }else{
            filterTemp.sortBy ="name";
        }
        setFilter(filterTemp);
        getCustomers(filterTemp);

    };

    // Function to handle delete action
    const handleDelete = async (customerId) => {
        // Implement delete action logic here
        try {
            const response = await APIServices.deleteCustomer(customerId);
            if (response.status === 200) {
                getCustomers(filter);
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            exceptionHandling(error);
            console.error('Error fetching data:', error);
        }
    };

    function createDateFromData(createdDate) {
        // Extract date components from data
        const [year, month, day, hours, minutes, seconds, milliseconds] = createdDate;
        // createdDate = new Date(year, month - 1, day, hours, minutes, seconds, milliseconds);
        const formattedDate = `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`;
        return formattedDate;
    }

    const customersRef = useRef()

    const onScroll = async () => {
        if (customersRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = customersRef.current;
            if (scrollTop + clientHeight === scrollHeight) {
//                 let page = nextPage + 1, totalPages = Number(latestTokens.total_pages);
//                 if (page < totalPages) {
//                     await getLatestTokens(page, "BOTTOM");
//                     setNextPage(page)
// ;
//                 }
            }
        }
    };
      

    return (
        <section className='customer-section'>
            {/* header section statr */}
            <header className='mobile-header'>
                <Row className='align-items-center'>
                    <Col xs={6} md={6}>
                        <div className='header-left-box'>
                            <h5 className='heading-main'><img src={require("../assets/images/ci_building-04.svg").default} className="me-2" alt="icons" /> Customers</h5>
                        </div>
                    </Col>
                    <Col xs={6} md={6}>
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
                    <h5 className='heading-main'>
                        <img src={require("../assets/images/ci_building-04 (1).svg").default} className="me-2" alt="icons" /> 
                        Customers <span className='mobile-tab'>List</span> 
                        <span className='customer-mobile-text'>{customers?.total}</span></h5>
                    <div className='sort-box d-flex align-items-center'>
                        <h5 onClick={()=>sortCustomers()}><span className='mobile-tab'>SORT BY </span>
                        <img src={require("../assets/images/mi_filter-blue.svg").default} className="ms-2" alt="icons" /> 
                        </h5>
                        <p className='mobile-tab'>{customers?.total}</p>
                    </div>
                </div>
                <div className="customer-container-body">
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Joined</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Property</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <div ref={customersRef} onScroll={onScroll} className="customer-scroll">
                            {customers?.list?.map((customer, index) => (
                                <tr key={index}>
                                    <td><p className='d-flex align-items-center'><span className='customer-name'>{customer.name.charAt(0).toUpperCase()}</span>{customer.name}</p></td>
                                    <td><p className='role'>{customer.role}</p></td>
                                    <td>{createDateFromData(customer.createdDate)}</td>
                                    <td>{customer.phone}</td>
                                    <td>{customer.email}</td>
                                    <td><p className='property'>
                                    {customer?.property.map((property,innerIndex)=>{
                                        return(<>
                                            {innerIndex % 2 ==0 ?
                                                <><img src={require("../assets/images/ph_door-light.svg").default} className="me-2" alt="icons" /> {property}</>:
                                                <> | <img src={require("../assets/images/ph_door-light (1).svg").default} className="me-2" alt="icons" /> {property} 
                                                </>
                                            }
                                        </>)
                                    })}
                                        </p>
                                    </td>
                                    <td>
                                        <img src={require("../assets/images/ic_round-delete.svg").default} className="cursor-pointer" alt="icons" onClick={() => handleDelete(customer.id)} />
                                    </td>
                                </tr>
                            ))}
                            </div>
                        </tbody>
                        
                    </table>
                </div>

                {/* mobile side cards */}
                {customers?.list?.map((customer, index) => (
                    <div className='mobile-side-customer'>
                        <p className='d-flex align-items-center'><span className='customer-name'>{customer.name.charAt(0).toUpperCase()}</span>{customer.name}</p>
                        <hr></hr>
                        <p className='role'><span><img src={require("../assets/images/call.svg").default} className="cursor-pointer me-2" alt="icons" />Phone</span> <span className='number'>{customer.phone}</span></p>
                        <p className='role'><span><img src={require("../assets/images/email.svg").default} className="cursor-pointer me-2" alt="icons" />Email</span> <span className='number'>{customer.email}</span></p>
                        <p className='role'><span><img src={require("../assets/images/date.svg").default} className="cursor-pointer me-2" alt="icons" />Joined</span> <span className='number'>{createDateFromData(customer.createdDate)}</span></p>
                        <p className='role'><span><img src={require("../assets/images/building.svg").default} className="cursor-pointer me-2" alt="icons" />Property</span> <span className='number'>{customer?.property.map((property,innerIndex)=>{ return innerIndex ? ` | ${property}` : property })}</span></p>
                        <div className='trash-section d-flex justify-content-between mt-2'>
                            <Button className="blue-btn">{customer.role}</Button>
                            <img src={require("../assets/images/ic_round-delete.svg").default} className="cursor-pointer" alt="icons" onClick={() => handleDelete(customer.id)} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Customer;
