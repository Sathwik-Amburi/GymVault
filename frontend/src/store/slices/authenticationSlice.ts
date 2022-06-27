import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthenticationState {
  isAuthenticated: boolean;
}

const initialState: AuthenticationState = {
  isAuthenticated: Boolean(localStorage.getItem("token")),
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setIsAuthenticated } = authenticationSlice.actions;
export default authenticationSlice.reducer;
