import { configureStore } from "@reduxjs/toolkit";
import AuthenticationReducer from "./slices/authenticationSlice";
import GymResultsReducer from "./slices/gymResultsSlice";
import CourseResultsReducer from "./slices/courseResultsSlice";

export const store = configureStore({
  reducer: {
    authentication: AuthenticationReducer,
    gymResults: GymResultsReducer,
    courseResults: CourseResultsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
