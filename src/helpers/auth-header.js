export function getToken() {
    let storedData = "";
    if (typeof window !== 'undefined') {
        storedData = localStorage.getItem('access_token');
    }
    return `Bearer ${storedData}`;
}
var commonHeaders = {
    'appVersion': '1.0',
    'Access-Control-Allow-Origin': 'true',
    'timezone': 'Asia/Kolkata',
    // Authorization: getToken(),
}


export function formDataHeader() {
    return { ...commonHeaders, "Content-Type": "application/x-www-form-urlencoded" }
}

export function jsonHeaders() {
    return { ...commonHeaders, "Content-Type": "application/json" }
}

export function multipartHeaders() {
    return { ...commonHeaders, "Content-Type": "multipart/form-data" }
}
