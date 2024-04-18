import swal from "sweetalert";

export function exceptionHandling(exceptionData){
    // const navigate = useNavigate();
    if (exceptionData?.response?.status === 401) {
        swal("Error", "Your session has expired. Please login again.", "error").then(() => {
            // sessionExpired(router)
            localStorage.clear();
            // router.replace("/");
            window.location.href="/"
            // navigate("/");
        });
        return
    }else
    if (exceptionData?.response?.status === 403) {
        swal("Error", exceptionData.response.data.message, "error").then(() => {
            // sessionExpired(router)
            localStorage.clear();
            // router.replace("/");
            window.location.href="/";
            // navigate("/");
        });
        return
    }else
    if (exceptionData?.response?.status === 400) {
        swal("Error", exceptionData.response.data.message, "error");
        return
    } else {
        swal("Error", `It appears that either your internet connection or the server is not responding.`, "error");
        return
    }
};

