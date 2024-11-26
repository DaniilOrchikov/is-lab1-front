import React from "react";
import {RootState, useAppDispatch} from "../../../store";
import Button from "@mui/material/Button";
import {
    setWorkerFormCanUpdateObject, setWorkerFormCreatorName,
    setWorkerFormOpen,
    setWorkerFormType
} from "../../slices/formSlices/workerFormSlice";
import CreateButtonProps from "./CreateButtonProps";
import {useSelector} from "react-redux";

const CreateWorkerButton = (props:CreateButtonProps) => {
    const dispatch = useAppDispatch();
    const user = useSelector((state: RootState) => state.user);

    return (
        <Button variant="contained" onClick={() => {
            dispatch(setWorkerFormOpen(true))
            dispatch(setWorkerFormType('create'))
            dispatch(setWorkerFormCanUpdateObject(true))
            dispatch(setWorkerFormCreatorName(user.name))
        }} sx={props.sx}> Create Worker </Button>)
}

export default CreateWorkerButton