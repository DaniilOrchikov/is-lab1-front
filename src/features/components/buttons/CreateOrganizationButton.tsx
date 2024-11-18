import React from "react";
import {useAppDispatch} from "../../../store";
import Button from "@mui/material/Button";
import {
    setOrganizationFormCanUpdateObject,
    setOrganizationFormOpen,
    setOrganizationFormType
} from "../../slices/formSlices/organizationFormSlice";
import CreateButtonProps from "./CreateButtonProps";

const CreateOrganizationButton = (props:CreateButtonProps) => {
    const dispatch = useAppDispatch();
    return (
        <Button variant="contained" onClick={() => {
            dispatch(setOrganizationFormOpen(true))
            dispatch(setOrganizationFormType('create'))
            dispatch(setOrganizationFormCanUpdateObject(true))
        }} sx={props.sx}> Create Organization </Button>)
}

export default CreateOrganizationButton