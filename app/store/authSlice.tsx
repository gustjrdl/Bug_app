import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState  {
    isAuthenticated:boolean
    user: string | "";
}

const initialState: AuthState = {
    isAuthenticated:false,
    user:"",
}
const authSlice = createSlice({

    name:'auth',

    initialState,

    reducers:{
        login: (state, action: PayloadAction<string>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },

        logout: (state, action: PayloadAction<string>) => {
            state.isAuthenticated =false;
            state.user= action.payload;
        }
    }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;
