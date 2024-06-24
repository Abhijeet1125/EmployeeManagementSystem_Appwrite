import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    PositionList : []
}

const positionSlice  = createSlice({
    name: "positionSlice",
    initialState,
    reducers: {
        updatePositionList : (state , action ) => {
            state.PositionList = action.payload 
        },
    }
})

export const {updatePositionList  } = positionSlice.actions;

export default positionSlice.reducer;