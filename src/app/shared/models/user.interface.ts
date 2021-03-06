export type Roles = 'employee' | 'admin' | null;

export interface UserI {
  [x: string]: any;
  name: string;
  lastName: string;
  idType: string;
  idNumber: string;
  address: string;
  phoneNumber: number;
  email: string;
  position: string;
  password: string;
  role: Roles;
}

export interface UserResponseI {
  message: string;
  token: string;
  idNumber: string;
  role: Roles;
  expiresIn: string;
}
