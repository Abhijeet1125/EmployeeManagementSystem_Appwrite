import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import departmentSlice from './departmentSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        dept : departmentSlice,
    }
});

export default store;
