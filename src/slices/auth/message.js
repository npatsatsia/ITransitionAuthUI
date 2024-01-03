import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showMessage: ""
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setShowMessage: (state, action) => {
      state.showMessage = action.payload
    },
    clearShowMessage: (state) => {
      state.showMessage = "" 
    },
  },
});

const { reducer, actions } = messageSlice;

export const { setShowMessage, clearShowMessage } = actions
export default reducer;