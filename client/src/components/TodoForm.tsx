import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { useCallback, useMemo, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
} from "../redux/services/todos";
import Spinner from "./Spinner";

function TodoForm() {
  const [text, setText] = useState("");
  const navigate: NavigateFunction = useNavigate();
  const { user, isLoading } = useAppSelector((state) => state.auth);

  const { data, refetch, isFetching } = useGetTodosQuery();
  const [createTodo] = useCreateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  useEffect(() => {
    refetch();
  }, [user, refetch]);

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    },
    []
  );
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTodo(text);
    setText("");
  };
  const todos = useMemo(() => {
    console.log(data);
    return data;
  }, [data]);

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="w-full flex items-center space-x-2"
        action="">
        <input
          className="border outline-none px-4 py-1 border-gray-300 flex-grow focus:ring-2 ring-blue-600 transition-all duration-200"
          type="text"
          placeholder="Add your todo..."
          value={text}
          onChange={onInputChange}
        />
        <button className="bg-blue-700 hover:bg-blue-600 active:bg-blue-800 text-white px-5 py-1">
          Add Todo
        </button>
      </form>
      <div className="space-y-2 py-2">
        {isLoading || isFetching ? (
          <div className="flex justify-center py-4">
            <Spinner height="h-14" width="w-14" />
          </div>
        ) : (
          <>
            {todos?.map((todo) => (
              <div
                key={todo._id}
                className="bg-gray-300 p-2 relative flex justify-between shadow-sm group overflow-hidden">
                <p>{todo.text}</p>
                <button
                  onClick={() => navigate(`/todos/${todo._id}`)}
                  className="bg-green-600 absolute -right-10 top-0 bottom-0 px-2 text-white group-hover:right-10 transition-all duration-200">
                  <PencilIcon className="h-6" />
                </button>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="bg-red-600 absolute -right-10 top-0 bottom-0 px-2 text-white group-hover:right-0 transition-all duration-200">
                  <TrashIcon className="h-6" />
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default TodoForm;
