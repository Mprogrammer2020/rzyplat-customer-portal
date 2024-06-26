import "./Alert.css";
import { Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { APIServices } from "../../services/APIServices";
import { useStartTyping } from "react-use";
import { exceptionHandling } from "../../Common/CommonComponents";
import { useEffect, useState } from "react";

interface statsAlert {
    alertCloseTime: number;
    alertOpenTime: number;
    averageAlertsPerWeek: number;
    completedAlerts: number;
}

function Alert() {
    const [statsAlert, setStatsAlert]=useState<statsAlert | null>(null);
    

    useEffect(() =>{
        getStatsAlert()
    },[])
   
    async function getStatsAlert() {
        try {
            const response = await APIServices.alertStats();
            if (response.status === 200) {
                let responseData = response.data as statsAlert;
                console.log("responseData------->",responseData)
                setStatsAlert(responseData);
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            exceptionHandling(error);
        }
    }

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
                                <h4><img src={require("../../assets/images/report-1.svg").default} className="" alt="icons" /> {statsAlert?.completedAlerts || "-"}</h4>
                            </div>
                        </Col>
                        <Col md ={3}>
                            <div className="alert-box">
                                <p>Average Alerts Per Week</p>
                                <h4><img src={require("../../assets/images/report-2.svg").default} className="" alt="icons" /> {statsAlert?.averageAlertsPerWeek || "-"}</h4>
                            </div>
                        </Col>
                        <Col md ={3}>
                            <div className="alert-box">
                                <p>Alert Close Time</p>
                                <h4><img src={require("../../assets/images/report-3.svg").default} className="" alt="icons" /> {statsAlert?.alertCloseTime +" min" || "-"}</h4>
                            </div>
                        </Col>
                        <Col md ={3}>
                            <div className="alert-box">
                                <p>Alert Open Time</p>
                                <h4><img src={require("../../assets/images/report-3.svg").default} className="" alt="icons" />{statsAlert?.alertOpenTime + " min" || "-"}</h4>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>

        </>
    )
}
export default Alert;