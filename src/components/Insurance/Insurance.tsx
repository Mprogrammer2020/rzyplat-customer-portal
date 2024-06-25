import "./Insurance.css";
import { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function Insurance() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className="alert-main-section">
                {/* header section statr */}
                <header className='mobile-header'>
                    <Row className='align-items-center'>
                        <Col xs={6} md={6}>
                            <div className='header-left-box'>
                                <h5 className='heading-main'><img src={require("../../assets/images/insurance-icon.svg").default} className="me-2" alt="icons" /> Insurance</h5>
                            </div>
                        </Col>
                        <Col xs={6} md={6}>
                            <div className='header-right-box'>
                                <Form>
                                    <Form.Group className="position-relative w-50" controlId="exampleForm.ControlInput1">
                                        <img src={require("../../assets/images/iconamoon_search.svg").default} className="search-icon" alt="icons" />
                                        <Form.Control type="email" placeholder="Search" />
                                        <span className='cutomer-text'>ALL</span>
                                        <img src={require("../../assets/images/mi_filter.svg").default} className="filter-icon" alt="icons" />
                                    </Form.Group>
                                    <Link>
                                        <img src={require("../../assets/images/mdi_message-badge.svg").default} className="" alt="icons" />
                                    </Link>
                                    <Link>
                                        <img src={require("../../assets/images/streamline_notification-alarm-2-solid.svg").default} className="" alt="icons" />
                                    </Link>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </header>
                {/* header section ends */}
                <div className="customer-outer-section">
                    <Row>
                        <Col md={8}>
                            <div className="weather-outer-section">
                                <div className="weather-header">
                                    <h5 className='heading-main text-dark'><img src={require("../../assets/images/alarm.svg").default} className="me-2" alt="icons" /> Alert Summary</h5>
                                    <Button className="fire-history-btn">FILTER <img src={require("../../assets/images/CALENDER.svg").default} className="ms-2" alt="icons" /></Button>
                                </div>
                                <div className="alarm-body">
                                    <Row>
                                        <Col md={6}>
                                            <div className="alarm-content">
                                                <div className="alarm-content-inner">
                                                    <img src={require("../../assets/images/alarm-lg.svg").default} className="me-2" alt="icons" />
                                                    <div className="alarm-content-left">
                                                        <p>Alerts</p>
                                                        <h6>600</h6>
                                                    </div>
                                                </div>
                                                <Button onClick={handleShow} className="fire-history-btn">ALERT HISTORY <img src={require("../../assets/images/history.svg").default} className="ms-2" alt="icons" /></Button>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="alarm-content border-0">
                                                <div className="alarm-content-inner">
                                                    <img src={require("../../assets/images/alarm-bg-2.svg").default} className="me-2" alt="icons" />
                                                    <div className="alarm-content-left">
                                                        <p>Active Alerts</p>
                                                        <h6>02</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="weather-outer-section">
                                <div className="alarm-body">
                                    <div className="alarm-content border-0 pe-0">
                                        <div className="alarm-content-inner">
                                            <img src={require("../../assets/images/claims.svg").default} className="me-2" alt="icons" />
                                            <div className="alarm-content-left">
                                                <p>Claims</p>
                                                <h6 className="blue-text">25</h6>
                                            </div>
                                        </div>
                                        <img src={require("../../assets/images/right-icon.svg").default} className="" alt="icons" />
                                    </div>
                                </div>
                                <div className="alarm-body mt-3">
                                    <div className="alarm-content border-0 pe-0">
                                        <div className="alarm-content-inner">
                                            <img src={require("../../assets/images/severe.svg").default} className="me-2" alt="icons" />
                                            <div className="alarm-content-left">
                                                <p>Severe Alerts</p>
                                                <h6 className="blue-text">25</h6>
                                            </div>
                                        </div>
                                        <img src={require("../../assets/images/right-icon.svg").default} className="" alt="icons" />
                                    </div>
                                </div>
                                <div className="fire-red-box mt-2">
                                    <div className="under-fire-boxes">
                                        <p className="red-texting"><img src={require("../../assets/images/fire-goal.svg").default} className="me-2" alt="icons" /> Fire 911</p>
                                        <p className="dark-text">9 min  <img src={require("../../assets/images/right-arrow.svg").default} className="" alt="icons" /></p>
                                    </div>
                                    <div className="under-fire-boxes">
                                        <p className="red-texting">Property Name Building 20 - Unit 02</p>
                                        <p className="accupied-btn">OCCUPIED</p>
                                    </div>
                                </div>
                                <div className="fire-red-box mt-2">
                                    <div className="under-fire-boxes">
                                        <p className="red-texting"><img src={require("../../assets/images/fire-goal.svg").default} className="me-2" alt="icons" /> Fire 911</p>
                                        <p className="dark-text">9 min  <img src={require("../../assets/images/right-arrow.svg").default} className="" alt="icons" /></p>
                                    </div>
                                    <div className="under-fire-boxes">
                                        <p className="red-texting">Property Name Building 20 - Unit 02</p>
                                        <p className="accupied-btn">OCCUPIED</p>
                                    </div>
                                </div>
                                <div className="fire-red-box mt-2">
                                    <div className="under-fire-boxes">
                                        <p className="red-texting"><img src={require("../../assets/images/fire-goal.svg").default} className="me-2" alt="icons" /> Fire 911</p>
                                        <p className="dark-text">9 min  <img src={require("../../assets/images/right-arrow.svg").default} className="" alt="icons" /></p>
                                    </div>
                                    <div className="under-fire-boxes">
                                        <p className="red-texting">Property Name Building 20 - Unit 02</p>
                                        <p className="accupied-btn">OCCUPIED</p>
                                    </div>
                                </div>
                                <div className="fire-red-box mt-2">
                                    <div className="under-fire-boxes">
                                        <p className="red-texting"><img src={require("../../assets/images/fire-goal.svg").default} className="me-2" alt="icons" /> Fire 911</p>
                                        <p className="dark-text">9 min  <img src={require("../../assets/images/right-arrow.svg").default} className="" alt="icons" /></p>
                                    </div>
                                    <div className="under-fire-boxes">
                                        <p className="red-texting">Property Name Building 20 - Unit 02</p>
                                        <p className="accupied-btn">OCCUPIED</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            {/* history modal */}
            <Modal className="history-modal" animation={false} size="xl" show={show} onHide={handleClose} centered>
                <Modal.Header closeButton className="border-0">
                    <div className="under-history">
                        <h5>
                            <img src={require("../../assets/images/history.svg").default} className="me-2 referesh" alt="icons" />
                            Alert History
                        </h5>
                        <div className=''>
                            <div className='sort-box d-flex align-items-center'>
                                <p className='mobile-tab mobile-tab-contact text-light'>600 items</p>
                                <Form.Select aria-label="Default select example">
                                    <option>SORT BY</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                                <img src={require("../../assets/images/mi_filter-blue.svg").default} className="ms-2" alt="icons" />
                            </div>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body className="pt-0">
                    <div className="under-table-history">
                        <div className="customer-container-body">
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>CREATED</th>
                                        <th>PROPERTY</th>
                                        <th>UNIT STATUS</th>
                                        <th className="property-section">CLOSE DATE</th>
                                        <th className='action-div'>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="customer-scroll">
                                    <tr>
                                        <td><span>22-03-24</span><br></br>
                                            <span className="time-text">09:00 PM</span>
                                        </td>
                                        <td><p className="property-address">Property Name Building 20 - Unit 02</p></td>
                                        <td><p className='role'>VACANT</p></td>
                                        <td className="property-section"><span>22-03-24</span><br></br>
                                            <span className="time-text">09:00 PM</span></td>
                                        <td className='action-div'>
                                            <img src={require("../../assets/images/send-action.svg").default} className="" alt="icons" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span>22-03-24</span><br></br>
                                            <span className="time-text">09:00 PM</span>
                                        </td>
                                        <td><p className="property-address">Property Name Building 20 - Unit 02</p></td>
                                        <td><p className='role'>VACANT</p></td>
                                        <td className="property-section"><span>22-03-24</span><br></br>
                                            <span className="time-text">09:00 PM</span></td>
                                        <td className='action-div'>
                                            <img src={require("../../assets/images/send-action.svg").default} className="" alt="icons" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span>22-03-24</span><br></br>
                                            <span className="time-text">09:00 PM</span>
                                        </td>
                                        <td><p className="property-address">Property Name Building 20 - Unit 02</p></td>
                                        <td><p className='role'>VACANT</p></td>
                                        <td className="property-section"><span>22-03-24</span><br></br>
                                            <span className="time-text">09:00 PM</span></td>
                                        <td className='action-div'>
                                            <img src={require("../../assets/images/send-action.svg").default} className="" alt="icons" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span>22-03-24</span><br></br>
                                            <span className="time-text">09:00 PM</span>
                                        </td>
                                        <td><p className="property-address">Property Name Building 20 - Unit 02</p></td>
                                        <td><p className='role'>VACANT</p></td>
                                        <td className="property-section"><span>22-03-24</span><br></br>
                                            <span className="time-text">09:00 PM</span></td>
                                        <td className='action-div'>
                                            <img src={require("../../assets/images/send-action.svg").default} className="" alt="icons" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span>22-03-24</span><br></br>
                                            <span className="time-text">09:00 PM</span>
                                        </td>
                                        <td><p className="property-address">Property Name Building 20 - Unit 02</p></td>
                                        <td><p className='role'>VACANT</p></td>
                                        <td className="property-section"><span>22-03-24</span><br></br>
                                            <span className="time-text">09:00 PM</span></td>
                                        <td className='action-div'>
                                            <img src={require("../../assets/images/send-action.svg").default} className="" alt="icons" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span>22-03-24</span><br></br>
                                            <span className="time-text">09:00 PM</span>
                                        </td>
                                        <td><p className="property-address">Property Name Building 20 - Unit 02</p></td>
                                        <td><p className='role'>VACANT</p></td>
                                        <td className="property-section"><span>22-03-24</span><br></br>
                                            <span className="time-text">09:00 PM</span></td>
                                        <td className='action-div'>
                                            <img src={require("../../assets/images/send-action.svg").default} className="" alt="icons" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span>22-03-24</span><br></br>
                                            <span className="time-text">09:00 PM</span>
                                        </td>
                                        <td><p className="property-address">Property Name Building 20 - Unit 02</p></td>
                                        <td><p className='role'>VACANT</p></td>
                                        <td className="property-section"><span>22-03-24</span><br></br>
                                            <span className="time-text">09:00 PM</span></td>
                                        <td className='action-div'>
                                            <img src={require("../../assets/images/send-action.svg").default} className="" alt="icons" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span>22-03-24</span><br></br>
                                            <span className="time-text">09:00 PM</span>
                                        </td>
                                        <td><p className="property-address">Property Name Building 20 - Unit 02</p></td>
                                        <td><p className='role'>VACANT</p></td>
                                        <td className="property-section"><span>22-03-24</span><br></br>
                                            <span className="time-text">09:00 PM</span></td>
                                        <td className='action-div'>
                                            <img src={require("../../assets/images/send-action.svg").default} className="" alt="icons" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span>22-03-24</span><br></br>
                                            <span className="time-text">09:00 PM</span>
                                        </td>
                                        <td><p className="property-address">Property Name Building 20 - Unit 02</p></td>
                                        <td><p className='role'>VACANT</p></td>
                                        <td className="property-section"><span>22-03-24</span><br></br>
                                            <span className="time-text">09:00 PM</span></td>
                                        <td className='action-div'>
                                            <img src={require("../../assets/images/send-action.svg").default} className="" alt="icons" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span>22-03-24</span><br></br>
                                            <span className="time-text">09:00 PM</span>
                                        </td>
                                        <td><p className="property-address">Property Name Building 20 - Unit 02</p></td>
                                        <td><p className='role'>VACANT</p></td>
                                        <td className="property-section"><span>22-03-24</span><br></br>
                                            <span className="time-text">09:00 PM</span></td>
                                        <td className='action-div'>
                                            <img src={require("../../assets/images/send-action.svg").default} className="" alt="icons" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            {/* history modal */}
        </>
    )
}
export default Insurance;