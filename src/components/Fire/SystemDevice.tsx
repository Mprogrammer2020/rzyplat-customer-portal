import "./Fire.css";
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { APIServices } from "../../services/APIServices";
import { useEffect, useRef, useState } from "react";
import { exceptionHandling } from "../../Common/CommonComponents";
import Skeleton from "react-loading-skeleton";

interface firedevice {
    onlineCount: number,
    offlineCount: number,
    lowbatteryCount: number
}

function SystemDevice() {
    const [firedevice, setfiredevice] = useState<firedevice | null>(null);
    const [firedeviceStatus, setFireDeviceStatus] = useState(true)
    const [filterCount, setFilterCount] = useState("")
    const [selectedStatus, setSelectedStatus] = useState('online');
    const [filter, setFilter] = useState({ page: 0, size: 10 });
    const firedeviceRef = useRef();
    const loadingResponse = useRef(false);

    useEffect(() => {
        getFireDeviceList("", filter)
    }, [])

    async function getFireDeviceList(filters, filter) {
        try {
            const response = await APIServices.fireDeviceList(filters, filter);
            if (response.status === 200) {
                console.log("setFilterCount", response)
                let responseData = response.data as firedevice;
                setfiredevice(responseData);
                setFireDeviceStatus(false)
                loadingResponse.current =false
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            exceptionHandling(error);
        }
    }

    const handleStatusClick = async (status) => {
        let newStatus = selectedStatus === status ? '' : status;
        setSelectedStatus(newStatus);

        let filters = {};
        if (newStatus === 'online') {
            filters = { online: true };
        } else if (newStatus === 'offline') {
            filters = { online: false };
        } else if (newStatus === 'lowBattery') {
            filters = { lowBattery: true };
        }

        try {
            getFireDeviceList(filters, filter);
        } catch (error) {
            console.error('API call failed', error);
        }
    };

    const onScroll = async (scrollData) => {
        if (scrollData) {
            const { scrollTop, scrollHeight, clientHeight } = scrollData;
            console.log("scrollTop + clientHeight === scrollHeight", scrollTop + clientHeight, scrollHeight,);
            if (scrollTop + clientHeight === scrollHeight) {
                const totalPages = Math.ceil(firedevice?.totalElements / filter.size);
                let filterTemp = { ...filter };
                filterTemp.page = filterTemp.page + 1
                if (filterTemp.page < totalPages && !loadingResponse.current) {
                    loadingResponse.current = true;
                    setFilter(filterTemp);
                    getFireDeviceList("", filterTemp)
                }
            }
        }
    };


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
                                            <p class="mobile-tab mobile-tab-contact">{firedevice?.totalElements}</p>
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
                                    <div className={`inner-status-bar ${selectedStatus === 'online' ? 'active' : ''}`} onClick={() => handleStatusClick('online')}>
                                        <div>
                                            <img src={require("../../assets/images/online.svg").default} className="me-2" alt="icons" />
                                            <span>Online</span>
                                        </div>
                                        <div className="d-flex ms-3">
                                            <span className="status-text me-2">{firedevice?.onlineCount || "-"}</span>
                                            <img src={require("../../assets/images/close-window.svg").default} className="close-window" alt="icons" />
                                        </div>
                                    </div>
                                    <div className={`inner-status-bar offline ${selectedStatus === 'offline' ? 'active' : ''}`} onClick={() => handleStatusClick('offline')}>
                                        <div>
                                            <img src={require("../../assets/images/offline.svg").default} className="me-2" alt="icons" />
                                            <span>Offline</span>
                                        </div>
                                        <div className="d-flex ms-3">
                                            <span className="status-text me-2">{firedevice?.offlineCount || "-"}</span>
                                            <img src={require("../../assets/images/close-window.svg").default} className="close-window" alt="icons" />
                                        </div>
                                    </div>
                                    <div className={`inner-status-bar ${selectedStatus === 'lowBattery' ? '' : ''}`} onClick={() => handleStatusClick('lowBattery')}>
                                        <div>
                                            <img src={require("../../assets/images/battery-low.svg").default} className="me-2" alt="icons" />
                                            <span>Low Battery</span>
                                        </div>
                                        <div className="d-flex ms-3">
                                            <span className="status-text me-2">{firedevice?.lowbatteryCount || "-"}</span>
                                            <img src={require("../../assets/images/close-window.svg").default} className="close-window" alt="icons" />
                                        </div>
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
                            <tbody ref={firedeviceRef} onScroll={() => onScroll(firedeviceRef.current)} className="customer-scroll">
                                {firedeviceStatus == true ?
                                    (<div className='border-radius'>
                                        <tr>
                                            <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} /></td>
                                            <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} /></td>
                                            <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} /></td>
                                            <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} /></td>
                                            <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} /></td>
                                        </tr>
                                    </div>) :
                                    firedevice?.list?.length > 0 ?
                                        firedevice?.list?.map((item, index) => {
                                            return (
                                                <tr >
                                                    <td><p className="device-text-main">{item?.deviceId || "N/A"}</p></td>
                                                    <td>{item?.property || "N/A"}</td>
                                                    <td>{item?.installationDate || "N/A"}</td>
                                                    <td className="property-section">
                                                        <p className='role inner-role'>
                                                        <img src={item?.temperature < 20 ? require("../../assets/images/red-tem.svg").default : require("../../assets/images/lets-icons_temperature-fill.svg").default} className="me-2 red-temprature" alt="icons" />

                                                        Temperature: <span className={item?.temperature < 20 ? "red-temp" : "green-temp"}>{item?.temperature || "N/A"}</span></p>
                                                        <p className='role inner-role small-role'><img src={require("../../assets/images/humadity.svg").default} className="me-2" alt="icons" />Humidity: <span className="red-temp green-text">{item?.humidity || "N/A"}%</span></p>
                                                    </td>
                                                    <td className='action-div'>
                                                        <Button className={`battery-btn ${item?.batteryLevel < 20 ? 'red' : item?.batteryLevel < 50 ? 'yello' : ""}`}>
                                                            <img src={require(item?.batteryLevel < 20 ? "../../assets/images/loose-battery.svg" : item?.batteryLevel < 50 ?"../../assets/images/loose-battery.svg":"../../assets/images/battery.svg").default} className="me-2" alt="icons" />
                                                             Battery<b className="ms-3 main-text-battery">{item?.batteryLevel || "-"}</b></Button>
                                                        <Button className={`battery-btn online-offline ${item?.online === false ? 'offline' : 'online'}`}>
                                                            {item?.online === false ? "OFFLINE" : "ONLINE"}
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <p>No device Available here</p>
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    )
}
export default SystemDevice;