import "./Alert.css";
import { Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function Alert() {
    return (
        <>
            <div className="alert-main-section">
                {/* header section statr */}
                <header className='mobile-header'>
                    <Row className='align-items-center'>
                        <Col xs={6} md={6}>
                            <div className='header-left-box'>
                                <h5 className='heading-main'><img src={require("../../assets/images/alert-icon.svg").default} className="me-2" alt="icons" /> Alerts</h5>
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
                <div className="alert-body-section">
                    <Row>
                        <Col md ={3}>
                            <div className="alert-box">
                                <p>Alerts Completed</p>
                                <h4><img src={require("../../assets/images/report-1.svg").default} className="" alt="icons" /> 230</h4>
                            </div>
                        </Col>
                        <Col md ={3}>
                            <div className="alert-box">
                                <p>Alerts Completed</p>
                                <h4><img src={require("../../assets/images/report-2.svg").default} className="" alt="icons" /> 30</h4>
                            </div>
                        </Col>
                        <Col md ={3}>
                            <div className="alert-box">
                                <p>Alerts Completed</p>
                                <h4><img src={require("../../assets/images/report-3.svg").default} className="" alt="icons" /> 2 min</h4>
                            </div>
                        </Col>
                        <Col md ={3}>
                            <div className="alert-box">
                                <p>Alerts Completed</p>
                                <h4><img src={require("../../assets/images/report-3.svg").default} className="" alt="icons" /> 5 min</h4>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>

        </>
    )
}
export default Alert;