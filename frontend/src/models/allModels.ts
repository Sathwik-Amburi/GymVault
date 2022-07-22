export interface Gym {
  name: string;
  email: string;
  description: string;
  phoneNumber: string;
  city: string;
  address: string;
  optionals: Option[];
  amenities: string[];
  websiteURL: string;
  subscriptionOffers: SubscriptionOffers[];
  images?: string[];
  rating: Rating[];
  _id: string;
}

export interface Rating {
  rating: number;
  ratedBy: number;
}

export interface SubscriptionOffers {
  subscriptionType: SubscriptionTypes.DAY_PASS;
  subscriptionPrice: number;
  discount: number
}

export interface Course {
  name: string;
  gym: Gym;
  gymId: Gym;
  description: string;
  phoneNumber: number;
  address: string;
  images?: string[];
  subscriptionOffers: SubscriptionOffers[];
  sessions: CourseSession[];
  rating: Rating[];
  _id: string;
}

export interface CourseSession {
  sessionDay: string;
  sessionDetails: SessionDetails[];
}

export interface SessionDetails {
  sessionTime: string;
  sessionsInstructor: string;
}

export interface Item {
  gymName: string;
  courseName: string;
  type: string;
  address: string;
  description: string;
  optionals: PurchaseOption[];

  fgColor: string;
  bgColor: string;

  _id: string;
}

export interface Option {
  name: string;
  description: string;
  price: number;
  _id: string;
}

export enum SubscriptionTypes {
  DAY_PASS = "DAY_PASS",
  SESSION_PASS = "SESSION_PASS",
  MONTHLY_PASS = "MONTHLY_PASS",
  YEARLY_PASS = "YEARLY_PASS",
  COURSE_TICKET = "COURSE_TICKET",
}

export interface Subscription {
  userId: string;
  gymId: string;
  courseId:string;
  name?: string;
  type: SubscriptionTypes;
  price: number;
  optionals: Option[];
  purchaseDate?: string;
  expireDate?: string;
  ticketSecret?: string;
  _id: string;
}

export interface Filter {
  priceRanges: PriceRangeFilter[];
  amenities: string[]

}

export interface PriceRangeFilter {
  type: SubscriptionTypes;
  name: string;
  minPrice: number;
  maxPrice: number;
}

export interface PurchaseOption {
  name: string;
  description: string;
  price: number;
  bgColor: string;
  fgColor: string;
  _id: string;
}

export interface UserProfileDetails {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  payouts_enabled: boolean;
  profilePicture: string;
  created: string
}
