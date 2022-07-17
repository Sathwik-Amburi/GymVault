import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null
}

export const profilePictureSlice = createSlice({
    name: 'profilePicture',
    initialState,
    reducers: {
        setProfilePicture: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {setProfilePicture} = profilePictureSlice.actions
export default profilePictureSlice.reducer