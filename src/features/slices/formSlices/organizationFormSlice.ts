import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {OrganizationType} from "../../../types";

const organizationFormSlice = createSlice({
    name: 'organizationForm',
    initialState: {
        open: false,
        valueAnnualTurnover: null,
        valueEmployeesCount: null,
        valueFullName: null,
        valueRating: null,
        valueType: null,
        valueAddressId: null,
        creatorName: null,
        type: 'create',
        currentOrganizationId: -1,
        canUpdateObject: false
    } as {
        open: boolean,
        valueAnnualTurnover: number | null,
        valueEmployeesCount: number | null,
        valueFullName: string | null,
        valueRating: number | null,
        valueType: OrganizationType | null
        valueAddressId: number | null,
        creatorName: string | null,
        type: 'update' | 'create',
        currentOrganizationId: number
        canUpdateObject: boolean
    },
    reducers: {
        setOrganizationFormOpen: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload;
        },
        setOrganizationFormValueAnnualTurnover: (state, action: PayloadAction<number | null>) => {
            state.valueAnnualTurnover = action.payload;
        },
        setOrganizationFormValueEmployeesCount: (state, action: PayloadAction<number | null>) => {
            state.valueEmployeesCount = action.payload;
        },
        setOrganizationFormValueFullName: (state, action: PayloadAction<string | null>) => {
            state.valueFullName = action.payload;
        },
        setOrganizationFormValueType: (state, action: PayloadAction<OrganizationType | null>) => {
            state.valueType = action.payload;
        },
        setOrganizationFormValueRating: (state, action: PayloadAction<number | null>) => {
            state.valueRating = action.payload;
        },
        setOrganizationFormType: (state, action: PayloadAction<'update' | 'create'>) => {
            state.type = action.payload;
        },
        setCurrentOrganizationId: (state, action: PayloadAction<number>) => {
            state.currentOrganizationId = action.payload;
        },
        setOrganizationFormCreatorName: (state, action: PayloadAction<string | null>) => {
            state.creatorName = action.payload
        },
        setOrganizationFormCanUpdateObject: (state, action: PayloadAction<boolean>) => {
            state.canUpdateObject = action.payload
        },
        setOrganizationFormValueAddressId: (state, action: PayloadAction<number | null>) => {
            state.valueAddressId = action.payload;
        },
        resetOrganizationForm: (state) => {
            return {
                open: state.open,
                valueAnnualTurnover: null,
                valueEmployeesCount: null,
                valueFullName: null,
                valueRating: null,
                valueType: null,
                valueAddressId: null,
                creatorName: null,
                type: state.type,
                currentOrganizationId: -1,
                canUpdateObject: state.canUpdateObject
            }
        },
    },
});

export const {setOrganizationFormOpen,
    setOrganizationFormValueAnnualTurnover,
    setOrganizationFormValueEmployeesCount,
    setOrganizationFormValueFullName,
    setOrganizationFormValueType,
    setOrganizationFormValueRating,
    setOrganizationFormType,
    setCurrentOrganizationId,
    setOrganizationFormValueAddressId,
    resetOrganizationForm,
    setOrganizationFormCreatorName,
    setOrganizationFormCanUpdateObject
} = organizationFormSlice.actions;

export default organizationFormSlice.reducer;