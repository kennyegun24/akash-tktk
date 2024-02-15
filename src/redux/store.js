import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./auth";

const store = configureStore({
  reducer: {
    auth: loginSlice,
  },
});

export default store;
