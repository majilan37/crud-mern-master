import { useEffect, memo } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TodoForm from "../components/TodoForm";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { reset } from "../redux/slices/auth";

function Dashborad() {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isSuccess, isError, message } = useAppSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (user && isSuccess) {
      toast.success(message);
    }
    if (isError) {
      toast.error(message);
    }

    dispatch(reset());
  }, [isSuccess, isError, message, dispatch, user, navigate]);
  return (
    <div className="max-w-xl mx-auto px-2 py-7">
      <h2 className="text-center text-2xl font-bold mt-7 mb-5">
        Welcome {user?.username}, Start creating your todos.{" "}
      </h2>
      <TodoForm />
    </div>
  );
}

export default memo(Dashborad);
