import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

// Define a type for the slice state
type AuthState = {
    isAuthenticated: boolean;
}

// Define the initial state using that type
const initialState: AuthState = {
    isAuthenticated: false,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        }
    },
});

export const { setAuthenticated } = authSlice.actions;

export default authSlice.reducer;