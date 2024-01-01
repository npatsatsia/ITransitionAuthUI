import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import AuthService from '../../Service/auth'

let error = null
let logInLoading = false
let regLoading = false
let registered = false
let message



export const register = createAsyncThunk(
  "/register",
  async ({ username, email, password, registration_time, userID, active }, thunkAPI) => {
    try {
      const response = await AuthService.register(username, email, password, registration_time, userID, active);
      // Dispatch other actions or return data
      return response.data;
    } catch (error) {
      // Handle errors or return a rejection
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const login = createAsyncThunk(
  "/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await AuthService.login(email, password);
      return response.data
    } catch (err) {
        if (!err?.response) {
            message = 'No Server Response';
        } else if (err.response?.status === 400) {
            message = 'Missing Username or Password';
        } else if (err.response?.status === 401) {
            message = 'Unauthorized';
        } else {
            message = 'Login Failed';
        }
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk("/logout", () => {
    AuthService.logout();
});

const initialState = true
  ? { isLoggedIn: true,  logInLoading, regLoading, registered }
  : { isLoggedIn: false, error, logInLoading, regLoading, registered }

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.pending]: (state) => {
      state.regLoading = false
    },
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.registered = action.payload
      state.regLoading = false
    },
    [register.rejected]: (state,action) => {
      state.isLoggedIn = false;
      state.error = action.error.message
      state.regLoading = false
    },
    [login.pending]: (state) => {
      state.logInLoading = true
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.logInLoading = false
    },
    [login.rejected]: (state, action) => {
      state.logInLoading = false
      state.isLoggedIn = false;
      state.error = action.error.message
    },
    [logout.fulfilled]: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const { reducer } = authSlice;
export default reducer;