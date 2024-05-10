import axios from "axios";
import { config } from "../config/config";
import { formDataHeader, getToken, jsonHeaders } from "../helpers/auth-header";

const configJsonHeaders = () => {
    let jsonHeader = jsonHeaders();
    // jsonHeader.Authorization = getToken();
    return {
        headers: jsonHeader
    }
}

const configMultipartHeaders = () => {
    let formDataHeaders = formDataHeader();
    // formDataHeaders.Authorization = getToken();
    return {
        headers: formDataHeaders
    }
}
export const APIServices = {
    getCategories,
    getDeviceTypeByCategoryId,
    addCategory,
    addDevice,
    uploadBulkDevice,
    addDeviceType,
    getCustomers,
    deleteCustomer,
    getDevices,
    deleteDevices,
}

function getCategories(page, size = 10, orderBy, direction) {
    return axios.get(`${config.apiUrl}/categories?pageNumber=${page}&pageSize=${size}&orderBy=${orderBy}&direction=${direction}`, configJsonHeaders());
}

function getDevices(page, size = 10, orderBy, direction,category_id, device_typeId) {
    return axios.get(`${config.apiUrl}/devices?pageNumber=${page}&pageSize=${size}${orderBy ? "&orderBy="+orderBy :"" }${direction ? "&direction="+direction :""}&categoryId=${category_id}${device_typeId ? "&deviceTypeId="+device_typeId :""}`, configJsonHeaders());
}
function deleteDevices(deviceId) {
    return axios.delete(`${config.apiUrl}/devices/${deviceId}`, configJsonHeaders());
}

function getDeviceTypeByCategoryId(categoryId, page, size = 10) {
    return axios.get(`${config.apiUrl}/device-type/${categoryId}?pageNumber=${page}&pageSize=${size}`, configJsonHeaders());
}

function addCategory(params) {
    return axios.post(`${config.apiUrl}/categories`, params, configMultipartHeaders());
}

function addDevice(params) {
    return axios.post(`${config.apiUrl}/devices`, params, configJsonHeaders());
}

function uploadBulkDevice(params) {
    return axios.post(`${config.apiUrl}/devices/bulk-upload`, params, configMultipartHeaders());
}

function addDeviceType(deviceId, params) {
    return axios.post(`${config.apiUrl}/device-type/${deviceId}`, params, configMultipartHeaders());
}

function getCustomers(page, size, orderBy, direction) {
    return axios.get(`${config.apiUrl}/customers/search?pageNumber=${page}&pageSize=${size}&orderBy=${orderBy}&direction=${direction}`, configJsonHeaders());
}

function deleteCustomer(customerId) {
    return axios.delete(`${config.apiUrl}/customers/${customerId}`, configJsonHeaders());
}
