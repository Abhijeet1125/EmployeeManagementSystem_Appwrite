import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loggedIn : false ,
}

const authSlice  = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        updateAuthSlice : ( state ,action  ) => {            
            state.loggedIn = action.payload
        }
    }
})

export const {updateAuthSlice} = authSlice.actions;

export default authSlice.reducer;