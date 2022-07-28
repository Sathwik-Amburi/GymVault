import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course, Gym } from "../../models/allModels";

export interface ErrorAlertState {
  showError: boolean;
  errorMessage: string;
}

const initialState: ErrorAlertState = {
  showError: false,
  errorMessage: "",
};

export const errorAlertSlice = createSlice({
  name: "errorAlert",
  initialState,
  reducers: {
    setErrorAlert: (state, action: PayloadAction<ErrorAlertState>) => {
      state.showError = action.payload.showError;
      state.errorMessage = action.payload.errorMessage;
    },
  },
});

export const { setErrorAlert } = errorAlertSlice.actions;
export default errorAlertSlice.reducer;
