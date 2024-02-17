import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loginStatus: null,
  loginError: true,
};

export const loginUser = createAsyncThunk("user/login", async () => {
  const params = new URLSearchParams({
    scope: "user.info.basic,video.upload,video.publish",
    client_key: "awp1l97zfgf2xei0",
    redirect_uri: "https://www.make.com/oauth/cb/app",
    response_type: "code",
    state: "328974823283082595483",
  });

  window.location.href = `https://www.tiktok.com/v2/auth/authorize?${params.toString()}`;
});

const loginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers(reducer) {
    reducer
      .addCase(loginUser.pending, (state, action) => {})
      .addCase(loginUser.fulfilled, (state, action) => {})
      .addCase(loginUser.rejected, (state, action) => {});
  },
});

export const { loginSuccess } = loginSlice.actions;
export default loginSlice.reducer;
