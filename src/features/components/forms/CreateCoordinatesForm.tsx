import React from 'react'
import {State, useAppDispatch} from "../../../store";
import {Coordinates} from '../../../types';
import Button from '@mui/material/Button';
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import {createCoordinatesThunk} from "../../slices/coordinatesSlice";
import {useSelector} from "react-redux";
import {setCreateCoordinatesOpen} from "../../slices/formSlices/createCoordinatesSlice";


const CreateCoordinatesForm = () => {
    const createCoordinatesFormOpen = useSelector((state: State) => state.createCoordinatesFormOpen);
    const dispatch = useAppDispatch();
    const handleClose = () => {
        dispatch(setCreateCoordinatesOpen(false));
    };

    const handleAddCoordinates = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const x = parseInt(formData.get("x") as string);
        const y = parseInt(formData.get("y") as string);
        let coordinates: Coordinates = {id: -1, x: x, y: y} as Coordinates;
        dispatch(createCoordinatesThunk(coordinates));
        handleClose()
    }

    return (
        <Box>
            <Dialog
                open={createCoordinatesFormOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Create Coordinates
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleAddCoordinates}>
                        <Box>
                            <TextField name="x" label="X" variant="standard"
                                       type={'number'}
                                       required/>
                            <TextField name="y" label="Y" variant="standard"
                                       type={'number'}
                                       required
                                       InputProps={{inputProps: {max: 916}}}/>
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'right', marginTop: '4%'}}>
                            <Button variant="contained" type="submit" sx={{marginRight: '2%'}}>Create
                                Coordinates</Button>
                            <Button variant="outlined" onClick={handleClose}>Close</Button>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default CreateCoordinatesForm;