import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    projectList : []
}

const projectSlice  = createSlice({
    name: "projectSlice",
    initialState,
    reducers: {
        updateProjectList : (state , action ) => {
            state.projectList = action.payload 
        },

    }
})

export const {updateProjectList  } = projectSlice.actions;

export default projectSlice.reducer;