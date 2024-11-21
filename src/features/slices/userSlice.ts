import {createSlice, PayloadAction} from '@reduxjs/toolkit';


const userSlice = createSlice({
    name: 'workers',
    initialState: {authorized: false, name: '', password: '', admin: false, inAdminQueue: false},
    reducers: {
        logout: () => {
            return {authorized: false, name: '', password: '', admin: false, inAdminQueue: false}
        },
        auth: (state, action: PayloadAction<{ name: string, password: string}>) => {
            return {
                authorized: true,
                name: action.payload.name,
                password: action.payload.password,
                admin: state.admin,
                inAdminQueue: state.inAdminQueue
            }
        },
        setAdmin: (state, action: PayloadAction<boolean>) => {
            state.admin = action.payload
        },
        setInAdminQueue: (state, action: PayloadAction<boolean>) => {
            state.inAdminQueue = action.payload
        },
    }
});

export const {auth, logout, setAdmin, setInAdminQueue} = userSlice.actions;

export default userSlice.reducer;
