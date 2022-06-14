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