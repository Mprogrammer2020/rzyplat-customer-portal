import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { APIServices } from '../services/APIServices';
import { exceptionHandling } from '../Common/CommonComponents';
import Skeleton from 'react-loading-skeleton';
import swal from 'sweetalert';
// import "@testing-library/jest-dom";


const Customer = () => {
    // State for customer data
    const [customers, setCustomers] = useState([]);
    const [filter, setFilter] = useState({ page: 0, size: 10, sortBy: "name", orderBy: "DESC" });
    const customersRef = useRef();
    const loadingResponse = useRef(false);

    useEffect(() => {

        // Call getCustomers function
        getCustomers(filter);
    }, []);

    // Define function to fetch Customers

    async function getCustomers(params) {
        try {
            const response = await APIServices.getCustomers(params.page, params.size, params.sortBy, params.orderBy);
            if (response.status === 200) {
                let responseData = response.data;
                let tempList;
                if (params.page == 0) {
                    tempList = [];
                } else {
                    tempList = [...customers.list];
                }
                tempList.push(...responseData.list);
                responseData.list = tempList;
                setCustomers(responseData);
                loadingResponse.current = false;

            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            loadingResponse.current = false;
            exceptionHandling(error);
            console.error('Error fetching data:', error);
        }
    }

    // Function to sort customer data
    const sortCustomers = (sortOrder) => {
        let filterTemp = { ...filter };
        const parts = sortOrder.split(" ");
        filterTemp.sortBy = parts[0].toLowerCase();
        filterTemp.orderBy = parts[1];
        filterTemp.page = 0;
        setFilter(filterTemp);
        getCustomers(filterTemp);

    };

    // Function to handle delete action
    const handleDelete = async (customerId) => {
        // Implement delete action logic here
        swal({title:"", text:"Are you sure you want to delete this customer?", icon:"warning",  buttons: ["No","Yes"]}).then(async (res) => {
            if (res) {
                try {
                    setCustomers(prevCustomers => ({
                        ...prevCustomers,
                        totalRecords: Number(prevCustomers.totalRecords) - 1,
                        list: prevCustomers.list.filter(customer => customer.id !== customerId)
                    }));
                    const response = await APIServices.deleteCustomer(customerId);
                    if (response.status === 200) {

                    } else {
                        throw new Error('Failed to fetch data');
                    }
                } catch (error) {
                    exceptionHandling(error);
                    console.error('Error fetching data:', error);
                }
            }
        });
    };

    function createDateFromData(createdDate) {
        // Extract date components from data
        const [year, month, day, hours, minutes, seconds, milliseconds] = createdDate;
        // createdDate = new Date(year, month - 1, day, hours, minutes, seconds, milliseconds);
        const formattedDate = `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`;
        return formattedDate;
    }




    const onScroll = async () => {
        if (customersRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = customersRef.current;
            if (scrollTop + clientHeight === scrollHeight) {
                const totalPages = Math.ceil(customers?.totalElements / filter.size);
                let filterTemp = { ...filter };
                filterTemp.page = filterTemp.page + 1
                if (filterTemp.page < totalPages && !loadingResponse.current) {
                    loadingResponse.current = true;
                    setFilter(filterTemp);
                    getCustomers(filterTemp);
                }
            }
        }
    };

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const sortByOption = ["Name ASC", "Role ASC", "Joined ASC", "Phone ASC", "Email ASC",
        "Name DESC", "Role DESC", "Joined DESC", "Phone DESC", "Email DESC",]

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
            <div className='customer-outer-section' >
                <div className='customer-list-header-mobile'>
                    <div className='customer-list-header d-flex align-items-center justify-content-between'>
                        <h5 className='heading-main'>
                            <img src={require("../assets/images/ci_building-04 (1).svg").default} className="me-2" alt="icons" />
                            Customers <span className='mobile-tab'>List</span>
                            <span className='customer-mobile-text'>{customers?.totalRecords}</span></h5>
                        <div className='sort-box d-flex align-items-center'>
                            <Form.Select aria-label="Default select example" className='mobile-tab inner-mobile-tab cursor-pointer' value={`${capitalizeFirstLetter(filter.sortBy)} ${filter.orderBy}`} onChange={(e) => sortCustomers(e.target.value)}>
                                <option value={"Name DESC"}>SORT BY</option>
                                {sortByOption.map((option, index) => {
                                    return (<option value={option}>{option.replace("ASC", "Assending").replace("DESC", "Desending")}</option>)
                                })}
                            </Form.Select>
                            <img src={require("../assets/images/mi_filter-blue.svg").default} className="ms-2" alt="icons" />
                            <p className='mobile-tab'>{customers?.totalRecords}</p>
                        </div>
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
                                <th className='email-section'>Email</th>
                                <th className='property-section'>Property</th>
                                <th className='action-div'>Action</th>
                            </tr>
                        </thead>
                        <tbody ref={customersRef} onScroll={onScroll} className="customer-scroll">
                            {customers.length <= 0 ? <div className='border-radius'>
                                <tr>
                                    <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} count={20} /></td>
                                    <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} count={20} /></td>
                                    <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} count={20} /></td>
                                    <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} count={20} /></td>
                                    <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} count={20} /></td>
                                    <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} count={20} /></td>
                                    <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} count={20} /></td>
                                </tr>
                            </div> : customers?.list?.map((customer, index) => (
                                <tr key={index}>
                                    <td><p className='d-flex align-items-center'><span className='customer-name'>{customer.name ? customer.name.charAt(0).toUpperCase() : ""}</span>{customer.name}</p></td>
                                    <td><p className='role'>{customer.role}</p></td>
                                    <td>{createDateFromData(customer.createdDate)}</td>
                                    <td>{customer.phone}</td>
                                    <td className='email-section'>{customer.email}</td>
                                    <td className='property-section'><p className='property'>
                                        {customer?.property.map((property, innerIndex) => {
                                            return (<>
                                                {innerIndex % 2 == 0 ?
                                                    <><img src={require("../assets/images/ph_door-light.svg").default} className="me-2" alt="icons" /> {capitalizeFirstLetter(property)}</> :
                                                    <><span className='space-maker'>|</span> <img src={require("../assets/images/ph_door-light (1).svg").default} className="me-2" alt="icons" /> {capitalizeFirstLetter(property)}
                                                    </>
                                                }
                                            </>)
                                        })}
                                    </p>
                                    </td>
                                    <td className='action-div'>
                                        <img src={require("../assets/images/ic_round-delete.svg").default} className="cursor-pointer" alt="icons" onClick={() => handleDelete(customer.id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* mobile side cards */}
                <div className='customer-mobile-outer'>
                <div ref={customersRef} onScroll={onScroll} className="customer-scroll mobile ">
                    {customers.length <= 0 ?
                        <>{
                            Array.from({ length: 5 }).map(() => (<div className='mobile-side-customer'>

                                <p className='d-flex align-items-center'><span className='customer-name'><Skeleton className="main-wallet-top mb-2" height={30} width={10} /></span><Skeleton className="main-wallet-top mb-2" height={30} width={200} /></p>
                                <hr></hr>
                                <p className='role'><span><img src={require("../assets/images/call.svg").default} className="cursor-pointer me-2" alt="icons" />Phone</span> <span className='number'><Skeleton className="main-wallet-top mb-2" height={30} width={150} /></span></p>
                                <p className='role'><span><img src={require("../assets/images/email.svg").default} className="cursor-pointer me-2" alt="icons" />Email</span> <span className='number'><Skeleton className="main-wallet-top mb-2" height={30} width={150} /></span></p>
                                <p className='role'><span><img src={require("../assets/images/date.svg").default} className="cursor-pointer me-2" alt="icons" />Joined</span> <span className='number'><Skeleton className="main-wallet-top mb-2" height={30} width={150} /></span></p>
                                <p className='role'><span><img src={require("../assets/images/building.svg").default} className="cursor-pointer me-2" alt="icons" />Property</span> <span className='number'><Skeleton className="main-wallet-top mb-2" height={30} width={150} /></span></p>
                                <div className='trash-section d-flex justify-content-between mt-2'>
                                    <Skeleton className="main-wallet-top mb-2" height={30} width={150} />
                                    <img src={require("../assets/images/ic_round-delete.svg").default} className="cursor-pointer" alt="icons" />
                                </div>

                            </div>))
                        }</>
                        :
                        customers?.list?.map((customer, index) => (
                            <div className='mobile-side-customer'>
                                <p className='d-flex align-items-center'><span className='customer-name'>{customer.name ? customer.name.charAt(0).toUpperCase() : ""}</span>{customer.name}</p>
                                <hr></hr>
                                <p className='role'><span><img src={require("../assets/images/call.svg").default} className="cursor-pointer me-2" alt="icons" />Phone</span> <span className='number'>{customer.phone}</span></p>
                                <p className='role'><span><img src={require("../assets/images/email.svg").default} className="cursor-pointer me-2" alt="icons" />Email</span> <span className='number'>{customer.email}</span></p>
                                <p className='role'><span><img src={require("../assets/images/date.svg").default} className="cursor-pointer me-2" alt="icons" />Joined</span> <span className='number'>{createDateFromData(customer.createdDate)}</span></p>
                                <p className='role'><span><img src={require("../assets/images/building.svg").default} className="cursor-pointer me-2" alt="icons" />Property</span> <span className='number'>{customer?.property.map((property, innerIndex) => { return innerIndex ? `, ${capitalizeFirstLetter(property)}` : capitalizeFirstLetter(property) })}</span></p>
                                <div className='trash-section d-flex justify-content-between mt-2'>
                                    <Button className="blue-btn">{customer.role}</Button>
                                    <img src={require("../assets/images/ic_round-delete.svg").default} className="cursor-pointer" alt="icons" onClick={() => handleDelete(customer.id)} />
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>
            </div>
        </section>
    );
};

export default Customer;
