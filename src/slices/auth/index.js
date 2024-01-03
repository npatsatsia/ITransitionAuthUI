import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setShowMessage } from "./message";
import AuthService from '../../Service/auth'


export const register = createAsyncThunk(
  "/register",
  async ({ username, email, password, registration_time, userID, active }, thunkAPI) => {
    try {
      const response = await AuthService.register(username, email, password, registration_time, userID, active);
      // Dispatch other actions or return data
      console.log(response.data);
      if (response.data.success) {
        thunkAPI.dispatch(setShowMessage('successfully registered'));
      }
      return response.data;
    } catch (error) {
      // Handle errors or return a rejection
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const login = createAsyncThunk(
  "/login",
  async ({ email, password, last_login_time }, thunkAPI) => {
    try {
      const response = await AuthService.login(email, password, last_login_time);
      return response.data;
    } catch (err) {
      if (!err?.response) {
        thunkAPI.dispatch(setShowMessage('No Server Response'));
      }else if(err.response.message === 'User is Blocked'){
        thunkAPI.dispatch(setShowMessage('User is Blocked'));
      } else if (err.response?.status === 400) {
        thunkAPI.dispatch(setShowMessage('Missing Username or Password'));
      } else if (err.response?.status === 401) {
        thunkAPI.dispatch(setShowMessage('Unauthorized'));
      } else {
        thunkAPI.dispatch(setShowMessage('Login Failed'));
      }
      return thunkAPI.rejectWithValue();
    }
  }
);


export const logout = createAsyncThunk("/logout", () => {
    AuthService.logout();
});

const initialState = {
  isLoggedIn: false,
  logInLoading: false,
  regLoading: false,
  registered: false
}


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