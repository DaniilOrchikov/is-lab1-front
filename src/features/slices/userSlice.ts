import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';


const userSlice = createSlice({
    name: 'workers',
    initialState: {authorized: false, name: '', password: ''},
    reducers: {
        logout: () => {
            return {authorized: false, name: '', password: ''}
        },
        auth: (state, action: PayloadAction<{ name: string, password: string }>) => {
            return {authorized: true, name: action.payload.name, password: action.payload.password}
        },
    }
});

export const { auth, logout} = userSlice.actions;

export default userSlice.reducer;
