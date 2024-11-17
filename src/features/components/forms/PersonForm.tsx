import React, {useEffect, useState} from 'react'
import {RootState, useAppDispatch} from "../../../store";
import {Color, Country, Person, Status} from '../../../types';
import Button from '@mui/material/Button';
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle, InputLabel, MenuItem, Select, SelectChangeEvent, Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import {
    createPersonThunk,
    deletePersonByIdThunk,
    updatePersonThunk
} from "../../slices/personSlice";
import {useSelector} from "react-redux";
import {
    setPersonFormOpen, resetPersonForm
} from "../../slices/formSlices/personFormSlice";
import FormControl from "@mui/material/FormControl";


const PersonForm = () => {
    const personForm = useSelector((state: RootState) => state.personForm);
    const dispatch = useAppDispatch();
    const [eyeColor, setEyeColor] = useState<Color>(Color.BLACK);
    const [hairColor, setHairColor] = useState<Color>(Color.BLACK);
    const [nationality, setNationality] = useState<Country>(Country.CHINA);
    const user = useSelector((state: RootState) => state.user);

    const handleEyeColorChange = (event: SelectChangeEvent) => {
        setEyeColor(event.target.value as Color);
    };
    const handleHairColorChange = (event: SelectChangeEvent) => {
        setHairColor(event.target.value as Color);
    };
    const handleNationalityChange = (event: SelectChangeEvent) => {
        setNationality(event.target.value as Country);
    };

    const handleClose = () => {
        dispatch(setPersonFormOpen(false));
        dispatch(resetPersonForm())
    };

    const handleAddPerson = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const height = parseInt(formData.get("height") as string);
        let person: Person = {
            id: personForm.currentPersonId,
            eyeColor: eyeColor,
            hairColor: hairColor,
            height: height,
            nationality: nationality,
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

    useEffect(() => {
        if (personForm.valueEyeColor !== null) {
            setEyeColor(personForm.valueEyeColor);
        }
    }, [personForm.valueEyeColor]);
    useEffect(() => {
        if (personForm.valueHairColor !== null) {
            setEyeColor(personForm.valueHairColor);
        }
    }, [personForm.valueHairColor]);
    useEffect(() => {
        if (personForm.valueNationality !== null) {
            setNationality(personForm.valueNationality);
        }
    }, [personForm.valueNationality]);

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
                        <Box sx={{display: 'flex', justifyContent: 'center', width: "100%"}}>
                            <FormControl variant="outlined" fullWidth sx={{width: 150, marginTop: "3%"}}>
                                <InputLabel>Eye Color</InputLabel>
                                <Select
                                    value={eyeColor}
                                    onChange={handleEyeColorChange}
                                    label="EyeColor"
                                    disabled={!personForm.canUpdateObject}
                                >
                                    {Object.entries(Color).map(([key, value]) => (
                                        <MenuItem key={key} value={value}>
                                            {value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl variant="outlined" fullWidth sx={{width: 150, marginTop: "3%"}}>
                                <InputLabel>Hair Color</InputLabel>
                                <Select
                                    value={hairColor}
                                    onChange={handleHairColorChange}
                                    label="HairColor"
                                    disabled={!personForm.canUpdateObject}
                                >
                                    {Object.entries(Color).map(([key, value]) => (
                                        <MenuItem key={key} value={value}>
                                            {value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl variant="outlined" fullWidth sx={{width: 150, marginTop: "3%"}}>
                                <InputLabel>Nationality</InputLabel>
                                <Select
                                    value={nationality}
                                    onChange={handleNationalityChange}
                                    label="Nationality"
                                    disabled={!personForm.canUpdateObject}
                                >
                                    {Object.entries(Country).map(([key, value]) => (
                                        <MenuItem key={key} value={value}>
                                            {value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box>
                            <TextField name="height" label="Height" variant="standard"
                                       type={'number'}
                                       defaultValue={personForm.valueHeight !== null ? personForm.valueHeight : ''}
                                       required
                                       InputProps={{inputProps: {min: 1}}}
                                       disabled={!personForm.canUpdateObject}/>
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'right', marginTop: '4%'}}>
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