import {
    setCoordinatesFormCanUpdateObject,
    setCoordinatesFormOpen,
    setCoordinatesFormType
} from "../../slices/formSlices/coordinatesFormSlice";
import React from "react";
import {useAppDispatch} from "../../../store";
import Button from "@mui/material/Button";

const CreateCoordinatesButton = () => {
    const dispatch = useAppDispatch();
    return (
        <Button variant="contained" sx={{width: "40%"}} onClick={() => {
            dispatch(setCoordinatesFormOpen(true))
            dispatch(setCoordinatesFormType('create'))
            dispatch(setCoordinatesFormCanUpdateObject(true))
        }}>Create Coordinates</Button>)
}

export default CreateCoordinatesButton