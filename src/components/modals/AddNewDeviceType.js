import { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap"
import { APIServices } from "../../services/APIServices";
import { exceptionHandling } from "../../Common/CommonComponents";
import Loader from "../../Common/Loader";
import swal from "sweetalert";

const AddNewDeviceType = ({ show, handleClose, categoryId }) => {
    const deviceImageRef = useRef(null);
    const [deviceDetail, setDeviceDetail] = useState({ deviceImage: "", deviceName: "", errors: { deviceImage: "", deviceName: "" } });
    const [showLoader, setShowLoader] = useState(false);
    function selectDeviceImage() {
        if (deviceImageRef.current) {
            deviceImageRef.current.value = null;
            deviceImageRef.current.click();
        }
    }

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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setDeviceDetail({
            ...deviceDetail,
            deviceImage: file,
            errors: {
                ...deviceDetail.errors,
                deviceImage: file ? "" : "Please select an image",
            },
        });
    };
    function checkValidation() {
        const errors = {};
        if (!deviceDetail.deviceName.trim()) {
            errors.deviceName = "This field is required";
        }
        if (!deviceDetail.deviceImage) {
            errors.deviceImage = "Please select an image";
        }
        return errors;
    }

    const addDeviceType = async () => {
        const errors = checkValidation();

        if (Object.keys(errors).length === 0) {
            try {
                const formData = new FormData();
                formData.append("type", deviceDetail.deviceName);
                formData.append("image", deviceDetail.deviceImage);
                setShowLoader(true);
                const response = await APIServices.addDeviceType(categoryId, formData);
                if (response.status === 201) {
                    handleClose();
                    setShowLoader(false);
                    swal("", "Device Type has been successfully added.", "success").then(() => {});
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


    return (<>
        <Form.Control ref={deviceImageRef} type="file" name="deviceImage" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
        <Modal show={show} onHide={() => handleClose()} centered className='add-new-device-popup' backdrop="static">
            <Modal.Header>
                <Modal.Title>Add New Device</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="device_name">
                        <Form.Label>Device Name</Form.Label>
                        <Form.Control type="text" maxLength={50} name="deviceName" placeholder="Enter Device Name" value={deviceDetail.deviceName} onChange={handleInputChange} />
                        {deviceDetail.errors.deviceName && <span className="error">{deviceDetail.errors.deviceName}</span>}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <div className='footer-btns-bottom-left'>
                    <Button type='button' variant='unset' onClick={() => selectDeviceImage()}><i class="fa fa-upload" aria-hidden="true"></i> {deviceDetail.deviceImage && deviceDetail.deviceImage?.name ? deviceDetail.deviceImage.name : "Upload Image"}</Button>
                    {deviceDetail.errors.deviceImage && <span className="error">{deviceDetail.errors.deviceImage}</span>}
                </div>

                <div className='footer-btns-bottom-right'>
                    <Button variant="secondary" onClick={handleClose} disabled={showLoader}>
                        CANCEL
                    </Button>
                    <Button variant="primary" onClick={addDeviceType} className={Object.keys(checkValidation()).length === 0 ? "add-btn" : ""} disabled={showLoader || Object.keys(checkValidation()).length !== 0 ? true : false}>
                        {showLoader ? <Loader loaderType={"COLOR_RING"} width={25} height={25} /> : "ADD"}
                    </Button>
                </div>
            </Modal.Footer>

            {/* show succesfull detail modal  */}
            <div className="successfull-section text-center d-none">
                <img src={require("../../assets/images/check.svg").default} className="" alt="icons" />
                <h4 className="succefull-txt">New Device Type has been added</h4>
            </div>
        </Modal>
    </>)
}

export default AddNewDeviceType;