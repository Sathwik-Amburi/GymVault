import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course, Gym } from "../../models/allModels";

export interface CourseResultsState {
  filteredCourses: Course[];
}

const initialState: CourseResultsState = {
  filteredCourses: [],
};

export const courseResultsSlice = createSlice({
  name: "courseResults",
  initialState,
  reducers: {
    setCourseResults: (state, action: PayloadAction<CourseResultsState>) => {
      state.filteredCourses = action.payload.filteredCourses;
    },
  },
});

export const { setCourseResults } = courseResultsSlice.actions;
export default courseResultsSlice.reducer;
