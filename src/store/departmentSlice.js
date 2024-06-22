import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    departmentsList : []
}

const departmentSlice  = createSlice({
    name: "departmentSlice",
    initialState,
    reducers: {
        updateDepartmentList : (state , action ) => {
            state.departmentsList = action.payload 
        },

        pushDepartment : ( state , action ) => { 
            state.departmentsList.push ( action.payload)
        }
    }
})

export const {updateDepartmentList , pushDepartment } = departmentSlice.actions;

export default departmentSlice.reducer;