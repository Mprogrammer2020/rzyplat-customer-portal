import { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import { APIServices } from "../../services/APIServices";
import { exceptionHandling } from "../../Common/CommonComponents";
import Select from "react-select";

const AddDeviceCategory = ({ show, handleClose }) => {
    const deviceImageRef = useRef(null);
    const [deviceCategoryOptions, setDeviceCategoryOptions] = useState([]);
    const [deviceOptions, setDeviceOptions] = useState([]);


    const [deviceDetail, setDeviceDetail] = useState({
        showBulkUpload: true, deviceImage: "", deviceName: "",
        sku: "", serialNumber: "", deviceCategory: "",
        errors: { deviceImage: "", deviceName: "", sku: "", serialNumber: "", deviceCategory: "", }
    });

    useEffect(() => {
        getCategories(0, 30);
    }, [])

    useEffect(() => {
        setDeviceDetail({
            ...deviceDetail,
            deviceImage: "", deviceName: "",
            sku: "", serialNumber: "", deviceCategory: "",
            errors: { deviceImage: "", deviceName: "", sku: "", serialNumber: "", deviceCategory: "", }
        })
    }, [deviceDetail.showBulkUpload])

    async function getCategories(page, size) {
        try {
            const response = await APIServices.getCategories(page, size);
            if (response.status === 200) {
                setDeviceCategoryOptions(response.data.list.map(item => { return { value: item.category.id, label: item.category.deviceName } }))
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            exceptionHandling(error);
            console.error('Error fetching data:', error);
        }
    }

    async function getDeviceTypeByCategoryId(categoryId, page, size) {
        try {
            const response = await APIServices.getDeviceTypeByCategoryId(categoryId, page, size);
            if (response.status === 200) {
                console.log(response);

                setDeviceOptions(response.data.list.map(item => { return { value: item.id, label: item.deviceName } }))
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            exceptionHandling(error);
            console.error('Error fetching data:', error);
        }
    }

    function selectDeviceCategory(e) {
        getDeviceTypeByCategoryId(e.value, 0, 30);
        setDeviceDetail({ ...deviceDetail, deviceCategory: e })
    }


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
                [name]: value.trim() ? "" : (deviceDetail.showBulkUpload || name == "deviceName") ? "This field is required" : "",
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

    const addDeviceCategory = async () => {
        const errors = {};
        if (!deviceDetail.deviceName.trim()) {
            errors.deviceName = "This field is required";
        }
        if (deviceDetail.showBulkUpload && !deviceDetail.deviceCategory.trim()) {
            errors.deviceCategory = "This field is required";
        }
        if (deviceDetail.showBulkUpload && !deviceDetail.sku.trim()) {
            errors.sku = "This field is required";
        }
        if (deviceDetail.showBulkUpload && !deviceDetail.serialNumber.trim()) {
            errors.serialNumber = "This field is required";
        }

        if (!deviceDetail.showBulkUpload && !deviceDetail.deviceImage) {
            errors.deviceImage = "Please select an image";
        }

        if (Object.keys(errors).length === 0) {
            try {
                let response;
                if (deviceDetail.showBulkUpload) {
                    const params = {
                        categoryId: deviceDetail.deviceCategory,
                        deviceTypeId: deviceDetail.deviceName,
                        serialNumber: deviceDetail.serialNumber,
                        sku: deviceDetail.sku
                    }
                    response = await APIServices.addDevice(params);
                } else {
                    const formData = new FormData();
                    formData.append("deviceCategory", deviceDetail.deviceCategory);
                    formData.append("deviceName", deviceDetail.deviceName);
                    formData.append("serialNumber", deviceDetail.serialNumber);
                    formData.append("sku", deviceDetail.sku);
                    formData.append("deviceImage", deviceDetail.deviceImage);
                    response = await APIServices.addCategory(formData);
                }
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
        <Modal show={show} onHide={() => handleClose()} centered className='add-new-device-popup add-new-popup' size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Add New Device</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col md={12} lg={6}>
                            <Form.Group className="mb-2" controlId="device_category">
                                <Form.Label>Device Category</Form.Label>
                                {deviceDetail.showBulkUpload ? <Select options={deviceCategoryOptions} placeholder="Select Device Category" value={deviceDetail.deviceCategory} name="deviceCategory" onChange={(e) => selectDeviceCategory(e)}
                                    styles={{
                                        control: (base, state) => ({
                                            // ...base,
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
                                /> : <Form.Control type="text" placeholder="Enter Device Category" name="deviceCategory" onChange={handleInputChange} />}
                            </Form.Group>
                            {deviceDetail.errors.deviceCategory && <span className="error">{deviceDetail.errors.deviceCategory}</span>}
                        </Col>
                        <Col md={12} lg={6}>
                            <Form.Group className="mb-2" controlId="device">
                                <Form.Label>Device</Form.Label>
                                {deviceDetail.showBulkUpload ? <Select options={deviceOptions} placeholder="Select Device" name="deviceName" value={deviceDetail.deviceName} onChange={(e) => setDeviceDetail({ ...deviceDetail, deviceName: e })}
                                    styles={{
                                        control: (base, state) => ({
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
                                /> :
                                    <Form.Control type="text" placeholder="Enter Device Name" name="deviceName" onChange={handleInputChange} />}

                            </Form.Group>
                            {deviceDetail.errors.deviceName && <span className="error">{deviceDetail.errors.deviceName}</span>}
                        </Col>
                        <Col md={12} lg={6}>
                            <Form.Group className="mb-2" controlId="formBasicEmail">
                                <Form.Label>Serial Number</Form.Label>
                                <Form.Control type="text" placeholder="Enter Serial Number" name="serialNumber" onChange={handleInputChange} />
                            </Form.Group>
                            {deviceDetail.errors.serialNumber && <span className="error">{deviceDetail.errors.serialNumber}</span>}
                        </Col>
                        <Col md={12} lg={6}>
                            <Form.Group className="mb-2" controlId="formBasicEmail">
                                <Form.Label>SKU</Form.Label>
                                <Form.Control type="text" name="sku" onChange={handleInputChange} />
                            </Form.Group>
                            {deviceDetail.errors.sku && <span className="error">{deviceDetail.errors.sku}</span>}
                        </Col>
                    </Row>
                </Form>
                {deviceDetail.showBulkUpload && <>
                    <p>or bulk upload</p>
                    <div className='upload-file'>
                        <img src={require("../../assets/images/upload-file.png")} alt='upload-img' />
                        <h6>Drag & Drop or <span>browse</span> file</h6>
                        <input type="file" />
                    </div>
                </>}
            </Modal.Body>
            <Modal.Footer>
                <div className='footer-btns-bottom-left'>
                    {deviceDetail.showBulkUpload ? <Button type='button' variant='unset' onClick={() => setDeviceDetail({ ...deviceDetail, showBulkUpload: false })}> NEW CATEGORY</Button> :
                        <Button type='button' variant='unset' onClick={() => selectDeviceImage()}><i class="fa fa-upload" aria-hidden="true"></i> {deviceDetail.deviceImage && deviceDetail.deviceImage?.name ? deviceDetail.deviceImage.name : "Upload Image"}</Button>}
                    {!deviceDetail.showBulkUpload && deviceDetail.errors.deviceImage && <span className="error">{deviceDetail.errors.deviceImage}</span>}
                </div>
                <div className='footer-btns-bottom-right'>
                    <Button variant="secondary" onClick={handleClose}>
                        CANCEL
                    </Button>
                    <Button variant="primary" onClick={addDeviceCategory}>
                        ADD
                    </Button>
                </div>

            </Modal.Footer>
        </Modal >
    </>)
}

export default AddDeviceCategory;