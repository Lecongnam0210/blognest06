export interface User {
  id?: string | any;
  first_name: string;
  last_name: string;
  user_name: string;
  avatar?: string;
  address?: string;
  email: string;
  password: string;
  dob: Date;
  phone_number: string;
  role?: number;
  refresh_token?: string;
  updated_by?: string;
}

export interface Query {
  limit: number;
  offset: number;
  [key: string]: any;
}
