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
  _id: string;
}

export interface Option {
  name: string;
  description: string;
  price: number;
  _id: string;
}