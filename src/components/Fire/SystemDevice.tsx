import "./Fire.css";
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function SystemDevice() {
    return (
        <>
            <div className="system-device-section">
                {/* header section statr */}
                <header className='mobile-header'>
                    <Row className='align-items-center'>
                        <Col xs={12} sm={6} md={6}>
                            <div className='header-left-box'>
                                <h5 className='heading-main'><img src={require("../../assets/images/menu-bar.svg").default} className="me-2" alt="icons" /><span className="disable light-main-text"> System Monitoring</span> <img className="forward-arrow" src={require("../../assets/images/forward.svg").default} alt="img" /> <span className="light-main-text ms-0">All Devices</span></h5>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={6}>
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
                {/* header section end */}
                <div className="system-under-section">
                    <div className='customer-outer-section inventory-outer-content-area' >
                        <div className="inventory-detail-outer">
                            <div className='customer-list-header-mobile'>
                                <div className='customer-list-header d-flex align-items-center justify-content-between'>
                                    <h5 className='heading-main'>
                                        <img src={require("../../assets/images/back.svg").default} className="me-2" alt="icons" />
                                        <span className='smoke-heading'>Smoke Detectors / Fire Alarms</span></h5>
                                    <h3>  Devices</h3>
                                    <div className="inventory-detail-top-right">
                                        <div className='sort-box d-flex align-items-center'>
                                            <p class="mobile-tab mobile-tab-contact">492</p>
                                            <Form.Group
                                                className="sort-by-top-right"
                                                controlId="exampleForm.ControlInput1"
                                            >

                                                <h6 className='inventory-detail-sortby inventory-detail-sort-mobile' >SORT BY<img src={require("../../assets/images/filter.png")} alt="icons" className='sort-btn' /></h6>
                                                <div className='sort-bt-outer'>

                                                </div>
                                            </Form.Group>
                                            <img src={require("../../assets/images/mi_filter-blue.svg").default} className="ms-2" alt="icons" />
                                        </div>
                                    </div>
                                </div>
                                <div className="status-bar-section">
                                    <div className="inner-status-bar active">
                                        <div>
                                            <img src={require("../../assets/images/online.svg").default} className="me-2" alt="icons" />
                                            <span>Online</span>
                                        </div>
                                        <span className="status-text">484</span>
                                        <img src={require("../../assets/images/close-window.svg").default} className="close-window" alt="icons" />
                                    </div>
                                    <div className="inner-status-bar">
                                        <div>
                                            <img src={require("../../assets/images/offline.svg").default} className="me-2" alt="icons" />
                                            <span>Online</span>
                                        </div>
                                        <span className="status-text">484</span>
                                    </div>
                                    <div className="inner-status-bar">
                                        <div>
                                            <img src={require("../../assets/images/battery-low.svg").default} className="me-2" alt="icons" />
                                            <span>Online</span>
                                        </div>
                                        <span className="status-text">484</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="customer-container-body">
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>DEVICE ID</th>
                                    <th>PROPERTY</th>
                                    <th>INSTALLED DATE</th>
                                    <th className="property-section">READINGS</th>
                                    <th className='action-div'>STATUS</th>
                                </tr>
                            </thead>
                            <tbody className="customer-scroll">
                                <tr >
                                    <td><p>1726389EF182</p></td>
                                    <td>Beldon, Building A, Unit 01</td>
                                    <td>02-06-2024</td>
                                    <td className="property-section"><p className='role inner-role'><img src={require("../../assets/images/red-tem.svg").default} className="me-2" alt="icons" />Temperature: <span className="red-temp">123.2</span></p>
                                    <p className='role inner-role'><img src={require("../../assets/images/humadity.svg").default} className="me-2" alt="icons" />Temperature: <span className="red-temp green-text">123.2</span></p>
                                    </td>
                                    <td className='action-div'>
                                        <Button className="battery-btn"><img src={require("../../assets/images/battery.svg").default} className="" alt="icons" /> Battery<b className="ms-3 main-text-battery">100</b></Button>
                                        <Button className="battery-btn">ONLINE</Button>
                                    </td>
                                </tr>
                                <tr >
                                    <td><p>1726389EF182</p></td>
                                    <td>Beldon, Building A, Unit 01</td>
                                    <td>02-06-2024</td>
                                    <td className="property-section"><p className='role inner-role'><img src={require("../../assets/images/red-tem.svg").default} className="me-2" alt="icons" />Temperature: <span className="red-temp">123.2</span></p>
                                    <p className='role inner-role'><img src={require("../../assets/images/humadity.svg").default} className="me-2" alt="icons" />Temperature: <span className="red-temp green-text">123.2</span></p>
                                    </td>
                                    <td className='action-div'>
                                        <Button className="battery-btn"><img src={require("../../assets/images/battery.svg").default} className="" alt="icons" /> Battery<b className="ms-3 main-text-battery">100</b></Button>
                                        <Button className="battery-btn">ONLINE</Button>
                                    </td>
                                </tr>
                                <tr >
                                    <td><p>1726389EF182</p></td>
                                    <td>Beldon, Building A, Unit 01</td>
                                    <td>02-06-2024</td>
                                    <td className="property-section"><p className='role inner-role'><img src={require("../../assets/images/red-tem.svg").default} className="me-2" alt="icons" />Temperature: <span className="red-temp">123.2</span></p>
                                    <p className='role inner-role'><img src={require("../../assets/images/humadity.svg").default} className="me-2" alt="icons" />Temperature: <span className="red-temp green-text">123.2</span></p>
                                    </td>
                                    <td className='action-div'>
                                        <Button className="battery-btn"><img src={require("../../assets/images/battery.svg").default} className="" alt="icons" /> Battery<b className="ms-3 main-text-battery">100</b></Button>
                                        <Button className="battery-btn">ONLINE</Button>
                                    </td>
                                </tr>
                                <tr >
                                    <td><p>1726389EF182</p></td>
                                    <td>Beldon, Building A, Unit 01</td>
                                    <td>02-06-2024</td>
                                    <td className="property-section"><p className='role inner-role'><img src={require("../../assets/images/red-tem.svg").default} className="me-2" alt="icons" />Temperature: <span className="red-temp">123.2</span></p>
                                    <p className='role inner-role'><img src={require("../../assets/images/humadity.svg").default} className="me-2" alt="icons" />Temperature: <span className="red-temp green-text">123.2</span></p>
                                    </td>
                                    <td className='action-div'>
                                        <Button className="battery-btn"><img src={require("../../assets/images/battery.svg").default} className="" alt="icons" /> Battery<b className="ms-3 main-text-battery">100</b></Button>
                                        <Button className="battery-btn">ONLINE</Button>
                                    </td>
                                </tr>
                                <tr >
                                    <td><p>1726389EF182</p></td>
                                    <td>Beldon, Building A, Unit 01</td>
                                    <td>02-06-2024</td>
                                    <td className="property-section"><p className='role inner-role'><img src={require("../../assets/images/red-tem.svg").default} className="me-2" alt="icons" />Temperature: <span className="red-temp">123.2</span></p>
                                    <p className='role inner-role'><img src={require("../../assets/images/humadity.svg").default} className="me-2" alt="icons" />Temperature: <span className="red-temp green-text">123.2</span></p>
                                    </td>
                                    <td className='action-div'>
                                        <Button className="battery-btn"><img src={require("../../assets/images/battery.svg").default} className="" alt="icons" /> Battery<b className="ms-3 main-text-battery">100</b></Button>
                                        <Button className="battery-btn">ONLINE</Button>
                                    </td>
                                </tr>
                                <tr >
                                    <td><p>1726389EF182</p></td>
                                    <td>Beldon, Building A, Unit 01</td>
                                    <td>02-06-2024</td>
                                    <td className="property-section"><p className='role inner-role'><img src={require("../../assets/images/red-tem.svg").default} className="me-2" alt="icons" />Temperature: <span className="red-temp">123.2</span></p>
                                    <p className='role inner-role'><img src={require("../../assets/images/humadity.svg").default} className="me-2" alt="icons" />Temperature: <span className="red-temp green-text">123.2</span></p>
                                    </td>
                                    <td className='action-div'>
                                        <Button className="battery-btn"><img src={require("../../assets/images/battery.svg").default} className="" alt="icons" /> Battery<b className="ms-3 main-text-battery">100</b></Button>
                                        <Button className="battery-btn">ONLINE</Button>
                                    </td>
                                </tr>
                                <tr >
                                    <td><p>1726389EF182</p></td>
                                    <td>Beldon, Building A, Unit 01</td>
                                    <td>02-06-2024</td>
                                    <td className="property-section"><p className='role inner-role'><img src={require("../../assets/images/red-tem.svg").default} className="me-2" alt="icons" />Temperature: <span className="red-temp">123.2</span></p>
                                    <p className='role inner-role'><img src={require("../../assets/images/humadity.svg").default} className="me-2" alt="icons" />Temperature: <span className="red-temp green-text">123.2</span></p>
                                    </td>
                                    <td className='action-div'>
                                        <Button className="battery-btn"><img src={require("../../assets/images/battery.svg").default} className="" alt="icons" /> Battery<b className="ms-3 main-text-battery">100</b></Button>
                                        <Button className="battery-btn">ONLINE</Button>
                                    </td>
                                </tr>
                                <tr >
                                    <td><p>1726389EF182</p></td>
                                    <td>Beldon, Building A, Unit 01</td>
                                    <td>02-06-2024</td>
                                    <td className="property-section"><p className='role inner-role'><img src={require("../../assets/images/red-tem.svg").default} className="me-2" alt="icons" />Temperature: <span className="red-temp">123.2</span></p>
                                    <p className='role inner-role'><img src={require("../../assets/images/humadity.svg").default} className="me-2" alt="icons" />Temperature: <span className="red-temp green-text">123.2</span></p>
                                    </td>
                                    <td className='action-div'>
                                        <Button className="battery-btn"><img src={require("../../assets/images/battery.svg").default} className="" alt="icons" /> Battery<b className="ms-3 main-text-battery">100</b></Button>
                                        <Button className="battery-btn">ONLINE</Button>
                                    </td>
                                </tr>
                                <tr >
                                    <td><p>1726389EF182</p></td>
                                    <td>Beldon, Building A, Unit 01</td>
                                    <td>02-06-2024</td>
                                    <td className="property-section"><p className='role inner-role'><img src={require("../../assets/images/red-tem.svg").default} className="me-2" alt="icons" />Temperature: <span className="red-temp">123.2</span></p>
                                    <p className='role inner-role'><img src={require("../../assets/images/humadity.svg").default} className="me-2" alt="icons" />Temperature: <span className="red-temp green-text">123.2</span></p>
                                    </td>
                                    <td className='action-div'>
                                        <Button className="battery-btn"><img src={require("../../assets/images/battery.svg").default} className="" alt="icons" /> Battery<b className="ms-3 main-text-battery">100</b></Button>
                                        <Button className="battery-btn">ONLINE</Button>
                                    </td>
                                </tr>
                                <tr >
                                    <td><p>1726389EF182</p></td>
                                    <td>Beldon, Building A, Unit 01</td>
                                    <td>02-06-2024</td>
                                    <td className="property-section"><p className='role inner-role'><img src={require("../../assets/images/red-tem.svg").default} className="me-2" alt="icons" />Temperature: <span className="red-temp">123.2</span></p>
                                    <p className='role inner-role'><img src={require("../../assets/images/humadity.svg").default} className="me-2" alt="icons" />Temperature: <span className="red-temp green-text">123.2</span></p>
                                    </td>
                                    <td className='action-div'>
                                        <Button className="battery-btn"><img src={require("../../assets/images/battery.svg").default} className="" alt="icons" /> Battery<b className="ms-3 main-text-battery">100</b></Button>
                                        <Button className="battery-btn">ONLINE</Button>
                                    </td>
                                </tr>
                                <tr >
                                    <td><p>1726389EF182</p></td>
                                    <td>Beldon, Building A, Unit 01</td>
                                    <td>02-06-2024</td>
                                    <td className="property-section"><p className='role inner-role'><img src={require("../../assets/images/red-tem.svg").default} className="me-2" alt="icons" />Temperature: <span className="red-temp">123.2</span></p>
                                    <p className='role inner-role'><img src={require("../../assets/images/humadity.svg").default} className="me-2" alt="icons" />Temperature: <span className="red-temp green-text">123.2</span></p>
                                    </td>
                                    <td className='action-div'>
                                        <Button className="battery-btn"><img src={require("../../assets/images/battery.svg").default} className="" alt="icons" /> Battery<b className="ms-3 main-text-battery">100</b></Button>
                                        <Button className="battery-btn">ONLINE</Button>
                                    </td>
                                </tr>
                                <tr >
                                    <td><p>1726389EF182</p></td>
                                    <td>Beldon, Building A, Unit 01</td>
                                    <td>02-06-2024</td>
                                    <td className="property-section"><p className='role inner-role'><img src={require("../../assets/images/red-tem.svg").default} className="me-2" alt="icons" />Temperature: <span className="red-temp">123.2</span></p>
                                    <p className='role inner-role'><img src={require("../../assets/images/humadity.svg").default} className="me-2" alt="icons" />Temperature: <span className="red-temp green-text">123.2</span></p>
                                    </td>
                                    <td className='action-div'>
                                        <Button className="battery-btn"><img src={require("../../assets/images/battery.svg").default} className="" alt="icons" /> Battery<b className="ms-3 main-text-battery">100</b></Button>
                                        <Button className="battery-btn">ONLINE</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    )
}
export default SystemDevice;