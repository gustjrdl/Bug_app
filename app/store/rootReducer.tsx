import { combineReducers } from "@reduxjs/toolkit";
import authRudecer from './authSlice';

const rootReducer = combineReducers({
    auth: authRudecer,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;