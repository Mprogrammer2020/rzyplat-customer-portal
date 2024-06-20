import { useEffect, useRef, useState, ChangeEvent } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { APIServices } from "../../services/APIServices";
import { exceptionHandling } from "../../Common/CommonComponents";
import Select, { SingleValue } from "react-select";
import Loader from "../../Common/Loader";
import swal from "sweetalert";

// Define the types for the props
interface AddNewContactProps {
    show: boolean;
    handleClose: () => void;
    editContact: Contact | null;
}

// Define the types for the contact
interface Contact {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
}

// Define the types for the form state
interface DeviceDetail {
    email: string;
    name: string;
    phone: string;
    role: string;
    errors: {
        email: string;
        name: string;
        phone: string;
        role: string;
    };
}

// Define the types for the select options
interface SelectOption {
    value: string;
    label: string;
}

const AddNewContact: React.FC<AddNewContactProps> = ({ show, handleClose, editContact }) => {
    const deviceImageRef = useRef<HTMLInputElement | null>(null);
    const [deviceCategoryOptions, setDeviceCategoryOptions] = useState<SelectOption[]>([]);
    const [deviceOptions, setDeviceOptions] = useState<SelectOption[]>([]);
    const [showModal, setShowModal] = useState<boolean>(show);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [showsuccess, setShowSuccess] = useState<boolean>(false);

    const [deviceDetail, setDeviceDetail] = useState<DeviceDetail>({
        email: "",
        name: "",
        phone: "",
        role: "",
        errors: { email: "", name: "", phone: "", role: "" }
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
                errors: { ...deviceDetail.errors }
            });
        }
    }, [editContact]);

    const checkValidation = () => {
        const errors: Partial<DeviceDetail["errors"]> = {};
        if (!deviceDetail.name) {
            errors.name = "Name is required";
        }
        if (!deviceDetail.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(deviceDetail.email)) {
            errors.email = "Email is invalid";
        }
        if (!deviceDetail.phone) {
            errors.phone = "Phone is required";
        }
        if (!deviceDetail.role) {
            errors.role = "Role is required";
        }
        return errors;
    };

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
                    setShowSuccess(true);
                    setShowLoader(false);
                    setShowModal(false);
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

    const roleOptions: SelectOption[] = [
        { value: 'role1', label: 'Role 1' },
        { value: 'role2', label: 'Role 2' },
        { value: 'role3', label: 'Role 3' },
    ];

    const isFormValid = Object.keys(checkValidation()).length === 0;

    const editContactListData = async () => {
        const errors = checkValidation() || {};
        if (Object.keys(errors).length === 0) {
            try {
                let response;
                setShowLoader(true);
                const params = {
                    name: deviceDetail.name,
                    email: deviceDetail.email,
                    phone: deviceDetail.phone,
                    role: deviceDetail.role,
                    id: editContact!.id,
                };
                response = await APIServices.updateContact(params);
                if (response.status === 200) {
                    setShowSuccess(true);
                    setShowModal(false);
                    setShowLoader(false);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                exceptionHandling(error);
                setShowLoader(false);
                console.error('Error fetching data:', error);
            }
        } else {
            setDeviceDetail({ ...deviceDetail, errors });
        }
    };

    return (
        <>
            <Modal show={showModal} onHide={() => handleClose()} centered className='add-new-device-popup add-new-popup contact-section-modal' size='lg' backdrop="static">
                <Modal.Header closeButton>
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
                                        onChange={(e: SingleValue<SelectOption>) => {
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
                    <Button variant="secondary" onClick={(e) => { handleClose(); }} disabled={showLoader}>
                        CANCEL
                    </Button>
                    {editContact ?
                        <Button variant="primary" className={isFormValid ? "add-btn" : ""} onClick={editContactListData} disabled={showLoader || !isFormValid}>
                            {showLoader ? <Loader loaderType={"COLOR_RING"} width={25} height={25} /> : "EDIT"}
                        </Button>
                        :
                        <Button variant="primary" className={isFormValid ? "add-btn" : ""} onClick={addContactListData} disabled={showLoader || !isFormValid}>
                            {showLoader ? <Loader loaderType={"COLOR_RING"} width={25} height={25} /> : "ADD"}
                        </Button>
                    }
                </Modal.Footer>
            </Modal>

            <Modal show={showsuccess} onHide={() => { handleClose(); setShowSuccess(false) }} centered className='add-new-device-popup' >
                <Modal.Body>
                    <div className="successfull-section text-center ">
                        <img src={require("../../assets/images/check.svg").default} className="" alt="icons" />
                        <h4 className="succefull-txt">{editContact ? "User has been successfully updated." : "User has been successfully Added."}</h4>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddNewContact;