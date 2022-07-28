import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: localStorage.getItem("profilepicture"),
};

export const profilePictureSlice = createSlice({
  name: "profilePicture",
  initialState,
  reducers: {
    setProfilePicture: (state, action) => {
      state.url = action.payload.url;
    },
  },
});

export const { setProfilePicture } = profilePictureSlice.actions;
export default profilePictureSlice.reducer;
