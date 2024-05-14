import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import "./InventoryDetail.css"
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useEffect, useRef, useState } from "react";
import { APIServices } from "../../services/APIServices";
import { exceptionHandling } from "../../Common/CommonComponents";
import moment from 'moment';
import swal from 'sweetalert';
import AddDeviceCategory from "../modals/AddDeviceCategory";
import AddNewDeviceType from "../modals/AddNewDeviceType";
import { useLocation } from "react-use";

function InventoryDetail() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }
    const [deviceStatus, setdeviceStatus] = useState(false)
    const [showsuccess, setShowSuccess] = useState(false)
    const handleCloseSuccess = () => setShowSuccess(false);
    const [deviceId, setdeviceId] = useState("")
    const location = useLocation();
    const inventory = location?.state.usr;
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showAddNewDeviceModal, setShowAddNewDeviceModal] = useState(false);
    const [deviceType, setDeviceType] = useState([])
    const [device, setDevice] = useState([])
    const [filter, setFilter] = useState({ page: 0, size: 15, sortBy: "name", orderBy: "DESC" });
    const inventoryDetailMobileRef = useRef();
    const inventoryDetailRef = useRef();

    const deviceRef = useRef();
    const loadingResponse = useRef(false);
    const [showSortBy, setShowSortBy] = useState(false);
    const queryParams = new URLSearchParams(window.location.search);
    const categoryId = queryParams.get('categoryId');
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const categoryId = queryParams.get('categoryId');
        getDeviceTypeByCategoryId(categoryId, 0, 4)
    }, []);

    useEffect(() => {
        getDevices(filter);
        const handleClick = (event) => {
            if (event.target.innerText !== "SORT BY") {
                setShowSortBy(false);
            }
        };
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    function addNewCategory() {
        setShowCategoryModal(true);
    }

    // get Device Type
    async function getDeviceTypeByCategoryId(categoryId, page = 0, size = 4) {
        try {
            const response = await APIServices.getDeviceTypeByCategoryId(categoryId, page, size);
            if (response.status === 200) {
                setDeviceType(response.data)
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            exceptionHandling(error);
            console.error('Error fetching data:', error);
        }
    }

    function addNewCategory() {
        setShowCategoryModal(true);
    }

    const handleCategoryClose = () => {
        getDevices(filter);
        setShowCategoryModal(false);
        setEditDevice("");
    };

    const handleNewDeviceClose = () => {
        getDevices(filter);
        setShowAddNewDeviceModal(false);
    };

    function addNewDevice(categoryId) {
        setShowAddNewDeviceModal(true);
    }

    /// not responsive

    const onScroll = async (scrollData) => {
        if (scrollData) {
            const { scrollTop, scrollHeight, clientHeight } = scrollData;
            console.log("scrollTop + clientHeight === scrollHeight", scrollTop + clientHeight, scrollHeight,);
            if (scrollTop + clientHeight === scrollHeight) {
                const totalPages = Math.ceil(device?.totalElements / filter.size);
                let filterTemp = { ...filter };
                filterTemp.page = filterTemp.page + 1
                if (filterTemp.page < totalPages && !loadingResponse.current) {
                    loadingResponse.current = true;
                    setFilter(filterTemp);
                    getDevices(filterTemp);
                }
            }
        }
    };


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }



    function createDateFromData(createdDate) {
        const [year, month, day, hours, minutes, seconds, milliseconds] = createdDate;
        const formattedDate = `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`;
        return formattedDate;
    }
    // get device list
    async function getDevices(filter) {
        try {
            const response = await APIServices.getDevices(filter.page, filter.size, filter.direction, filter.orderBy, categoryId, filter?.deviceId);
            if (response.status === 200) {
                let responseData = response.data;
                let tempList;
                if (filter.page == 0) {
                    tempList = [];
                } else {
                    tempList = [...device.list];
                }
                tempList.push(...responseData.list);
                responseData.list = tempList;
                setDevice(responseData);
                loadingResponse.current = false;
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            exceptionHandling(error);
            console.error('Error fetching data:', error);
        }
    }

    // Function to handle delete action
    const handleDelete = async (customerId) => {
        try {
            setDevice(prevCustomers => ({
                ...prevCustomers,
                totalRecords: Number(prevCustomers.totalRecords) - 1,
                list: prevCustomers.list.filter(customer => customer.id !== customerId)
            }));
            const response = await APIServices.deleteDevices(customerId);
            if (response.status === 200) {
                setShow(false)
                setShowSuccess(true)
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            exceptionHandling(error);
            console.error('Error fetching data:', error);
        }
    };
    function sortByDevice(orderBy, direction) {
        const filterTemp = { ...filter };
        filterTemp.orderBy = orderBy;
        filterTemp.direction = direction;
        getDevices(filterTemp);
        setFilter(filterTemp);
    }

    function getDeviceById(deviceId) {
        const filterTemp = { ...filter, deviceId };
        getDevices(filterTemp);
    }
    const [editDevice, setEditDevice] = useState(false)
    function handleEditDevice(item) {
        setEditDevice(item)
        setShowCategoryModal(true)
    }
    function handleCloseEditDevice() {
        setEditDevice(false)
    }

    return (
        <>
            <section className='customer-section'>
                {/* header section statr */}
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

                <div className='customer-outer-section inventory-outer-content-area' >
                    <div className="inventory-detail-outer">
                        <div className='customer-list-header-mobile'>
                            <div className='customer-list-header d-flex align-items-center justify-content-between'>
                                <h5 className='heading-main'>
                                    <img src={require("../../assets/images/back.svg").default} className="me-2" alt="icons" onClick={(e) => window.location.href = "/inventory"} />
                                    {inventory?.name}
                                    <span className='customer-mobile-text'>{10}</span></h5>
                                <h3> {inventory?.count} Devices</h3>
                                <div className="inventory-detail-top-right">
                                    <div className='sort-box d-flex align-items-center'>
                                        <Form.Group
                                            className="sort-by-top-right"
                                            controlId="exampleForm.ControlInput1"
                                        >
                                            <h6 onClick={() => setShowSortBy(!showSortBy)} className='inventory-detail-sortby inventory-detail-sort-mobile' >SORT BY<img src={require("../../assets/images/filter.png")} alt="icons" className='sort-btn' /></h6>
                                            {showSortBy ? <div className='sort-bt-outer'>
                                                <ul>
                                                    <li className={filter.orderBy == "name" ? 'active' : ""} onClick={() => sortByDevice("name", filter.direction)}>Name</li>
                                                    <li className={filter.orderBy == "createdOn" ? 'active' : ""} onClick={() => sortByDevice("createdOn", filter.direction)}>Date</li>
                                                    <hr></hr>
                                                    <li className={filter.direction == "asc" ? 'active' : ""} onClick={() => sortByDevice(filter.orderBy, "asc")}>Ascending</li>
                                                    <li className={filter.direction == "desc" ? 'active' : ""} onClick={() => sortByDevice(filter.orderBy, "desc")}>Descending</li>
                                                </ul>
                                            </div> : ""}
                                        </Form.Group>
                                        <img src={require("../../assets/images/mi_filter-blue.svg").default} className="ms-2" alt="icons" />
                                    </div>


                                    <h6 className="inventory-add" onClick={addNewCategory}>ADD NEW <i class="fa fa-plus" aria-hidden="true"></i></h6>
                                    <p className='mobile-tab'>{inventory?.count}</p>
                                </div>
                            </div>
                        </div>
                        <div className="inventory-detail-columns">
                            <Row>
                                {deviceType.length <= 0 ? Array.from({ length: 4 }).map((item) => (
                                    <Col xs={6} md={6} lg={6} xl={3} >
                                        <div className='device-content-inner' >
                                            <div className='position-relative'>
                                                <Skeleton className="" height={210} />
                                            </div>
                                            <div className='device-info'>
                                                <Skeleton className="" height={25} width={100} />
                                                <span className='d-flex align-items-center arrow-icon'>
                                                    <Skeleton className="" height={25} width={30} />
                                                </span>
                                            </div>
                                        </div>
                                    </Col>
                                )) :
                                    deviceType?.list?.map((item, index) => {
                                        return (<Col xs={6} md={6} lg={6} xl={3} onClick={() => { getDeviceById(item.id); setdeviceStatus(true) }} >
                                            <div className='device-content-inner ${deviceStatus  ? `active` :"'>
                                                <div className='position-relative'>
                                                    <img src={require("../../assets/images/smoke-detector-image1.png")} alt="icons" />
                                                </div>
                                                <div className='device-info'>
                                                    <p>{item?.type ? item?.type : "N/A"}</p>
                                                    <span className='d-flex align-items-center arrow-icon'>
                                                        <h6>{item?.count ? item?.count : "0"}</h6>
                                                    </span>
                                                </div>
                                            </div>
                                        </Col>
                                        )
                                    })}
                            </Row>
                        </div>
                        <div className="customer-container-body">
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Manufacturer</th>
                                        <th>Serial Number</th>
                                        <th>DATE</th>
                                        <th >SKU</th>
                                        <th className="action-div" >ACTION</th>
                                    </tr>
                                </thead>
                                <tbody ref={inventoryDetailRef} onScroll={() => onScroll(inventoryDetailRef.current)} className="customer-scroll-main">
                                    {device?.length <= 0 ? <div className='border-radius'>
                                        <tr>
                                            <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} count={20} /></td>
                                            <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} count={20} /></td>
                                            <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} count={20} /></td>
                                            <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} count={20} /></td>
                                            <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} count={20} /></td>
                                            <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} count={20} /></td>
                                        </tr>
                                    </div> :
                                        device?.list?.length >0 ?
                                            device?.list?.map((item, index) => (
                                                <tr>
                                                    <td><img className="me-1" src={require("../../assets/images/device-icon.svg").default} alt="device"/>{item?.deviceTypeLabel ? item?.deviceTypeLabel : "N/A"}</td>
                                                    <td>{item?.manufacturer ? item?.manufacturer : "N/A"}</td>
                                                    <td>{item?.serialNumber ? item?.serialNumber : "N/A"}</td>
                                                    <td>{moment(item?.createdDate).format("DD-MM-YYYY")}</td>
                                                    <td>{item?.sku ? item?.sku : "N/A"}</td>

                                                    <td className='action-div'>

                                                        <img onClick={(e) => { handleShow(); setdeviceId(item.id) }} src={require("../../assets/images/ic_round-delete.svg").default} className="cursor-pointer me-2" alt="icons" />
                                                        <img src={require("../../assets/images/edit-box.svg").default} className="cursor-pointer" alt="icons"
                                                            onClick={(e) => handleEditDevice(item)}
                                                        />
                                                    </td>
                                                </tr>

                                            ))
                                            :
                                            <td className='action-div'>
                                                <span>No Data Found.</span>
                                            </td>
                                    }
                                </tbody>
                            </table>
                        </div>

                        {/* mobile side cards */}
                        {/* { window.innerHeight <= 768 && */}
                        <div className='customer-mobile-outer inventory-detail-mobile-outer'>
                            <div ref={inventoryDetailMobileRef} onScroll={() => onScroll(inventoryDetailMobileRef.current)} className="customer-scroll mobile">

                                {device?.list?.map((item, index) => (
                                    <div className='mobile-side-customer'>
                                        <div className="smoke-detector-mobile-outer">
                                            <div className="smoke-detector-mobile-outer-left">
                                                <h6>{item?.deviceTypeLabel ? item?.deviceTypeLabel : "N/A"}</h6>
                                                <p>{item?.manufacturer ? item?.manufacturer : "N/A"}</p>
                                            </div>
                                            <td className='action-div'>

                                                <img onClick={(e) => { handleShow(); setdeviceId(item.id) }} src={require("../../assets/images/ic_round-delete.svg").default} className="cursor-pointer me-2" alt="icons" />
                                                <img src={require("../../assets/images/edit-box.svg").default} className="cursor-pointer" alt="icons"
                                                    onClick={(e) => handleEditDevice(item)}
                                                />
                                            </td>

                                        </div>
                                        <div className="serial-sku">
                                            <div className="smoke-detector-serial">
                                                <h5>Serial</h5>
                                                <p>{item?.serialNumber ? item?.serialNumber : "N/A"}</p>
                                            </div>
                                            <div className="smoke-detector-sku">
                                                <h5>SKU</h5>
                                                <p>{item?.sku ? item?.sku : "N/A"}</p>
                                            </div>
                                        </div>
                                        <p className="added-date">Added on: {moment(item?.createdDate).format("DD-MM-YYYY")}</p>
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                        {/* } */}
                    </div>
                </div>
            </section >
            {showAddNewDeviceModal && <AddNewDeviceType show={showAddNewDeviceModal} handleClose={handleNewDeviceClose} categoryId={categoryId} />}

            {showCategoryModal &&
                <AddDeviceCategory show={showCategoryModal} handleClose={handleCategoryClose} editDevice={editDevice} />}

            {/* show warning custom model */}

            <Modal show={show} onHide={() => handleClose()} centered className='add-new-device-popup' >
                <Modal.Body>
                    <div className="successfull-section text-center">
                        <img class="delete-img" src={require("../../assets/images/delete.svg").default} className="delete-icons" alt="icons" />
                        <h4 className="succefull-txt">Are you sure want to delete</h4>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className='footer-btns-bottom-right mx-auto'>
                        <Button variant="secondary" onClick={handleClose}>
                            CANCEL
                        </Button>
                        <Button className="add-btn delete-btn" onClick={() => handleDelete(deviceId)} >
                            DELETE
                        </Button>
                    </div>
                </Modal.Footer>


            </Modal>

            {/* show success custom model */}
            <Modal show={showsuccess} onHide={() => handleCloseSuccess()} centered className='add-new-device-popup' >
                <Modal.Body>
                    <div className="successfull-section text-center ">
                        <img src={require("../../assets/images/check.svg").default} className="" alt="icons" />
                        <h4 className="succefull-txt">New Device Type has been deleted</h4>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className='footer-btns-bottom-right mx-auto'>


                        <Button className="add-btn delete-btn" onClick={handleCloseSuccess} >
                            OK
                        </Button>
                    </div>
                </Modal.Footer>


            </Modal>
        </>
    );
}

export default InventoryDetail;