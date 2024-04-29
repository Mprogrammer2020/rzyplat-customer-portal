import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Inventory = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                                        <img src={require("../assets/images/order-status.png")} alt="icons"/>Order Status</Button>
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
                                    <Button className='order-status' type='button' variant='unset'><img src={require("../assets/images/order-status.png")} alt="icons"/>Order Status</Button>
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
                                <h6>SORT BY <img src={require("../assets/images/filter.png")} alt="icons" /></h6>
                                <h6>ADD NEW <i class="fa fa-plus" aria-hidden="true"></i></h6>
                            </div>
                        </div>
                        <Row>
                            <Col md={6} lg={4}>
                                <div className='device-content-inner'>
                                    <img src={require("../assets/images/device1.png")} alt="icons"/>
                                    <div className='device-info'>
                                        <p>Smoke Detectors / Fire Alarms</p>
                                        <h6>230</h6>
                                    </div>

                                    <Button type='button' variant='unset' onClick={handleShow}><i class="fa fa-plus" aria-hidden="true"></i> New Device Type</Button>

                                </div>
                            </Col>
                            <Col md={6} lg={4}>
                                <div className='device-content-inner'>
                                    <img src={require("../assets/images/device2.png")} alt="icons" />
                                    <div className='device-info'>
                                        <p>Temp & Humidity</p>
                                        <h6>750</h6>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6} lg={4}>
                                <div className='device-content-inner'>
                                    <img src={require("../assets/images/device3.png")} alt="icons"/>
                                    <div className='device-info'>
                                        <p>Water Flow Meters</p>
                                        <h6>750</h6>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6} lg={4}>
                                <div className='device-content-inner'>
                                    <img src={require("../assets/images/device4.png")}  alt="icons"/>
                                    <div className='device-info'>
                                        <p>Gateways</p>
                                        <h6>230</h6>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6} lg={4}>
                                <div className='device-content-inner'>
                                    <img src={require("../assets/images/device5.png")} alt="icons"/>
                                    <div className='device-info'>
                                        <p>Door Sensors</p>
                                        <h6>750</h6>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </section>


            {/* add-new-device */}
            <Modal show={show} onHide={handleClose} centered className='add-new-device-popup'>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Device</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Device Name</Form.Label>
                            <Form.Control type="email" placeholder="Enter Device Name" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div className='footer-btns-bottom-left'>
                        <Button type='button' variant='unset'><i class="fa fa-upload" aria-hidden="true"></i> Upload Image</Button>
                    </div>
                    <div className='footer-btns-bottom-right'>
                        <Button variant="secondary" onClick={handleClose}>
                            CANCEL
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            ADD
                        </Button>
                    </div>

                </Modal.Footer>
            </Modal>
        </>


    );
};

export default Inventory;
