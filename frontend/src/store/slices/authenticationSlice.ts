import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthenticationState {
  isAuthenticated: boolean;
  role: string;
}

const initialState: AuthenticationState = {
  isAuthenticated: Boolean(localStorage.getItem("token")),
  role: localStorage.getItem("role") as string,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAuthentication: (state, action: PayloadAction<AuthenticationState>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.role = action.payload.role;
    },
  },
});

export const { setAuthentication } = authenticationSlice.actions;
export default authenticationSlice.reducer;
