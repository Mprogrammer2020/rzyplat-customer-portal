import { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import { APIServices } from "../../services/APIServices";
import { exceptionHandling } from "../../Common/CommonComponents";
import Select from "react-select";
import Loader from "../../Common/Loader";
import swal from "sweetalert";

const AddDeviceCategory = ({ show, handleClose }) => {
    const deviceImageRef = useRef(null);
    const [deviceCategoryOptions, setDeviceCategoryOptions] = useState([]);
    const [deviceOptions, setDeviceOptions] = useState([]);
    const [showLoader, setShowLoader] = useState(false);


    const [deviceDetail, setDeviceDetail] = useState({
        showBulkUpload: true, deviceImage: "", deviceName: "",
        sku: "", serialNumber: "", deviceCategory: "",
        errors: { deviceImage: "", deviceName: "", sku: "", serialNumber: "", deviceCategory: "", }
    });

    useEffect(() => {
        getDeviceCategories()
    }, [])

    async function getDeviceCategories() {
        try {
            const response = await APIServices.getDeviceCategories();
            if (response.status === 200) {
                const options = response.data.map(item => { return { value: item.id, label: item.name } })
                setDeviceCategoryOptions(options);
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            exceptionHandling(error);
            console.error('Error fetching data:', error);
        }
    }

    // getDeviceTypeByCategoryIdDeviceDropdown
    async function getDeviceTypeByCategoryIdDeviceDropdown(categoryId) {
        try {
            const response = await APIServices.getDeviceTypeByCategoryIdDeviceDropdown(categoryId);
            if (response.status === 200) {
                setDeviceOptions(response.data.map(item => { return { value: item.id, label: item.type } }))
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            exceptionHandling(error);
            console.error('Error fetching data:', error);
        }
    }

    function selectDeviceCategory(e) {
        getDeviceTypeByCategoryIdDeviceDropdown(e.value)
        setDeviceDetail({ ...deviceDetail, deviceCategory: e, deviceName: "", errors: {} });
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
            bulkDataFile: "",
            errors: {
                ...deviceDetail.errors,
                [name]: value.trim() ? "" : (deviceDetail.showBulkUpload || name == "deviceCategory") ? "This field is required" : "",
            },
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setDeviceDetail({
            ...deviceDetail,
            deviceImage: file,
            bulkDataFile: "",
            errors: {
                ...deviceDetail.errors,
                deviceImage: file ? "" : "Please select an image",
            },
        });
    };

    function checkValidation() {
        const errors = {};
        if (deviceDetail.showBulkUpload && !deviceDetail.deviceName?.value) {
            errors.deviceName = "This field is required";
        }
        if ((!deviceDetail.showBulkUpload && !deviceDetail.deviceCategory.trim()) || (deviceDetail.showBulkUpload && !deviceDetail.deviceCategory.value)) {
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

        if (deviceDetail.bulkDataFile && deviceDetail.bulkDataFile.name) {
            return {};
        } else {
            return errors;

        }
    }
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const fileName = file.name;

        if (fileName.endsWith('.csv') || fileName.endsWith('.xls')) {
            setDeviceDetail({
                ...deviceDetail, bulkDataFile: file,
                deviceImage: "", deviceName: "",
                sku: "", serialNumber: "", deviceCategory: "",
                errors: { deviceImage: "", deviceName: "", sku: "", serialNumber: "", deviceCategory: "", }
            });
        }else{
            swal("",  `File type "${fileName.split('.').pop()}" is not supported. Please upload a CSV or xls file.`, "error");

        }
    }

    const addDeviceCategory = async () => {
        const errors = checkValidation();
        if (Object.keys(errors).length === 0) {
            try {
                setShowLoader(true);
                let response;
                if (deviceDetail.showBulkUpload) {
                    if (deviceDetail.bulkDataFile && deviceDetail.bulkDataFile.name) {
                        const formData = new FormData();
                        formData.append("file", deviceDetail.bulkDataFile);
                        response = await APIServices.uploadBulkDevice(formData);
                    } else {
                        const params = {
                            categoryId: deviceDetail.deviceCategory.value,
                            deviceTypeId: deviceDetail.deviceName.value,
                            serialNumber: deviceDetail.serialNumber,
                            sku: deviceDetail.sku
                        }
                        response = await APIServices.addDevice(params);
                    }
                } else {
                    const formData = new FormData();
                    formData.append("name", deviceDetail.deviceCategory);
                    formData.append("image", deviceDetail.deviceImage);
                    response = await APIServices.addCategory(formData);
                }
                if (response.status === 201) {
                    handleClose();
                    setShowLoader(false);
                    swal("", deviceDetail.showBulkUpload ? "Device has been successfully added." : "Device category has been successfully added.", "success").then(() => { });
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
        <Modal show={show} onHide={() => handleClose()} centered className='add-new-device-popup add-new-popup' size='lg' backdrop="static">
            <Modal.Header>
                <Modal.Title>Add New {deviceDetail.showBulkUpload ? "Device" : "Category"}</Modal.Title>
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
                                /> : <Form.Control type="text" maxLength={50} placeholder="Enter Device Category" name="deviceCategory" onChange={handleInputChange} />}
                            </Form.Group>
                            {deviceDetail.errors.deviceCategory && <span className="error">{deviceDetail.errors.deviceCategory}</span>}
                        </Col>
                        {deviceDetail.showBulkUpload ? <>
                            <Col md={12} lg={6}>
                                <Form.Group className="mb-2" controlId="device">
                                    <Form.Label>Device</Form.Label>
                                    {deviceDetail.showBulkUpload ? <Select options={deviceOptions} placeholder="Select Device" name="deviceName" value={deviceDetail.deviceName} onChange={(e) => setDeviceDetail({ ...deviceDetail, deviceName: e, errors: {} })}
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
                                        <Form.Control type="text" placeholder="Enter Device Name" maxLength={50} name="deviceName" onChange={handleInputChange} />}

                                </Form.Group>
                                {deviceDetail.errors.deviceName && <span className="error">{deviceDetail.errors.deviceName}</span>}
                            </Col>
                            <Col md={12} lg={6}>
                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                    <Form.Label>Serial Number</Form.Label>
                                    <Form.Control type="text" maxLength={50} placeholder="Enter Serial Number" name="serialNumber" onChange={handleInputChange} />
                                </Form.Group>
                                {deviceDetail.errors.serialNumber && <span className="error">{deviceDetail.errors.serialNumber}</span>}
                            </Col>
                            <Col md={12} lg={6}>
                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                    <Form.Label>SKU</Form.Label>
                                    <Form.Control type="text" maxLength={50} name="sku" onChange={handleInputChange} />
                                </Form.Group>
                                {deviceDetail.errors.sku && <span className="error">{deviceDetail.errors.sku}</span>}
                            </Col>
                        </> : ""}
                    </Row>
                </Form>
                {deviceDetail.showBulkUpload && <>
                    <p>or bulk upload</p>
                    <div className='upload-file'>
                        <img src={require("../../assets/images/upload-file.png")} alt='upload-img' />
                        {deviceDetail?.bulkDataFile && deviceDetail?.bulkDataFile?.name ? <h6> {deviceDetail.bulkDataFile.name}</h6> : <h6>Drag & Drop or <span>browse</span> file</h6>}
                        <input type="file" accept=".csv,.xls" onChange={handleFileUpload} />
                    </div>
                </>}
            </Modal.Body>
            <Modal.Footer>
                <div className='footer-btns-bottom-left'>
                    {deviceDetail.showBulkUpload ? <Button type='button' variant='unset' onClick={() => setDeviceDetail({
                        ...deviceDetail, showBulkUpload: false, deviceImage: "", deviceName: "",
                        sku: "", serialNumber: "", deviceCategory: "",
                        errors: { deviceImage: "", deviceName: "", sku: "", serialNumber: "", deviceCategory: "", }
                    })}> NEW CATEGORY</Button> :
                        <Button type='button' variant='unset' onClick={() => selectDeviceImage()}><i class="fa fa-upload" aria-hidden="true"></i> {deviceDetail.deviceImage && deviceDetail.deviceImage?.name ? deviceDetail.deviceImage.name : "Upload Image"}</Button>}
                    {!deviceDetail.showBulkUpload && deviceDetail.errors.deviceImage && <span className="error">{deviceDetail.errors.deviceImage}</span>}
                </div>
                <div className='footer-btns-bottom-right'>
                    <Button variant="secondary" onClick={handleClose} disabled={showLoader}>
                        CANCEL
                    </Button>
                    <Button variant="primary" className={Object.keys(checkValidation()).length === 0 ? "add-btn" : ""} onClick={addDeviceCategory} disabled={showLoader || Object.keys(checkValidation()).length !== 0 ? true : false}>
                        {showLoader ? <Loader loaderType={"COLOR_RING"} width={25} height={25} /> : "ADD"}
                    </Button>
                </div>

            </Modal.Footer>
        </Modal >
    </>)
}

export default AddDeviceCategory;