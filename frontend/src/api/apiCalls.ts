import axios from "axios";

const baseURL = "http://localhost:3000/api";

axios.defaults.baseURL = baseURL;

export default class ApiCalls {
  public static getAllGyms = async () => {
    return await axios.get("/gyms/get-all-gyms", {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
}
