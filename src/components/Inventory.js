import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Select from "react-select";
import AddNewDeviceType from './modals/AddNewDeviceType';

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
                                   
                                    {/* <Select options={options} placeholder="SORT BY" menuIsOpen={true}/> */}
                                    <h6>SORT BY <img src={require("../assets/images/filter.png")} alt="icons" className='sort-btn' /></h6>
                                    <div className='sort-bt-outer'>
                                        <ul>
                                            <li className='active'>Name</li>
                                            <li>Date</li>
                                            <li>Quantity</li>
                                            <hr></hr>
                                            <li>Ascending</li>
                                            <li>Ascending</li>
                                        </ul>
                                    </div>
                                </Form.Group>
                            
                                <h6 onClick={handleShowAddNew}>ADD NEW <i class="fa fa-plus" aria-hidden="true"></i></h6>
                            </div>
                        </div>
                        <Row>
                            <Col md={6} lg={4}>
                                <div className='position-relative add-green-btn-outer-box'>
                                <Button type='button' className='green-btn' variant='unset' onClick={handleShow}><i class="fa fa-plus" aria-hidden="true"></i></Button>
                                    <div className='device-content-inner'>
                                        <img src={require("../assets/images/device1.png")} alt="icons" />
                                        <div className='device-info'>
                                            <p>Smoke Detectors / Fire Alarms</p>
                                            <h6>230</h6>
                                        </div>
                                    </div>
                                    <div className='outer-device'>
                                        <div className='device-content-inner on-hover'>
                                            <div className='device-img-section'>
                                            <img src={require("../assets/images/device1.png")} alt="icons" />
                                                <div className='outer-device-content first-child-section-outer'>
                                                    <div className='inner-hover-divice first-child-section'>
                                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                                        <Button type='button'  variant='unset' onClick={handleShow}>View More <i class="fa fa-chevron-down" aria-hidden="true"></i></Button>
                                                    </div>
                                                  
                                                </div>
                                            </div>
                                            <div className='device-info on-hover-content'>
                                                <p>Smoke Detectors / Fire Alarms</p>
                                                <span className='d-flex align-items-center'>
                                                    <h6>230</h6><img src={require("../assets/images/left.svg").default} alt="icons" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6} lg={4}>
                                <div className='position-relative'>
                                    <div className='device-content-inner'>
                                        <img src={require("../assets/images/device2.png")} alt="icons" />
                                        <div className='device-info'>
                                            <p>Temp & Humidity</p>
                                            <h6>750</h6>
                                        </div>
                                    </div>
                                    <div className='outer-device'>
                                        <div className='device-content-inner on-hover'>
                                            <div className='device-img-section'>
                                                <img src={require("../assets/images/device1.png")} alt="icons" />
                                                <div className='outer-device-content'>
                                                    <div className='inner-hover-divice'>
                                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                                    </div>
                                                    <Button type='button' variant='unset' onClick={handleShow}><i class="fa fa-plus" aria-hidden="true"></i> New Device Type</Button>
                                                </div>
                                            </div>
                                            <div className='device-info on-hover-content'>
                                                <p>Temp & Humidity</p>
                                                <span className='d-flex align-items-center'>
                                                    <h6>750 </h6><img src={require("../assets/images/left.svg").default} alt="icons" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6} lg={4}>
                                <div className='position-relative'>
                                    <div className='device-content-inner'>
                                        <img src={require("../assets/images/device3.png")} alt="icons" />
                                        <div className='device-info'>
                                            <p>Water Flow Meters</p>
                                            <h6>750</h6>
                                        </div>
                                    </div>
                                    <div className='outer-device'>
                                        <div className='device-content-inner on-hover'>
                                            <div className='device-img-section'>
                                                <img src={require("../assets/images/device1.png")} alt="icons" />
                                                <div className='outer-device-content'>
                                                    <div className='inner-hover-divice'>
                                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                                    </div>
                                                    <Button type='button' variant='unset' onClick={handleShow}><i class="fa fa-plus" aria-hidden="true"></i> New Device Type</Button>
                                                </div>
                                            </div>
                                            <div className='device-info on-hover-content'>
                                                <p>Water Flow Meters</p>
                                                <span className='d-flex align-items-center'>
                                                    <h6>750 </h6><img src={require("../assets/images/left.svg").default} alt="icons" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6} lg={4}>
                                <div className='position-relative'>
                                    <div className='device-content-inner'>
                                        <img src={require("../assets/images/device4.png")} alt="icons" />
                                        <div className='device-info'>
                                            <p>Gateways</p>
                                            <h6>230</h6>
                                        </div>
                                    </div>
                                    <div className='outer-device'>
                                        <div className='device-content-inner on-hover'>
                                            <div className='device-img-section'>
                                                <img src={require("../assets/images/device1.png")} alt="icons" />
                                                <div className='outer-device-content'>
                                                    <div className='inner-hover-divice'>
                                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                                    </div>
                                                    <Button type='button' variant='unset' onClick={handleShow}><i class="fa fa-plus" aria-hidden="true"></i> New Device Type</Button>
                                                </div>
                                            </div>
                                            <div className='device-info on-hover-content'>
                                                <p>Gateways</p>
                                                <span className='d-flex align-items-center'>
                                                    <h6>750 </h6><img src={require("../assets/images/left.svg").default} alt="icons" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6} lg={4}>
                                <div className='position-relative'>
                                    <div className='device-content-inner'>
                                        <img src={require("../assets/images/device5.png")} alt="icons" />
                                        <div className='device-info'>
                                            <p>Door Sensors</p>
                                            <h6>750</h6>
                                        </div>
                                    </div>
                                    <div className='outer-device'>
                                        <div className='device-content-inner on-hover'>
                                            <div className='device-img-section'>
                                                <img src={require("../assets/images/device1.png")} alt="icons" />
                                                <div className='outer-device-content'>
                                                    <div className='inner-hover-divice'>
                                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                                        <span className='device-text'>Device Type 1 <b>70</b></span>
                                                    </div>
                                                    <Button type='button' variant='unset' onClick={handleShow}><i class="fa fa-plus" aria-hidden="true"></i> New Device Type</Button>
                                                </div>
                                            </div>
                                            <div className='device-info on-hover-content'>
                                                <p>Door Sensors</p>
                                                <span className='d-flex align-items-center'>
                                                    <h6>750 </h6><img src={require("../assets/images/left.svg").default} alt="icons" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </section>


            {/* add-new-device */}
            {show && <AddNewDeviceType show={show} handleClose={handleClose} />}

            {/* add-new */}
            <Modal show={showAddNew} onHide={handleCloseAddNew} centered className='add-new-device-popup add-new-popup' size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Device</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col md={12} lg={6}>
                                <Form.Group
                                    className="mb-2"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label>Device Category</Form.Label>
                                    <Select options={options} placeholder="Select Device Category"
                                        styles={{
                                            control: (base, state) => ({
                                                // ...base,
                                                background: "#EDF1F7",
                                                borderRadius: "5px",
                                            }),
                                            placeholder: (base, state) => ({
                                                ...base,
                                                color: "#fff",

                                            }),
                                            input: (base, state) => ({
                                                ...base,
                                                color: "white"
                                            })
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={12} lg={6}>
                                <Form.Group
                                    className="mb-2"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label>Device</Form.Label>
                                    <Select options={options} placeholder="Select Device"
                                        styles={{
                                            control: (base, state) => ({
                                                // ...base,
                                                background: "#EDF1F7",
                                                borderRadius: "5px",
                                            }),
                                            placeholder: (base, state) => ({
                                                ...base,
                                                color: "#fff",

                                            }),
                                            input: (base, state) => ({
                                                ...base,
                                                color: "white"
                                            })
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={12} lg={6}>
                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                    <Form.Label>Serial Number</Form.Label>
                                    <Form.Control type="email" placeholder="Enter Serial Number" />
                                </Form.Group>
                            </Col>
                            <Col md={12} lg={6}>
                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                    <Form.Label>SKU</Form.Label>
                                    <Form.Control type="email" />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                    <p>or bulk upload</p>
                    <div className='upload-file'>
                        <img src={require("../assets/images/upload-file.png")} alt='upload-img' />
                        <h6>Drag & Drop or <span>browse</span> file</h6>
                        <input type="file" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className='footer-btns-bottom-left'>
                        <Button type='button' variant='unset'> NEW CATEGORY</Button>
                    </div>
                    <div className='footer-btns-bottom-right'>
                        <Button variant="secondary" onClick={handleCloseAddNew}>
                            CANCEL
                        </Button>
                        <Button variant="primary" onClick={handleCloseAddNew}>
                            ADD
                        </Button>
                    </div>

                </Modal.Footer>
            </Modal>
        </>


    );
};

export default Inventory;
