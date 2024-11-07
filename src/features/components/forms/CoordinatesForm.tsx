import React from 'react'
import {RootState, useAppDispatch} from "../../../store";
import {Coordinates} from '../../../types';
import Button from '@mui/material/Button';
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import {
    createCoordinatesThunk,
    deleteCoordinatesByIdThunk,
    updateCoordinatesThunk
} from "../../slices/coordinatesSlice";
import {useSelector} from "react-redux";
import {
    setCoordinatesFormValueX,
    setCoordinatesFormValueY,
    setCoordinatesFormOpen, resetCoordinatesForm, setCoordinatesFormType
} from "../../slices/formSlices/coordinatesFormSlice";


const CoordinatesForm = () => {
    const coordinatesForm = useSelector((state: RootState) => state.coordinatesForm);
    const dispatch = useAppDispatch();
    const handleClose = () => {
        dispatch(setCoordinatesFormOpen(false));
        dispatch(setCoordinatesFormValueX(null));
        dispatch(setCoordinatesFormValueY(null));
    };

    const handleAddCoordinates = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const x = parseInt(formData.get("x") as string);
        const y = parseInt(formData.get("y") as string);
        let coordinates: Coordinates = {id: coordinatesForm.currentCoordinatesId, x: x, y: y} as Coordinates;
        if (coordinatesForm.type === 'update') {
            dispatch(updateCoordinatesThunk(coordinates));
        } else {
            dispatch(createCoordinatesThunk(coordinates));
        }
        dispatch(resetCoordinatesForm());
        handleClose()
    }

    const handleDeleteCoordinates = () => {
        dispatch(deleteCoordinatesByIdThunk(coordinatesForm.currentCoordinatesId))
        dispatch(resetCoordinatesForm())
        handleClose()
    }

    return (
        <Box>
            <Dialog
                open={coordinatesForm.open}
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
                                       defaultValue={coordinatesForm.valueX !== null ? coordinatesForm.valueX : ''}
                                       required/>
                            <TextField name="y" label="Y" variant="standard"
                                       type={'number'}
                                       required
                                       defaultValue={coordinatesForm.valueY !== null ? coordinatesForm.valueY : ''}
                                       InputProps={{inputProps: {max: 916}}}/>
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'right', marginTop: '4%'}}>
                            {coordinatesForm.type === 'update' ?
                                (<Button variant="contained" color="error" sx={{marginRight: '2%'}}
                                         onClick={handleDeleteCoordinates}>Delete</Button>) : ""}
                            <Button variant="contained" type="submit"
                                    sx={{marginRight: '2%'}}>{coordinatesForm.type === 'update' ? "Update " : "Create "}</Button>
                            <Button variant="outlined" onClick={handleClose}>Close</Button>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default CoordinatesForm;