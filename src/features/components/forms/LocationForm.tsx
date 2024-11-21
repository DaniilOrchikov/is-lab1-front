import React, {useState} from 'react'
import store, {RootState, useAppDispatch} from "../../../store";
import {Location, PopupTypes} from '../../../types';
import Button from '@mui/material/Button';
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle, Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import {
    createLocationThunk,
    deleteLocationByIdThunk, fetchLocationsThunk,
    updateLocationThunk
} from "../../slices/locationSlice";
import {useSelector} from "react-redux";
import {
    setLocationFormOpen,
    resetLocationForm,
    setLocationFormValueX,
    setLocationFormValueY,
    setLocationFormValueZ,
    setLocationFormValueName,
} from "../../slices/formSlices/locationFormSlice";
import {addPopup} from "../../slices/popupSlice";

const LocationForm = () => {
    const locationForm = useSelector((state: RootState) => state.locationForm);
    const dispatch = useAppDispatch();
    const locations = useSelector((state: RootState) => state.locations);
    const [nameErrorMessage, setNameErrorMessage] = useState("")
    const user = useSelector((state: RootState) => state.user);

    const handleClose = () => {
        dispatch(setLocationFormOpen(false));
        dispatch(resetLocationForm())
        setNameErrorMessage("")
    };

    const handleAddLocation = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        dispatch(fetchLocationsThunk())

        if (locationForm.valueName!.length > 309) {
            store.dispatch(addPopup({
                message: `The name of the location must not exceed 309 characters`,
                duration: 5000,
                type: PopupTypes.ERROR
            }))
            setNameErrorMessage("The name of the location must not exceed 309 characters")
            return
        } else {
            let location: Location = {
                id: locationForm.currentLocationId,
                x: locationForm.valueX,
                y: locationForm.valueY,
                z: locationForm.valueZ,
                name: locationForm.valueName,
                creatorName: user.name
            } as Location;
            if (locationForm.type === 'update') {
                dispatch(updateLocationThunk(location));
            } else {
                dispatch(createLocationThunk(location));
            }
        }
        dispatch(resetLocationForm());
        handleClose()
    }

    const handleDeleteLocation = () => {
        dispatch(deleteLocationByIdThunk(locationForm.currentLocationId))
        dispatch(resetLocationForm())
        handleClose()
    }

    return (
        <Box>
            <Dialog
                open={locationForm.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {locationForm.type === 'update' ? "Update " : "Create "} Location
                </DialogTitle>
                {!locationForm.canUpdateObject ?
                    <Typography sx={{marginLeft: "25px"}} variant="subtitle2">
                        You cannot modify an object because you are not its creator.
                    </Typography> : ""}
                <DialogContent>
                    <form onSubmit={handleAddLocation}>
                        <Box className="block">
                            <TextField name="name" label="Name" variant="standard"
                                       onChange={(event) => {
                                           setNameErrorMessage("")
                                           dispatch(setLocationFormValueName(event.target.value))
                                       }}
                                       value={locationForm.valueName}
                                       disabled={!locationForm.canUpdateObject}/>
                        </Box>
                        <Box className="block">
                            <Typography sx={{color: "red", height: "1em"}}
                                        variant="caption">{nameErrorMessage}</Typography>
                        </Box>
                        <Box className="block">

                            <TextField name="x" label="X" variant="standard"
                                       onChange={(event) => {
                                           const value = parseInt(event.target.value, 10);
                                           if (!isNaN(value)) {
                                               dispatch(setLocationFormValueX(parseInt(event.target.value)))
                                           } else {
                                               dispatch(setLocationFormValueX(null))
                                           }
                                       }}
                                       sx={{marginTop: "5%", width: 70}}
                                       type={'number'}
                                       defaultValue={locationForm.valueX}
                                       required
                                       disabled={!locationForm.canUpdateObject}/>
                            <TextField name="y" label="Y" variant="standard"
                                       onChange={(event) => {
                                           const value = parseInt(event.target.value, 10);
                                           if (!isNaN(value)) {
                                               dispatch(setLocationFormValueY(parseInt(event.target.value)))
                                           } else {
                                               dispatch(setLocationFormValueY(null))
                                           }
                                       }}
                                       sx={{marginTop: "5%", width: 70}}
                                       type={'number'}
                                       defaultValue={locationForm.valueY}
                                       required
                                       disabled={!locationForm.canUpdateObject}/>
                            <TextField name="z" label="Z" variant="standard"
                                       onChange={(event) => {
                                           const value = parseInt(event.target.value, 10);
                                           if (!isNaN(value)) {
                                               dispatch(setLocationFormValueZ(parseInt(event.target.value)))
                                           } else {
                                               dispatch(setLocationFormValueZ(null))
                                           }
                                       }}
                                       sx={{marginTop: "5%", width: 70}}
                                       type={'number'}
                                       defaultValue={locationForm.valueZ}
                                       disabled={!locationForm.canUpdateObject}/>
                        </Box>
                        <Box className="buttons">
                            {locationForm.type === 'update' && locationForm.canUpdateObject ?
                                (<Button variant="contained" color="error" sx={{marginRight: '2%'}}
                                         onClick={handleDeleteLocation}>Delete</Button>) : ""}
                            {locationForm.canUpdateObject ?
                                <Button variant="contained" type="submit"
                                        sx={{marginRight: '2%'}}>{locationForm.type === 'update' ? "Update " : "Create "}</Button>
                                : ""}
                            <Button variant="outlined" onClick={handleClose}>Close</Button>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default LocationForm;