import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./auth";
import videoSlice from "./video";

const store = configureStore({
  reducer: {
    auth: loginSlice,
    video: videoSlice,
  },
});

export default store;
