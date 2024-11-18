import React from "react";
import {useAppDispatch} from "../../../store";
import Button from "@mui/material/Button";
import {
    setWorkerFormCanUpdateObject,
    setWorkerFormOpen,
    setWorkerFormType
} from "../../slices/formSlices/workerFormSlice";
import CreateButtonProps from "./CreateButtonProps";

const CreateWorkerButton = (props:CreateButtonProps) => {
    const dispatch = useAppDispatch();
    return (
        <Button variant="contained" onClick={() => {
            dispatch(setWorkerFormOpen(true))
            dispatch(setWorkerFormType('create'))
            dispatch(setWorkerFormCanUpdateObject(true))
        }} sx={props.sx}> Create Worker </Button>)
}

export default CreateWorkerButton