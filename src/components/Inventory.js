import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Select from "react-select";
import AddNewDeviceType from './modals/AddNewDeviceType';
import AddDeviceCategory from './modals/AddDeviceCategory';
import { APIServices } from '../services/APIServices';
import { exceptionHandling, getFileURL } from '../Common/CommonComponents';
import Skeleton from 'react-loading-skeleton';

const Inventory = () => {
    const [categoryId, setCategoryId] = useState();
    const [showAddNewDeviceModal, setShowAddNewDeviceModal] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showSortBy, setShowSortBy] = useState(false);
    const [categories, setCategories] = useState([]);
    const [filter, setFilter] = useState({ page: 0, size: 30, orderBy: "name", direction: "desc" });
    const inventoryRef = useRef();
    // const navigate = useNavigate();




    useEffect(() => {
        getCategories(filter);
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

    function addNewDevice(categoryId) {
        setCategoryId(categoryId);
        setShowAddNewDeviceModal(true);
    }

    const handleNewDeviceClose = () => {
        getCategories(filter);
        setShowAddNewDeviceModal(false);
    };

    function addNewCategory() {
        setShowCategoryModal(true);
    }

    const handleCategoryClose = () => {
        getCategories(filter);
        setShowCategoryModal(false);
    };

    const loadingResponse = useRef(false);


    async function getCategories(filter) {
        try {
            const response = await APIServices.getCategories(filter.page, filter.size, filter.orderBy, filter.direction);
            if (response.status === 200) {
                let responseData = response.data;
                let tempList;
                if (filter.page == 0) {
                    tempList = [];
                } else {
                    tempList = [...categories.list];
                }
                tempList.push(...responseData.list);
                responseData.list = tempList;
                setCategories(responseData);
                loadingResponse.current = false;
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            exceptionHandling(error);
            console.error('Error fetching data:', error);
        }
    }

    const onScroll = async () => {
        if (inventoryRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = inventoryRef.current;
            console.log("scrollTop + clientHeight === scrollHeight",scrollTop + clientHeight , scrollHeight);
            if (scrollTop + clientHeight === scrollHeight) {
                const totalPages = Math.ceil(categories.totalElements / filter.size);
                console.log("totalPages",totalPages);
                let filterTemp = { ...filter };
                filterTemp.page = filterTemp.page + 1
                if (filterTemp.page < totalPages && !loadingResponse.current) {
                    loadingResponse.current = true;
                    setFilter(filterTemp);
                    getCategories(filterTemp);
                }
            }
        }
    };


    function sortByDevice(orderBy, direction) {
        const filterTemp = { ...filter };
        filterTemp.orderBy = orderBy;
        filterTemp.direction = direction;
        getCategories(filterTemp);
        setFilter(filterTemp);
    }


    return (
        <>
            <section className='customer-section'>
                {/* header section statr */}
                <header className='mobile-header'>
                    <Row className='align-items-center'>
                        <Col xs={6} md={6}>
                            <div className='header-left-box'>
                                <h5 className='heading-main'><img src={require("../assets/images/ci_building-04.svg").default} className="me-2" alt="icons" /> Inventory</h5>
                            </div>
                        </Col>
                        <Col xs={6} md={6}>
                            <div className='header-right-box'>
                                <Form>
                                    <Form.Group className="position-relative w-50" controlId="exampleForm.ControlInput1">
                                        <img src={require("../assets/images/iconamoon_search.svg").default} className="search-icon" alt="icons" />
                                        <Form.Control type="email" placeholder="Search" />
                                        {/* <span className='cutomer-text'>CUSTOMERS</span> */}
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
                                    <Button type='button' variant='unset'>New Connection</Button>
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
                            <h5><img src={require("../assets/images/dashboard.png")} alt="icons" />Devices <span>{categories.length <= 0 ? <Skeleton height={30} width={50} /> : categories.totalElements}</span></h5>
                            <div className='devices-area-top-right'>
                                <Form.Group
                                    className="sort-by-top-right"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <h6 onClick={() => setShowSortBy(!showSortBy)}>SORT BY<img src={require("../assets/images/filter.png")} alt="icons" className='sort-btn' /></h6>
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

                                <h6 onClick={addNewCategory}>ADD NEW <i class="fa fa-plus" aria-hidden="true"></i></h6>
                            </div>
                        </div>
                        <div className='overflow-slider' ref={inventoryRef} onScroll={onScroll}>
                            <Row>
                                {categories.length <=0 ?
                                    <>
                                        {Array.from({ length: 9 }).map(() => (
                                            <Col md={6} lg={6} xl={4}>
                                                <div className='position-relative add-green-btn-outer-box'>
                                                    <div className='device-content-inner'>
                                                        <Skeleton height={300} />
                                                        <div className='d-flex justify-content-between'>
                                                            <Skeleton height={30} width={200} />
                                                            <Skeleton height={30} width={100} />
                                                        </div>
                                                    </div>

                                                </div>
                                            </Col>))}
                                    </>
                                    :
                                    categories?.list?.map((item, index) => {
                                        return (<Col md={6} lg={6} xl={4}>
                                            <div className='position-relative add-green-btn-outer-box'>
                                                <Button type='button' className='main-btn' variant='unset' onClick={() => addNewDevice(item?.id)}><i class="fa fa-plus" aria-hidden="true"></i> New Device Type</Button>
                                                <div className='device-content-inner' onClick={(e) => window.location.href =`/inventory-details?categoryId=${item.id}`}>
                                                    <div className='position-relative'>
                                                        <img src={`data:${item?.imageContentType};base64,${item?.imageContent}`} alt="icons" />
                                                        {/* <div className='inner-img' >
                                                            <img src={require("../assets/images/device1.png")} alt="icons" />
                                                        </div> */}
                                                    </div>
                                                    <div className='device-info'>
                                                        <p>{item?.name}</p>
                                                        <span className='d-flex align-items-center arrow-icon'>
                                                            <h6 className='upper-text'>{item?.count}</h6>
                                                            <h6 className='hover-text'>{item?.count} <img src={require("../assets/images/left.svg").default} alt="icons" /></h6>
                                                        </span>
                                                    </div>
                                                </div>
                                                {item?.deviceTypes.length > 0 ? <div className='inner-hover-divice first-child-section'>
                                                    {item?.deviceTypes?.map((innerItem, innerIndex) => {
                                                        if (innerIndex < 5) {
                                                            return (<span className='device-text'><span className='inner-main-text'>{innerItem?.type}</span><b>{innerItem?.count}</b></span>)
                                                        }
                                                    })}
                                                    {item?.deviceTypes.length > 5 ? <Button type='button' className='view-more' variant='unset'>View More <i class="fa fa-chevron-down" aria-hidden="true"></i></Button> : ""}
                                                </div> : ""}
                                            </div>
                                        </Col>)
                                    })
                                }
                            </Row>
                        </div>
                    </div>
                </div>
            </section>

            {showAddNewDeviceModal && <AddNewDeviceType show={showAddNewDeviceModal} handleClose={handleNewDeviceClose} categoryId={categoryId} />}
            {showCategoryModal && 
<AddDeviceCategory show={showCategoryModal} handleClose={handleCategoryClose} />}

        </>


    );
};

export default Inventory;
