import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {Person, PopupTypes} from '../../types';
import {
    fetchPersons, createPerson, updatePersonById, deletePersonById
} from '../api/personApi';
import store from "../../store";
import {addPopup} from "./popupSlice";
import {setWorkerFormValuePersonId} from "./formSlices/workerFormSlice";

export const fetchPersonsThunk = createAsyncThunk('person/fetchPerson', async () => {
    return await fetchPersons();
});

export const createPersonThunk = createAsyncThunk(
    'person/createPerson',
    async (person: Person) => {
        const id = await createPerson(person) as number;
        store.dispatch(fetchPersonsThunk());
        store.dispatch(addPopup({message: `Person successfully added`, duration: 5000, type: PopupTypes.SUCCESS}))
        store.dispatch(setWorkerFormValuePersonId(id))
        return {...person, id: id} as Person
    }
);

export const updatePersonThunk = createAsyncThunk(
    'person/updatePerson',
    async (person: Person) => {
        await updatePersonById(person);
        store.dispatch(fetchPersonsThunk());
        return person;
    }
);

export const deletePersonByIdThunk = createAsyncThunk(
    'person/deletePerson',
    async (id: number) => {
        await deletePersonById(id);
        store.dispatch(fetchPersonsThunk());
        return id;
    }
);


const personSlice = createSlice({
    name: 'person',
    initialState: [] as Person[],
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchPersonsThunk.fulfilled, (state, action: PayloadAction<Person[]>) => {
                return action.payload;
            })
            .addCase(createPersonThunk.fulfilled, (state, action: PayloadAction<Person>) => {
                state.push(action.payload);
            })
            .addCase(updatePersonThunk.fulfilled, (state, action: PayloadAction<Person>) => {
                const index = state.findIndex(worker => worker.id === action.payload.id);
                if (index !== -1) {
                    state[index] = action.payload;
                }
            })
            .addCase(deletePersonByIdThunk.fulfilled, (state, action: PayloadAction<number>) => {
                const index = state.findIndex(person => person.id === action.payload);
                if (index !== -1) {
                    state.splice(index, 1);
                }
            });
    },
});


export default personSlice.reducer;
