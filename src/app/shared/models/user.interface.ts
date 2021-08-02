export type Roles = 'EMPLOYEE' | 'ADMIN' | null;

export interface UserI {
  username: string;
  password: string;
}

export interface UserResponseI {
  message: string;
  token: string;
  userId: string;
  role: Roles;
  expiresIn: string;
}
