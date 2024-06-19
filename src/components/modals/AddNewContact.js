import { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import { APIServices } from "../../services/APIServices";
import { exceptionHandling } from "../../Common/CommonComponents";
import Select from "react-select";
import Loader from "../../Common/Loader";
import swal from "sweetalert";

const AddNewContact = ({ show, handleClose, editContact }) => {
    console.log("show, editContact ", show, editContact)
    const deviceImageRef = useRef(null);
    const [deviceCategoryOptions, setDeviceCategoryOptions] = useState([]);
    const [deviceOptions, setDeviceOptions] = useState([]);
    const [showModal, setShowModal] = useState(show)

    const [showLoader, setShowLoader] = useState(false);
    const [showsuccess, setShowSuccess] = useState(false)

    const [deviceDetail, setDeviceDetail] = useState({
        email: "", name: "", phone: "", role: "",
        errors: { email: "", name: "", phone: "", role: "" }
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDeviceDetail({
            ...deviceDetail,
            [name]: value,
            errors: {
                ...deviceDetail.errors,
                [name]: value.trim() ? "" : "This field is required",
            },
        });
    };

    useEffect(() => {
        if (editContact) {
            setDeviceDetail({
                ...deviceDetail,
                name: editContact.name,
                email: editContact.email,
                phone: editContact.phone,
                role: editContact.role,
            })
        }
    }, [editContact])

    function checkValidation() {
        const errors = { email: "", name: "", phone: "", role: "" };

        if (deviceDetail.email && !deviceDetail.email.trim()) {
            errors.email = "This field is required";
        }
        if (deviceDetail.name && !deviceDetail.name.trim()) {
            errors.name = "This field is required";
        }
        if (deviceDetail.phone && !deviceDetail.phone.trim()) {
            errors.phone = "This field is required";
        }
        if (deviceDetail.role) {
            errors.role = "This field is required";
        }
        else {
            return errors;

        }
    }
    const addContactListData = async () => {
        const errors = checkValidation() || {};
        if (Object.keys(errors).length === 0) {
            try {
                setShowLoader(true);
                const params = {
                    name: deviceDetail.name,
                    email: deviceDetail.email,
                    phone: deviceDetail.phone,
                    role: deviceDetail.role
                };
                const response = await APIServices.AddContact(params);
                if (response.status === 201) {
                    // handleClose()
                    setShowSuccess(true)
                    setShowLoader(false);
                    setShowModal(false)

                } else {
                    throw new Error('Failed to add contact');
                }
            } catch (error) {
                exceptionHandling(error);
                setShowLoader(false);
                console.error('Error adding contact:', error);
            }
        } else {
            setDeviceDetail({ ...deviceDetail, errors });
        }
    };


    const roleOptions = [
        { value: 'role1', label: 'Role 1' },
        { value: 'role2', label: 'Role 2' },
        { value: 'role3', label: 'Role 3' },
    ];


    // edit device category
    const editContactListData = async () => {
        const errors = checkValidation() || {};
        if (Object.keys(errors).length === 0) {
            try {
                let response;
                setShowLoader(true)
                const params = {
                    name: deviceDetail.name,
                    email: deviceDetail.email,
                    phone: deviceDetail.phone,
                    role: deviceDetail.role,
                    id: editContact.id,
                }
                console.log("params", params)
                response = await APIServices.updateContact(params);
                if (response.status === 200) {
                    setShowSuccess(true)
                    // setTimeout(() =>{
                    //     handleClose()
                    // },2000)
                    setShowModal(false)
                    setShowLoader(false);
                } else {
                    throw new Error('Failed to fetch data');
                }
            }
            catch (error) {
                exceptionHandling(error);
                setShowLoader(false);
                console.error('Error fetching data:', error);
            }
        }
        else {
            setDeviceDetail({ ...deviceDetail, errors });
        }
    }

    return (
        <>
            <Modal show={showModal} onHide={() => handleClose()} centered className='add-new-device-popup add-new-popup contact-section-modal' size='lg' backdrop="static">
                <Modal.Header>
                    <Modal.Title>{editContact ? "Edit" : "Add"} New Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col md={12} lg={6}>
                                <Form.Group className="mb-2" controlId="formBasicName">
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control type="text" maxLength={50} placeholder="Enter User Name" name="name" value={deviceDetail?.name} onChange={handleInputChange} />
                                    {deviceDetail.errors.name && <span className="error">{deviceDetail.errors.name}</span>}
                                </Form.Group>
                            </Col>
                            <Col md={12} lg={6}>
                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                    <Form.Label>Email ID</Form.Label>
                                    <Form.Control type="email" maxLength={50} placeholder="Enter User Emal ID" name="email" value={deviceDetail?.email} onChange={handleInputChange} />
                                    {deviceDetail.errors.email && <span className="error">{deviceDetail.errors.email}</span>}
                                </Form.Group>
                            </Col>
                            <Col md={12} lg={6}>
                                <Form.Group className="mb-2" controlId="formBasicPhone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="text" maxLength={15} placeholder="Enter User Phone" name="phone" value={deviceDetail?.phone} onChange={handleInputChange} />
                                    {deviceDetail.errors.phone && <span className="error">{deviceDetail.errors.phone}</span>}
                                </Form.Group>
                            </Col>
                            <Col md={12} lg={6}>
                                <Form.Group className="mb-2" controlId="formBasicRole">
                                    <Form.Label>Role</Form.Label>
                                    <Select
                                        options={roleOptions}
                                        placeholder="Select User Role"
                                        name="role"
                                        value={roleOptions.find(option => option.value === deviceDetail.role) || null}
                                        onChange={(e) => {
                                            setDeviceDetail({
                                                ...deviceDetail,
                                                role: e ? e.value : "",
                                                errors: { ...deviceDetail.errors, role: "" }
                                            });
                                        }}
                                        styles={{
                                            control: (base, state) => ({
                                                ...base,
                                                background: "#EDF1F7",
                                                borderRadius: "5px",
                                            }),
                                            placeholder: (base, state) => ({
                                                ...base,
                                                color: "#fff",
                                            }),
                                            input: (base, state) => ({
                                                ...base,
                                                color: "white"
                                            })
                                        }}
                                    />
                                    {deviceDetail.errors.role && <span className="error">{deviceDetail.errors.role}</span>}
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={(e) => { handleClose(); editContact = false }} disabled={showLoader}>
                        CANCEL
                    </Button>
                    {editContact ?
                        <Button variant="primary" className={Object.keys(checkValidation() || {}).length === 0 ? "add-btn" : ""} onClick={editContactListData} disabled={showLoader || Object.keys(checkValidation() || {}).length !== 0}>
                            {showLoader ? <Loader loaderType={"COLOR_RING"} width={25} height={25} /> : "EDIT"}
                        </Button>
                        :
                        <Button variant="primary" className={Object.keys(checkValidation() || {}).length === 0 ? "add-btn" : ""} onClick={addContactListData} disabled={showLoader || Object.keys(checkValidation() || {}).length !== 0}>
                            {showLoader ? <Loader loaderType={"COLOR_RING"} width={25} height={25} /> : "ADD"}
                        </Button>
                    }
                </Modal.Footer>
            </Modal>
            <Modal show={showsuccess} onHide={() => {handleClose();setShowSuccess(false)}} centered className='add-new-device-popup' >
                <Modal.Body>
                    <div className="successfull-section text-center ">
                        <img src={require("../../assets/images/check.svg").default} className="" alt="icons" />
                        <h4 className="succefull-txt">{editContact ? "Contact list has been successfully updated." : "Contact list has been successfully Added."}</h4>
                    </div>
                </Modal.Body>
            </Modal>
        </>

    )
}


export default AddNewContact;