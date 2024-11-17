import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Color, Country} from "../../../types";


const personFormSlice = createSlice({
    name: 'personForm',
    initialState: {
        open: false,
        valueEyeColor: null,
        valueHairColor: null,
        valueLocationId: null,
        valueHeight: null,
        valueNationality: null,
        type: 'create',
        currentPersonId: -1,
        creatorName: null,
        canUpdateObject: false
    } as {
        open: boolean,
        valueEyeColor: null | Color,
        valueHairColor: null | Color,
        valueLocationId: null | number,
        valueHeight: null | number,
        valueNationality: null | Country,
        type: 'update' | 'create',
        currentPersonId: number,
        creatorName: string | null,
        canUpdateObject: boolean
    },
    reducers: {
        setPersonFormOpen: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload
        },
        setPersonFormValueEyeColor: (state, action: PayloadAction<Color | null>) => {
            state.valueEyeColor = action.payload
        },
        setPersonFormValueHairColor: (state, action: PayloadAction<Color | null>) => {
            state.valueHairColor = action.payload
        },
        setPersonFormValueLocationId: (state, action: PayloadAction<number | null>) => {
            state.valueLocationId = action.payload
        },
        setPersonFormValueHeight: (state, action: PayloadAction<number | null>) => {
            state.valueHeight = action.payload
        },
        setPersonFormValueNationality: (state, action: PayloadAction<Country | null>) => {
            state.valueNationality = action.payload
        },
        setPersonFormType: (state, action: PayloadAction<'update' | 'create'>) => {
            state.type = action.payload
        },
        setPersonFormCreatorName: (state, action: PayloadAction<string | null>) => {
            state.creatorName = action.payload
        },
        setPersonFormCanUpdateObject: (state, action: PayloadAction<boolean>) => {
            state.canUpdateObject = action.payload
        },
        setCurrentPersonId: (state, action: PayloadAction<number>) => {
            state.currentPersonId = action.payload
        },
        resetPersonForm: (state) => {
            return {
                open: state.open,
                valueEyeColor: null,
                valueHairColor: null,
                valueLocationId: null,
                valueHeight: null,
                valueNationality: null,
                type: state.type,
                currentPersonId: -1,
                creatorName: null,
                canUpdateObject: state.canUpdateObject
            }
        },
    }
});

export const {
    setPersonFormOpen,
    setPersonFormValueEyeColor,
    setPersonFormValueHairColor,
    setPersonFormValueLocationId,
    setPersonFormValueHeight,
    setPersonFormValueNationality,
    setPersonFormType,
    setCurrentPersonId,
    resetPersonForm,
    setPersonFormCreatorName,
    setPersonFormCanUpdateObject
} = personFormSlice.actions;

export default personFormSlice.reducer;
