import axios from "axios";

export default class ApiCalls {
  public static getAllGyms = async () => {
    return await axios.get("/gyms/get-all-gyms", {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  public static getGym = async (id: string) => {
    return await axios.get(`/gyms/get/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
}
