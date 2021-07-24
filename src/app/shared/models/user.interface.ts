export type Roles = 'EMPLOYEE' | 'ADMIN';

export interface UserI {
  username: string;
  email: string;
  password: string;
}

export interface UserResponseI {
  message: string;
  token: string;
  userId: number;
  role: Roles;
}
