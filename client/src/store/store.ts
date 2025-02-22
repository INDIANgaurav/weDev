import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import taskReducer from "./slices/TasksSlice"
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("tasks");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.error("Error loading state:", error);
    return undefined;
  }
};
export const store = configureStore({
  reducer: {
    auth: authSlice ,
    tasks: taskReducer,
  },
  preloadedState: {
    tasks: { tasks: loadState() || [] },
  },
});
store.subscribe(() => {
  try {
    localStorage.setItem("tasks", JSON.stringify(store.getState().tasks.tasks));
  } catch (error) {
    console.error("Error saving state:", error);
  }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;