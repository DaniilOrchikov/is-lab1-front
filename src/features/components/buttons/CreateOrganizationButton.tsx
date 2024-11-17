import React from "react";
import {useAppDispatch} from "../../../store";
import Button from "@mui/material/Button";
import {
    setOrganizationFormCanUpdateObject,
    setOrganizationFormOpen,
    setOrganizationFormType
} from "../../slices/formSlices/organizationFormSlice";

const CreateOrganizationButton = () => {
    const dispatch = useAppDispatch();
    return (
        <Button variant="contained" sx={{width: "40%"}} onClick={() => {
            dispatch(setOrganizationFormOpen(true))
            dispatch(setOrganizationFormType('create'))
            dispatch(setOrganizationFormCanUpdateObject(true))
        }}> Create Organization </Button>)
}

export default CreateOrganizationButton