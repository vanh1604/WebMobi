import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: {
    curentCustomer: null,
    loggedIn: false,
    error: false,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logginSuccess: (state, action) => {
      state.login.curentCustomer = action.payload;
      state.login.loggedIn = true;
    },
    loggoutSuccess: (state, action) => {},
    updatedSuccess: (state, action) => {},
    updatedTokenSuccess: (state, action) => {},
  },
});
export const {
  logginSuccess,
  loggoutSuccess,
  updatedSuccess,
  updatedTokenSuccess,
} = authSlice.actions;
export default authSlice.reducer;
