import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import {
  LoginIcon,
  LogoutIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/slices/auth";

function Header() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  console.log(user);
  return (
    <header className="py-3 px-5 flex items-center justify-between border-b shadow-sm bg-gray-50">
      <div className="">
        <h1 className="text-2xl font-semibold">Todo Setterrr</h1>
      </div>
      <ul className="flex items-center space-x-4 flex-grow justify-center">
        {!user ? (
          <>
            <li>
              <Link className="flex items-center space-x-2 " to="/login">
                <span>Login</span>
                <LoginIcon className="h-6" />
              </Link>
            </li>
            <li>
              <Link className="flex items-center space-x-2 " to="/register">
                <span>Register</span>
                <PlusCircleIcon className="h-6" />
              </Link>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={() => {
                dispatch(logout());
                navigate("/login");
              }}
              className="flex items-center space-x-2 bg-red-600 px-4 py-2 text-white">
              <span>Logout</span>
              <LogoutIcon className="h-6" />
            </button>
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;
