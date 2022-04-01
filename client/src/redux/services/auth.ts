import axios from "axios";
import { User, UserLogin } from "../../types";

async function login(userData: UserLogin): Promise<User> {
  const { data } = await axios.post<User>("/api/users/login", userData);
  localStorage.setItem("user", JSON.stringify(data));
  return data;
}

async function register(
  userData: Pick<User, "username" | "email"> & { password: string }
) {
  const { data } = await axios.post<User>("/api/users/register", userData);
  localStorage.setItem("user", JSON.stringify(data));
  return data;
}

async function logout() {
  localStorage.removeItem("user");
}

export const authService = {
  login,
  logout,
  register,
};
