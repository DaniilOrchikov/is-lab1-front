import {
    setLocationFormCanUpdateObject, setLocationFormCreatorName,
    setLocationFormOpen,
    setLocationFormType
} from "../../slices/formSlices/locationFormSlice";
import React from "react";
import {RootState, useAppDispatch} from "../../../store";
import Button from "@mui/material/Button";
import CreateButtonProps from "./CreateButtonProps";
import {useSelector} from "react-redux";

const CreateLocationButton = (props:CreateButtonProps) => {
    const dispatch = useAppDispatch();
    const user = useSelector((state: RootState) => state.user);

    return (
        <Button variant="contained" onClick={() => {
            dispatch(setLocationFormOpen(true))
            dispatch(setLocationFormType('create'))
            dispatch(setLocationFormCanUpdateObject(true))
            dispatch(setLocationFormCreatorName(user.name))
        }} sx={props.sx}>Create Location</Button>)
}

export default CreateLocationButton