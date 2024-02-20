import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  video_details: null,
};

const videoSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    add_details: (state, action) => {
      state.video_details = action.payload;
    },
  },
});

export const { add_details } = videoSlice.actions;
export default videoSlice.reducer;
