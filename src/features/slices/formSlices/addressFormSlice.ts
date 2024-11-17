import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const addressFormSlice = createSlice({
    name: 'addressForm',
    initialState: { open: false, type: 'create', currentAddressId: -1, canUpdateObject: false } as {
        open: boolean,
        valueStreet: string | null,
        valueZipCode: string | null,
        type: 'update' | 'create',
        currentAddressId: number,
        creatorName: string | null,
        canUpdateObject: boolean
    },
    reducers: {
        setAddressFormOpen: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload;
        },
        setAddressFormValueStreet: (state, action: PayloadAction<string | null>) => {
            state.valueStreet = action.payload;
        },
        setAddressFormValueZipCode: (state, action: PayloadAction<string | null>) => {
            state.valueZipCode = action.payload;
        },
        setAddressFormType: (state, action: PayloadAction<'update' | 'create'>) => {
            state.type = action.payload;
        },
        setAddressFormCreatorName: (state, action: PayloadAction<string | null>) => {
            state.creatorName = action.payload;
        },
        setAddressFormCanUpdateObject: (state, action: PayloadAction<boolean>) => {
            state.canUpdateObject = action.payload;
        },
        setCurrentAddressId: (state, action: PayloadAction<number>) => {
            state.currentAddressId = action.payload;
        },
        resetAddressForm: (state) => {
            return {
                open: state.open,
                valueStreet: null,
                valueZipCode: null,
                type: state.type,
                currentAddressId: -1,
                creatorName: null,
                canUpdateObject: state.canUpdateObject
            };
        },
    }
});

export const {
    setAddressFormOpen,
    setAddressFormValueStreet,
    setAddressFormValueZipCode,
    setAddressFormType,
    setCurrentAddressId,
    setAddressFormCreatorName,
    resetAddressForm,
    setAddressFormCanUpdateObject
} = addressFormSlice.actions;

export default addressFormSlice.reducer;