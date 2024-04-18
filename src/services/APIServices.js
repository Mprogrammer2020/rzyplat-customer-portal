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
}


function getCustomers() {
    return axios.get(`${config.apiUrl}/user/filter`,configJsonHeaders());
}

// function updateUser(params) {
//     return axios.put(`${config.apiUrl}/admin/update-user`,params,configJsonHeaders());
// }
