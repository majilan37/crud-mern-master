import { configureStore } from "@reduxjs/toolkit";
import todosApi from "./services/todos";
import authSlice from "./slices/auth";

const store = configureStore({
  reducer: {
    auth: authSlice,
    [todosApi.reducerPath]: todosApi.reducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(todosApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
