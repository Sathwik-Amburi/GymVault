export interface Gym {
  name: string;
  description: string;
  phoneNumber: string;
  city: string;
  address: string;
  amenities: [string, number][]; // [name, price]
  _id: string;
}

export interface Course {
  name: string;
  description: string;
  phoneNumber: number;
  address: string;
  _id: string;
}

export interface Item { 
  gymName: string;
  courseName: string;
  type: string;
  address: string;
  description: string;
  price: number;
  options: Option[];

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
  MONTHLY_PASS = "MONTHLY_PASS",
  YEARLY_PASS = "YEARLY_PASS",
}

export interface Subscription {
  userId: string;
  gymId: string;
  name?: string;
  type: SubscriptionTypes;
  price: number;
  options: string[];
  purchaseDate?: string;
  expireDate?: string;
  ticketSecret?: string;
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