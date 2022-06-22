import axios from "axios";
import ApiCalls from "./apiCalls";

class Session {
    public async login(username: string, password: string): Promise<any> {
        let attempt = await ApiCalls.userTryLogin(username, password);
        if (attempt.data.success) {
            localStorage.setItem("user", JSON.stringify(attempt.data.user));
            return true;
        }
        return false;
    }

    public logout(): void {
        // TODO: should we also kill the JWT on the backend, or just let it expire?
        localStorage.removeItem("user");
    }
    public register(fullname: string, password: string, email: string, phone: string) {
        return ApiCalls.userSignup(email, password, fullname, phone);
    }
    public getCurrentUser(): any {
        if (localStorage.getItem("user") != null) {
            return JSON.parse(localStorage.getItem("user")!);
        } else {
            return null;
        }
    }
}
export default new Session();