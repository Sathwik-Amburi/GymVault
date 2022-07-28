import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export default class UnifiedErrorHandler {
  public static handle(error: Error): void {
    if (
      error.name === "AxiosError" &&
      (error as AxiosError).response!.status === 401
    ) {
      localStorage.removeItem("token");
      document.location.href = "/user/login?reason=expired";
    }
    console.error(error);
  }
}
