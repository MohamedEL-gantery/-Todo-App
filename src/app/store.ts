import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { todoApiSlice } from "./features/todos/todosSlice";

const store = configureStore({
  reducer: {
    [todoApiSlice.reducerPath]: todoApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([todoApiSlice.middleware]),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
