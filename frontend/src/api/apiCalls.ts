import axios from "axios";

export default class ApiCalls {
  public static registerUser = async (
    firstName: any,
    lastName: any,
    phoneNumber: any,
    email: any,
    password: any
  ) => {
    return await axios.post("/authentication/register", {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
    });
  };

  public static getAllGyms = async () => {
    return await axios.get("/gyms/get-all-gyms", {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  public static getGymsByPriceRange = async (priceRange: number[]) => {
    return await axios.post(
      "/gyms/filter/price-range",
      { priceRange },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  public static getGym = async (id: string) => {
    return await axios.get(`/gyms/get/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  public static getAllCourses = async () => {
    return await axios.get("/gyms/get-all-courses", {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  public static getCourse = async (id: string) => {
    return await axios.get(`/courses/get/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  public static getSubscriptionsByGymId = async (gymId: string) => {
    return await axios.get(`/gyms/subscriptions/get-subscriptions/${gymId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
}
