import axios from "axios";
import { config } from "../config/config";
import { getToken, jsonHeaders } from "../helpers/auth-header";

const configJsonHeaders = () => {
    let jsonHeader = jsonHeaders();
    jsonHeader.Authorization = getToken();
    return {
        headers: jsonHeader
    }
}

// const configMultipartHeaders = () => {
//     let formDataHeaders = formDataHeader();
//     formDataHeaders.Authorization = getToken();
//     return {
//         headers: formDataHeaders
//     }
// }
export const APIServices = {
    getCustomers,
    deleteCustomer
}


function getCustomers(params) {
    return axios.post(`${config.apiUrl}/user/filter`,params,configJsonHeaders());
}

function deleteCustomer(customerId) {
    return axios.delete(`${config.apiUrl}/user/${customerId}`,configJsonHeaders());
}
