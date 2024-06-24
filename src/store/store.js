import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import departmentSlice from './departmentSlice'
import projectSlice from './projectSlice';
import positionSlice from './positionSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        dept : departmentSlice,
        project : projectSlice,
        position : positionSlice,
    }
});

export default store;
