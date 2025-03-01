import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice'

export const store = configureStore({
    reducer: {
        authReducer: authReducer
    }
})

export default store
