import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    projectList: [],
    completed: 0,
    inprogress: 0
}

const projectSlice = createSlice({
    name: "projectSlice",
    initialState,
    reducers: {
        updateProjectList: (state, action) => {
            state.projectList = action.payload
            let completedCount = 0;
            let inProgressCount = 0;
            action.payload.forEach(project => {
                if (project.Completed) {
                    completedCount++;
                } else {
                    inProgressCount++;
                }
            });

            state.completed = completedCount;
            state.inprogress = inProgressCount;
        },
    }
})

export const { updateProjectList } = projectSlice.actions;

export default projectSlice.reducer;