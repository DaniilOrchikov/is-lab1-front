import {
    setLocationFormCanUpdateObject,
    setLocationFormOpen,
    setLocationFormType
} from "../../slices/formSlices/locationFormSlice";
import React from "react";
import {useAppDispatch} from "../../../store";
import Button from "@mui/material/Button";
import CreateButtonProps from "./CreateButtonProps";

const CreateLocationButton = (props:CreateButtonProps) => {
    const dispatch = useAppDispatch();
    return (
        <Button variant="contained" onClick={() => {
            dispatch(setLocationFormOpen(true))
            dispatch(setLocationFormType('create'))
            dispatch(setLocationFormCanUpdateObject(true))
        }} sx={props.sx}>Create Location</Button>)
}

export default CreateLocationButton