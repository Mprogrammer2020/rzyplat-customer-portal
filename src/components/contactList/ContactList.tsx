import React, { useEffect, useRef, useState, ChangeEvent } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { APIServices } from '../../services/APIServices';
import { exceptionHandling } from '../../Common/CommonComponents';
import Skeleton from 'react-loading-skeleton';
import swal from 'sweetalert';
import "./ContactList.css";
// import AddNewContact from '../modals/AddNewContact';
import AddNewContact from '../modals/AddNewContact.tsx';

// Define the types for the contact list and filter
interface Contact {
    id: string;
    name: string;
    role: string;
    joiningDate?: string;
    phone: string;
    email: string;
}

interface Filter {
    page: number;
    size: number;
    sortBy: string;
    orderBy: string;
}

const ContactList: React.FC = () => {
    const [contactList, setContactList] = useState<{ list: Contact[]; totalElements: number }>({ list: [], totalElements: 0 });
    const [filter, setFilter] = useState<Filter>({ page: 0, size: 10, sortBy: "name", orderBy: "DESC" });
    const contactListRef = useRef<HTMLDivElement>(null);
    const loadingResponse = useRef<boolean>(false);
    const [showsuccess, setShowSuccess] = useState<boolean>(false);
    const [showsuccessStatus, setShowEditStatus] = useState<boolean>(false);
    const [showwarning, setshowwarning] = useState<boolean>(false);
    const [contactID, setContactId] = useState<string>("");

    useEffect(() => {
        getcontactList(filter);
    }, [filter]);

    async function getcontactList(params: Filter) {
        try {
            const response = await APIServices.getcontactList(params.page, params.size, params.sortBy, params.orderBy);
            if (response.status === 200) {
                let responseData = response.data;
                let tempList;
                if (params.page === 0) {
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

    const sortcontactList = (sortOrder: string) => {
        const parts = sortOrder.split(" ");
        const newFilter = { ...filter, sortBy: parts[0].toLowerCase(), orderBy: parts[1], page: 0 };
        setFilter(newFilter);
        getcontactList(newFilter);
    };

    const handleDelete = async (customerId: string) => {
        try {
            const response = await APIServices.deleteContact(customerId);
            if (response.status === 200) {
                setshowwarning(false);
                setContactList(prevContactList => ({
                    ...prevContactList,
                    totalElements: prevContactList.totalElements - 1,
                    list: prevContactList.list.filter(contact => contact.id !== customerId)
                }));
                setShowSuccess(true);
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            exceptionHandling(error);
        }
    };

    const onScroll = async () => {
        if (contactListRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = contactListRef.current;
            if (scrollTop + clientHeight === scrollHeight) {
                const totalPages = Math.ceil(contactList.totalElements / filter.size);
                if (filter.page < totalPages && !loadingResponse.current) {
                    loadingResponse.current = true;
                    setFilter(prevFilter => ({ ...prevFilter, page: prevFilter.page + 1 }));
                    getcontactList({ ...filter, page: filter.page + 1 });
                }
            }
        }
    };

    const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);
    const [editContact, setEditContact] = useState<Contact | null>(null);

    const addNewCategory = () => {
        setShowCategoryModal(true);
        setEditContact(null);
        setShowEditStatus(false);
    };

    const handleCategoryClose = () => {
        getcontactList(filter);
        setShowCategoryModal(false);
    };

    const handleEditContact = (contact: Contact) => {
        setShowEditStatus(true);
        setEditContact(contact);
        setShowCategoryModal(true);
    };

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // const sortByOption = ["Name ASC", "Role ASC", "Joined ASC", "Phone ASC", "Email ASC", "Name DESC", "Role DESC", "Joined DESC", "Phone DESC", "Email DESC"];

    return (
        <section className='customer-section'>
            {/* header section start */}
            <header className='mobile-header'>
                <Row className='align-items-center'>
                    <Col xs={6} md={6}>
                        <div className='header-left-box'>
                            <h5 className='heading-main'>
                                <img src={require("../../assets/images/administarotor.svg").default} className="me-2" alt="icons" />
                                Administrator
                            </h5>
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
                                <Link to="#">
                                    <img src={require("../../assets/images/mdi_message-badge.svg").default} className="" alt="icons" />
                                </Link>
                                <Link to="#">
                                    <img src={require("../../assets/images/streamline_notification-alarm-2-solid.svg").default} className="" alt="icons" />
                                </Link>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </header>
            {/* header section ends */}
            <div className='customer-outer-section'>
                <div className='customer-list-header-mobile'>
                    <div className='customer-list-header d-flex align-items-center justify-content-between'>
                        <h5 className='heading-main'>
                            <img src={require("../../assets/images/ci_building-04 (1).svg").default} className="me-2" alt="icons" />
                            Contact List
                            <span className='customer-mobile-text'>{contactList.totalElements}</span>
                        </h5>
                        <div className='d-flex align-items-center'>
                            <div className='sort-box d-flex align-items-center'>
                                <p className='mobile-tab mobile-tab-contact'>{contactList.totalElements}</p>
                                <Form.Select
                                    aria-label="Default select example"
                                    className='mobile-tab inner-mobile-tab cursor-pointer'
                                    value={`${capitalizeFirstLetter(filter.sortBy)} ${filter.orderBy}`}
                                    onChange={(e: ChangeEvent<HTMLSelectElement>) => sortcontactList(e.target.value)}>
                                    <option value={"Name DESC"}>SORT BY</option>
                                    {/* {sortByOption.map((option, index) => (
                                        <option key={index} value={option}>{option.replace("ASC", "Ascending").replace("DESC", "Descending")}</option>
                                    ))} */}
                                </Form.Select>
                                <img src={require("../../assets/images/mi_filter-blue.svg").default} className="ms-2" alt="icons" />
                            </div>
                            <h6 className="inventory-add contact-add-new-btn" onClick={addNewCategory}>
                                ADD NEW <i className="fa fa-plus" aria-hidden="true"></i>
                            </h6>
                        </div>
                    </div>
                </div>
                {/* <div className="customer-container-body">
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
                            {contactList.list.length <= 0 ? (
                                <tr>
                                    <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} count={20} /></td>
                                    <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} count={20} /></td>
                                    <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} count={20} /></td>
                                    <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} count={20} /></td>
                                    <td><Skeleton className="main-wallet-top mb-2" height={30} width={150} count={20} /></td>
                                </tr>
                            ) : (
                                contactList.list.map((item: Contact, index: number) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.role}</td>
                                        <td>{item.joiningDate || "--"}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.email}</td>
                                        <td className='action-div'>
                                            <div className='d-flex align-items-center'>
                                                <Link to="#" className='mobile-edit-btn'>
                                                    <img src={require("../../assets/images/iconamoon_eye-fill.svg").default} className="mobile-edit-btn" alt="icons" />
                                                </Link>
                                                <Link to="#" className='mobile-edit-btn'>
                                                    <img src={require("../../assets/images/fontisto_notepad.svg").default} className="ms-1" onClick={() => handleEditContact(item)} alt="icons" />
                                                </Link>
                                                <Link to="#" className='mobile-edit-btn'>
                                                    <img src={require("../../assets/images/ant-design_delete-outlined.svg").default} className="ms-1" onClick={() => { setshowwarning(true); setContactId(item.id); }} alt="icons" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div> */}

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
                                            <img src={require("../../assets/images/ic_round-delete.svg").default} className="cursor-pointer" alt="icons" onClick={() => {
                                                setContactId(contact.id);
                                                setshowwarning(true)
                                            }} />
                                            <img src={require("../../assets/images/edit-icon.svg").default} className="cursor-pointer ms-2" alt="icons" onClick={() => handleEditContact(contact)} />
                                        </td>
                                    </tr>)
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
            {/* Delete Confirmation Modal */}
            <Modal show={showwarning} onHide={() => setshowwarning(false)} className='contact-delete-modal'>
                <Modal.Body>
                    <div className='text-center'>
                        {/* <img src={require("../../assets/images/material-symbols_warning-rounded.svg").default} alt="icons" /> */}
                        <img class="delete-img" src={require("../../assets/images/delete.svg").default} className="delete-icons" alt="icons" />
                        <h5 className='main-text-heading mt-3'>Are You Sure?</h5>
                        <p className='text-heading'>Do you really want to delete these records?</p>
                        <div className='d-flex align-items-center justify-content-center'>
                            <Button className='cancel-btn' onClick={() => setshowwarning(false)}>No, Cancel</Button>
                            <Button className='save-btn ms-3' onClick={() => handleDelete(contactID)}>Yes, Continue</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            {/* Add/Edit Contact Modal */}
            {/* <AddNewContact
                showCategoryModal={showCategoryModal}
                handleCategoryClose={handleCategoryClose}
                contactData={editContact}
                showsuccessStatus={showsuccessStatus}


/> */}

            <Modal show={showsuccess} onHide={() => setShowSuccess(false)} centered className='add-new-device-popup' >
                <Modal.Body>
                    <div className="successfull-section text-center ">
                        <img src={require("../../assets/images/check.svg").default} className="" alt="icons" />
                        <h4 className="succefull-txt">User has been deleted</h4>
                    </div>
                </Modal.Body>
            </Modal>

            {showCategoryModal &&
                <AddNewContact show={showCategoryModal} handleClose={handleCategoryClose} editContact={editContact} />}
        </section>
    );
};

export default ContactList;
