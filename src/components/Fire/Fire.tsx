import "./Fire.css";
import { useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import { exceptionHandling } from "../../Common/CommonComponents";
import { APIServices } from "../../services/APIServices";
import moment from "moment";
// import { Link,useNavigate } from 'react-router-dom';
import Skeleton from "react-loading-skeleton";
import CalendarComponent from "../../Common/CalendarComponent.tsx";


interface firealert {
    activeAlerts: number;
    totalAlerts: number;
    totalDevices: number;
}
interface fireHistory {
    createdDate:string,
    closedDate:string,
    property:string,
    unitStatus:string,
}

function Fire() {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const [page, setPage]=useState(0)
    const [firealert, setFireAlert]=useState<firealert | null>(null); 
    const [fireHistory, setFireHistory]=useState<fireHistory | null>(null)
    const [fireHistoryStatus, setfireHistoryStatus]=useState(true)
    const fireHistoryRef = useRef();
    const loadingResponse = useRef(false);
    const [filter, setFilter] = useState({ page: 0, size: 10, sortBy: "name", orderBy: "DESC" });
    const handleShow = () => {
        setShow(true);
        getFireAlertHistory(filter)
    }
    const [showCalanderModal, setShowCalanderModal] = useState(false)
    const handleCloseCalander = () => setShowCalanderModal(false);
    const handleCalanderShow = () => setShowCalanderModal(true);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    useEffect(() =>{
        getFireAlert()

    },[])
   
    async function getFireAlert() {
        try {
            const response = await APIServices.firealerts();
            if (response.status === 200) {
                let responseData = response.data as firealert;
                console.log("getFireAlert responseData------->",responseData)
                setFireAlert(responseData);
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            exceptionHandling(error);
        }
    }

    async function getFireAlertHistory(filter) {
        try {
            const response = await APIServices.firealertsHistory(filter.page, filter.size);
            if (response.status === 200) {
                let responseData = response.data as fireHistory;
                console.log("fireHistory responseData------->",responseData)
                setFireHistory(responseData);
                setfireHistoryStatus(false)
                loadingResponse.current = false;
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            exceptionHandling(error);
        }
    }


    const onScroll = async (scrollData) => {
        if (scrollData) {
            const { scrollTop, scrollHeight, clientHeight } = scrollData;
            console.log("scrollTop + clientHeight === scrollHeight", scrollTop + clientHeight, scrollHeight,);
            if (scrollTop + clientHeight === scrollHeight) {
                const totalPages = Math.ceil(fireHistory?.totalElements / filter.size);
                let filterTemp = { ...filter };
                filterTemp.page = filterTemp.page + 1
                if (filterTemp.page < totalPages && !loadingResponse.current) {
                    loadingResponse.current = true;
                    setFilter(filterTemp);
                    getFireAlertHistory(filterTemp);
                }
            }
        }
    };


    return (
        <>
            <div className="alert-main-section">
                {/* header section statr */}
                <header className='mobile-header'>
                    <Row className='align-items-center'>
                        <Col xs={6} md={6}>
                            <div className='header-left-box'>
                                <h5 className='heading-main'><img src={require("../../assets/images/fire.svg").default} className="me-2" alt="icons" /> Fire</h5>
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
                                    <div className="calender-view">
                                        <Button className="fire-history-btn" onClick={handleCalanderShow}>FILTER <img src={require("../../assets/images/CALENDER.svg").default} className="ms-2" alt="icons" /></Button>
                                        {showCalanderModal &&
                                            <CalendarComponent onClose={handleCloseCalander}  initialDate={selectedDate} />}
                                    </div>
                                </div>
                                <div className="alarm-body">
                                    <Row>
                                        <Col md={6}>
                                            <div className="alarm-content">
                                                <div className="alarm-content-inner">
                                                    <img src={require("../../assets/images/alarm-lg.svg").default} className="me-2" alt="icons" />
                                                    <div className="alarm-content-left">
                                                        <p>Alerts</p>
                                                        <h6>{firealert?.totalAlerts || "-"}</h6>
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
                                                        <h6>{firealert?.activeAlerts || "-"}</h6>
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
                                <div className="weather-header">
                                    <h5 className='heading-main text-dark'><img src={require("../../assets/images/device.svg").default} className="me-2" alt="icons" /> Device Summary</h5>
                                </div>
                                <div className="alarm-body">
                                    <div className="alarm-content border-0 pe-0">
                                        <div className="alarm-content-inner" onClick={(e) => navigate("/system-device")}>
                                            <img src={require("../../assets/images/device-main.svg").default} className="me-2" alt="icons" />
                                            <div className="alarm-content-left">
                                                <p>Total Devices</p>
                                                <h6 className="blue-text">{firealert?.totalDevices || "-"}</h6>
                                            </div>
                                        </div>
                                        <img src={require("../../assets/images/right-icon.svg").default} className="" alt="icons" />
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
                                <p className='mobile-tab mobile-tab-contact text-light'>{fireHistory?.totalElements || "-"} items</p>
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
                                <tbody  ref={fireHistoryRef} onScroll={() => onScroll(fireHistoryRef.current)} className="customer-scroll">
                                       { fireHistoryStatus == true ?

                                         <div className='border-radius'>
                                         <tr>
                                             <td><Skeleton className="main-wallet-top mb-2" height={30} width={150}  /></td>
                                             <td><Skeleton className="main-wallet-top mb-2" height={30} width={150}  /></td>
                                             <td><Skeleton className="main-wallet-top mb-2" height={30} width={150}  /></td>
                                             <td><Skeleton className="main-wallet-top mb-2" height={30} width={150}  /></td>
                                             <td><Skeleton className="main-wallet-top mb-2" height={30} width={150}  /></td>
                                         </tr>
                                     </div>
                                     :
                                       fireHistory?.list?.length >0 ?
                                       fireHistory?.list?.map((alert, index) =>{
                                        return(
                                            <tr>
                                            <td><span>{alert?.createdDate ? moment(alert?.createdDate).format("DD-MM-YYYY") :"N/A"}</span><br></br>
                                            <span className="time-text">{alert?.createdDate ? moment(alert?.createdDate).format('LT') :"N/A"}</span>
                                            </td>
                                            <td><p className="property-address">{alert?.property || "N/A"}</p></td>
                                            <td><p className='role'>{alert?.unitStatus || "N/A"}</p></td>
                                            <td className="property-section"><span>{alert?.closedDate ? moment(alert?.closedDate).format("DD-MM-YYYY") :"N/A"}</span><br></br>
                                            <span className="time-text">{alert?.closedDate ? moment(alert?.closedDate).format('LT') :"N/A"}</span></td>
                                            <td className='action-div'>
                                                <img src={require("../../assets/images/send-action.svg").default} className="" alt="icons" />
                                            </td>
                                        </tr>
                                        )
                                       }) 
                                       :
                                       <p>No fire History</p>
                                    }
                                       
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
export default Fire;