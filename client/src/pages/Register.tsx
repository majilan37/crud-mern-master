import { useCallback, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { register } from "../redux/slices/auth";
import { User } from "../types";
function Register() {
  const [userData, setUserData] = useState<
    Pick<User, "email" | "username"> & {
      password: string;
      confirmPassword: string;
    }
  >({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  const navigate: NavigateFunction = useNavigate();

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    },
    [userData]
  );
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(register(userData)).then(() => navigate("/"));
  };
  return (
    <main className="max-w-xl mx-auto py-8">
      <h2 className="text-center text-3xl font-medium my-3">
        Register and start creating you todos
      </h2>
      <form onSubmit={onFormSubmit} action="" className="pt-4 space-y-3">
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="username"
            className="block text-base font-medium leading-5 text-gray-700">
            username
          </label>
          <input
            name="username"
            value={userData.username}
            onChange={onInputChange}
            type="text"
            className="border outline-none px-4 py-1 focus:ring-2 ring-blue-600 transition-all duration-200"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="email"
            className="block text-base font-medium leading-5 text-gray-700">
            Email
          </label>
          <input
            name="email"
            value={userData.email}
            onChange={onInputChange}
            type="email"
            className="border outline-none px-4 py-1 focus:ring-2 ring-blue-600 transition-all duration-200"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="email"
            className="block text-base font-medium leading-5 text-gray-700">
            Passowrd
          </label>
          <input
            name="password"
            value={userData.password}
            onChange={onInputChange}
            type="password"
            className="border outline-none px-4 py-1 focus:ring-2 ring-blue-600 transition-all duration-200"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="email"
            className="block text-base font-medium leading-5 text-gray-700">
            Confirm Passowrd
          </label>
          <input
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={onInputChange}
            type="password"
            className="border outline-none px-4 py-1 focus:ring-2 ring-blue-600 transition-all duration-200"
          />
        </div>
        <button className="flex-grow bg-gray-800 text-white w-full py-1 hover:bg-gray-900">
          {isLoading ? (
            <>
              <Spinner height="h-4" width="w-4" /> Loading...
            </>
          ) : (
            <span>Submit</span>
          )}
        </button>
      </form>
    </main>
  );
}

export default Register;
