import { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap"
import { APIServices } from "../../services/APIServices";
import { exceptionHandling } from "../../Common/CommonComponents";

const AddNewDeviceType = ({ show, handleClose }) => {
    const deviceImageRef = useRef(null);
    const [deviceDetail, setDeviceDetail] = useState({ deviceImage: "", deviceName: "", errors: { deviceImage: "", deviceName: "" } });


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

    const addDeviceType = async () => {
        const errors = {};
        if (!deviceDetail.deviceName.trim()) {
            errors.deviceName = "This field is required";
        }
        if (!deviceDetail.deviceImage) {
            errors.deviceImage = "Please select an image";
        }

        if (Object.keys(errors).length === 0) {
            try {
                const formData = new FormData();
                formData.append("deviceName", deviceDetail.deviceName);
                formData.append("deviceImage", deviceDetail.deviceImage);
                const response = await APIServices.addDeviceType("ddd", formData);
                if (response.status === 200) {
                    handleClose();
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                exceptionHandling(error);
                console.error('Error fetching data:', error);
            }
        } else {
            setDeviceDetail({ ...deviceDetail, errors });
        }
    };


    return (<>
        <Form.Control ref={deviceImageRef} type="file" name="deviceImage" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
        <Modal show={show} onHide={() => handleClose()} centered className='add-new-device-popup'>
            <Modal.Header closeButton>
                <Modal.Title>Add New Device</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="device_name">
                        <Form.Label>Device Name</Form.Label>
                        <Form.Control type="text" name="deviceName" placeholder="Enter Device Name" value={deviceDetail.deviceName} onChange={handleInputChange} />
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
                    <Button variant="secondary" onClick={handleClose}>
                        CANCEL
                    </Button>
                    <Button variant="primary" className="add-btn" onClick={addDeviceType}>
                        ADD
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