import { Button, Col, Form, Row } from "react-bootstrap";
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

function InventoryDetail() {
    const [customers, setCustomers] = useState([]);
    // const [categoryId, setCategoryId] = useState();
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showAddNewDeviceModal, setShowAddNewDeviceModal] = useState(false);
    const [deviceType, setDeviceType] = useState([])
    const [device, setDevice] = useState([])
    const [filter, setFilter] = useState({ page: 0, size: 15, sortBy: "name", orderBy: "DESC" });
    const customersRef = useRef();
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

    // Define function to fetch Customers
    async function getCustomers(params) {
        try {
            const response = await APIServices.getCustomers(params.page, params.size, params.sortBy, params.orderBy);
            if (response.status === 200) {
                let responseData = response.data;
                let tempList;
                if (params.page == 0) {
                    tempList = [];
                } else {
                    tempList = [...customers.list];
                }
                tempList.push(...responseData.list);
                responseData.list = tempList;
                setCustomers(responseData);
                loadingResponse.current = false;

            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            loadingResponse.current = false;
            exceptionHandling(error);
            console.error('Error fetching data:', error);
        }
    }

    // get Device Type
    async function getDeviceTypeByCategoryId(categoryId, page = 0, size = 4) {
        try {
            const response = await APIServices.getDeviceTypeByCategoryId(categoryId, page, size);
            if (response.status === 200) {
                console.log("getDeviceTypeByCategoryId=====", response?.data)
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
    };

    const handleNewDeviceClose = () => {
        getDevices(filter);
        setShowAddNewDeviceModal(false);
    };

    function addNewDevice(categoryId) {
        // setCategoryId(categoryId);
        setShowAddNewDeviceModal(true);
    }

    const onScroll = async () => {
        if (customersRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = customersRef.current;
            console.log("scrollTop + clientHeight === scrollHeight",scrollTop + clientHeight , scrollHeight);
            if (scrollTop + clientHeight === scrollHeight) {
                const totalPages = Math.ceil(customers?.totalElements / filter.size);
                let filterTemp = { ...filter };
                filterTemp.page = filterTemp.page + 1
                if (filterTemp.page < totalPages && !loadingResponse.current) {
                    loadingResponse.current = true;
                    setFilter(filterTemp);
                    getCustomers(filterTemp);
                }
            }
        }
    };


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Function to sort customer data
    const sortCustomers = (sortOrder) => {
        let filterTemp = { ...filter };
        const parts = sortOrder.split(" ");
        filterTemp.sortBy = parts[0].toLowerCase();
        filterTemp.orderBy = parts[1];
        filterTemp.page = 0;
        setFilter(filterTemp);
        getCustomers(filterTemp);

    };

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
        // Implement delete action logic here
        swal({ title: "", text: "Are you sure you want to delete this devices?", icon: "warning", buttons: ["No", "Yes"] }).then(async (res) => {
            if (res) {
                try {
                    setDevice(prevCustomers => ({
                        ...prevCustomers,
                        totalRecords: Number(prevCustomers.totalRecords) - 1,
                        list: prevCustomers.list.filter(customer => customer.id !== customerId)
                    }));
                    const response = await APIServices.deleteDevices(customerId);
                    if (response.status === 200) {
                        swal("Success", "Device has been delete from Inventory", "success")

                    } else {
                        throw new Error('Failed to fetch data');
                    }
                } catch (error) {
                    exceptionHandling(error);
                    console.error('Error fetching data:', error);
                }
            }
        });
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

                <div className='customer-outer-section' >
                    <div className="inventory-detail-outer">
                        <div className='customer-list-header-mobile'>
                            <div className='customer-list-header d-flex align-items-center justify-content-between'>
                                <h5 className='heading-main'>
                                    <img src={require("../../assets/images/back.svg").default} className="me-2" alt="icons" onClick={(e) => window.location.href = "/inventory"} />
                                    Smoke Detectors
                                    <span className='customer-mobile-text'>{10}</span></h5>
                                <div className="inventory-detail-top-right">
                                    <div className='sort-box d-flex align-items-center'>
                                        <Form.Group
                                            className="sort-by-top-right"
                                            controlId="exampleForm.ControlInput1"
                                        >
                                            <h6 onClick={() => setShowSortBy(!showSortBy)}>SORT BY<img src={require("../../assets/images/filter.png")} alt="icons" className='sort-btn' /></h6>
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

                                    <h6 onClick={addNewCategory}>ADD NEW <i class="fa fa-plus" aria-hidden="true"></i></h6>
                                    <p className='mobile-tab'>{deviceType?.list && deviceType?.list[0]?.count}</p>
                                </div>
                            </div>
                        </div>
                        <div className="inventory-detail-columns">
                            <Row>
                                {deviceType.length <= 0 ? Array.from({length:4}).map((item)=>(
                                    <Col md={6} lg={6} xl={3}>
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
                                        return (<Col md={6} lg={6} xl={3} onClick={() => getDeviceById(item.id)} >
                                            <div className='device-content-inner' >
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
                                <tbody ref={customersRef} onScroll={onScroll} className="customer-scroll">
                                    {device?.list?.length <= 0 ? <div className='border-radius'>
                                        <tr>
                                            <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} count={20} /></td>
                                            <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} count={20} /></td>
                                            <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} count={20} /></td>
                                            <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} count={20} /></td>
                                            <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} count={20} /></td>
                                            <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} count={20} /></td>
                                            <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} count={20} /></td>

                                        </tr>
                                    </div> :
                                        device?.list?.map((item, index) => (
                                            <tr>
                                                <td>{item?.deviceTypeLabel ? item?.deviceTypeLabel : "N/A"}</td>
                                                <td>{item?.manufacturer ? item?.manufacturer : "N/A"}</td>
                                                <td>{item?.serialNumber ? item?.serialNumber : "N/A"}</td>
                                                <td>{moment(item?.createdDate).format("DD-MM-YYYY")}</td>
                                                <td>{item?.sku ? item?.sku : "N/A"}</td>

                                                <td className='action-div'>

                                                    <img src={require("../../assets/images/ic_round-delete.svg").default} className="cursor-pointer me-2" alt="icons" onClick={() => handleDelete(item.id)} />
                                                    <img src={require("../../assets/images/edit-box.svg").default} className="cursor-pointer" alt="icons"

                                                    />
                                                </td>
                                            </tr>

                                        ))}
                                </tbody>
                            </table>
                        </div>

                        {/* mobile side cards */}
                        <div ref={customersRef} onScroll={onScroll} className="customer-scroll mobile">
                            {customers.length <= 0 ?
                                <>{
                                    Array.from({ length: 5 }).map(() => (<div className='mobile-side-customer'>

                                        <p className='d-flex align-items-center'><span className='customer-name'><Skeleton className="main-wallet-top mb-2" height={30} width={10} /></span><Skeleton className="main-wallet-top mb-2" height={30} width={200} /></p>
                                        <hr></hr>
                                        <p className='role'><span><img src={require("../../assets/images/call.svg").default} className="cursor-pointer me-2" alt="icons" />Phone</span> <span className='number'><Skeleton className="main-wallet-top mb-2" height={30} width={150} /></span></p>
                                        <p className='role'><span><img src={require("../../assets/images/email.svg").default} className="cursor-pointer me-2" alt="icons" />Email</span> <span className='number'><Skeleton className="main-wallet-top mb-2" height={30} width={150} /></span></p>
                                        <p className='role'><span><img src={require("../../assets/images/date.svg").default} className="cursor-pointer me-2" alt="icons" />Joined</span> <span className='number'><Skeleton className="main-wallet-top mb-2" height={30} width={150} /></span></p>
                                        <p className='role'><span><img src={require("../../assets/images/building.svg").default} className="cursor-pointer me-2" alt="icons" />Property</span> <span className='number'><Skeleton className="main-wallet-top mb-2" height={30} width={150} /></span></p>
                                        <div className='trash-section d-flex justify-content-between mt-2'>
                                            <Skeleton className="main-wallet-top mb-2" height={30} width={150} />
                                            <img src={require("../../assets/images/ic_round-delete.svg").default} className="cursor-pointer" alt="icons" />
                                        </div>

                                    </div>))
                                }</>
                                :
                                customers?.list?.map((customer, index) => (
                                    <div className='mobile-side-customer'>
                                        <p className='d-flex align-items-center'><span className='customer-name'>{customer.name ? customer.name.charAt(0).toUpperCase() : ""}</span>{customer.name}</p>
                                        <hr></hr>
                                        <p className='role'><span><img src={require("../../assets/images/call.svg").default} className="cursor-pointer me-2" alt="icons" />Phone</span> <span className='number'>{customer.phone}</span></p>
                                        <p className='role'><span><img src={require("../../assets/images/email.svg").default} className="cursor-pointer me-2" alt="icons" />Email</span> <span className='number'>{customer.email}</span></p>
                                        <p className='role'><span><img src={require("../../assets/images/date.svg").default} className="cursor-pointer me-2" alt="icons" />Joined</span> <span className='number'>{createDateFromData(customer.createdDate)}</span></p>
                                        <p className='role'><span><img src={require("../../assets/images/building.svg").default} className="cursor-pointer me-2" alt="icons" />Property</span> <span className='number'>{customer?.property.map((property, innerIndex) => { return innerIndex ? `, ${capitalizeFirstLetter(property)}` : capitalizeFirstLetter(property) })}</span></p>
                                        <div className='trash-section d-flex justify-content-between mt-2'>
                                            <Button className="blue-btn">{customer.role}</Button>
                                            <img src={require("../../assets/images/ic_round-delete.svg").default} className="cursor-pointer" alt="icons"
                                            // onClick={() => handleDelete(customer.id)}
                                            />
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </section >
            {showAddNewDeviceModal && <AddNewDeviceType show={showAddNewDeviceModal} handleClose={handleNewDeviceClose} categoryId={categoryId} />}
            {showCategoryModal &&
                <AddDeviceCategory show={showCategoryModal} handleClose={handleCategoryClose} />}
        </>
    );
}

export default InventoryDetail;
