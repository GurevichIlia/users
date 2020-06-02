export interface User {
  birthdate: number | Date;
  email: string;
  first_name: string;
  gender: string;
  id: number;
  last_name: string;
  location: Location;
  password: string;
  phone_number: string;
  picture: string;
  title: string;
  username: string;
}

export interface Location {
  street: string;
  city: string;
  state: string;
  postcode: number;
}
