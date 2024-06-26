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
    getcontactList,
    AddContact,
    updateContact,
    deleteContact,
    deleteCustomer,
    getDevices,
    deleteDevices,
    getDeviceCategories,
    getDeviceTypeByCategoryIdDeviceDropdown,
    updateDevice,
    getDeviceCategoryCount,
    HeatWather,
    currentWather,
    currentHourlyWather,
    currentTenDaysWather,
    currentPropertyWather,
    alertStats,
    firealerts,
    firealertsHistory,
    moldalerts,
    moldalertsHistory,
    moldproperty,
    securityalertsHistory,
    securityalerts,
    SystemMonitoringHistory,
    SystemMonitoringalerts,
    InsuranceAlert,
    InsuranceAlertHistory,
    InsuranceSevereAlert,
    fireDeviceList
}

function updateDevice(params) {
    return axios.put(`${config.apiUrl}/devices/${params?.deviceId}`, params, configJsonHeaders());
}

function getCategories(page, size = 10, orderBy, direction) {
    return axios.get(`${config.apiUrl}/categories?pageNumber=${page}&pageSize=${size}&orderBy=${orderBy}&direction=${direction}`, configJsonHeaders());
}

function getDeviceCategories() {
    return axios.get(`${config.apiUrl}/categories/basic`, configJsonHeaders());
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

//getDeviceCategoryCount

function getDeviceCategoryCount(categoryId) {
    return axios.get(`${config.apiUrl}/categories/${categoryId}`, configJsonHeaders());
}


function getDeviceTypeByCategoryIdDeviceDropdown(categoryId) {
    return axios.get(`${config.apiUrl}/device-type/basic/${categoryId}`, configJsonHeaders());
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

function getcontactList(page, size, orderBy, direction) {
    return axios.get(`${config.apiUrl}/contacts?pageNumber=${page}&pageSize=${size}&orderBy=${orderBy}&direction=${direction}`, configJsonHeaders());
}

function deleteContact(contactId) {
    return axios.delete(`${config.apiUrl}/contacts/${contactId}`, configJsonHeaders());
}

function AddContact(params) {
    return axios.post(`${config.apiUrl}/contacts`, params, configJsonHeaders());
}

function updateContact(params) {
    return axios.put(`${config.apiUrl}/contacts/${params.id}`, params, configJsonHeaders());
}

/* weather page */
function HeatWather() {
    return axios.get(`${config.apiUrl}/weather/alerts`, configJsonHeaders());
}

function currentWather() {
    return axios.get(`${config.apiUrl}/weather/hourly/current`, configJsonHeaders());
}

function currentHourlyWather() {
    return axios.get(`${config.apiUrl}/weather/hourly`, configJsonHeaders());
}
function currentTenDaysWather() {
    return axios.get(`${config.apiUrl}/weather/daily`, configJsonHeaders());
}
function currentPropertyWather() {
    return axios.get(`${config.apiUrl}/weather/hourly/current/properties`, configJsonHeaders());
}

function alertStats() {
    return axios.get(`${config.apiUrl}/alerts/stats`, configJsonHeaders());
}
function firealerts() {
    return axios.get(`${config.apiUrl}/alerts/fire`, configJsonHeaders());
}
function firealertsHistory(page, size=10) {
    return axios.get(`${config.apiUrl}/alerts/fire/history?pageNumber=${page}&pageSize=${size}`, configJsonHeaders());
}

function moldalerts() {
    return axios.get(`${config.apiUrl}/alerts/mold`, configJsonHeaders());
}
function moldalertsHistory(page, size=10) {
    return axios.get(`${config.apiUrl}/alerts/mold/history?pageNumber=${page}&pageSize=${size}`, configJsonHeaders());
}

function moldproperty() {
    return axios.get(`${config.apiUrl}/mold/properties`, configJsonHeaders());
}

function securityalerts() {
    return axios.get(`${config.apiUrl}/alerts/security`, configJsonHeaders());
}

function securityalertsHistory(page, size=10) {
    return axios.get(`${config.apiUrl}/alerts/security/history?pageNumber=${page}&pageSize=${size}`, configJsonHeaders());
}

function SystemMonitoringalerts() {
    return axios.get(`${config.apiUrl}/alerts/monitoring`, configJsonHeaders());
}

function SystemMonitoringHistory(page, size=10) {
    return axios.get(`${config.apiUrl}/alerts/monitoring/history?pageNumber=${page}&pageSize=${size}`, configJsonHeaders());
}

function InsuranceAlert() {
    return axios.get(`${config.apiUrl}/alerts/insurance`, configJsonHeaders());
}

function InsuranceAlertHistory(page, size=10) {
    return axios.get(`${config.apiUrl}/alerts/insurance/history?pageNumber=${page}&pageSize=${size}`, configJsonHeaders());
}

function InsuranceSevereAlert(page, size=10) {
    return axios.get(`${config.apiUrl}/alerts/insurance/history/severe`, configJsonHeaders());
}


// function fireDeviceList(filter, data) {
//     let url = `${config.apiUrl}/monitoring/devices`;
//     let queryParams = [];

//     // Add filters to queryParams if defined
//     if (filter?.online !== undefined) {
//         queryParams.push(`online=${filter.online}`);
//     }
//     if (filter?.lowBattery !== undefined) {
//         queryParams.push(`lowBattery=${filter.lowBattery}`);
//     }

//     // Add page and size parameters if defined in data
//     if (data?.page !== undefined) {
//         queryParams.push(`page=${data.page}`);
//     }
//     if (data?.size !== undefined) {
//         queryParams.push(`size=${data.size}`);
//     }

//     // Append queryParams to URL if there are any
//     if (queryParams.length > 0) {
//         url += '?' + queryParams.join('&');
//     }


//     return axios.get(url, configJsonHeaders());
// }

function fireDeviceList(filter, data) {
    console.log("data--------->",data,filter)
    let url = `${config.apiUrl}/monitoring/devices`;
    let queryParams = [];

    // Add filters to queryParams if defined
    if (filter?.online !== undefined) {
        queryParams.push(`online=${filter.online}`);
    }
    if (filter?.lowBattery !== undefined) {
        queryParams.push(`lowBattery=${filter.lowBattery}`);
    }

    // Add page and size parameters
    queryParams.push(`pageNumber=${data.page}`);
    queryParams.push(`pageSize=${data.size}`);

    // Append queryParams to URL if there are any
    if (queryParams.length > 0) {
        url += '?' + queryParams.join('&');
    }

    return axios.get(url, configJsonHeaders());
}


