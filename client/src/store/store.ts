import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import taskReducer from "./slices/TasksSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
