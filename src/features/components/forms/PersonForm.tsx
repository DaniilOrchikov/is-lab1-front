import React from 'react';
import {useSelector} from 'react-redux';
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    TextField,
    Button,
} from '@mui/material';
import {useAppDispatch} from '../../../store';
import {RootState} from '../../../store';
import {Color, Country, Person} from '../../../types';
import {createPersonThunk, deletePersonByIdThunk, updatePersonThunk} from '../../slices/personSlice';
import {
    setPersonFormOpen,
    resetPersonForm,
    setPersonFormValueEyeColor,
    setPersonFormValueNationality, setPersonFormValueHeight, setPersonFormValueHairColor, setPersonFormValueLocationId
} from '../../slices/formSlices/personFormSlice';
import SelectField from "./SelectField";
import CreateLocationButton from "../buttons/CreateLocationButton";


const PersonForm = () => {
    const personForm = useSelector((state: RootState) => state.personForm);
    const locations = useSelector((state: RootState) => state.locations);
    const dispatch = useAppDispatch();
    const user = useSelector((state: RootState) => state.user);


    const handleClose = () => {
        dispatch(setPersonFormOpen(false));
        dispatch(resetPersonForm())
    };

    const handleAddPerson = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let person: Person = {
            id: personForm.currentPersonId,
            eyeColor: personForm.valueEyeColor,
            hairColor: personForm.valueHairColor,
            height: personForm.valueHeight,
            nationality: personForm.valueNationality,
            locationId: personForm.valueLocationId,
            creatorName: user.name
        } as Person;
        if (personForm.type === 'update') {
            dispatch(updatePersonThunk(person));
        } else {
            dispatch(createPersonThunk(person));
        }
        dispatch(resetPersonForm());
        handleClose()
    }

    const handleDeletePerson = () => {
        dispatch(deletePersonByIdThunk(personForm.currentPersonId))
        dispatch(resetPersonForm())
        handleClose()
    }

    return (
        <Box>
            <Dialog
                open={personForm.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {personForm.type === 'update' ? "Update " : "Create "} Person
                </DialogTitle>
                {!personForm.canUpdateObject ?
                    <Typography sx={{marginLeft: "25px"}} variant="subtitle2">You cannot modify an object because you
                        are not its creator.</Typography> : ""}
                <DialogContent>
                    <form onSubmit={handleAddPerson}>
                        <Box className="block">
                            <SelectField label="Eye Color"
                                         value={personForm.valueEyeColor}
                                         changeHandler={(event) => dispatch(setPersonFormValueEyeColor(event.target.value as Color))}
                                         options={Object.values(Color).map(color => ({label: color, value: color}))}
                                         disabled={!personForm.canUpdateObject}
                                         className="select-enum"
                                         required={false}/>

                            <SelectField label="Hair Color"
                                         value={personForm.valueHairColor}
                                         changeHandler={(event) => dispatch(setPersonFormValueHairColor(event.target.value as Color))}
                                         options={Object.values(Color).map(color => ({label: color, value: color}))}
                                         disabled={!personForm.canUpdateObject}
                                         className="select-enum"
                                         required={false}/>

                            <SelectField label="Nationality"
                                         value={personForm.valueNationality}
                                         changeHandler={(event) => dispatch(setPersonFormValueNationality(event.target.value as Country))}
                                         options={Object.values(Country).map(country => ({
                                             label: country,
                                             value: country
                                         }))}
                                         disabled={!personForm.canUpdateObject}
                                         className="select-enum"
                            />
                        </Box>
                        <Box className="block">
                            <TextField name="height" label="Height" variant="standard"
                                       type={'number'}
                                       defaultValue={personForm.valueHeight}
                                       onChange={(event) => {
                                           const value = parseInt(event.target.value, 10);
                                           if (!isNaN(value)) {
                                               dispatch(setPersonFormValueHeight(parseInt(event.target.value)))
                                           } else {
                                               dispatch(setPersonFormValueHeight(null))
                                           }
                                       }}
                                       required
                                       InputProps={{inputProps: {min: 1}}}
                                       disabled={!personForm.canUpdateObject}/>
                        </Box>
                        <Box className="block-column">
                            {personForm.canUpdateObject ? <CreateLocationButton sx={{width: "40%"}}/> : ""}
                            <Box className="select-object-box">
                                <SelectField label="Location"
                                             value={personForm.valueLocationId || ''}
                                             changeHandler={(event) => dispatch(setPersonFormValueLocationId(parseInt(event.target.value as string)))}
                                             options={locations.filter((location) => location.creatorName === user.name || location.id === personForm.valueLocationId || user.admin).map(location => ({
                                                 label: `${location.name}: (${location.x}; ${location.y}; ${location.z})`,
                                                 value: location.id
                                             }))}
                                             disabled={!personForm.canUpdateObject}/>
                            </Box>
                        </Box>
                        <Box className="buttons">
                            {personForm.type === 'update' && personForm.canUpdateObject ?
                                (<Button variant="contained" color="error" sx={{marginRight: '2%'}}
                                         onClick={handleDeletePerson}>Delete</Button>) : ""}
                            {personForm.canUpdateObject ?
                                <Button variant="contained" type="submit"
                                        sx={{marginRight: '2%'}}>{personForm.type === 'update' ? "Update " : "Create "}</Button>
                                : ""}
                            <Button variant="outlined" onClick={handleClose}>Close</Button>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default PersonForm;