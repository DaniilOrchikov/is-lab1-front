import {
    setCoordinatesFormCanUpdateObject,
    setCoordinatesFormOpen,
    setCoordinatesFormType
} from "../../slices/formSlices/coordinatesFormSlice";
import React from "react";
import {useAppDispatch} from "../../../store";
import Button from "@mui/material/Button";
import CreateButtonProps from "./CreateButtonProps";

const CreateCoordinatesButton = (props:CreateButtonProps) => {
    const dispatch = useAppDispatch();
    return (
        <Button variant="contained" onClick={() => {
            dispatch(setCoordinatesFormOpen(true))
            dispatch(setCoordinatesFormType('create'))
            dispatch(setCoordinatesFormCanUpdateObject(true))
        }} sx={props.sx}>Create Coordinates</Button>)
}

export default CreateCoordinatesButton