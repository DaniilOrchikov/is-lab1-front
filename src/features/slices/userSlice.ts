import {createSlice, PayloadAction} from '@reduxjs/toolkit';


const userSlice = createSlice({
    name: 'workers',
    initialState: {authorized: false, name: '', password: '', admin: false},
    reducers: {
        logout: () => {
            return {authorized: false, name: '', password: '', admin: false}
        },
        auth: (state, action: PayloadAction<{ name: string, password: string }>) => {
            return {authorized: true, name: action.payload.name, password: action.payload.password, admin: state.admin}
        },
        setAdmin: (state, action: PayloadAction<boolean>) => {
            state.admin = action.payload
        },
    }
});

export const {auth, logout,setAdmin} = userSlice.actions;

export default userSlice.reducer;
