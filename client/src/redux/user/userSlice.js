import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:null,
    error:null,
    loading:false,
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
            signInStart: (state)=>{
                state.loading = true
            },
            signInSuccess: (state,action) =>{ // action contains the data that we will receive from the database
                state.currentUser = action.payload;
                console.log(action);
                state.loading = false;
                state.error= null
            },
            signInFailure: (state,action)=>{
                state.error = action.payload;
                state.loading = false;
            }
    }
});


export const {signInFailure,signInStart,signInSuccess} = userSlice.actions

export default userSlice.reducer;