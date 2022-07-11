import axios from "axios";
import { PriceRangeFilter, UserProfileDetails } from "../models/allModels";

export default class ApiCalls {
  public static registerUser = async (
    firstName: any,
    lastName: any,
    phoneNumber: any,
    email: any,
    password: any
  ) => {
    return await axios.post("/authentication/signup", {
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

  public static getGymsByPriceRange = async (
    priceRange: number[],
    city?: string
  ) => {
    return await axios.post(
      "/gyms/filter/price-range",
      { priceRange, city },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  public static getGymsByFilters = async (
    priceRanges: PriceRangeFilter[],
    city?: string
  ) => {
    return await axios.post(
      "/gyms/filter/price-ranges",
      { priceRanges, city },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  public static getCoursesByPriceRange = async (
    priceRange: number[],
    city?: string
  ) => {
    return await axios.post(
      "/courses/filter/price-range",
      { priceRange, city },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  public static getCoursesByFilters = async (
    priceRanges: PriceRangeFilter[],
    city?: string,
    name?: string | null
  ) => {
    return await axios.post(
      "/courses/filter/price-ranges",
      { priceRanges, city },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  public static getGymOrCourseRating = async (id: string) => {
    return await axios.get(`/reviews/rating/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  public static getResults = async (
    type: string,
    name: string,
    city: string
  ) => {
    return await axios.get(`/${type}/search?name=${name}&city=${city}`, {
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

  public static getAllCourses = async () => {
    return await axios.get("/gyms/get-all-courses", {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  public static getCoursesByGymId = async (gymId: string) => {
    return await axios.get(`/gyms/get/${gymId}/courses`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  public static getAllGymsByCityOrName = async (
    city: string,
    name: string | null
  ) => {
    return await axios.get(`/gyms/filter?city=${city}&name=${name}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  public static getAllCoursesByCityOrName = async (
    city: string,
    name: string | null
  ) => {
    return await axios.get(`/courses/filter?city=${city}&name=${name}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  public static getAllAvailableSearchCities = async (type: string) => {
    return await axios.get<string[]>(`/gyms/cities/${type}`, {
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

  public static getReviewsById = async (id: string) => {
    return await axios.get(`/reviews/get/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  public static getReviewByUserId = async (userid:string,id:string) =>{
    return await axios.get(`/reviews/user/${userid}-${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  public static addReview = async (
    userId: any,
    username: any,
    gymId: any,
    courseId: any,
    rating: any,
    title: any,
    description: any
  ) => {
    return await axios.post("/reviews/add-review", {
      userId,
      username,
      gymId,
      courseId,
      rating,
      title,
      description,
    });
  };

  public static getSubscriptionsByGymId = async (gymId: string) => {
    return await axios.get(`/gyms/subscriptions/get-subscriptions/${gymId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  public static userLogin = async (email: string, password: string) => {
    return await axios.post("/authentication/login", {
      email,
      password,
    });
  };

  public static getUserProfile = async (token: string | null) => {
    return await axios.get<UserProfileDetails>("/user/profile", {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": (token ??= ""),
      },
    });
  };

  public static checkOrPurchase = async (
    entity: string,
    token: string,
    stripeId: string
  ) => {
    return await axios.get(`/stripe/purchase/${entity}/${stripeId}`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });
  };

  public static getSubscriptions = async (token: string) => {
    return await axios.get(`/user/subscriptions`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });
  };
}
