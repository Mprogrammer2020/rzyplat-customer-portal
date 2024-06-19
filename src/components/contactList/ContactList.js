import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { APIServices } from '../../services/APIServices';
import { exceptionHandling } from '../../Common/CommonComponents';
import Skeleton from 'react-loading-skeleton';
import swal from 'sweetalert';
import "./ContactList.css";
import AddDeviceCategory from '../modals/AddDeviceCategory';
import AddNewContact from '../modals/AddNewContact';


const ContactList = () => {
    const [contactList, setContactList] = useState([]);
    const [filter, setFilter] = useState({ page: 0, size: 10, sortBy: "name", orderBy: "DESC" });
    const contactListRef = useRef();
    const loadingResponse = useRef(false);
    const [showsuccess, setShowSuccess]=useState(false)
    const [showsuccessStatus, setShowEditStatus]=useState(false)
    const [showwarning, setshowwarning]=useState(false)
    const [contactID, setContactId]=useState("")

    useEffect(() => {
        getcontactList(filter);
    }, []);
    async function getcontactList(params) {
        try {
            const response = await APIServices.getcontactList(params.page, params.size, params.sortBy, params.orderBy);
            if (response.status === 200) {
                let responseData = response.data;
                let tempList;
                if (params.page == 0) {
                    tempList = [];
                } else {
                    tempList = [...contactList.list];
                }
                tempList.push(...responseData.list);
                responseData.list = tempList;
                setContactList(responseData);
                loadingResponse.current = false;

            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            loadingResponse.current = false;
            exceptionHandling(error);
        }
    }

    // Function to sort customer data
    const sortcontactList = (sortOrder) => {
        let filterTemp = { ...filter };
        const parts = sortOrder.split(" ");
        filterTemp.sortBy = parts[0].toLowerCase();
        filterTemp.orderBy = parts[1];
        filterTemp.page = 0;
        setFilter(filterTemp);
        getcontactList(filterTemp);

    };
    const handleDelete = async (customerId) => {
                try {
                    setContactList(prevcontactList => ({
                        ...prevcontactList,
                        totalRecords: Number(prevcontactList.totalRecords) - 1,
                        list: prevcontactList.list.filter(customer => customer.id !== customerId)
                    }));
                    const response = await APIServices.deleteContact(customerId);
                    if (response.status === 200) {
                        setshowwarning(false)
                    } else {
                        throw new Error('Failed to fetch data');
                    }
                } catch (error) {
                    exceptionHandling(error);
                    console.error('Error fetching data:', error);
                }
            
    };

    function createDateFromData(createdDate) {
        // Extract date components from data
        const [year, month, day, hours, minutes, seconds, milliseconds] = createdDate;
        // createdDate = new Date(year, month - 1, day, hours, minutes, seconds, milliseconds);
        const formattedDate = `${String(day)?.padStart(2, '0')}-${String(month)?.padStart(2, '0')}-${year}`;
        return formattedDate;
    }




    const onScroll = async () => {
        if (contactListRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = contactListRef.current;
            if (scrollTop + clientHeight === scrollHeight) {
                const totalPages = Math.ceil(contactList?.totalElements / filter.size);
                let filterTemp = { ...filter };
                filterTemp.page = filterTemp.page + 1
                if (filterTemp.page < totalPages && !loadingResponse.current) {
                    loadingResponse.current = true;
                    setFilter(filterTemp);
                    getcontactList(filterTemp);
                }
            }
        }
    };
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [editContact, setEditContact] = useState(false)

    function addNewCategory() {
        setShowCategoryModal(true);
        setEditContact("")
        setShowEditStatus(false)
    }

    const handleCategoryClose = () => {
        getcontactList(filter);
        setShowCategoryModal(false);
        setShowSuccess(true)
    };

    function handleEditContact(item) {
        setShowEditStatus(true)
        setEditContact(item)
        setShowCategoryModal(true)
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const sortByOption = ["Name ASC", "Role ASC", "Joined ASC", "Phone ASC", "Email ASC",
        "Name DESC", "Role DESC", "Joined DESC", "Phone DESC", "Email DESC",]

    return (
        <section className='customer-section'>
            {/* header section statr */}
            <header className='mobile-header'>
                <Row className='align-items-center'>
                    <Col xs={6} md={6}>
                        <div className='header-left-box'>
                            <h5 className='heading-main'><img src={require("../../assets/images/administarotor.svg").default} className="me-2" alt="icons" /> Administrator</h5>
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
            <div className='customer-outer-section' >
                <div className='customer-list-header-mobile'>
                    <div className='customer-list-header d-flex align-items-center justify-content-between'>
                        <h5 className='heading-main'>
                            <img src={require("../../assets/images/ci_building-04 (1).svg").default} className="me-2" alt="icons" />
                            Contact List
                            <span className='customer-mobile-text'>{contactList?.totalElements}</span>
                        </h5>
                        <div className='d-flex align-items-center'>
                            <div className='sort-box d-flex align-items-center'>
                                <p className='mobile-tab mobile-tab-contact'>{contactList?.totalElements}</p>
                                <Form.Select aria-label="Default select example" className='mobile-tab inner-mobile-tab cursor-pointer' value={`${capitalizeFirstLetter(filter.sortBy)} ${filter.orderBy}`} onChange={(e) => sortcontactList(e.target.value)}>
                                    <option value={"Name DESC"}>SORT BY</option>
                                    {sortByOption.map((option, index) => {
                                        return (<option value={option}>{option.replace("ASC", "Assending").replace("DESC", "Desending")}</option>)
                                    })}
                                </Form.Select>
                                <img src={require("../../assets/images/mi_filter-blue.svg").default} className="ms-2" alt="icons" />
                            </div>
                            <h6 className="inventory-add contact-add-new-btn" onClick={addNewCategory}>ADD NEW <i class="fa fa-plus" aria-hidden="true"></i></h6>
                        </div>
                    </div>
                </div>
                <div className="customer-container-body">
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Joined</th>
                                <th>Phone</th>
                                <th className='email-section'>Email</th>
                                <th className='action-div'>Action</th>
                            </tr>
                        </thead>
                        <tbody ref={contactListRef} onScroll={onScroll} className="customer-scroll">
                            {contactList.length <= 0 ? <div className='border-radius'>
                                <tr>
                                    <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} count={20} /></td>
                                    <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} count={20} /></td>
                                    <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} count={20} /></td>
                                    <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} count={20} /></td>
                                    <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} count={20} /></td>
                                    <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} count={20} /></td>
                                </tr>
                            </div> : contactList?.list?.map((contact, index) => {
                                return (
                                    <tr key={index}>
                                        <td><p className='d-flex align-items-center'><span className='customer-name'>{contact.name ? contact.name.charAt(0).toUpperCase() : ""}</span>{contact.name}</p></td>
                                        <td><p className='role'>{contact.role}</p></td>
                                        <td>{contact?.joiningDate ? (contact.joiningDate) : "-"}</td>
                                        <td>{contact.phone}</td>
                                        <td className='email-section'>{contact.email}</td>
                                        <td className='action-div'>
                                            <img src={require("../../assets/images/ic_round-delete.svg").default} className="cursor-pointer" alt="icons" onClick={() =>{ 
                                                setContactId(contact.id);
                                                setshowwarning(true)
                                                }} />
                                            <img src={require("../../assets/images/edit-icon.svg").default} className="cursor-pointer ms-2" alt="icons"onClick={() => handleEditContact(contact)}/>
                                        </td>
                                    </tr>)
                            })}
                        </tbody>
                    </table>
                </div>

                {/* mobile side cards */}
                <div className='customer-mobile-outer'>
                    <div ref={contactListRef} onScroll={onScroll} className="customer-scroll mobile ">
                        {contactList.length <= 0 ?
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
                            contactList?.list?.map((contact, index) => (
                                <div className='mobile-side-customer'>
                                    <p className='d-flex align-items-center'><span className='customer-name'>{contact.name ? contact.name.charAt(0).toUpperCase() : ""}</span>{contact.name}</p>
                                    <hr></hr>
                                    <p className='role'><span><img src={require("../../assets/images/call.svg").default} className="cursor-pointer me-2" alt="icons" />Phone</span> <span className='number'>{contact.phone}</span></p>
                                    <p className='role'><span><img src={require("../../assets/images/email.svg").default} className="cursor-pointer me-2" alt="icons" />Email</span> <span className='number'>{contact.email}</span></p>
                                    <p className='role'>
                                        <span>
                                            Joined</span> <span className='number'>{contact?.joiningDate ? (contact.joiningDate) : "-"}</span></p>
                                    <div className='trash-section d-flex justify-content-between mt-2'>
                                        <Button className="blue-btn">{contact.role}</Button>
                                        <img src={require("../../assets/images/ic_round-delete.svg").default} className="cursor-pointer" alt="icons" onClick={() => { setContactId(contact.id);
                                            // handleDelete(contact.id)
                                            setshowwarning(true)
                                            }} />
                                        <i class="fa-solid fa-pen-to-square" onClick={() => handleEditContact(contact)} ></i>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            
            <Modal show={showsuccess} onHide={() => setShowSuccess(false)} centered className='add-new-device-popup' >
                <Modal.Body>
                    <div className="successfull-section text-center ">
                        <img src={require("../../assets/images/check.svg").default} className="" alt="icons" />
                        <h4 className="succefull-txt">{showsuccessStatus ?  "Contact list has been successfully updated." : "Contact list has been successfully added."}</h4>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={showwarning} onHide={() => setshowwarning(false)} centered className='add-new-device-popup' >
                <Modal.Body>
                    <div className="successfull-section text-center">
                        <img class="delete-img" src={require("../../assets/images/delete.svg").default} className="delete-icons" alt="icons" />
                        <h4 className="succefull-txt">Are you sure want to delete this conatct list?</h4>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className='footer-btns-bottom-right mx-auto'>
                        <Button variant="secondary" onClick={(e) =>setshowwarning(false)}>
                            CANCEL
                        </Button>
                        <Button className="add-btn delete-btn" onClick={() => handleDelete(contactID)} >
                            DELETE
                        </Button>
                    </div>
                </Modal.Footer>


            </Modal>

            {showCategoryModal &&
                <AddNewContact show={showCategoryModal} handleClose={handleCategoryClose} editContact={editContact} />}
        </section>
    );
};

export default ContactList;
