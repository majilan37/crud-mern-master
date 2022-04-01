import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { User } from "../types";

export default function PrivateRoute() {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  return (user as User) && !isLoading ? <Outlet /> : <Navigate to="/login" />;
}
