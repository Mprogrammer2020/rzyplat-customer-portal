import { Row, Col, Form, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./InventoryNewConnection.css"

function InventoryNewConnection() {
    return (
        <>
            <section className='customer-section'>

                {/* header section start */}
                <header className='mobile-header'>
                    <Row className='align-items-center'>
                        <Col xs={6} md={6}>
                            <div className='header-left-box'>
                                <h5 className='heading-main'><img src={require("../../assets/images/ci_building-04.svg").default} className="me-2" alt="icons" /> Inventory</h5>
                            </div>
                        </Col>
                        <Col xs={6} md={6}>
                            <div className='header-right-box'>
                                <Form>
                                    <Form.Group className="position-relative w-50" controlId="exampleForm.ControlInput1">
                                        <img src={require("../../assets/images/iconamoon_search.svg").default} className="search-icon" alt="icons" />
                                        <Form.Control type="email" placeholder="Search" />
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
                {/* header section ens */}


                <div className='customer-outer-section'>
                    
                <div className="inventory-new-connection-outer">
                        <div className="inventory-detail-outer">
                            <div className='customer-list-header-mobile'>
                                <div className='customer-list-header d-flex align-items-center justify-content-between'>
                                    <h5 className='heading-main'>
                                        <img src={require("../../assets/images/back.svg").default} className="me-2" alt="icons" onClick={(e) => window.location.href = "/inventory"} />
                                        Property Name
                                        <span> Location</span></h5>

                                    <div className="inventory-detail-top-right">
                                        <h6 className="track-order"><img src={require("../../assets/images/track-order-icon.svg").default} alt="icon" />Track Order</h6>
                                        <div className='sort-box d-flex align-items-center'>
                                            <Form.Group
                                                className="sort-by-top-right"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <h6>SORT BY<img src={require("../../assets/images/filter.png")} alt="icons" className='sort-btn' /></h6>
                                                <div className='sort-bt-outer'>
                                                    <ul>
                                                        <li >Name</li>
                                                        <li >Date</li>
                                                        <hr></hr>
                                                        <li>Ascending</li>
                                                        <li>Descending</li>
                                                    </ul>
                                                </div>
                                            </Form.Group>
                                            <img src={require("../../assets/images/mi_filter-blue.svg").default} className="ms-2" alt="icons" />
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>

                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <div className="inventory-new-connection-table-outer">
                                        <div className="inventory-new-connection-left">
                                            <h5><img src={require("../../assets/images/buildingicon.svg").default} alt="img" />Building A</h5>
                                            <h6><img src={require("../../assets/images/unit-edit.svg").default} alt="img"/>Units: <span>8</span></h6>
                                        </div>
                                        <div className="inventory-new-connection-right">
                                            <h6><img src={require("../../assets/images/unit-edit.svg").default} alt="img" />Installer: <span>1</span></h6>
                                            <h6><img src={require("../../assets/images/unit-edit.svg").default} alt="img" />Smoke Detectors: <span>8</span></h6>
                                            <h6><img src={require("../../assets/images/unit-edit.svg").default} alt="img"/>Fire Alarms <span>8</span></h6>
                                        </div>
                                 </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Accordion Item #2</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>

                </div>
            </section>
        </>
    )
}
export default InventoryNewConnection;