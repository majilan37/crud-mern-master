import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo } from "../../types";
import { RootState } from "../store";

const todosApi = createApi({
  reducerPath: "todos",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/todos",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.user!.token;
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => "/",
      providesTags: ["Todo"],
    }),
    createTodo: builder.mutation<void, Todo["text"]>({
      query: (text) => ({
        url: "/create",
        method: "POST",
        body: { text },
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: builder.mutation<void, Todo["_id"]>({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
    updateTodo: builder.mutation<void, Pick<Todo, "_id" | "text">>({
      query: ({ _id: id, text }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: { text },
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todosApi;

export default todosApi;
