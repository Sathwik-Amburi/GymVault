import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export default class UnifiedErrorHandler {
    public static handle(error: Error, message: string): void {
        if (error.name === "AxiosError" && (error as AxiosError).response!.status === 401) {
            //alert("Token expired! Please log in again");
            localStorage.removeItem("token");
            document.location.href = "/user/login?reason=expired";
        } else {
            alert(message);
        }
        console.error(error);
    }
}