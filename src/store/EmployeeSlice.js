import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    EmployeeList : []
}

const employeeSlice  = createSlice({
    name: "employSlice",
    initialState,
    reducers: {
        updateEmployeeList : (state , action ) => {
            state.EmployeeList = action.payload 
        },

    }
})

export const {updateEmployeeList  } = employeeSlice.actions;

export default employeeSlice.reducer;