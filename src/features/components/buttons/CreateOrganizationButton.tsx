import React from "react";
import {RootState, useAppDispatch} from "../../../store";
import Button from "@mui/material/Button";
import {
    setOrganizationFormCanUpdateObject, setOrganizationFormCreatorName,
    setOrganizationFormOpen,
    setOrganizationFormType
} from "../../slices/formSlices/organizationFormSlice";
import CreateButtonProps from "./CreateButtonProps";
import {useSelector} from "react-redux";

const CreateOrganizationButton = (props:CreateButtonProps) => {
    const dispatch = useAppDispatch();
    const user = useSelector((state: RootState) => state.user);

    return (
        <Button variant="contained" onClick={() => {
            dispatch(setOrganizationFormOpen(true))
            dispatch(setOrganizationFormType('create'))
            dispatch(setOrganizationFormCanUpdateObject(true))
            dispatch(setOrganizationFormCreatorName(user.name))
        }} sx={props.sx}> Create Organization </Button>)
}

export default CreateOrganizationButton