import React from "react";
import {RootState, useAppDispatch} from "../../../store";
import Button from "@mui/material/Button";
import {
    setPersonFormCanUpdateObject, setPersonFormCreatorName,
    setPersonFormOpen,
    setPersonFormType
} from "../../slices/formSlices/personFormSlice";
import CreateButtonProps from "./CreateButtonProps";
import {useSelector} from "react-redux";

const CreatePersonButton = (props:CreateButtonProps) => {
    const dispatch = useAppDispatch();
    const user = useSelector((state: RootState) => state.user);

    return (
        <Button variant="contained" onClick={() => {
            dispatch(setPersonFormOpen(true))
            dispatch(setPersonFormType('create'))
            dispatch(setPersonFormCanUpdateObject(true))
            dispatch(setPersonFormCreatorName(user.name))
        }} sx={props.sx}>Create Person</Button>)
}

export default CreatePersonButton