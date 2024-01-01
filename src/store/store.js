import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from '../slices/auth'
import UsersReducer from '../slices/usersManagement'
import MessageReducer from '../slices/auth/message'


const store = configureStore({
    reducer: {
        auth: AuthReducer,
        users: UsersReducer,
        message: MessageReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export default store