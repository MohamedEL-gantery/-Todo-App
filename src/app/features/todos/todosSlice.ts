import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const storageKey = "user";

// Function to get current token
const getCurrentToken = () => {
  const userDataString = Cookies.get(storageKey);
  return userDataString ? JSON.parse(userDataString)?.accessToken : null;
};

export const todoApiSlice = createApi({
  reducerPath: "todosApi",
  tagTypes: ["Todos"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://todo-production-730c.up.railway.app/api/v1/todos",
    prepareHeaders: (headers) => {
      const token = getCurrentToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => ({
        url: "/",
      }),
      providesTags: ["Todos"],
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: "/",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    getOneTodo: builder.query({
      query: (id) => ({
        url: `/${id}`,
      }),
      providesTags: ["Todos"],
    }),
    updateTodo: builder.mutation({
      query: ({ id, todo }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useAddTodoMutation,
  useGetTodosQuery,
  useGetOneTodoQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApiSlice;
