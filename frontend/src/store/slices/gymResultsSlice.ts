import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Gym } from "../../models/allModels";

export interface GymResultsState {
  filteredGyms: Gym[];
}

const initialState: GymResultsState = {
  filteredGyms: [],
};

export const gymResultsSlice = createSlice({
  name: "gymResults",
  initialState,
  reducers: {
    setGymResults: (state, action: PayloadAction<GymResultsState>) => {
      state.filteredGyms = action.payload.filteredGyms;
    },
  },
});

export const { setGymResults } = gymResultsSlice.actions;
export default gymResultsSlice.reducer;
