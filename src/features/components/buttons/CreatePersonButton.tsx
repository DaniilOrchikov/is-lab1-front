import React from "react";
import {useAppDispatch} from "../../../store";
import Button from "@mui/material/Button";
import {
    setPersonFormCanUpdateObject,
    setPersonFormOpen,
    setPersonFormType
} from "../../slices/formSlices/personFormSlice";
import CreateButtonProps from "./CreateButtonProps";

const CreatePersonButton = (props:CreateButtonProps) => {
    const dispatch = useAppDispatch();
    return (
        <Button variant="contained" onClick={() => {
            dispatch(setPersonFormOpen(true))
            dispatch(setPersonFormType('create'))
            dispatch(setPersonFormCanUpdateObject(true))
        }} sx={props.sx}>Create Person</Button>)
}

export default CreatePersonButton