import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import usersManagementService from "../../Service/users";

export const getAllUsers = createAsyncThunk(
    'users/getAllUsers',
    async () => {
        try{
            const response = await usersManagementService.getAllUsers();
            return response
        }catch(error) {
            return error
        }
    }
)

export const changeUserStatus = createAsyncThunk(
    'users/changeUserStatus',
    async (userID) => {
        try{
            const response = await usersManagementService.changeUserStatus(userID);
            return response
        }catch(error) {
            return error
        }
    }
)

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (userID) => {
        try{
            const response = await usersManagementService.deleteUser(userID);
            console.log(response)
            return response
        }catch(error) {
            return error
        }
    }
)


const initialState = {
    getLoading: false,
    postLoading: false,
    removeLoading: false,
    usersArr: [],
    removed: [],
    changed: false,
    error: null
}

const getAllUsersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: {
        [getAllUsers.pending]: (state) => {
            state.getLoading = true;
            },
        [getAllUsers.fulfilled]: (state, action) => {
            state.getLoading = false;
            state.usersArr = action.payload.data
            },
        [getAllUsers.rejected]: (state,action) => {
            state.getLoading = false;
            state.error = action.error.message
            },
        [changeUserStatus.pending]: (state) => {
            state.postLoading = true;
            },
        [changeUserStatus.fulfilled]: (state, action) => {
            state.postLoading = false;
            state.changed = action.payload
            },
        [changeUserStatus.rejected]: (state, action) => {
            state.postLoading = false;
            state.error = action.error.message
            },
        [deleteUser.pending]: (state) => {
            state.removeLoading = true;
            },
        [deleteUser.fulfilled]: (state, action) => {
            state.removeLoading = false;
            state.removed = action.payload
            },
        [deleteUser.rejected]: (state, action) => {
            state.removeLoading = false;
            state.error = action.error.message
            },
    }
});

export default getAllUsersSlice.reducer