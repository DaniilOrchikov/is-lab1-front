import React from "react";
import {useAppDispatch} from "../../../store";
import Button from "@mui/material/Button";
import {
    setPersonFormCanUpdateObject,
    setPersonFormOpen,
    setPersonFormType
} from "../../slices/formSlices/personFormSlice";

const CreatePersonButton = () => {
    const dispatch = useAppDispatch();
    return (
        <Button variant="contained" sx={{width: "40%"}} onClick={() => {
            dispatch(setPersonFormOpen(true))
            dispatch(setPersonFormType('create'))
            dispatch(setPersonFormCanUpdateObject(true))
        }}>Create Person</Button>)
}

export default CreatePersonButton