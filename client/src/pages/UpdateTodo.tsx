import React, { useCallback, useEffect, useState } from "react";
import {
  NavigateFunction,
  Params,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "../redux/services/todos";
import { Todo } from "../types";

function UpdateTodo() {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [text, setText] = useState<Todo["text"]>("");
  const { id }: Readonly<Params<string>> = useParams();
  const navigate: NavigateFunction = useNavigate();

  const { data } = useGetTodosQuery();
  const [updateTodo, { isLoading }] = useUpdateTodoMutation();
  const fn = useUpdateTodoMutation();

  console.log(fn);

  useEffect(() => {
    const todo = data?.find((todo: Todo) => todo._id === id);
    setTodo(todo as Todo);
  }, [id, data]);
  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    },
    []
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateTodo({ _id: id, text } as Pick<Todo, "_id" | "text">);
    setText("");
    navigate("/");
  };
  console.log(id);
  return (
    <div className="max-w-lg mx-auto py-14">
      <form
        onSubmit={onSubmit}
        className="w-full flex items-center space-x-2"
        action="">
        <input
          className="border outline-none px-4 py-1 border-gray-300 flex-grow focus:ring-2 ring-blue-600 transition-all duration-200"
          type="text"
          placeholder="Update your todo..."
          defaultValue={todo?.text}
          onChange={onInputChange}
        />
        <button className="bg-blue-700 hover:bg-blue-600 active:bg-blue-800 text-white px-5 py-1">
          {isLoading ? "Updating" : "Update Todo"}
        </button>
      </form>
    </div>
  );
}

export default UpdateTodo;
