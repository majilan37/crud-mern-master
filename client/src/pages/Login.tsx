import { useCallback, useState, useEffect } from "react";
import { UserLogin } from "../types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { login } from "../redux/slices/auth";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

function Login() {
  const [userData, setUserData] = useState<UserLogin>({
    email: "",
    password: "",
  });
  const navigate: NavigateFunction = useNavigate();

  const dispatch = useAppDispatch();
  const { isSuccess, message, isLoading } = useAppSelector(
    (state) => state.auth
  );

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    },
    [userData]
  );
  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
    }
  }, [isSuccess, message]);
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(login(userData)).then(() => navigate("/"));
  };

  console.log(isLoading);

  return (
    <main className="max-w-xl mx-auto py-8">
      <h2 className="text-center text-3xl font-medium my-3">
        Login and start creating you todos
      </h2>
      <form onSubmit={onFormSubmit} action="" className="pt-4 space-y-3">
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

export default Login;
