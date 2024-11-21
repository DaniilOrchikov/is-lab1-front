import React from 'react';
import {useSelector} from 'react-redux';
import {Box, Dialog, DialogContent, DialogTitle, Typography, TextField, Button} from '@mui/material';
import {useAppDispatch} from '../../../store';
import {RootState} from '../../../store';
import {Coordinates} from '../../../types';
import {
    createCoordinatesThunk,
    deleteCoordinatesByIdThunk,
    updateCoordinatesThunk
} from '../../slices/coordinatesSlice';
import {
    setCoordinatesFormOpen,
    resetCoordinatesForm,
    setCoordinatesFormValueY,
    setCoordinatesFormValueX
} from '../../slices/formSlices/coordinatesFormSlice';


const CoordinatesForm = () => {
    const coordinatesForm = useSelector((state: RootState) => state.coordinatesForm);
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(setCoordinatesFormOpen(false));
        dispatch(resetCoordinatesForm())
    };

    const handleAddCoordinates = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let coordinates: Coordinates = {
            id: coordinatesForm.currentCoordinatesId,
            x: coordinatesForm.valueX,
            y: coordinatesForm.valueY,
            creatorName: user.name
        } as Coordinates;
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
                    {coordinatesForm.type === 'update' ? "Update " : "Create "} Coordinates
                </DialogTitle>
                {!coordinatesForm.canUpdateObject ?
                    <Typography sx={{marginLeft: "25px"}} variant="subtitle2">
                        You cannot modify an object because you are not its creator.
                    </Typography> : ""}
                <DialogContent>
                    <form onSubmit={handleAddCoordinates}>
                        <Box>
                            <TextField name="x" label="X" variant="standard"
                                       type={'number'}
                                       onChange={(event) => {
                                           const value = parseInt(event.target.value, 10);
                                           if (!isNaN(value)) {
                                               dispatch(setCoordinatesFormValueX(parseInt(event.target.value)))
                                           }
                                           else {
                                               dispatch(setCoordinatesFormValueX(null))
                                           }
                                       }}
                                       defaultValue={coordinatesForm.valueX}
                                       required
                                       disabled={!coordinatesForm.canUpdateObject}/>
                            <TextField name="y" label="Y" variant="standard"
                                       type={'number'}
                                       required
                                       onChange={(event) => {
                                           const value = parseInt(event.target.value, 10);
                                           if (!isNaN(value)) {
                                               dispatch(setCoordinatesFormValueY(parseInt(event.target.value)))
                                           }
                                           else {
                                               dispatch(setCoordinatesFormValueY(null))
                                           }
                                       }}
                                       defaultValue={coordinatesForm.valueY}
                                       InputProps={{inputProps: {max: 916}}}
                                       disabled={!coordinatesForm.canUpdateObject}/>
                        </Box>
                        <Box className="buttons">
                            {coordinatesForm.type === 'update' && coordinatesForm.canUpdateObject ?
                                (<Button variant="contained" color="error" sx={{marginRight: '2%'}}
                                         onClick={handleDeleteCoordinates}>Delete</Button>) : ""}
                            {coordinatesForm.canUpdateObject ?
                                <Button variant="contained" type="submit"
                                        sx={{marginRight: '2%'}}>{coordinatesForm.type === 'update' ? "Update " : "Create "}</Button>
                                : ""}
                            <Button variant="outlined" onClick={handleClose}>Close</Button>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default CoordinatesForm;