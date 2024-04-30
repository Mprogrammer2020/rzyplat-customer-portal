import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Select from "react-select";
import AddNewDeviceType from './modals/AddNewDeviceType';
import AddDeviceCategory from './modals/AddDeviceCategory';

const Inventory = () => {
    const [show, setShow] = useState(false);
    const [showAddNew, setShowAddNew] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseAddNew = () => setShowAddNew(false);
    const handleShowAddNew = () => setShowAddNew(true);

    const options = [
        { value: "Name", label: "Name" },
        { value: "Date", label: "Date" },
        { value: "Quantity", label: "Quantity" },
        { value: "Ascending", label: "Ascending" },
        { value: "Descending", label: "Descending" },
    ];

    const [showSortBy, setShowSortBy] = useState(false);

    useEffect(() => {
        const handleClick = (event) => {
            if (event.target.innerText !== "SORT BY") {
                setShowSortBy(false);
            }
            console.log('Clicked:', event.target.innerText);
        };
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);



    return (
        <>
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
                    <div className='new-conversation'>
                        <Row>
                            <Col md={12} lg={6}>
                                <div className='new-convversation-left'>
                                    <Button type='button' variant='unset'>New Conversation</Button>
                                    <h6>Property Name <span>Location    </span></h6>
                                </div>
                            </Col>
                            <Col md={12} lg={6}>
                                <div className='new-conversation-right'>
                                    <Button className='order-status' type='button' variant='unset'>
                                        <img src={require("../assets/images/order-status.png")} alt="icons" />Order Status</Button>
                                    <Button className='required-devices' type='button' variant='unset'>Required Devices <span>182</span></Button>
                                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className='new-conversation'>
                        <Row>
                            <Col md={12} lg={6}>
                                <div className='new-convversation-left'>
                                    <Button type='button' variant='unset' className='replacement'>Replacement</Button>
                                    <h6>Property Name <span>Location    </span></h6>
                                </div>
                            </Col>
                            <Col md={12} lg={6}>
                                <div className='new-conversation-right'>
                                    <Button className='order-status' type='button' variant='unset'><img src={require("../assets/images/order-status.png")} alt="icons" />Order Status</Button>
                                    <Button className='required-devices' type='button' variant='unset'>Required Devices <span>02</span></Button>
                                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className='devices-outer-area'>
                        <div className='devices-area-top'>
                            <h5><img src={require("../assets/images/dashboard.png")} alt="icons" />Devices <span>8</span></h5>
                            <div className='devices-area-top-right'>
                                <Form.Group
                                    className="sort-by-top-right"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    {console.log("showSortBy", showSortBy)}
                                    {/* <Select options={options} placeholder="SORT BY" menuIsOpen={true}/> */}
                                    <h6 onClick={() => setShowSortBy(!showSortBy)}>SORT BY<img src={require("../assets/images/filter.png")} alt="icons" className='sort-btn' /></h6>
                                    {showSortBy ? <div className='sort-bt-outer'>
                                        <ul>
                                            <li className='active'>Name</li>
                                            <li>Date</li>
                                            <li>Quantity</li>
                                            <hr></hr>
                                            <li>Ascending</li>
                                            <li>Ascending</li>
                                        </ul>
                                    </div> : ""}
                                </Form.Group>

                                <h6 onClick={handleShowAddNew}>ADD NEW <i class="fa fa-plus" aria-hidden="true"></i></h6>
                            </div>
                        </div>
                        <Row>
                            <Col md={6} lg={6} xl={4}>
                                <div className='position-relative add-green-btn-outer-box'>
                                    <Button type='button' className='green-btn' variant='unset' onClick={handleShow}><i class="fa fa-plus" aria-hidden="true"></i></Button>
                                    <div className='device-content-inner'>
                                        <div className='position-relative'>
                                            <img src={require("../assets/images/device1.png")} alt="icons" />
                                            <div className='inner-img' >
                                                <img src={require("../assets/images/device1.png")} alt="icons" />
                                            </div>
                                        </div>
                                        <div className='device-info'>
                                            <p>Smoke Detectors / Fire Alarms</p>
                                            <span className='d-flex align-items-center arrow-icon'>
                                                <h6 className='upper-text'>230</h6>
                                                <h6 className='hover-text'>230 <img src={require("../assets/images/left.svg").default} alt="icons" /></h6>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='inner-hover-divice first-child-section'>
                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                        <Button type='button' className='view-more' variant='unset' onClick={handleShow}>View More <i class="fa fa-chevron-down" aria-hidden="true"></i></Button>
                                    </div>

                                </div>
                            </Col>
                            <Col md={6} lg={6} xl={4}>
                                <div className='position-relative add-green-btn-outer-box'>
                                    <Button type='button' className='main-btn' variant='unset' onClick={handleShow}><i class="fa fa-plus" aria-hidden="true"></i> New Device Type</Button>
                                    <div className='device-content-inner'>
                                        <div className='position-relative'>
                                            <img src={require("../assets/images/device2.png")} alt="icons" />
                                            <div className='inner-img' >
                                                <img src={require("../assets/images/device1.png")} alt="icons" />
                                            </div>
                                        </div>
                                        <div className='device-info'>
                                            <p>Temp & Humidity</p>
                                            <span className='d-flex align-items-center arrow-icon'>
                                                <h6 className='upper-text'>750</h6>
                                                <h6 className='hover-text'>750 <img src={require("../assets/images/left.svg").default} alt="icons" /></h6>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='inner-hover-divice'>
                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6} lg={6} xl={4}>
                                <div className='position-relative add-green-btn-outer-box'>
                                    <Button type='button' className='main-btn' variant='unset' onClick={handleShow}><i class="fa fa-plus" aria-hidden="true"></i> New Device Type</Button>
                                    <div className='device-content-inner'>
                                        <div className='position-relative'>
                                            <img src={require("../assets/images/device3.png")} alt="icons" />
                                            <div className='inner-img' >
                                                <img src={require("../assets/images/device1.png")} alt="icons" />
                                            </div>
                                        </div>
                                        <div className='device-info'>
                                            <p>Water Flow Meters</p>
                                            <span className='d-flex align-items-center arrow-icon'>
                                                <h6 className='upper-text'>750</h6>
                                                <h6 className='hover-text'>750 <img src={require("../assets/images/left.svg").default} alt="icons" /></h6>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='inner-hover-divice'>
                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6} lg={6} xl={4}>
                                <div className='position-relative add-green-btn-outer-box'>
                                    <Button type='button' className='main-btn' variant='unset' onClick={handleShow}><i class="fa fa-plus" aria-hidden="true"></i> New Device Type</Button>
                                    <div className='device-content-inner'>
                                        <div className='position-relative'>
                                            <img src={require("../assets/images/device4.png")} alt="icons" />
                                            <div className='inner-img' >
                                                <img src={require("../assets/images/device1.png")} alt="icons" />
                                            </div>
                                        </div>
                                        <div className='device-info'>
                                            <p>Gateways</p>
                                            <span className='d-flex align-items-center arrow-icon'>
                                                <h6 className='upper-text'>750</h6>
                                                <h6 className='hover-text'>750 <img src={require("../assets/images/left.svg").default} alt="icons" /></h6>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='inner-hover-divice'>
                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6} lg={6} xl={4}>
                                <div className='position-relative add-green-btn-outer-box'>
                                    <Button type='button' className='main-btn' variant='unset' onClick={handleShow}><i class="fa fa-plus" aria-hidden="true"></i> New Device Type</Button>
                                    <div className='device-content-inner'>
                                        <div className='position-relative'>
                                            <img src={require("../assets/images/device5.png")} alt="icons" />
                                            <div className='inner-img' >
                                                <img src={require("../assets/images/device1.png")} alt="icons" />
                                            </div>
                                        </div>
                                        <div className='device-info'>
                                            <p>Door Sensors</p>
                                            <span className='d-flex align-items-center arrow-icon'>
                                                <h6 className='upper-text'>750</h6>
                                                <h6 className='hover-text'>750 <img src={require("../assets/images/left.svg").default} alt="icons" /></h6>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='inner-hover-divice'>
                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </section>


            {/* add-new-device */}
            {show && <AddNewDeviceType show={show} handleClose={handleClose} />}
            {showAddNew && <AddDeviceCategory show={showAddNew} handleClose={handleCloseAddNew} />}

        </>


    );
};

export default Inventory;
