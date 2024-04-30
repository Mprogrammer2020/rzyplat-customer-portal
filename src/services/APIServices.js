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
    addDeviceType,
    getCustomers,
    deleteCustomer
}

function getCategories(page, size = 10) {
    return axios.get(`${config.apiUrl}/categories?page=${page}&size=${size}`, configJsonHeaders());
}

function getDeviceTypeByCategoryId(categoryId,page, size = 10) {
    return axios.get(`${config.apiUrl}/device-type/${categoryId}?page=${page}&size=${size}`, configJsonHeaders());
}

function addCategory(params) {
    return axios.post(`${config.apiUrl}/categories`, params, configMultipartHeaders());
}

function addDevice(params) {
    return axios.post(`${config.apiUrl}/devices`, params, configJsonHeaders());
}
function addDeviceType(deviceId,params) {
    return axios.post(`${config.apiUrl}/device-type/${deviceId}`, params, configMultipartHeaders());
}

function getCustomers(params) {
    return axios.post(`${config.apiUrl}/user/filter`, params, configJsonHeaders());
}

function deleteCustomer(customerId) {
    return axios.delete(`${config.apiUrl}/user/${customerId}`, configJsonHeaders());
}
