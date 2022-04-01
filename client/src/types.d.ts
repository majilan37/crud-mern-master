export interface User {
  id: string;
  username: string;
  email: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserLogin = Pick<User, "email"> & { password: string };

export interface Todo {
  _id: string;
  user: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}
