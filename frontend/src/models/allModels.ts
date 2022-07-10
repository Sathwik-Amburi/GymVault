export interface Gym {
  name: string;
  email: string;
  description: string;
  phoneNumber: string;
  city: string;
  address: string;
  optionals: Option[];
  amenities: string[]; // [name, price]
  websiteURL: string;
  subscriptionOffers: SubscriptionOffers[];
  images?: string[];
  _id: string;
}

export interface SubscriptionOffers {
  subscriptionType: SubscriptionTypes.DAY_PASS;
  subscriptionPrice: number;
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
  _id: string;
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
  name?: string;
  type: SubscriptionTypes;
  price: number;
  optionals: Option[];
  purchaseDate?: string;
  expireDate?: string;
  ticketSecret?: string;
  _id: string;
}

export enum FilterTypes {
  PRICE_RANGE = "PRICE_RANGE",
}

export type Filter = PriceRangeFilter;

export interface PriceRangeFilter {
  type: FilterTypes.PRICE_RANGE;
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
}
