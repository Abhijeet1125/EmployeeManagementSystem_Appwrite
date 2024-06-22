import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import departmentSlice from './departmentSlice'
import projectSlice from './projectSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        dept : departmentSlice,
        project : projectSlice,
    }
});

export default store;
