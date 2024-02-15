import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loginStatus: false,
  loginError: true,
};

export const loginUser = createAsyncThunk("user/login", async () => {});

const loginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {},
  extraReducers(reducer) {
    reducer
      .addCase(loginUser.pending, (state, action) => {})
      .addCase(loginUser.fulfilled, (state, action) => {})
      .addCase(loginUser.rejected, (state, action) => {});
  },
});

export default loginSlice.reducer;
