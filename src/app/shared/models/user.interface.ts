export type Roles = 'EMPLOYEE' | 'ADMIN' | null;

export interface UserI {
  username: string;
  password: string;
}

export interface UserResponseI {
  message: string;
  token: string;
  userId: number;
  role: Roles;
  expiresIn: string;
}
